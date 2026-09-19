import { Router } from "express";
import { getUser, getUsers } from "../controllers/userController.js";

const router = Router();

// ユーザー情報取得
router.get("/:userid", getUser);

// ユーザー情報取得(全件)
router.get("", getUsers)

export default router;