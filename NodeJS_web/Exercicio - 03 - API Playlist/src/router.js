const express = require("express");
const playlistController = require("./controllers/playlistController");

const router = express.Router();

router.get("/", playlistController.getAllPlaylists);
router.get("/:id", playlistController.getPlayById);

router.post("/", playlistController.save);
router.put("/:id", playlistController.update);
router.delete("/:id", playlistController.delete);

router.get("/:id/songs", playlistController.getAllSongsByPlaylist);
router.post("/:id/songs", playlistController.addSong);
router.delete("/:id/songs/:songId", playlistController.removeSong);

module.exports = router;
