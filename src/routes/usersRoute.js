import { Router } from "express";
import {
    getUser,
    getUsers,
    getUserVersion
} from "../controllers/userController.js";

const router = Router();

// ユーザー情報取得(全件)
router.get("", getUsers)

// バージョン取得
router.get("/version", getUserVersion);

// ユーザー情報取得
router.get("/:userid", getUser);

export default router;