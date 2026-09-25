import fs from "fs"

import { Device } from "../models/deviceModel.js"
import { logError } from "../helpers/logHelper.js"
import { HttpStatus } from "../helpers/httpStatusHelper.js"

export const findAllDevice = () => {
    const data = loadJson();
    return { ok: true, value: data };
}
export const findDeviceById = (deviceId) => {
    const devices = loadJson();
    const device = devices.filter(val => val.DeviceId === deviceId).pop();
    if (device == null) {
        const error = HttpStatus.notFound;
        return {
            ok: false,
            value: error.number,
            message: "devices not found"
        };
    }
    return { ok: true, value: device };
}
export const insertDevice = (deviceId, name, deviceIp, lampIp) => {
    let devices = loadJson();
    // 端末ID,端末IP,ランプIPがそれぞれ一意であること！
    const isNotUnique = devices.some(val => {
        return val.DeviceId === deviceId ||
            val.DeviceAddress === deviceIp ||
            val.LampAddress === lampIp
    });
    if (isNotUnique) {
        const error = HttpStatus.conflict;
        return { ok: false, value: error.number, message: error.desc };
    }

    const device = new Device;
    device.DeviceId = deviceId;
    device.Name = name;
    device.DeviceAddress = deviceIp;
    device.LampAddress = lampIp;
    devices.push(device);

    const path = getPath();
    try {
        fs.writeFileSync(path, JSON.stringify(devices));
    }
    catch (error) {
        return {
            ok: false,
            value: HttpStatus.internalServerError.number,
            message: error.message
        };
    }
    return { ok: true, value: device };
}
export const findDeviceVersion = () => {
    const path = getPath();
    try {
        if (!fs.existsSync(path)) {
            return { ok: true, value: { Version: "" } };
        }
        const stat = fs.statSync(path);
        const version = stat.mtime.toLocaleString();
        return { ok: true, value: { Version: version } };
    }
    catch (error) {
        error.number = HttpStatus.internalServerError.number;
        return { ok: false, value: error.number, message: error.message };
    }
}
function loadJson() {
    const path = getPath();
    if (!fs.existsSync(path)) {
        return [];
    }
    const str = fs.readFileSync(path, "utf8");
    let data;
    try {
        data = JSON.parse(str);
    }
    catch (error) {
        logError(error);
        throw error;
    }
    return data;
}
function getPath() {
    const dir = "./data/Master";
    const fileName = "/Device.json"
    return dir + fileName;
}
