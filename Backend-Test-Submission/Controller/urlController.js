import Url from "../Model/UrlModel.js";

function generateUniqueCode() {
  return Math.random().toString(36).substring(2, 8);
}

const createShortUrl = async (req, res) => {
  let { url, validity = 30, shortCode } = req.body;

  console.log("Raw URL from body:", url);
  console.log("Type of URL:", typeof url);

  if (typeof url === "object" && url !== null) {
    url = url.url || url.link || JSON.stringify(url); 
  }

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Invalid or missing URL" });
  }

  try {
    new URL(url);

    shortCode = shortCode || generateUniqueCode();
    const expiryDate = new Date(Date.now() + validity * 60 * 1000);

    const newUrl = new Url({
      originalUrl: url,
      shortCode,
      expiry: expiryDate,
    });

    await newUrl.save();

    res.status(201).json({
      shortLink: `http://localhost:8090/${shortCode}`,
      expiry: expiryDate.toISOString(),
    });
  } catch (error) {
    console.error("Raw req.body:", req.body);
    console.error("Error in createShortUrl:", error);
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
