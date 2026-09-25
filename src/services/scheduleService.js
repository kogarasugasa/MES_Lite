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
    const path = getPath();
    if (!fs.existsSync(path)) {
        return { ok: false, message: "schedule file not exists" };
    }
    const stats = fs.statSync(path);
    const version = stats.mtime.toLocaleString();
    return { ok: true, value: { Version: version } };
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
function getPath() {
    const dir = "./data";
    const fileName = "/Schedule.json"
    return dir + fileName;
}