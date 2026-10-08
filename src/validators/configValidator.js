import { Config } from "../models/configModel.js"

/**
 * 
 * @param {Config} conf 
 * @returns {ok: boolean, message: String}
 */
export const validateConfig = (conf) => {
    const num = conf.ServerPort;
    switch (true) {
        case num < 1024:
            return { ok: false, message: `予約済み port number ${num}`};
        case num == 3389: // RDP
            return { ok: false, message: `リモートデスクトップ port number ${num}`};
        case num >= 65535:
            return { ok: false, message: `Unavailable port number ${num}`};
    }
    return { ok: true };
}