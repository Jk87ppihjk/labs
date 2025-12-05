const db = require("../config/db.config");

// GET /api/beats/explore - Fetch beats for the public explore feed
exports.getExploreBeats = async (req, res) => {
    try {
        const [beats] = await db.query(`
            SELECT 
                b.id, b.title, b.artwork_url as artworkUrl, u.username as producer
            FROM beats b
            JOIN users u ON b.user_id = u.id
            WHERE b.status = 'active'
            ORDER BY b.created_at DESC
            LIMIT 20
        `);

        for (const beat of beats) {
             const [licenses] = await db.query(
                "SELECT type, price FROM beat_licenses WHERE beat_id = ? AND is_active = TRUE",
                [beat.id]
            );
            // Map to match frontend structure
            beat.licenses = licenses.map(l => ({...l, selected: l.type === 'Basic'}));
        }

        res.status(200).json(beats);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// GET /api/beats/:id - Fetch a single beat by its ID
exports.getBeatById = async (req, res) => {
    try {
        const beatId = req.params.id;
        const [beatRows] = await db.query(`
            SELECT b.title, b.genre, b.description, b.artwork_url as artworkUrl, u.username as producer 
            FROM beats b 
            JOIN users u ON b.user_id = u.id 
            WHERE b.id = ?`, [beatId]);

        if (beatRows.length === 0) {
            return res.status(404).send({ message: "Beat not found." });
        }
        const beat = beatRows[0];

        const [tags] = await db.query("SELECT tag_name FROM beat_tags WHERE beat_id = ?", [beatId]);
        beat.tags = tags.map(t => t.tag_name);

        const [licenses] = await db.query("SELECT type, price, is_active FROM beat_licenses WHERE beat_id = ?", [beatId]);
        beat.licenses = licenses.map(l => ({ name: l.type, active: !!l.is_active, price: l.price, files: [] })); // files need more logic
        
        beat.files = [
            { name: 'beat_final.mp3', type: 'audio_file' },
            { name: 'beat_final.wav', type: 'audio_file' },
            { name: 'stems.zip', type: 'folder_zip' }
        ];

        res.status(200).json(beat);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// GET /api/beats/beatmaker/my-beats - Fetch beats for the logged-in beatmaker
exports.getMyBeats = async (req, res) => {
    try {
        const [beats] = await db.query(
            "SELECT id, title, artwork_url as artworkUrl, status FROM beats WHERE user_id = ?",
            [req.userId]
        );
        
        // This is a simplified version. In a real app you'd join to get sales/views counts.
        const myBeats = beats.map(b => ({...b, sales: 0, views: '0'}));

        res.status(200).json(myBeats);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// POST /api/beats/beatmaker/upload - Create a new beat
exports.uploadBeat = async (req, res) => {
    const { title, genre, description, tags, licenses, artworkUrl } = req.body;
    
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const [beatResult] = await connection.query(
            "INSERT INTO beats (user_id, title, genre, description, artwork_url, status) VALUES (?, ?, ?, ?, ?, 'active')",
            [req.userId, title, genre, description, artworkUrl || "https://picsum.photos/500/500"]
        );
        const beatId = beatResult.insertId;

        if (tags && tags.length > 0) {
            const tagValues = tags.map(tag => [beatId, tag]);
            await connection.query("INSERT INTO beat_tags (beat_id, tag_name) VALUES ?", [tagValues]);
        }
        
        if (licenses && licenses.length > 0) {
            for (const license of licenses) {
                await connection.query(
                    "INSERT INTO beat_licenses (beat_id, type, price, is_active) VALUES (?, ?, ?, ?)",
                    [beatId, license.name, license.price, license.active]
                );
            }
        }

        await connection.commit();
        res.status(201).send({ message: "Beat uploaded successfully!", beatId });

    } catch (error) {
        await connection.rollback();
        res.status(500).send({ message: error.message });
    } finally {
        connection.release();
    }
};

// PUT /api/beats/beatmaker/:id - Update an existing beat
exports.updateBeat = async (req, res) => {
    const beatId = req.params.id;
    const { title, genre, description, tags, licenses } = req.body;
    
    const connection = await db.getConnection();
    try {
        const [beatRows] = await connection.query("SELECT user_id FROM beats WHERE id = ?", [beatId]);
        if (beatRows.length === 0 || beatRows[0].user_id !== req.userId) {
            connection.release();
            return res.status(403).send({ message: "Forbidden: You do not own this beat." });
        }

        await connection.beginTransaction();

        await connection.query(
            "UPDATE beats SET title = ?, genre = ?, description = ? WHERE id = ?",
            [title, genre, description, beatId]
        );

        await connection.query("DELETE FROM beat_tags WHERE beat_id = ?", [beatId]);
        if (tags && tags.length > 0) {
            const tagValues = tags.map(tag => [beatId, tag]);
            await connection.query("INSERT INTO beat_tags (beat_id, tag_name) VALUES ?", [tagValues]);
        }
        
        await connection.query("DELETE FROM beat_licenses WHERE beat_id = ?", [beatId]);
        if (licenses && licenses.length > 0) {
            for (const license of licenses) {
                 await connection.query(
                    "INSERT INTO beat_licenses (beat_id, type, price, is_active) VALUES (?, ?, ?, ?)",
                    [beatId, license.name, license.price, license.active]
                );
            }
        }
        
        await connection.commit();
        res.status(200).send({ message: "Beat updated successfully!" });

    } catch (error) {
        await connection.rollback();
        res.status(500).send({ message: error.message });
    } finally {
        connection.release();
    }
};

// DELETE /api/beats/beatmaker/:id - Delete a beat
exports.deleteBeat = async (req, res) => {
    const beatId = req.params.id;
    const connection = await db.getConnection();
    try {
        const [beatRows] = await connection.query("SELECT user_id FROM beats WHERE id = ?", [beatId]);
        if (beatRows.length === 0 || beatRows[0].user_id !== req.userId) {
            connection.release();
            return res.status(403).send({ message: "Forbidden: You do not own this beat." });
        }

        await connection.beginTransaction();
        await connection.query("DELETE FROM beat_tags WHERE beat_id = ?", [beatId]);
        await connection.query("DELETE FROM beat_licenses WHERE beat_id = ?", [beatId]);
        await connection.query("DELETE FROM beats WHERE id = ?", [beatId]);
        await connection.commit();

        res.status(200).send({ message: "Beat deleted successfully." });
    } catch (error) {
         await connection.rollback();
        res.status(500).send({ message: error.message });
    } finally {
        connection.release();
    }
};