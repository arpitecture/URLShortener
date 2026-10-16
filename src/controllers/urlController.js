const { createShortUrl, getOriginalUrl } = require('../services/urlService');

const isValidUrl = (value) => {
  try {
    const u = new URL(value);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
};

const shortenUrl = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url || !isValidUrl(url)) {
      return res.status(400).json({ error: 'Invalid URL' });
    }
    const doc = await createShortUrl(url);
    res.status(201).json({ shortUrl: `${process.env.BASE_URL}/${doc.code}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const redirectToOriginal = async (req, res) => {
  try {
    const originalUrl = await getOriginalUrl(req.params.code);
    if (!originalUrl) return res.status(404).json({ error: 'Not found' });
    res.redirect(302, originalUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = { shortenUrl, redirectToOriginal };