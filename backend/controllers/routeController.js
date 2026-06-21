const RouteModel = require("../models/routeModel");

const getRoutes = (req, res) => {
  const { ville } = req.query;

  RouteModel.getAllRoutes({ ville }, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Impossible de récupérer les routes",
        error: err.message,
      });
    }

    res.json(result);
  });
};

module.exports = {
  getRoutes,
};