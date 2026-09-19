import { Router } from "express";
import {
    getProgress,
    postProgress
} from "../controllers/progressController.js";

const router = Router();

// 進捗取得
router.get("/:schno", getProgress);

// 進捗追加
router.post("", postProgress);

export default router;
