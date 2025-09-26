Awesome! Let’s now set up the **Node + Express backend** step by step for your **YouTube Playlist Downloader** (MP4/MP3).

We’ll also integrate `yt-dlp` to actually download the playlists.

---

## ✅ STEP 1: Create Backend Folder

From the root project folder:

```bash
mkdir server
cd server
npm init -y
```

---

## ✅ STEP 2: Install Dependencies

```bash
npm install express cors dotenv
npm install youtube-dl-exec
```

> `youtube-dl-exec` is a Node wrapper for `yt-dlp` (you must install `yt-dlp` on your system).

---

## ✅ STEP 3: Install `yt-dlp` (System-Level Tool)

Install globally (required):

```bash
pip install -U yt-dlp
```

Check if it works:

```bash
yt-dlp --version
```

---

## ✅ STEP 4: Create Folder Structure

```bash
mkdir controllers routes downloads
touch server.js .env
touch controllers/downloadController.js
touch routes/downloadRoutes.js
```

---

## ✅ STEP 5: Configure Express App (`server.js`)

```js
// server/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import downloadRoutes from './routes/downloadRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/download", downloadRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

---

## ✅ STEP 6: Create Controller to Handle Playlist Download

```js
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
```

---

## ✅ STEP 7: Setup Routes

```js
// server/routes/downloadRoutes.js
import express from 'express';
import { downloadPlaylist } from '../controllers/downloadController.js';

const router = express.Router();

router.post('/playlist', downloadPlaylist);

export default router;
```

---

## ✅ STEP 8: Update `package.json` for ES Modules

In `server/package.json`, add:

```json
"type": "module"
```

---

## ✅ STEP 9: Start Your Backend

```bash
node server.js
```

Your backend will run on: [http://localhost:5000](http://localhost:5000)

---

## ✅ STEP 10: Connect Frontend + Backend

Make sure your frontend is sending requests to:

```js
await axios.post("http://localhost:5000/api/download/playlist", {
  playlistUrl: url,
  format,
});
```

---

## ✅ Done!

Now your full MERN stack YouTube playlist downloader is working:

* ✅ Enter playlist URL
* ✅ Select format (MP4/MP3)
* ✅ Backend downloads each video
* ✅ Files saved in `server/downloads/` folder

---

Would you like me to help you add:

1. 🧾 Show download logs in frontend?
2. 🔒 Add input validation or error handling?
3. ☁️ Save files with unique names or zip them?

Let me know your next goal — I’ll guide you!
