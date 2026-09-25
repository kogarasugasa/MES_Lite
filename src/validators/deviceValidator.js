import { Device } from "../models/deviceModel.js";

/**
 * 
 * @param {Device} device 
 * @returns {ok: boolean, message: String}
 */
export const validateDevice = (device) => {
    try {

        if (device.DeviceId == null || device.DeviceId.trim() === "") {
            return createErrResult("端末IDが入力されていません");
        }
        if (device.DeviceAddress == null || device.DeviceAddress.trim() === "") {
            return createErrResult("端末アドレスが入力されていません");
        }
        else {
            const checkResult = checkIp(device.DeviceAddress);
            if (!checkResult) {
                return checkResult;
            }
        }
        if (device.LampAddress != null && device.LampAddress.trim() !== "") {
            const checkResult = checkIp(device.LampAddress);
            if (!checkResult) {
                return checkResult;
            }
        }
        if (device.EntryServerDate == null || device.EntryServerDate.trim() === "") {
            return createErrResult("EntryServerDate が入力されていません");
        }
        if (device.EntryDeviceId == null || device.EntryDeviceId.trim() === "") {
            return createErrResult("EntryDeviceId が入力されていません")
        }
        return { ok: true, msg: "validateDevice ok"}
    }
    catch (error) {
        return createErrResult(error.stack);
    }
}
function createErrResult(msg) {
    return { ok: false, message: msg };
}
/**
 * 
 * @param {{ok: boolean, message: String}} ipString
 */
function checkIp(ipString) {
    const inputTokens = ipString.split(".");
    if (inputTokens[0].length > 3) {
        // IPv6
        if (!inputTokens[0].match(/^[0-9a-fA-F:]+$/)) {
            return createErrResult("IPv6で使用されない文字があります");
        }
        const v6Tokens = inputTokens[0].split(":");
        if (v6Tokens.length > 8) {
            return createErrResult("':' で分割するとその数が8を超えています");
        }
    }
    else {
        // IPv4
        if (inputTokens.length !== 4) {
            return createErrResult("'.' で分割するとその数が4を超えています");
        }
        if (!inputTokens.every(val => val.match(/[0-9]+/))) {
            return createErrResult("'0123456789.' 以外の文字が使われています");
        }
    }
    return { ok: true };
}