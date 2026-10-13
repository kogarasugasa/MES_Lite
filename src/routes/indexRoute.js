import { Router } from "express";
import { getIndex, getCss, getScript } from "../controllers/indexController.js";

const router = Router();

// スケジュール取得
router.get("", getIndex);

// スタイルシート取得
router.get("/css", getCss);

// スクリプト取得
router.get("/js", getScript);

export default router;