const { nanoid } = require('nanoid');
const Url = require('../models/urlModel');

const MAX_ATTEMPTS = 5;

const createShortUrl = async (originalUrl) => {
  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    try {
      return await Url.create({ originalUrl, code: nanoid(7) });
    } catch (err) {
      if (err.code !== 11000) throw err;
    }
  }
  throw new Error('Could not generate a unique code');
};

const getOriginalUrl = async (code) => {
  const doc = await Url.findOne({ code });
  return doc ? doc.originalUrl : null;
};

module.exports = { createShortUrl, getOriginalUrl };