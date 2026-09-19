import { Router } from "express";
import {
    getSchedules,
    getScheduleByLine,
    getScheduleVersion
} from "../controllers/scheduleController.js";

const router = Router();

// スケジュール取得
router.get("", getSchedules);

// バージョン取得
router.get("/version", getScheduleVersion);

// スケジュール取得（工程）
router.get("/:line", getScheduleByLine);

export default router;