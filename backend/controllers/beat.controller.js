const db = require("../config/db.config");

// GET /api/beats/explore - Fetch beats for the public explore feed
exports.getExploreBeats = async (req, res) => {
    try {
        const [beats] = await db.query(`
            SELECT 
                b.id, b.title, b.artwork_url, u.username as producer
            FROM beats b
            JOIN users u ON b.user_id = u.id
            WHERE b.status = 'active'
            ORDER BY b.created_at DESC
            LIMIT 20
        `);

        // In a real app, you'd fetch licenses for each beat in an optimized way
        for (const beat of beats) {
             const [licenses] = await db.query(
                "SELECT type, price FROM beat_licenses WHERE beat_id = ? AND is_active = TRUE",
                [beat.id]
            );
            beat.licenses = licenses;
        }

        res.status(200).json(beats);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// GET /api/beats/:id - Fetch a single beat by its ID
exports.getBeatById = async (req, res) => {
    // Logic to fetch a single beat details
    res.status(501).send({ message: "Not implemented yet."});
};

// GET /api/beats/beatmaker/my-beats - Fetch beats for the logged-in beatmaker
exports.getMyBeats = async (req, res) => {
    try {
        const [beats] = await db.query(
            "SELECT id, title, artwork_url, status FROM beats WHERE user_id = ?",
            [req.userId]
        );
        
        // You can add more stats like sales, views here with more complex queries
        res.status(200).json(beats);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// POST /api/beats/beatmaker/upload - Create a new beat
exports.uploadBeat = async (req, res) => {
    // This is a simplified version. A real implementation would handle
    // file uploads to Cloudinary first, get the URLs, then save to DB.
    const { title, genre, description, tags, licenses } = req.body;
    
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const [beatResult] = await connection.query(
            "INSERT INTO beats (user_id, title, genre, description, artwork_url) VALUES (?, ?, ?, ?, ?)",
            [req.userId, title, genre, description, "placeholder_artwork_url.jpg"]
        );
        const beatId = beatResult.insertId;

        // Add tags logic here...
        
        // Add licenses
        for (const license of licenses) {
            if (license.active) {
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
    res.status(501).send({ message: "Not implemented yet."});
};

// DELETE /api/beats/beatmaker/:id - Delete a beat
exports.deleteBeat = async (req, res) => {
    res.status(501).send({ message: "Not implemented yet."});
};
