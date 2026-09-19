import { insertDevice } from "../services/deviceService.js";

export const postDevice = async (req, res) => {
    const rawIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const sepPos = rawIp.indexOf(":");
    const ip = sepPos > 0 ?
        { type: "ipv4", address: rawIp.substring(rawIp.indexOf(":") + 1) }:
        { type: "ipv6", address: rawIp }
    ;
    const device = insertDevice(req.body.DeviceId, ip.address, null);
    if (device.ok) {
        res.json(device.value);
    }
    else {
        res.status(400).json(device);
    }
}
