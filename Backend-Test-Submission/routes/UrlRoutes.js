import express from "express";
import { createShortUrl, redirectUrl } from "../Controller/urlController.js";

const router = express.Router();

router.post("/shortUrls", createShortUrl);
router.get("/:code", redirectUrl);

export default router;
