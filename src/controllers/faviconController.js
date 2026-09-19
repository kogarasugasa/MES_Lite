import path from "path"

export const getFavicon = async (req, res) => {
    res.sendFile(getPath());
}
function getPath() {
    const dir = "./public";
    const fileName = "/favicon.ico"
    return path.resolve(dir + fileName);
}