import React, { useState, useEffect } from 'react';
import Parser from 'rss-parser';
import NewsCard from './components/NewsCard';
import './index.css';

const parser = new Parser();

export default function App() {
  const [articles, setArticles] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const CORS_PROXY = 'https://api.allorigins.win/get?url=';
        const feedUrl = 'https://feeds.bbci.co.uk/sport/football/rss.xml';
        const response = await fetch(`${CORS_PROXY}${encodeURIComponent(feedUrl)}`);
        const data = await response.json();
        const parsed = await parser.parseString(data.contents);
        setArticles(parsed.items.slice(0, 10));
      } catch (error) {
        console.error('Failed to fetch feed:', error);
      }
    };

    fetchFeed();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 z-30 h-full w-64 bg-white shadow transform transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}>
        <div className="flex items-center justify-between p-4 border-b font-bold text-lg">
          Matchday Brief
          <button className="lg:hidden text-xl" onClick={() => setMenuOpen(false)}>✕</button>
        </div>
        <nav className="p-4 flex flex-col gap-4">
          <a href="#" className="hover:text-blue-500">Home</a>
          <a href="#" className="hover:text-blue-500">My News</a>
          <a href="#" className="hover:text-blue-500">Explore</a>
          <a href="#" className="hover:text-blue-500">Transfer</a>
        </nav>
        <div className="absolute bottom-4 w-full px-4 text-sm text-gray-400">© 2025 Matchday Brief</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-white p-4 shadow sticky top-0 z-10">
          <button onClick={() => setMenuOpen(true)} className="lg:hidden text-2xl">☰</button>
          <div className="text-xl font-bold mx-auto">Matchday Brief</div>
          <div className="w-8" /> {/* Spacer for alignment */}
        </header>

        {/* Breaking News Bar */}
        <div className="bg-yellow-100 text-yellow-900 px-4 py-2 overflow-hidden whitespace-nowrap">
          <marquee behavior="scroll" direction="left" scrollamount="5">
            {articles.length > 0 ? articles.map((item, idx) => `${item.title}   |   `) : 'Loading breaking news...'}
          </marquee>
        </div>

        {/* Article Grid */}
        <main className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {articles.map((item, idx) => (
            <NewsCard key={idx} item={item} />
          ))}
        </main>
      </div>
    </div>
  );
}