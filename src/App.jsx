import React, { useState } from 'react';
import { FaBars, FaSun, FaMoon, FaUser, FaTimes } from 'react-icons/fa';
import NewsCard from './components/NewsCard';

const dummyArticles = [
  { title: "Liverpool Triumph at Anfield", source: "BBC Sport", published: "9 June 2025" },
  { title: "City Edge Closer to Title", source: "Sky Sports", published: "8 June 2025" },
  { title: "Spurs Secure European Spot", source: "The Guardian", published: "7 June 2025" },
  { title: "Chelsea Sign Rising Star", source: "The Athletic", published: "6 June 2025" }
];

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('theme');
    return stored ? stored === 'dark' : false;
  });

  const toggleDarkMode = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen bg-white dark:bg-black text-gray-800 dark:text-white transition-all duration-300 ${sidebarOpen ? 'ml-64' : ''}`}>
      {/* Sidebar (relative, part of layout) */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-gray-100 dark:bg-gray-900 shadow z-50 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}>
        <div className="pt-16 px-4 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold">Menu</span>
            <button onClick={() => setSidebarOpen(false)} className="text-xl">
              <FaTimes />
            </button>
          </div>
          <a href="#" className="block hover:underline">Home</a>
          <a href="#" className="block hover:underline">My News</a>
          <a href="#" className="block hover:underline">Explore</a>
          <a href="#" className="block hover:underline">Transfer</a>
        </div>
        <div className="absolute bottom-4 left-4">
          <button onClick={toggleDarkMode} className="text-xl">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>

      {/* Header */}
      <header className="relative flex items-center justify-center p-4 bg-gray-200 dark:bg-gray-900 shadow-md">
        <button onClick={() => setSidebarOpen(true)} className="absolute left-4 text-xl text-gray-800 dark:text-white">
          <FaBars />
        </button>
        <div className="flex flex-col sm:flex-row sm:items-center justify-center text-center gap-2">
  <h1 className="text-2xl sm:text-3xl font-bold">Matchday Brief</h1>
  <img
    src="/logo.png"
    alt="Matchday Brief Logo"
    className="h-10 sm:h-12 w-auto mx-auto sm:ml-3"
    style={{ maxWidth: '100px', objectFit: 'contain' }}
  />
</div>
        <button className="absolute right-4 text-xl text-gray-800 dark:text-white">
          <FaUser />
        </button>
      </header>

      {/* Breaking News Bar */}
     <div className="overflow-hidden whitespace-nowrap bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white py-2 px-4 text-sm font-semibold">
        <div className="animate-marquee">
          Breaking: Liverpool sign star forward • City prepare title parade • Spurs confirm Europa qualification • Chelsea unveil new manager
        </div>
      </div>

      {/* Main */}
      <main className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {dummyArticles.map((article, i) => (
          <NewsCard
            key={i}
            title={article.title}
            source={article.source}
            published={article.published}
          />
        ))}
      </main>

      {/* Footer */}
      <footer className="text-center text-sm p-4 border-t dark:border-gray-700 border-gray-200">
        © 2025 Matchday Brief. All rights reserved.
      </footer>
    </div>
  );
}

export default App;