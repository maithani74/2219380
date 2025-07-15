import express from "express";
import { createShortUrl, redirectUrl,getStatistics } from "../Controller/urlController.js";

const router = express.Router();

router.post("/shortUrls", createShortUrl);
router.get("/shortUrls/:code/stats", getStatistics);
router.get("/:code", redirectUrl);

export default router;
