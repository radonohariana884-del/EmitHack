const express = require("express");
const router = express.Router();

const {
    getSignalements,
    createSignalement
} = require("../controllers/signalementController");

router.get("/", getSignalements);

router.post("/", createSignalement);

module.exports = router;
