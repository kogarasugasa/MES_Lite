import {
    findAllProgressTypes,
    findProgressVersion
} from '../services/progressTypeService.js';
import { HttpStatus } from "../helpers/httpStatusHelper.js";

export const getProgressType = async (req, res) => {
    let result = findAllProgressTypes();
    if (result.ok) {
        res.json(result.value);
    }
    else {
        res.status(404).json(result);
    }
}
export const getProgressTypeVersion = async (req, res) => {
    const version = findProgressVersion();
    if (version.ok) {
        res.json(version.value);
    }
    else {
        const notFound = HttpStatus.notFound;
        res.status(notFound.number).json({
            ok: false,
            message: `version ${notFound.desc}`
        });
    }
}