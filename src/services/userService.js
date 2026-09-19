import fs from "fs"

export const findAllUsers = () => {
    const users = loadJson();
    if (users) {
        return { ok: true, value: users };
    }
    else {
        return { ok: false, message: "user json not found" };
    }
}
export const findUserByUserId = (id) => {
    const users = loadJson();
    if (users == null) {
        return { ok: false, message: "json not found" };
    }
    const user = users.filter(val => val.Id === id).pop();
    if (user == null) {
        return { ok: false, message: "user not found" };
    }
    else {
        return { ok: true, value: user };
    }
}
function loadJson() {
    const dir = "./data/Master";
    const fileName = "/User.json"
    let path = dir + fileName;
    if (fs.existsSync(path)) {
        let str = fs.readFileSync(path, "utf8");
        return JSON.parse(str);
    }
    else {
        return null;
    }
}