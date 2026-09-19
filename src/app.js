import express from "express";
import cors from "cors";

import favicon from "./routes/faviconRoute.js"
import indexRoute from "./routes/indexRoute.js"
import detailRoute from "./routes/detailRoute.js"
import scheduleRoute from "./routes/scheduleRoute.js"
import progressRoute from "./routes/progressRoute.js"
import progressTypeRoute from "./routes/progressTypeRoute.js"
import delayRule from "./routes/delayRuleRoute.js"
import usersRoute from "./routes/usersRoute.js"
import deviceRoute from "./routes/deviceRoute.js"

const app = express();

// ミドルウェア
app.use(express.json());
app.use(cors()); // ブラウザのCORS制限回避

// メイン画面
app.use("/schedule_list.html", indexRoute);

// 詳細画面
app.use("/detail.html", detailRoute);

// スケジュール取得
app.use("/api/schedules", scheduleRoute);

// 進捗
app.use("/api/progress", progressRoute);

// 進捗ステータス（マスタ）
app.use("/api/progressType", progressTypeRoute);

// 遅延ルール取得（マスタ）
app.use("/api/delayrule", delayRule);

// ユーザー（マスタ）
app.use("/api/users", usersRoute);

// デバイス追加
app.use("/api/device", deviceRoute);

// ヘルスチェック
app.get("/health", (req, res) => res.json({ status: "ok" }));

// favicon
app.use("/favicon.ico",favicon);

export default app;