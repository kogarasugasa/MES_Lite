import fs from "fs"
import { validateProgress } from "../validators/progressValidator.js";
import { Progress } from "../models/progressModel.js";

/**
 * 
 * @param {String} schNo 
 * @returns {Progress}
 */
export const findProgressBySchNo = (schNo) => {
    let progress = loadJson() || [ Progress.createNoneProgress(schNo) ];
    progress = progress.filter(val => val.SchNo === schNo);
    return progress.pop() || Progress.createNoneProgress(schNo);
}
/**
 * 
 * @param {Progress} reqProgress 
 * @returns 
 */
export const insertProgress = (reqProgress) => {
    let allProgress = loadJson() || [ Progress.createNoneProgress(reqProgress.SchNo) ];

    // 最後の進捗を取得
    const beforeProgress = allProgress
        .filter(val => val.SchNo === reqProgress.SchNo)
        .pop()
        || Progress.createNoneProgress(reqProgress.SchNo);
    ;

    // データ作成
    let storeProgress = reqProgress;
    storeProgress.BeforeStatus = beforeProgress.AfterStatus;
    storeProgress.ServerDateTime = new Date().toLocaleString();

    // データチェック
    const validated = validateProgress(storeProgress);
    if (!validated.ok) {
        return validated;
    }
    
    // 書き込み
    allProgress.push(storeProgress);
    const json = JSON.stringify(allProgress);
    const path = getPath();
    if (fs.existsSync(path) && fs.statSync(path).size > 1024 * 1024) {
        fs.rename(path, `${path}.bak`);
    }
    fs.writeFileSync(getPath(), json, "utf-8",)
    return { ok: true, value: storeProgress };
}

// ヘルパー
function loadJson() {
    const path = getPath();
    if (fs.existsSync(path)) {
        let str = fs.readFileSync(path, "utf8");
        return JSON.parse(str);
    }
    else {
        return null;
    }
}
function getPath() {
    const dir = "./data/Transaction";
    const fileName = "/progress.json"
    return dir + fileName;
}
