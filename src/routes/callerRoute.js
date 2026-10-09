import { Router } from "express";
import {
    getPendingCaller,
    postCaller,
    postResolveCaller,
} from "../controllers/callerController.js"

const router = Router();

// 呼び出し情報登録
router.post("", postCaller);

// 未対応呼び出し取得
router.get("/pending", getPendingCaller);

// 呼び出し解決
router.get("/resolve/:callid", postResolveCaller)

export default router;
