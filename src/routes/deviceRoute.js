import { Router } from "express";
import {
    getDeviceById,
    postDevice,
    getDeviceVersion,
    getAllDevice,
} from "../controllers/deviceController.js";

const router = Router();

// 端末取得（全件）
router.get("", getAllDevice);

// バージョン取得
router.get("/version", getDeviceVersion);

// 端末登録
router.post("/:deviceid", postDevice);

// 端末取得（1件）
router.get("/:deviceid", getDeviceById);

export default router;