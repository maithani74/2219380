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
    const shortCode = req.params.code;
    const urlEntry = await Url.findOne({ shortCode });

    if (!urlEntry || urlEntry.expiry < new Date()) {
      return res.status(404).json({ error: "Not found or expired" });
    }

    urlEntry.clickCount += 1;
    urlEntry.clickHistory.push({
      timestamp: new Date(),
      referrer: req.get("Referrer") || "Direct",
    });

    await urlEntry.save(); 

    res.redirect(urlEntry.originalUrl);

  } catch (error) {
    console.error("Error during redirect:", error);
    res.status(500).json({ error: "Error redirecting to original URL" });
  }
};


const getStatistics = async(req,res)=>{
  try {
    const urlEntry = await Url.findOne({ shortCode: req.params.code });

    if (urlEntry) {
      res.json({
        originalUrl: urlEntry.originalUrl,
        clickCount: urlEntry.clickCount,
        clickHistory: urlEntry.clickHistory,
      });
    } else {
      res.status(404).json({ error: 'URL not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving statistics' });
  }
}

export { createShortUrl, redirectUrl,getStatistics };

