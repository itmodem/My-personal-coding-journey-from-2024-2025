Perfect! Let’s **set up the React frontend step by step** for your **YouTube Playlist Downloader** project.

We'll use **React + Vite + Tailwind CSS** for a fast, clean UI.

---

## ✅ STEP 1: Create React App Using Vite

```bash
npm create vite@latest client
```

* Choose: `React`
* Choose: `JavaScript`

Then move into your project:

```bash
cd client
```

---

## ✅ STEP 2: Install Dependencies

```bash
npm install
```

Install Axios for making HTTP requests:

```bash
npm install axios
```

---

## ✅ STEP 3: Setup Tailwind CSS (Optional but recommended)

Run this inside `client` folder:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Update your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Update `./src/index.css` (or create if not there):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

In `main.jsx`, import the CSS:

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

## ✅ STEP 4: Create Your Main Component

Create the following file:

```bash
mkdir -p src/components
touch src/components/PlaylistDownloader.jsx
```

Add this inside `PlaylistDownloader.jsx`:

```jsx
import { useState } from 'react';
import axios from 'axios';

const PlaylistDownloader = () => {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('mp4');

  const handleDownload = async () => {
    if (!url) {
      alert("Please enter a playlist URL");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/download/playlist", {
        playlistUrl: url,
        format,
      });
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Download failed.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-10 border shadow rounded-lg">
      <h1 className="text-xl font-bold mb-4 text-center">YouTube Playlist Downloader</h1>
      <input
        type="text"
        placeholder="Enter YouTube Playlist URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border w-full p-2 mb-4 rounded"
      />
      <select
        value={format}
        onChange={(e) => setFormat(e.target.value)}
        className="border w-full p-2 mb-4 rounded"
      >
        <option value="mp4">Video (MP4)</option>
        <option value="mp3">Audio (MP3)</option>
      </select>
      <button
        onClick={handleDownload}
        className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
      >
        Download Playlist
      </button>
    </div>
  );
};

export default PlaylistDownloader;
```

---

## ✅ STEP 5: Use This Component in `App.jsx`

Update `src/App.jsx`:

```jsx
import PlaylistDownloader from './components/PlaylistDownloader';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <PlaylistDownloader />
    </div>
  );
}

export default App;
```

---

## ✅ STEP 6: Run Your Frontend

Inside the `client` folder:

```bash
npm run dev
```

It will run at [http://localhost:5173](http://localhost:5173)

---

## ✅ What’s Next?

Now your **React UI is fully ready**.

You can move on to:

➡️ **Step-by-step backend setup (Node + Express)**
➡️ **Connecting to yt-dlp and starting downloads**

Would you like me to guide you through the backend now?
