// server/controllers/downloadController.js
import { exec } from 'child_process';

export const downloadPlaylist = async (req, res) => {
  const { playlistUrl, format } = req.body;

  if (!playlistUrl) {
    return res.status(400).json({ message: "Playlist URL is required" });
  }

  let command = "";

  if (format === "mp3") {
    command = `yt-dlp -x --audio-format mp3 -o "downloads/%(playlist)s/%(playlist_index)s - %(title)s.%(ext)s" "${playlistUrl}"`;
  } else {
    command = `yt-dlp -f mp4 -o "downloads/%(playlist)s/%(playlist_index)s - %(title)s.%(ext)s" "${playlistUrl}"`;
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("Download Error:", error);
      return res.status(500).json({ message: "Download failed", error: stderr });
    }
    return res.status(200).json({ message: "Download completed", log: stdout });
  });
};