import fs from "fs"

export const findProgressVersion = () => {
    const path = getPath();
    if (!fs.existsSync(path)) {
        return { ok: false, message: "file not exists" };
    }
    const stat = fs.statSync(path);
    const version = stat.mtime.toLocaleString();
    return { ok: true, value: { Version: version } };
}
export const findAllProgressTypes = () => {
    const types = loadJson();
    if (types) {
        return { ok: true, value: types };
    }
    else {
        return { ok: false, message: "progressType json not found" };
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
function getPath() {
    const dir = "./data/Master";
    const fileName = "/progressType.json"
    return dir + fileName;
}