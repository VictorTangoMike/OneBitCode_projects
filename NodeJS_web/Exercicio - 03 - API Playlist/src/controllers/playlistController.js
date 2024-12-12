let playlists = [
  {
    id: "1",
    title: "Playlist 1",
    tags: ["rock", "alternative-rock"],
    songs: [
      {
        id: "1",
        title: "Song 1",
        duration: "3:45",
        artist: "Artist 1",
        album: "Album 1",
        year: 2024,
      },
      {
        id: "2",
        title: "Song 2",
        duration: "4:15",
        artist: "Artist 1",
        album: "Album 1",
        year: 2024,
      },
    ],
  },
  {
    id: "2",
    title: "Playlist 1",
    tags: ["rock", "alternative-rock"],
    songs: [
      {
        id: "5",
        title: "Song 1",
        duration: "3:45",
        artist: "Artist 1",
        album: "Album 1",
        year: 2024,
      },
      {
        id: "8",
        title: "Song 2",
        duration: "4:15",
        artist: "Artist 1",
        album: "Album 1",
        year: 2024,
      },
    ],
  },
];

function generateId() {
  return Date.now().toString(26) + Math.random().toString(26);
}

const controller = {
  //Playlist Controller

  getAllPlaylists: (req, res) => {
    res.json(playlists);
  },

  getPlayById: (req, res) => {
    const id = req.params.id;
    res.json(playlists.find((playlist) => playlist.id == id));
  },

  getPlaylistById: (id) => {
    return playlists.find((playlist) => playlist.id == id);
  },

  getPlaylistIndex: (id) => {
    return playlists.findIndex((playlist) => playlist.id == id);
  },

  save: (req, res) => {
    const { title, tags, songs } = req.body;

    if ((title.length = 0 || title.trim() == "")) {
      return res.status(400).json({ message: "title must be a string" });
    }

    if (tags && !Array.isArray(tags)) {
      return res.status(400).json({ message: "tags must be an array" });
    }

    if (songs && !Array.isArray(songs)) {
      return res.status(400).json({ message: "songs must be an array" });
    }

    const newPlaylist = {
      id: generateId(),
      title,
      tags: tags ?? [],
      songs: songs ?? [],
    };

    playlists.push(newPlaylist);

    res.status(201).json(newPlaylist);
  },

  update: (req, res) => {
    const { id } = req.params;
    const { title, tags } = req.body;

    const playlistIndex = controller.getPlaylistIndex(id);

    if (playlistIndex === -1) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    if (title && title.length > 0) {
      playlists[playlistIndex].title = title;
    }
    if (tags && Array.isArray(tags)) {
      playlists[playlistIndex].tags = tags;
    }

    res.status(204).json(playlists[playlistIndex]);
  },

  delete: (req, res) => {
    const { id } = req.params;

    const playlistIndex = controller.getPlaylistIndex(id);

    if (playlistIndex === -1) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    const newPlaylistList = playlists.splice(playlistIndex, 1);

    res.status(202).json(newPlaylistList);
  },

  // Song Controller
  getAllSongsByPlaylist: (req, res) => {
    const { id } = req.params;

    const playlistIndex = controller.getPlaylistIndex(id);

    if (playlistIndex === -1) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    res.json(playlists[playlistIndex].songs);
  },

  addSong: (req, res) => {
    const { id } = req.params;
    const { title, duration, artist, album, year } = req.body;

    const playlist = controller.getPlaylistById(id);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    if (!title || !duration || !artist || !album || !year) {
      return res
        .status(400)
        .json({
          message:
            "All fields are required: title, duration, artist, album and year",
        });
    }

    const newSong = {
      id: generateId(),
      title,
      duration,
      artist,
      album,
      year,
    };

    playlist.songs.push(newSong);

    res.status(201).json(playlist);
  },

  removeSong: (req, res) => {
    const { id, songId } = req.params;

    const playlist = controller.getPlaylistById(id);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    const songIndex = playlist.songs.findIndex((song) => song.id == +songId);

    console.log(songIndex, playlist.id, songId, playlist.songs);

    if (songIndex === -1) {
      return res.status(404).json({ message: "Song not found" });
    }

    playlist.songs.splice(songIndex, 1);

    res.status(204).end();
  },
};

module.exports = controller;
