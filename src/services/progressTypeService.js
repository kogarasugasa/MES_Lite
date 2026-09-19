import fs from "fs"

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
    const dir = "./data/Master";
    const fileName = "/progressType.json"
    let path = dir + fileName;
    if (fs.existsSync(path)) {
        let str = fs.readFileSync(path, "utf8");
        return JSON.parse(str);
    }
    else {
        return null;
    }
}