import React from 'react';

function NewsCard({ title, source, published }) {
  return (
    <div className="flex flex-col justify-between h-60 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl shadow-md p-6 transition hover:shadow-lg">
      <div>
        <h2 className="text-2xl font-bold leading-snug mb-3">{title}</h2>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-auto">
        {source} — {published}
      </p>
    </div>
  );
}

export default NewsCard;