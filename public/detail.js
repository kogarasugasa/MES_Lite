const _params = new URLSearchParams(window.location.search);
const _url = _params.get("url").trim();
const _deviceId = _params.get("deviceId").trim();
const _lines = JSON.parse(_params.get("lines"));
const _line = _lines.find(val => val === _params.get("line").trim());
const _userId = _params.get("userId").trim();
const _userName = _params.get("userName");
const _schNo = _params.get("schNo").trim();
const _sdNo = _params.get("sdNo");
const _sdName = _params.get("sdName");
const _floor = _params.get("floor");
const _symbol = _params.get("symbol");
const _itemName = _params.get("itemName");
const _qty = _params.get("qty");
const _startTime = _params.get("startTime");
const _endTime = _params.get("endTime");
const _remark1 = _params.get("remark1");
const _remark2 = _params.get("remark2");
const _localStorageKeys = {
    user: "user",
    device: "device",
    line: "line",
    pendingProgress: "pendingProgress",
    schedules: "schedules",
    progress: "progress",
    progressType: "progressType",
    delayRule: "delayRule",
};
let _progress = null;
let _progressTypes = null;

initializeAsync();
document.getElementById("messageOkBtn").addEventListener("click", () => {
    closeMessage();
});
document.getElementById("start").addEventListener("click", () => {
    progressButtonClick("Running");
});
document.getElementById("wait").addEventListener("click", () => {
    progressButtonClick("Wait");
});
document.getElementById("complete").addEventListener("click", () => {
    progressButtonClick("Complete");
});

