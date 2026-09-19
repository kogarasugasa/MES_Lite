import fs from "fs"

export const findDeviceById = (deviceId) => {
    const devices = loadJson();
    if (devices == null) {
        return { ok: false, message: "json not found" };
    }
    const device = devices.filter(val => val.DeviceId === deviceId).pop();
    if (device == null) {
        return { ok: false, message: "devices not found" };
    }
    else {
        return { ok: true, value: device };
    }
}
export const insertDevice = (deviceId, deviceIp, lampIp) => {
    let devices = loadJson();
    const device = {
        DeviceId: deviceId,
        DeviceIp: deviceIp,
        LampIp: lampIp,
        ServerDateTime: new Date().toLocaleString()
    }
    devices.push(device);
    const path = getPath();
    if (fs.statSync(path).size > 1024 * 1024) {
        fs.rename(path, `${path}.bak`);
    }
    fs.writeFile(getPath(), JSON.stringify(devices));
    return { ok: true, value: device };
}
function loadJson() {
    const path = getPath();
    if (!fs.existsSync(path)) {
        return null;
    }
    let str = fs.readFileSync(path, "utf8");
    return JSON.parse(str);
}
function getPath() {
    const dir = "./data/Transaction";
    const fileName = "/ConnectedDevice.json"
    return dir + fileName;
}
