import { useState } from 'react';
import axios from 'axios';

const PlaylistDownloader = () => {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('mp4');
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!url) {
      alert("Please enter a playlist URL");
      return;
    }

    console.log("Sending request with:", { playlistUrl: url, format });

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/download/playlist", {
        playlistUrl: url,
        format,
      });

      console.log("Response from backend:", res.data);
      alert(res.data.message || "Download started.");
    } catch (err) {
      console.error("Error downloading:", err);
      alert("Download failed. Please check backend server.");
    } finally {
      setLoading(false);
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
        disabled={loading}
        className={`w-full py-2 rounded text-white ${loading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {loading ? "Downloading..." : "Download Playlist"}
      </button>
    </div>
  );
};

export default PlaylistDownloader;
