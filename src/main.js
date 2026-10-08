// 参考 REST API https://qiita.com/mithra_inc/items/562f0d3f4b2b7ee286d9
// 参考 ディレクトリ構成 https://zenn.dev/koda_momo/articles/fb3e1d17b62251
import app from "./app.js"
import { getConfig } from "./helpers/serverConfigHelper.js"
import { result } from "./helpers/resultHelper.js"

let config = result(
    getConfig(),
    (v) => { return v.value; },
    (v) => { throw Error(v.message); }
);
try {
    app.listen(config.ServerPort, () => {
        console.log(`Server is running on http://localhost:${config.ServerPort}`);
    });
}
catch (error) {
    console.error(`Server error is ${error.message}`);
    process.exit(1);
}