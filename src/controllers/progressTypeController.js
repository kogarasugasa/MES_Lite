import { findAllProgressTypes } from '../services/progressTypeService.js';

export const getProgressType = async (req, res) => {
    let result = findAllProgressTypes();
    if (result.ok) {
        res.json(result.value);
    }
    else {
        res.status(404).json(result);
    }
}