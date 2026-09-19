import fs from "fs"

export const findAllSchedules = () => {
    const schedules = loadJson();
    if (schedules) {
        return { ok: true, value: schedules };
    }
    else {
        return { ok: false, message: "json not found"}
    }
}
export const findSchedulesByLine = (line) => {
    let schedules = loadJson();
    if (schedules) {
        schedules = schedules.filter(val => val.Line === line);
        return { ok: true, value: schedules };
    }
    else {
        return { ok: false, message: "json not found" };
    }
}
export const findSchedulesVersion = () => {
    let version = loadUpdateDate();
    if (version) {
        return { ok: true, value: version };
    }
    else {
        return { ok: false, message: "loadUpdateDate() failed" };
    }
}
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
function loadUpdateDate() {
    const path = getPath();
    if (fs.existsSync(path)) {
        const stats = fs.statSync(path);
        return { Version: stats.mtime.toLocaleString() };
    }
    else {
        return null;
    }
}
function getPath() {
    const dir = "./data";
    const fileName = "/Schedule.json"
    return dir + fileName;
}