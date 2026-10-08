import fs from "fs"

import { logError } from "./logHelper.js";
import { Config } from "../models/configModel.js";
import { validateConfig } from "../validators/configValidator.js";

/**
 * @returns { { ok: boolean, value: Config, message: string } }
 */
export const getConfig = () => {
    let config;
    try {
        config = loadJson();
    }
    catch (error) {
        return { ok: false, message: error.message };
    }
    let validated = validateConfig(config);
    if (!validated.ok) {
        return validated;
    }
    return { ok: true, value: config };
}
function loadJson() {
    const path = getPath();
    try {
        if (!fs.existsSync(path)) {
            throw Error("serverConfigHelper.js loadJson() file not found");        }
        const str = fs.readFileSync(path, "utf8");
        const parsed = JSON.parse(str);
        return parsed;
    }
    catch (error) {
        logError("serverConfigHelper.js loadJson() " + error.message);
        throw error;
    }
}
function getPath() {
    const dir = ".//config";
    const fileName = "/port.ini"
    return dir + fileName;
}