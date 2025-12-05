const db = require("../config/db.config");

// GET /api/users/profile - Get logged-in user's profile
exports.getProfile = async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT id, full_name, email, username, role, avatar_url, bio FROM users WHERE id = ?",
            [req.userId]
        );

        if (rows.length === 0) {
            return res.status(404).send({ message: "User not found." });
        }

        const user = rows[0];

        // In a real app, you would also query for stats like followers, beats sold etc.
        user.stats = {
            sold: 0,
            licenses: 0,
            followers: 0
        };

        res.status(200).json(user);

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// PUT /api/users/profile - Update logged-in user's profile
exports.updateProfile = async (req, res) => {
    const { fullName, username, bio, avatarUrl } = req.body;
    try {
        await db.query(
            "UPDATE users SET full_name = ?, username = ?, bio = ?, avatar_url = ? WHERE id = ?",
            [fullName, username, bio, avatarUrl, req.userId]
        );
        res.status(200).send({ message: "Profile updated successfully." });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};


// GET /api/users/:username - Get public profile
exports.getPublicProfile = async (req, res) => {
    // Logic to fetch a user's public profile data for others to see
    res.status(501).send({ message: "Not implemented yet."});
};
