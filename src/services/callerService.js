import fs from 'fs'

import { logInfo, logWarn, logError } from "../helpers/logHelper.js"
import { Caller } from "../models/callerModel.js"
import { HttpStatus } from '../helpers/httpStatusHelper.js';

const filePath = "./data/Transaction/caller.json";
const backPath = "./data/Transaction/caller.json.bak";

/**
 * 
 * @param {number} limit 
 * @returns {{ ok: boolean, value: Caller, message: string }}
 */
export const findPendingCaller = (limit) => {
    const caller = loadJson();
    if (!caller.ok) {
        return caller;
    }
    let pending = caller.value.filter(v => v.IsPending);
    if (pending.length <= limit) {
        return { ok: true, value: pending };
    }
    else {
        return { ok: true, value: pending.slice(0, limit) };
    }
}
/**
 * 
 * @param {string} callId
 * @returns {{ ok: boolean, value: Caller, message: string }}
 */
export const findCaller = (callId) => {
    const caller = loadJson();
    if (!caller.ok) {
        return caller;
    }
    const found = caller.value.find(v => v.CallId === callId);
    if (found) {
        return { ok: true, value: found };
    }
    else {
        const error = HttpStatus.notFound;
        return { ok: false, message: error.desc };
    }
}
/**
 * 
 * @param { Caller } caller 
 * @returns {{ ok: boolean, value: Caller, message: string }}
 */
export const insertCaller = (caller) => {
    const data = loadJson();
    if (!data.ok) {
        return data;
    }
    if (data.value.some(v => v.CallId === caller.CallId)) {
        return { ok: false, message: "すでに存在するIDです" };
    }
    data.value.push(caller);
    const saved = saveJson(data.value);
    if (!saved.ok) {
        return saved;
    }
    return { ok: true };
}
/**
 * 
 * @param { Caller } caller 
 * @returns {{ ok: boolean, message: string }}
 */
export const updateCaller = (caller) => {
    let data = loadJson();
    if (!data.ok) {
        return data;
    }
    for (let from of data.value) {
        if (from.CallId === caller.CallId) {
            from.DeviceId = caller.DeviceId;
            from.UserId = caller.UserId;
            from.Line = caller.Line;
            from.IsPending = caller.IsPending;
            from.ClientDateTime = caller.ClientDateTime;
            from.ServerDateTime = new Date().toLocaleString();
            break;
        }
    }
    let saved = saveJson(data.value);
    return saved;
}
/**
 * 
 * @returns {{ ok: boolean, value: Caller[], message: string }}
 */
function loadJson() {
    if (!fs.existsSync(filePath)) {
        logWarn(`${filePath} is not found`);
        return [];
    }
    let data;
    try {
        let str = fs.readFileSync(filePath, "utf8");
        data = JSON.parse(str);
    }
    catch (error) {
        logError(error.message);
        return { ok: false, message: error.message };
    }
    return {ok: true, value: data};
}
/**
 * @param {[Progress]} progressArray
 * @returns { { ok: boolean, message: string } }
 */
function saveJson(data) {
    // 書き込み
    const json = JSON.stringify(data);
    try {
        if (fs.existsSync(filePath) && fs.statSync(filePath).size > 1024 * 1024) {
            if (fs.existsSync(backPath)) {
                fs.rm(backPath);
            }
            fs.rename(filePath, backPath);
        }
        fs.writeFileSync(filePath, json, "utf8",)
    }
    catch (error) {
        return { ok: false, message: error.message };
    }
    return { ok: true };
}