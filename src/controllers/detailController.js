import path from "path"

export const getDetail = async (req, res) => {
    const dir = "./public";
    const fileName = "/detail.html"
    const filePath = path.resolve(dir + fileName);
    res.sendFile(filePath);
}
export const getDetailCss = async (req, res) => {
    const dir = "./public";
    const fileName = "/detail.css"
    const filePath = path.resolve(dir + fileName);
    res.sendFile(filePath);
}
export const getDetailScript = async (req, res) => {
    const dir = "./public";
    const fileName = "/detail.js"
    const filePath = path.resolve(dir + fileName);
    res.sendFile(filePath);
}