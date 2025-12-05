const db = require("../config/db.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const { fullName, email, password, role } = req.body;

  if (!fullName || !email || !password || !role) {
    return res.status(400).send({ message: "Please provide all required fields." });
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 8);
    const username = email.split('@')[0] + Math.floor(Math.random() * 1000); // Simple username generation

    const [result] = await db.query(
      "INSERT INTO users (full_name, email, password, role, username) VALUES (?, ?, ?, ?, ?)",
      [fullName, email, hashedPassword, role, username]
    );
    
    res.status(201).send({ message: "User registered successfully!" });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
        return res.status(400).send({ message: "Failed! Email is already in use!" });
    }
    res.status(500).send({ message: error.message });
  }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        
        if (rows.length === 0) {
            return res.status(404).send({ message: "User Not found." });
        }

        const user = rows[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send({ accessToken: null, message: "Invalid Password!" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            accessToken: token
        });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
