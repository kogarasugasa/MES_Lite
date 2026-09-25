import { Router } from "express";
import { postLampLog } from "../controllers/lampLogController.js";

const router = Router();

// スケジュール取得
router.post("", postLampLog);

export default router;