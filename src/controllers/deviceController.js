import { HttpStatus } from "../helpers/httpStatusHelper.js";
import {
    insertDevice,
    findDeviceById,
    findDeviceVersion,
    findAllDevice,
} from "../services/deviceService.js";

export const getAllDevice = async (req, res) => {
    const devices = findAllDevice();
    if (devices.value.length === 0) {
        const error = HttpStatus.notFound;
        res.status(error.number).json({ ok: false, message: error.desc });
        return;
    }
    res.json(devices);
}
export const getDeviceVersion = async (req, res) => {
    const version = findDeviceVersion();
    if (version.ok) {
        res.json(version);
    }
    else {
        res.status(version.value).json(version);
    }
}
export const getDeviceById = async (req, res) => {
    const id = req.params.deviceid;
    const device = findDeviceById(id);
    if (device.ok) {
        res.json(device);
    }
    else {
        res.status(device.value).json(device);
    }
}
export const postDevice = async (req, res) => {
    const rawIp = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress
    ;
    const sepPos = rawIp.indexOf(":");
    const ip = sepPos > 0 ?
        { type: "ipv4", address: rawIp.substring(rawIp.indexOf(":") + 1) }:
        { type: "ipv6", address: rawIp }
    ;
    if (ip.type === "ipv6") {
        const error = HttpStatus.unprocessableEntity;
        res.status(error.number)
            .json({ ok: false, message: "ipv6では登録できません"})
        ;
        return;
    }
    const deviceId = req.body.DeviceId;
    const lampAddress = req.body.LampAddress;
    const device = insertDevice(deviceId, ip.address, lampAddress);
    if (device.ok) {
        res.json({ ok: true });
    }
    else {
        res.status(device.value).json(device);
    }
}
