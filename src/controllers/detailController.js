import path from "path"

export const getDetail = async (req, res) => {
    res.sendFile(getPath());
}
function getPath() {
    const dir = "./public";
    const fileName = "/detail.html"
    return path.resolve(dir + fileName);
}