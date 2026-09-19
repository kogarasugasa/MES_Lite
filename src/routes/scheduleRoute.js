import { Router } from "express";
import {
    getSchedules,
    getScheduleByLine,
    getScheduleVersion
} from "../controllers/scheduleController.js";

const router = Router();

// スケジュール取得
router.get("", getSchedules);

router.get("/:line", getScheduleByLine);

router.get("/version", getScheduleVersion);

export default router;