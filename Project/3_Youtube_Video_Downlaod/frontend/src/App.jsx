import React from 'react';
import PlaylistDownloader from './Components/PlaylistDownloader';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <main className="w-full">
        <PlaylistDownloader />
      </main>
    </div>
  );
};

export default App;