async function initializeAsync() {
    // データ取得
    await loadAllAsync();

    // 端末情報
    document.getElementById("deviceId").textContent = _deviceId;
    document.getElementById("userName").textContent = _userName;

    // 予定情報
    document.getElementById("schNo").textContent = _schNo;
    document.getElementById("sdNo").textContent = _sdNo;
    document.getElementById("sdName").textContent = _sdName;
    document.getElementById("floor").textContent = _floor;
    document.getElementById("symbol").textContent = _symbol;
    document.getElementById("itemName").textContent = _itemName;
    document.getElementById("qty").textContent = _qty;
    document.getElementById("startTime").textContent = _startTime;
    document.getElementById("endTime").textContent = _endTime;
    document.getElementById("remark1").textContent = _remark1;
    document.getElementById("remark2").textContent = _remark2;

    // ドロップダウン
    const lineChoice = document.getElementById("lineChoice");
    for (let line of _lines) {
        lineChoice.add(new Option(line, line));
    }
    document.getElementById("lineChoice").value = _lines.find(val => val === _line);

    // ボタン
    displayButtonEnables();

    // ステータス
    displayStatus();
}
/**
 * @param {String} afterStatus
 * @returns {[String]}
*/
function getEnableButtonNames(afterStatus) {
    switch (afterStatus) {
        case "None": return ["Running"];
        case "Running": return ["None", "Wait", "Complete"];
        case "Wait": return ["Running"];
        case "Complete": return [];
        default:
            openMessage(`進捗の定義がありません ${afterStatus}`);
            return [];
    }
}
function displayButtonEnables() {
    const options = getEnableButtonNames(_progress.AfterStatus);
    document.getElementById("start").disabled = !options.includes("Running");
    document.getElementById("wait").disabled = !options.includes("Wait");
    document.getElementById("complete").disabled = !options.includes("Complete");
}
function disableButton() {
    document.getElementById("start").inert = true;
    document.getElementById("wait").inert = true;
    document.getElementById("complete").inert = true;
    document.getElementById("backBtn").inert = true;
}
function enableButton() {
    document.getElementById("start").inert = false;
    document.getElementById("wait").inert = false;
    document.getElementById("complete").inert = false;
    document.getElementById("backBtn").inert = false;
}
function displayStatus() {
    const statusPanel = document.getElementById("status");
    const status = _progressTypes.find(val => val.Status === _progress.AfterStatus) ||
        { Display: `未定義:${_progress.AfterStatus}`, UiColor: "Red" }
    ;
    statusPanel.textContent = status.Display;
    statusPanel.style.backgroundColor = status.UiColor;
}
async function progressButtonClick(status) {
    const data = {
        UUID : crypto.randomUUID(),
        SchNo : _schNo,
        BeforeStatus : null,
        AfterStatus : status,
        DeviceId : _deviceId,
        Line : document.getElementById("lineChoice").value,
        UserId : _userId,
        ClientDateTime : new Date().toLocaleString(),
        ServerDateTime : null
    }
    disableButton();
    let resp;
    try {
        openMessage("送信中...");
        resp = await sendProgressAsync(data);
    }
    catch (error) {
        openMessage("登録に失敗しました。error.message: " + error.message);
    }
    try {
        if (!resp.ok) {
            saveProgress(data);
            openMessage(
                "進捗は保存されましたが、" +
                "サーバーに登録にできませんでした。" +
                resp.message
            );
        }
        await loadAllAsync();
        displayButtonEnables();
        displayStatus();
    }
    finally {
        enableButton();
    }
}
function closeMessage() {
    document.getElementById("messageArea").style.display = "none";
}
function openMessage(msg) {
    document.getElementById("messageArea").style.display = "block";
    document.getElementById("message").textContent = msg;
}
async function loadAllAsync() {
    let err = "";
    // 進捗を取得
    let progress = await getProgressAsync();
    if (!progress.ok) {
        if (err === "") {
            err = progress.message;
        }
        const local = JSON.parse(
            localStorage.getItem(_localStorageKeys.progress) || "[]"
        );
        const pending = JSON.parse(
            localStorage.getItem(_localStorageKeys.pendingProgress) || "[]"
        );
        const union = [].concat(local, pending);
        const temp = union
            .filter(val => val.SchNo === _schNo)
            .pop() ||
            { AfterStatus: "None" }
        ;
        progress = { ok: true, value: temp };
    }
    _progress = progress.value;
    
    // 進捗マスタを取得
    let progressType = await getProgressTypeAsync();
    if (!progressType.ok) {
        const local = localStorage.getItem(_localStorageKeys.progressType);
        if (local == null) {
            if (err === "") {
                err = progress.message;
            }
            return;
        }
        progressType = { ok: true, value: JSON.parse(local) };
    }
    _progressTypes = progressType.value;

    // メッセージ
    if (err === "") {
        closeMessage();
    }
    else {
        openMessage("データの取得に失敗しました。" + err);
    }
}
/** サーバーから進捗を取得
 * @returns {{ok: boolean, value: any, message: String}}
*/
async function getProgressAsync() {
    let resp;
    try {
        resp = await fetch(`${_url}/api/progress/${_schNo}`);
    }
    catch (error) {
        return { ok: false, message: error.message };
    }
    if (!resp.ok) {
        const error = await resp.json();
        return { ok: false, message: error.message };
    }
    try {
        return { ok: true, value: await resp.json() };
    }
    catch (error) {
        return { ok: false, message: error.message };
    }
}
/** サーバーから進捗マスタを取得
 * @returns {{ok: boolean, value: any, message: String}}
*/
async function getProgressTypeAsync() {
    let resp;
    try {
        resp = await fetch(`${_url}/api/progressType`);
    }
    catch (error) {
        return { ok: false, message: error.message };
    }
    if (!resp.ok) {
        const error = await resp.json();
        return { ok: false, message: error.message };
    }
    try {
        return {ok: true, value: await resp.json()} ;
    }
    catch (error) {
        return  { ok: false, message: error.message };
    }
}
/** 進捗をサーバーに送信
 * @param {String} status
 * @param {any} data
 * @returns {{ok: boolean, message: String}}
 * @description サーバーに接続できなければローカルに保存
*/
async function sendProgressAsync(data) {
    const json = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    };
    let resp;
    try {
        resp = await fetch(`${_url}/api/progress`, json);
    }
    catch (error) {
        return { ok: false, message: error.message };
    }
    if (!resp.ok) {
        const error = await resp.json();
        return { ok: false, message: error.message};
    }
    return { ok: true };
}
/** 進捗をローカルに保存
 * @param {Progress} progress
*/
function saveProgress(progress) {
    let saved = localStorage.getItem(_localStorageKeys.pendingProgress) || "[]";
    saved = JSON.parse(saved);
    saved.push(progress);
    localStorage.setItem(_localStorageKeys.pendingProgress, JSON.stringify(saved));
}