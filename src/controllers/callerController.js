import { HttpStatus } from "../helpers/httpStatusHelper.js";
import {
    findCaller,
    findPendingCaller,
    insertCaller,
    updateCaller,
} from "../services/callerService.js";
import { Caller } from "../models/callerModel.js"

export const getPendingCaller = async (req, res) => {
    const limit = req.query.limit;
    const caller = findPendingCaller(limit);
    if (caller.ok) {
        res.json(caller);
    }
    else {
        const notFound = HttpStatus.internalServerError;
        const err = { ok: false, message: notFound.desc };
        res.status(notFound.number).json(err);
    }
}
export const postCaller = async (req, res) => {
    const caller = new Caller();
    caller.CallId = req.body.CallId;
    caller.DeviceId = req.body.DeviceId;
    caller.UserId = req.body.UserId;
    caller.Line = req.body.Line;
    caller.IsPending = req.body.IsPending;
    caller.ClientDateTime = req.body.ClientDateTime;
    let inserted = insertCaller(caller);
    if (inserted.ok) {
        res.status(HttpStatus.created.number).json({ok: true});
    }
    else {
        const error = HttpStatus.badRequest;
        res.status(error.number).json({ok: false, message: error.message});
    }
}

export const postResolveCaller = async (req, res) => {
    const callId = req.params.callid;
    const caller = findCaller(callId);
    if (!caller.ok) {
        const error = HttpStatus.internalServerError;
        res.status(error.number).json(caller);
        return;
    }
    caller.value.IsPending = false;
    let updated = updateCaller(caller.value);
    if (updated.ok) {
        res.status(HttpStatus.created.number).json({ok: true});
    }
    else {
        const error = HttpStatus.badRequest;
        res.status(error.number).json({ok: false, message: error.message});
    }
}