import { Router } from "express";
import {
    getProgressType,
    getProgressTypeVersion,
} from "../controllers/progressTypeController.js";

const router = Router();

// 進捗ステータス取得(全件)
router.get("", getProgressType);

// バージョン取得
router.get("/version", getProgressTypeVersion);

export default router;
