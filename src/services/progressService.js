import fs from "fs"
import { validateProgress } from "../validators/progressValidator.js";
import { Progress } from "../models/progressModel.js";
import { result } from "../helpers/resultHelper.js";
import { HttpStatus } from "../helpers/httpStatusHelper.js";

let _locked = false;
/** バージョンの取得
 * @return {{ ok: boolean, value: string}}
 */
export const findProgressVersion = () => {
    let current = "0";
    let path = getPath();
    if (fs.existsSync(path)) {
        const inputVersion = fs.statSync(path).mtime.toLocaleString();
        current = current > inputVersion ? current : inputVersion;
    }
    path = getBackPath();
    if (fs.existsSync(path)) {
        const inputVersion = fs.statSync(path).mtime.toLocaleString();
        current = current > inputVersion ? current : inputVersion;
    }
    return { ok: true, value: current };
}
/**
 * 最新1行検索(予定番号)
 * @param {String} schNo 
 * @returns {Progress}
 */
export const findProgressBySchNo = (schNo) => {
    let progress = loadJson() || [ Progress.createNoneProgress(schNo) ];
    progress = progress.filter(val => val.SchNo === schNo);
    return progress.pop() || Progress.createNoneProgress(schNo);
}
/**
 * 最新複数行(工程)
 * @param {String} line 
 * @returns {[Progress]}
 */
export const findProgressByLine = (line) => {
    let progress = loadJson();
    progress = progress.filter(val => val.Line === line);
    progress.reverse();
    let lastProgress = [];
    for (let p of progress) {
        if (!lastProgress.some(val => val.SchNo === p.SchNo)) {
            lastProgress.push(p);
        }
    }
    return lastProgress;
}
/**
 * 最新すべて
 * @param {String} line 
 * @returns {[Progress]}
 */
export const findAllProgress = () => {
    let progress = loadJson();
    progress.reverse();
    let lastProgress = [];
    for (let p of progress) {
        if (!lastProgress.some(val => val.SchNo === p.SchNo)) {
            lastProgress.push(p);
        }
    }
    return lastProgress;
}
/**
 * 1行追加
 * @param {Progress} reqProgress 
 * @returns {{ok: boolean, value: any, message: string}}
 */
export const insertProgress = (reqProgress) => {
    let allProgress = loadJson() || [ Progress.createNoneProgress(reqProgress.SchNo) ];

    // 重複の確認
    let stored = allProgress
        .some(v => v.DeviceId === reqProgress.DeviceId
            && v.UUID === reqProgress.UUID
        )
    ;
    if (stored) {
        return {
            ok: false,
            value: HttpStatus.conflict.number,
            message: HttpStatus.conflict.desc
        };
    }

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
        return {
            ok: false,
            value: HttpStatus.badRequest.number,
            message: HttpStatus.badRequest.desc + " " + validated.message
        };
    }
    
    // 書き込み
    allProgress.push(storeProgress);
    
    return result(
        saveJson(allProgress),
        (ok) => { return { ok: true, value: HttpStatus.created.number } },
        (err) => {
            return {
                ok: false,
                value: HttpStatus.internalServerError.number,
                message: HttpStatus.internalServerError.desc + " " + error.message
            }
        }
    );
}

// ヘルパー
/**
 * 
 * @returns {[Progress]}
 */
function loadJson() {
    const path = getPath();
    let parent = [];
    if (fs.existsSync(path)) {
        let str = fs.readFileSync(path, "utf8");
        parent.push(JSON.parse(str));
    }
    const backPath = getBackPath();
    if (fs.existsSync(backPath)) {
        let str = fs.readFileSync(backPath, "utf8");
        parent.push(JSON.parse(str));
    }
    return [].concat(...parent);
}
/**
 * @param {[Progress]} progressArray
  */
function saveJson(progressArray) {
    // 書き込み
    const json = JSON.stringify(progressArray);
    const path = getPath();
    const backPath = getBackPath();
    try {
        if (fs.existsSync(path) && fs.statSync(path).size > 1024 * 1024) {
            if (fs.existsSync(backPath)) {
                fs.rm(backPath);
            }
            fs.rename(path, backPath);
        }
        fs.writeFileSync(getPath(), json, "utf8",)
    }
    catch (error) {
        return { ok: false, message: error.message };
    }
    return { ok: true, message: "" };
}
/**
 * 
 * @returns {String}
 */
function getPath() {
    const dir = "./data/Transaction";
    const fileName = "/progress.json"
    return dir + fileName;
}
function getBackPath() {
    return getPath() + ".bak";
}
/**
 * 
 * @param {Function} f 
 * @returns {{ok: boolean, value: any, message: String}}
 */
function lock(f) {
    if (_locked) {
        return { ok: false, message: "progressServece is locked" };
    }
    else {
        _locked = true;
    }
    const value = f();
    _locked = false;
    return value;
}
