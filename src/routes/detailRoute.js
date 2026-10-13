import { Router } from "express";
import { getDetail, getDetailCss, getDetailScript } from "../controllers/detailController.js";

const router = Router();

// スケジュール取得
router.get("", getDetail);

// スタイルシート
router.get("/css", getDetailCss);

// スクリプト
router.get("/js", getDetailScript);

export default router;