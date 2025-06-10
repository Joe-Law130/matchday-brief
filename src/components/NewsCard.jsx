import React from 'react';

function NewsCard({ title, source, published }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">{new Date(published).toLocaleString()}</p>
      <a href={source} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-300 mt-2 inline-block">Read more</a>
    </div>
  );
}

export default NewsCard;