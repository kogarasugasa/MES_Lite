import fs from "fs"

import { logError } from "../helpers/logHelper.js";

export const findAllUsers = () => {
    return loadJson();
}
export const findUserByUserId = (userId) => {
    const users = loadJson();
    if (!users.ok) {
        return users;
    }
    const user = users.value.filter(val => val.UserId === userId).pop();
    if (user == null) {
        return { ok: false, message: "user not found" };
    }
    else {
        return { ok: true, value: user };
    }
}
export const findUserVersion = () => {
    const path = getPath();
    if (!fs.existsSync(path)) {
        logError(`${path} is not exists`);
        return { ok: false, message: "user file not found" };
    }
    try {
        const stat = fs.statSync(path);
        const version = stat.mtime.toLocaleString();
        return { ok: true, value: { Version: version } };
    }
    catch (error) {
        logError("userService.js findUserVersion() " + error.message);
    }
}
function loadJson() {
    const path = getPath();
    if (!fs.existsSync(path)) {
        const msg = `${path} is not exists`
        logError(msg);
        return { ok: false, message: msg };
    }
    try {
        const str = fs.readFileSync(path, "utf8");
        return { ok: true, value: JSON.parse(str) };
    }
    catch (error) {
        const msg = "userService.js loadJson() " + error.message;
        logError(msg);
        return { ok: false, message: msg };
    }
}
function getPath() {
    const dir = "./data/Master";
    const fileName = "/User.json"
    return dir + fileName;
}