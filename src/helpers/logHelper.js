import fs from 'fs'

export const logInfo = (msg) => {
    const time = (new Date).toLocaleString();
    const logStr = `[${time} (INFO)] ${msg}`
    log(logStr);
}
export const logWarn = (msg) => {
    const time = (new Date).toLocaleString();
    const logStr = `[${time} (WARN)] ${msg}`
    log(logStr);
}
export const logError = (msg) => {
    const time = (new Date).toLocaleString();
    const logStr = `[${time} (EROR)] ${msg}`
    log(logStr);
}
function log(msg) {
    const path = "./data/log/server.log";
    const pathBak = "./data/log/server.log.bak";
    if (fs.existsSync(path)) {
        const size = fs.statSync(path).size;
        if (size > 1024 * 1024) {
            if (fs.existsSync(pathBak)) {
                fs.rmSync(pathBak);
            }
            fs.rename(path, pathBak);
        }
    }
    fs.appendFileSync(path, msg, "utf8");
}