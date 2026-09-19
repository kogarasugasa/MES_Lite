export class Progress {
    SchNo;
    BeforeStatus;
    AfterStatus;
    DeviceId;
    Line;
    UserId;
    ClientDateTime;
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