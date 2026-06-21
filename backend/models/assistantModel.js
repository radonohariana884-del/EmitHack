const db = require("../config/db");

const getRouteById = (id, callback) => {
    db.query(
        "SELECT * FROM route WHERE id = ?",
        [id],
        callback
    );
};

module.exports = {
    getRouteById
};