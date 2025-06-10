const Parser = require('rss-parser');
const parser = new Parser();

exports.handler = async function (event, context) {
  try {
    const feed = await parser.parseURL('https://feeds.bbci.co.uk/sport/football/rss.xml');
    const items = feed.items.map(item => ({
      title: item.title,
      published: item.pubDate,
      source: item.link
    }));
    return {
      statusCode: 200,
      body: JSON.stringify(items)
    };
  } catch (error) {
    console.error("RSS fetch error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch RSS feed' })
    };
  }
};