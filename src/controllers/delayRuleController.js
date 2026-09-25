import fs from 'fs'

import { HttpStatus } from "../helpers/httpStatusHelper.js";
import {
    findDelayRule,
    findDelayRuleVersion,
} from "../services/delayRuleService.js";

export const getDelayRuleVersion = async (req, res) => {
    const version = findDelayRuleVersion();
    if (version.ok) {
        res.json({ ok: true, value: { Version: version.value }});
    }
    else {
        const notFound = HttpStatus.notFound;
        const err = { ok: false, message: notFound.desc };
        res.status(notFound.number).json(err);
    }
}
export const getDelayRule = async (req, res) => {
    const rule = findDelayRule();
    if (rule.ok) {
        res.json(rule);
    }
    else {
        const notFound = HttpStatus.notFound;
        const err = { ok: false, message: notFound.desc };
        res.status(notFound.number).json(err);
    }
}
