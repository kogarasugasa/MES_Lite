import { Router } from "express";
import { getFavicon } from "../controllers/faviconController.js";

const router = Router();

// スケジュール取得
router.get("", getFavicon);

export default router;