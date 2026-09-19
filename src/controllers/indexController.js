import path from "path"

export const getIndex = async (req, res) => {
    res.sendFile(getPath());
}
function getPath() {
    const dir = "./public";
    const fileName = "/schedule_list.html"
    return path.resolve(dir + fileName);
}