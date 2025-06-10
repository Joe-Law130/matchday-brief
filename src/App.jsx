import React, { useEffect, useState } from 'react';
import { FaBars, FaSun, FaMoon, FaUser } from 'react-icons/fa';
import NewsCard from './components/NewsCard';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('theme');
    return stored ? stored === 'dark' : false;
  });
  const [articles, setArticles] = useState([]);

  const toggleDarkMode = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('/.netlify/functions/bbcFootball');
        const data = await res.json();
        setArticles(data);
      } catch (error) {
        console.error("RSS fetch failed", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-800 dark:text-white">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-gray-100 dark:bg-gray-900 shadow transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 z-50`}>
        <div className="p-6 space-y-6 pt-16">
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
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="absolute left-4 text-xl text-gray-800 dark:text-white">
          <FaBars />
        </button>
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">Matchday Brief</h1>
          <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
        </div>
        <button className="absolute right-4 text-xl text-gray-800 dark:text-white">
          <FaUser />
        </button>
      </header>

      {/* Breaking News Bar */}
      <div className="overflow-hidden whitespace-nowrap bg-gray-300 dark:bg-gray-800 text-black dark:text-white py-2 px-4 text-sm font-semibold">
        <div className="animate-marquee-slow">
          Breaking: Latest football updates from BBC Sport...
        </div>
      </div>

      {/* Articles */}
      <main className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        {articles.map((article, index) => (
          <NewsCard
            key={index}
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