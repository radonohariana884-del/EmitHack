const db = require("../config/db");

const getAllSignalements = (callback) => {
    db.query("SELECT * FROM signalement", callback);
};

const getSignalementsByVille = (ville, callback) => {
    const sql = `
        SELECT s.*, r.latitude, r.longitude
        FROM signalement s
        JOIN route r ON s.route_id = r.id
        WHERE r.ville = ?
    `;
    db.query(sql, [ville], callback);
};

const createSignalement = (data, callback) => {
    const sql = `
        INSERT INTO signalement
        (utilisateur_id, route_id, type, description)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            data.utilisateur_id,
            data.route_id,
            data.type,
            data.description
        ],
        callback
    );
};

module.exports = {
    getAllSignalements,
    getSignalementsByVille,
    createSignalement
};