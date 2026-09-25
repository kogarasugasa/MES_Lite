import {
    findProgressBySchNo,
    findProgressByLine,
    findAllProgress,
    insertProgress,
    findProgressVersion,
} from "../services/progressService.js"
import { Progress } from "../models/progressModel.js";
import { HttpStatus } from "../helpers/httpStatusHelper.js";

export const getVersion = async (req, res) => {
    const version = findProgressVersion();
    if (version.ok) {
        res.json(version);
    }
    else {
        const err = HttpStatus.internalServerError;
        res.status(err.number).json({ ok: false, message: err.desc });
    }
}
export const getProgressAll = async (req, res) => {
    const progress = findAllProgress();
    res.json(progress);
}
export const getProgress = async (req, res) => {
    const progress = findProgressBySchNo(req.params.schno);
    res.json(progress);
}
export const getProgressByLine = async (req, res) => {
    const progress = findProgressByLine(req.params.line);
    res.json(progress);
}
export const postProgress = async (req, res) => {
    const reqProgress = new Progress();
    reqProgress.UUID = req.body.UUID;
    reqProgress.SchNo = req.body.SchNo;
    reqProgress.AfterStatus = req.body.AfterStatus;
    reqProgress.DeviceId = req.body.DeviceId;
    reqProgress.Line = req.body.Line;
    reqProgress.UserId = req.body.UserId;
    reqProgress.ClientDateTime = req.body.ClientDateTime;
    let storeProgress = insertProgress(reqProgress);
    if (storeProgress.ok) {
        res.status(storeProgress.value).json({ ok: true });
    }
    else {
        res.status(storeProgress.value).json(storeProgress);
    }
}
