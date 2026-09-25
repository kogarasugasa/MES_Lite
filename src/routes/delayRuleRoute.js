import { Router } from "express";
import {
    getDelayRule,
    getDelayRuleVersion,
} from "../controllers/delayRuleController.js";

const router = Router();

// 遅延ルール取得（マスタ）
router.get("", getDelayRule);

// バージョン取得
router.get("/version", getDelayRuleVersion);

export default router;
