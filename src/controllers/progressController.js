import { findProgressBySchNo, insertProgress } from "../services/progressService.js"
import { Progress } from "../models/progressModel.js";

export const getProgress = async (req, res) => {
    const progress = findProgressBySchNo(req.params.schno);
    res.json(progress);
}
export const postProgress = async (req, res) => {
    const reqProgress = new Progress();
    reqProgress.SchNo = req.body.SchNo;
    reqProgress.AfterStatus = req.body.AfterStatus;
    reqProgress.DeviceId = req.body.DeviceId;
    reqProgress.Line = req.body.Line;
    reqProgress.UserId = req.body.UserId;
    reqProgress.ClientDateTime = req.body.ClientDateTime;
    
    let storeProgress = insertProgress(reqProgress);
    if (storeProgress.ok) {
        res.status(201).json(storeProgress.value);
    }
    else {
        res.status(422).json(storeProgress);
    }
}
