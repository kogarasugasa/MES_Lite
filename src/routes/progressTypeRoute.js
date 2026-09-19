import { Router } from "express";
import { getProgressType } from "../controllers/progressTypeController.js";

const router = Router();

// 進捗ステータス取得(全件)
router.get("", getProgressType);

export default router;
