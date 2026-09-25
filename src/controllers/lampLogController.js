import { insertLampLog } from "../services/lampLogService.js"
import { HttpStatus } from "../helpers/httpStatusHelper.js";

export const postLampLog = async (req, res) => {
    const entry = insertLampLog(req.body);
    if (entry.ok) {
        res.json( { ok: true });
    }
    else {
        const error = HttpStatus.internalServerError;
        res.status(error.number).json(entry);
    }
}
