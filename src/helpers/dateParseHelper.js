/** 文字の日付を日付型に変換する
 * @param {String} str
 * @returns {{ ok: boolean, value: Date, message: string }}
*/
export const parseDateTime = (str) => {
    let timeElements;
    try {
        timeElements = str.split(/[ /:]/);
    }
    catch (error) {
        return { ok: false, message: error.message };
    }
    if (timeElements.length === 3) {
        return createDate(
            timeElements[0],
            timeElements[1],
            timeElements[2],
        );
    }
    else if (timeElements.length > 5) {
        return createDate(
            timeElements[0],
            timeElements[1],
            timeElements[2],
            timeElements[3],
            timeElements[4],
        );
    }
    else {
        return { ok: false, message: "[/][ ][:]で分割した数が3でも5以上でもありません" };
    }
}
/** 文字から日付を作成する
 * @param {String} year
 * @param {String} month
 * @param {String} day
 * @param {String} hour
 * @param {String} min
 * @returns {{ ok: boolean, value: Date, message: string }}
*/
export const createDate = (year, month, day, hour, min) => {
    var year = Number(year);
    if (isNaN(year)) {
        return { ok : false, message : "年が数字ではありません" };
    }
    if (year < 1991 || year > (new Date().getFullYear() + 1)) {
        return { ok : false, message: "日付が今日から離れ過ぎています"};
    }
    var month = Number(month);
    if (isNaN(month)) {
        return { ok : false, message: "月が数値ではありません"};
    }
    if (month < 1 || month > 12) {
        return { ok : false, message: "月が1-12ではありません" };
    }
    var day = Number(day);
    if (isNaN(day)) {
        return { ok : false, message: "日が数値ではありません" };
    }
    if (day < 1 || day > 31) {
        return { ok : false, message: "日が1-31ではありません" };
    }
    // 時間が未指定なら日付だけ返す
    let date = new Date(year, month - 1, day);
    if (hour == null) {
        return { ok : true, value : date };
    }
    // 時間解析
    var hour = Number(hour);
    if (isNaN(hour)) {
        return { ok : false, message: "時が数値ではありません" };
    }
    if (hour < 0 || hour > 23) {
        return { ok : false, message: "時が0-23ではありません" };
    }
    var min = Number(min);
    if (isNaN(min)) {
        return { ok : false, message: "分ば数値ではありません" };
    }
    if (min < 0 || min > 59) {
        return { ok : false, message: "分が0-59ではありません" };
    }
    let dateTime = new Date(year, month - 1, day, hour, min);
    return { ok : true, value : dateTime };
}