import path from "path"

export const getIndex = async (req, res) => {
    const dir = "./public";
    const fileName = "/schedule_list.html"
    const filePath = path.resolve(dir + fileName);
    res.sendFile(filePath);
}
export const getCss = async (req, res) => {
    const dir = "./public";
    const fileName = "/schedule_list.css"
    const filePath = path.resolve(dir + fileName);
    res.sendFile(filePath);
}
export const getScript = async (req, res) => {
    const dir = "./public";
    const fileName = "/schedule_list.js"
    const filePath = path.resolve(dir + fileName);
    res.sendFile(filePath);
}