import { Router } from "express";
import { getDetail } from "../controllers/detailController.js";

const router = Router();

// スケジュール取得
router.get("", getDetail);

export default router;