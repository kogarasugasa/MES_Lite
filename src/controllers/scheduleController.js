import {
    findAllSchedules,
    findSchedulesByLine,
    findSchedulesVersion
} from "../services/scheduleService.js"

export const getSchedules = async (req, res) => {
    let schedules = findAllSchedules();
    if (schedules.ok) {
        res.json(schedules.value);
    }
    else {
        res.status(404).json(schedules);
    }
}
export const getScheduleByLine = async (req, res) => {
    let schedules = findSchedulesByLine(req.params.line);
    if (schedules.ok) {
        res.json(schedules.value);
    }
    else {
        res.status(404).json(schedules);
    }
}
export const getScheduleVersion = async (req, res) => {
    let version = findSchedulesVersion();
    if (version.ok) {
        res.json(version.value);
    }
    else {
        res.status(400).json(version);
    }
}