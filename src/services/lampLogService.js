import fs from "fs"

import { logError } from "../helpers/logHelper.js";
import { parseDateTime } from "../helpers/dateParseHelper.js";

/** ログの取得（日付指定）
 * @param {string} reqStart
 * @param {string} reqEnd
 * @returns {{ ok: boolean, value: [], message: string }}
 */
export const findLampLogByDate = (reqStart, reqEnd) => {
    const checkStart = parseDateTime(reqStart);
    if (!checkStart.ok) {
        return checkStart;
    }
    const checkEnd = parseDateTime(reqEnd);
    if (!checkEnd.ok) {
        return checkEnd;
    }
    try {
        const data = loadJson();
        const range = data.filter(val => {
            return val.ClientDateTime >= reqStart &&
                val.ClientDateTime <= reqEnd
        });
        return { ok: true, value: range };
    }
    catch (error) {
        return { ok: false, message: error.message };
    }
}
/** ログ追加
 * @param {any} reqLampLog
 * @returns {{ok: boolean, message: string}}
 */
export const insertLampLog = (reqLampLog) => {
    let entryData = reqLampLog;
    entryData.ServerDateTime = (new Date).toLocaleString();
    
    const cur = getPath();
    const bak = getBackPath();
    try {
        lotation(cur, bak);
        let data = loadJson();
        data.push(entryData);
        const str = JSON.stringify(data, null, 2);
        fs.writeFileSync(cur, str, "utf8",);
    }
    catch (error) {
        return { ok: false, message: error.message };
    }
    return { ok: true };
}
function loadJson() {
    const paths = [ getPath(), getBackPath() ];
    let union = [];
    for (let path of paths) {
        try {
            if (!fs.existsSync(path)) {
                continue;
            }
            const str = fs.readFileSync(path, "utf8");
            const parsed = JSON.parse(str);
            union = union.concat(parsed);
        }
        catch (error) {
            logError("lampLogService.js loadJson() " + error.message);
            throw error;
        }
    }
    return union;
}
function lotation(curPath, replacePath) {
    if (!fs.existsSync(curPath)) {
        return;
    }
    try {
        if (fs.statSync(curPath).size < 1024 * 1024) {
            return;
        }
        fs.renameSync(curPath, replacePath);
    }
    catch (error) {
        logError("lampLogService.js lotation() " + error.message);
        throw error;
    }
}
function getPath() {
    const dir = "./data/Log";
    const fileName = "/lampLog.json"
    return dir + fileName;
}
function getBackPath() {
    return getPath() + ".bak";
}