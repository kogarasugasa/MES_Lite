export class Progress {
    /** @type {String} */
    UUID;
    /** @type {String} */
    SchNo;
    /** @type {String} */
    BeforeStatus;
    /** @type {String} */
    AfterStatus;
    /** @type {String} */
    DeviceId;
    /** @type {String} */
    Line;
    /** @type {String} */
    UserId;
    /** @type {String} */
    ClientDateTime;
    /** @type {String} */
    ServerDateTime;

    /**
     * 
     * @param {String} schNo
     * @returns {Progress}
     */
    static createNoneProgress(schNo) {
        const none = new Progress();
        none.SchNo = schNo;
        none.AfterStatus = "None";
        none.ServerDateTime = new Date().toLocaleString();
        return none;
    }
}