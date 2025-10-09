// controllers/proxyImage.js
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const handleProxyImage = async (req, res) => {
  try {
    const imageUrl = req.query.url;
    if (!imageUrl) return res.status(400).send('Missing image URL');

    const response = await fetch(imageUrl);
    if (!response.ok) return res.status(400).send('Failed to fetch image');

    const contentType = response.headers.get('content-type');
    res.set('Content-Type', contentType);

    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (err) {
    console.error('Proxy image error:', err);
    res.status(500).send('Proxy server error');
  }
};

module.exports = { handleProxyImage };
