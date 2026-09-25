import { HttpStatus } from "../helpers/httpStatusHelper.js";
import {
    findAllUsers,
    findUserByUserId,
    findUserVersion,
} from "../services/userService.js";

export const getUsers = async (req, res) => {
    const users = findAllUsers();
    if (users.ok) {
        res.json(users.value);
    }
    else {
        res.status(400).json(users);
    }
}
export const getUser = async (req, res) => {
    const user = findUserByUserId(req.params.userid);
    if (user.ok) {
        res.json(user.value);
    }
    else {
        res.status(404).json(user);
    }
}
export const getUserVersion = async (req, res) => {
    const version = findUserVersion();
    if (version.ok) {
        res.json(version);
    }
    else {
        const notFound = HttpStatus.notFound;
        const err = { ok: false, message: notFound.desc };
        res.status(notFound.number).json(err);
    }
}