import fs from 'fs'
import { logInfo, logWarn, logError } from "../helpers/logHelper.js";

export const findDelayRuleVersion = () => {
    const path = getPath();
    if (!fs.existsSync(path)) {
        return { ok: false, message: "delay rule file not found" };
    }
    const version = fs.statSync(path).mtime.toLocaleString();
    return { ok: true, value: version };
}
export const findDelayRule = () => {
    const rule = loadJson();
    return { ok: true, value: rule };
}
function loadJson() {
    const path = getPath();
    if (!fs.existsSync(path)) {
        return [];
    }
    let str;
    try {
        str = fs.readFileSync(path, "utf8");
    }
    catch (error) {
        logInfo(error.message);
        return [];
    }
    let rule;
    try {
        rule = JSON.parse(str);
    }
    catch (error) {
        logError(error.message);
        return [];
    }
    return rule;
}
function getPath() {
    const dir = "./data/Master";
    const fileName = "/DelayRule.json"
    return dir + fileName;
}