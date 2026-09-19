import { Router } from "express";
import { postDevice } from "../controllers/deviceController.js";

const router = Router();

// スケジュール取得
router.post("", postDevice);

export default router;