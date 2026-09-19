import fs from 'fs'
export const getDelayRule = async (req, res) => {
    const json = loadJson();
    if (json) {
        res.json(json);
    }
    else {
        res.status(404).json({ message: "delayRule json not found" });
    }
}
function loadJson() {
    const dir = "./data/Master";
    const fileName = "/DelayRule.json"
    let path = dir + fileName;
    if (fs.existsSync(path)) {
        let str = fs.readFileSync(path, "utf8");
        return JSON.parse(str);
    }
    else {
        return null;
    }
}