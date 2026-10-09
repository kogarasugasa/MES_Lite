import { Router } from "express";
import { getSound } from "../controllers/soundController.js";

const router = Router();

// スケジュール取得
router.get("", getSound);

export default router;