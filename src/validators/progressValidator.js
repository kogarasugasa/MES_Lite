import { Progress } from "../models/progressModel.js";

const allows = [
    { after: "Running", before: ["None", "Wait", "CancelRequested"] },
    { after: "Wait", before: ["Running", "CancelRequested"] },
    { after: "Complete", before: ["Running", "CancelRequested"] },
    { after: "None", before: ["CancelRequested"] },
];
/**
 * 
 * @param {Progress} progress 
 * @returns { {ok: boolean, message: string } }
 */
export const validateProgress = (progress) => {
    try {
        const allowBeforeStatus = allows.find(val => val.after === progress.AfterStatus);
        if (!allowBeforeStatus.before.some(val => val === progress.BeforeStatus)) {
            let msg = [
                progress.BeforeStatus,
                "から",
                progress.AfterStatus,
                "に変更出来ません",
            ];
            return createErrResult(msg.join(" "));
        }
        if (progress.UUID == null || progress.UUID.trim() === "") {
            return createErrResult("UUIDが入力されていません");
        }
        if (progress.Line == null || progress.Line.trim() === "") {
            return createErrResult("工程が入力されていません");
        }
        if (progress.DeviceId == null || progress.Line.trim() === "") {
            return createErrResult("端末IDが入力されていません");
        }
        if (progress.UserId == null || progress.UserId.trim() === "") {
            return createErrResult("担当者IDが入力されていません");
        }
        return { ok: true, msg: "validateProgress ok"}
    }
    catch (error) {
        return createErrResult(error.stack);
    }
}
function createErrResult(msg) {
    return { ok: false, message: msg };
}