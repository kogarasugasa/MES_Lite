import { Router } from "express";
import { getDelayRule } from "../controllers/delayRuleController.js";

const router = Router();

// 遅延ルール取得（マスタ）
router.get("", getDelayRule);

export default router;
