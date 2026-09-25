/**
 * @param {{ok: boolean, value: any, message: String}} result
 * @param {(result: {ok: boolean, value: any, message: String}) => any} ok
 * @param {(result: {ok: boolean, value: any, message: String}) => any} err
*/
export const result = (result, ok, err) => {
    if (result.ok) {
        return ok(result);
    }
    else {
        return err(result);
    }
}