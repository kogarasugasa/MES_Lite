import { Router } from "express";
import {
    getProgress,
    getProgressByLine,
    getProgressAll,
    postProgress,
    getVersion,
} from "../controllers/progressController.js";

const router = Router();

// 進捗全件
router.get("", getProgressAll);

// 進捗追加
router.post("", postProgress);

// バージョン取得
router.get("/version", getVersion);

// 進捗取得複数
router.get("/line/:line", getProgressByLine);

// 進捗取得1件
router.get("/:schno", getProgress);

export default router;
