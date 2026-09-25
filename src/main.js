// 参考 REST API https://qiita.com/mithra_inc/items/562f0d3f4b2b7ee286d9
// 参考 ディレクトリ構成 https://zenn.dev/koda_momo/articles/fb3e1d17b62251
import app from "./app.js";
import fs from "fs";

let _port = 3001;
const _portFile = "./src/config/port.ini";

try {
    if (fs.existsSync(_portFile)) {
        const str = fs.readFileSync(_portFile);
        const data = JSON.parse(str);
        const num = Number(data.ServerPort);
        if (!isNaN(num)) {
            switch (true) {
                case num < 1024:
                case num == 3389: // RDP
                case num >= 65535:
                    console.log(`Unavailable port number ${num}`)
                    break;
                default: _port = num;
            }
        }
        else {
            console.log(`not number str '${str}'`);
        }
    }
}
catch (error) {
    console.log(error);
}
try {
    app.listen(_port, () => {
        console.log(`Server is running on http://localhost:${_port}`);
    });
}
catch (error) {
    console.error(`Server error is ${error.message}`);
    process.exit(1);
}