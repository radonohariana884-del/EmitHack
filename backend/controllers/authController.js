const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = process.env.JWT_SECRET || "dev_jwt_secret";

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe requis" });
  }

  db.query(
    "SELECT id, nom, email, mot_de_passe FROM utilisateurs WHERE email = ? LIMIT 1",
    [email],
    (err, results) => {
      if (err) return next(err);
      if (!results || results.length === 0) {
        return res.status(401).json({ message: "Email ou mot de passe incorrect" });
      }

      const user = results[0];
      const stored = user.mot_de_passe || "";

      // Support both plain-text and bcrypt-hashed passwords
      const checkPassword = () => {
        return new Promise((resolve) => {
          // try bcrypt compare first
          bcrypt.compare(password, stored, (bcryptErr, same) => {
            if (!bcryptErr && same) return resolve(true);
            // fallback to plain text comparison
            if (password === stored) return resolve(true);
            return resolve(false);
          });
        });
      };

      checkPassword().then((ok) => {
        if (!ok) return res.status(401).json({ message: "Email ou mot de passe incorrect" });

        const payload = { id: user.id, nom: user.nom, email: user.email };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "8h" });

        return res.json({ token, user: { id: user.id, nom: user.nom, email: user.email } });
      });
    }
  );
};

exports.register = (req, res, next) => {
  const { nom, email, mot_de_passe } = req.body;
  if (!nom || !email || !mot_de_passe) {
    return res.status(400).json({ message: "Nom, email et mot de passe requis" });
  }

  // Check if email exists
  db.query("SELECT id FROM utilisateurs WHERE email = ? LIMIT 1", [email], (err, results) => {
    if (err) return next(err);
    if (results && results.length > 0) {
      return res.status(409).json({ message: "Email déjà utilisé" });
    }

    // hash password
    bcrypt.hash(mot_de_passe, 10, (hashErr, hashed) => {
      if (hashErr) return next(hashErr);

      const sql = "INSERT INTO utilisateurs (nom, email, mot_de_passe, date_creation) VALUES (?, ?, ?, NOW())";
      db.query(sql, [nom, email, hashed], (insertErr, insertRes) => {
        if (insertErr) return next(insertErr);

        const userId = insertRes.insertId;
        const payload = { id: userId, nom, email };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "8h" });

        return res.status(201).json({ token, user: { id: userId, nom, email } });
      });
    });
  });
};
