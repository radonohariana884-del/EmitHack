const db = require("../config/db");

const getAllRoutes = (options = {}, callback) => {
  let sql = "SELECT * FROM route";
  const params = [];

  if (options.ville) {
    sql += " WHERE ville = ?";
    params.push(options.ville);
  }

  db.query(sql, params, callback);
};

module.exports = {
  getAllRoutes,
};