export const HttpStatus = {
    created: { number: 201, desc: "登録成功" },
    badRequest: { number: 400, desc: "入力チェックエラー" },
    unauthorized: { number: 401, desc: "認証エラー" },
    forbidden: { number: 403, desc: "権限エラー" },
    notFound: { number: 404, desc: "対象データなし" },
    conflict: { number: 409, desc: "重複登録エラー" },
    unprocessableEntity: { number: 422, desc: "業務ルール違反" },
    internalServerError: { number: 500, desc: "システムエラー" },
}