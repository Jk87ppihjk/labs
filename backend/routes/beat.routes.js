const express = require('express');
const router = express.Router();
const controller = require("../controllers/beat.controller");
const { verifyToken } = require("../middleware/authJwt");

// Public routes
router.get("/explore", controller.getExploreBeats);
router.get("/:id", controller.getBeatById);

// Protected beatmaker routes
router.get("/beatmaker/my-beats", [verifyToken], controller.getMyBeats);
router.post("/beatmaker/upload", [verifyToken], controller.uploadBeat);
router.put("/beatmaker/:id", [verifyToken], controller.updateBeat);
router.delete("/beatmaker/:id", [verifyToken], controller.deleteBeat);


module.exports = router;
