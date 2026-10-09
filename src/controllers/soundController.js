import path from "path"

export const getSound = async (req, res) => {
    const dir = "./public";
    const fileName = "/sound.wav"
    const filePath = path.resolve(dir + fileName);
    res.sendFile(filePath);
}
