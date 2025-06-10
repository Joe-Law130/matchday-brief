import React from 'react';

export default function NewsCard({ item }) {
  return (
    <a href={item.link} target="_blank" rel="noopener noreferrer" className="block bg-white rounded shadow hover:shadow-lg transition p-4">
      <h2 className="text-lg font-semibold">{item.title}</h2>
      <p className="text-sm text-gray-600 mt-2">{item.contentSnippet?.slice(0, 120)}...</p>
      <p className="text-xs text-gray-400 mt-2">{new Date(item.pubDate).toLocaleString()}</p>
    </a>
  );
}