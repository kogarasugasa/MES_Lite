import { Router } from "express";
import { getIndex } from "../controllers/indexController.js";

const router = Router();

// スケジュール取得
router.get("", getIndex);

export default router;