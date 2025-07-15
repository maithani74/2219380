import Url from "../Model/UrlModel.js";

function generateUniqueCode() {
  return Math.random().toString(36).substring(2, 8);
}

const createShortUrl = async (req, res) => {
  let { url, validiy = 30, shortCode } = req.body;

  shortCode = shortCode || generateUniqueCode();
  const expiryDate = new Date(Date.now() + validiy * 60 * 1000);

  try {
    const newUrl = new Url({
      originalUrl: url,
      shortCode,
      expiry: expiryDate,
    });

    await newUrl.save();

    res.status(201).json({
      shortLink: `http://localhost:5000/${shortCode}`, // customize this as needed
      expiry: expiryDate.toISOString(),
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating short URL" });
  }
};

const redirectUrl = async (req, res) => {
  try {
    const urlEntry = await Url.findOne({ shortCode: req.params.code });

    if (urlEntry && urlEntry.expiry > new Date()) {
      res.redirect(urlEntry.originalUrl);
    } else {
      res.status(404).json({ error: "Not found or expired" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error finding URL" });
  }
};

// ✅ Export named functions
export { createShortUrl, redirectUrl };
