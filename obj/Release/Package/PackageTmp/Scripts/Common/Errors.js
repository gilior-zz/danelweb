var Danel;
(function (Danel) {
    var Errors;
    (function (Errors) {
        function toUserMessage(err) {
            if (err instanceof DanelError) {
                return err.userMessage;
            }
            else {
                return err.message;
            }
        }
        Errors.toUserMessage = toUserMessage;
    })(Errors = Danel.Errors || (Danel.Errors = {}));
    var DanelError = (function () {
        function DanelError(errorCode, userMessage, internalMessage) {
            var me = this;
            me.errorCode = errorCode;
            me.userMessage = userMessage;
            me.internalMessage = internalMessage;
        }
        return DanelError;
    }());
    Danel.DanelError = DanelError;
    var ErrorCode;
    (function (ErrorCode) {
        ErrorCode[ErrorCode["None"] = 0] = "None";
        ErrorCode[ErrorCode["InternalServerError"] = 1] = "InternalServerError";
        ErrorCode[ErrorCode["ServerNotAvailable"] = 2] = "ServerNotAvailable";
        ErrorCode[ErrorCode["SecurityError"] = 3] = "SecurityError";
        ErrorCode[ErrorCode["InvalidAccountNumber"] = 4] = "InvalidAccountNumber";
        ErrorCode[ErrorCode["CSRFValidationFailed"] = 5] = "CSRFValidationFailed";
        ErrorCode[ErrorCode["TempPasswordExpired"] = 6] = "TempPasswordExpired";
        ErrorCode[ErrorCode["InvalidTempPassword"] = 7] = "InvalidTempPassword";
        ErrorCode[ErrorCode["AlreadyWebUser"] = 8] = "AlreadyWebUser";
        ErrorCode[ErrorCode["NoSuchAccountOwner"] = 9] = "NoSuchAccountOwner";
        ErrorCode[ErrorCode["UnRecongnisedEmail"] = 10] = "UnRecongnisedEmail";
        ErrorCode[ErrorCode["AlreadyAnotherWebUser"] = 11] = "AlreadyAnotherWebUser";
        ErrorCode[ErrorCode["AlreadyRegisteredIdentityNumber"] = 12] = "AlreadyRegisteredIdentityNumber";
        ErrorCode[ErrorCode["AlreadyRegisteredEmail"] = 13] = "AlreadyRegisteredEmail";
        ErrorCode[ErrorCode["Error"] = 14] = "Error";
        ErrorCode[ErrorCode["NoSuchIdentityNumber"] = 15] = "NoSuchIdentityNumber";
        ErrorCode[ErrorCode["NoSuchPhone"] = 16] = "NoSuchPhone";
        ErrorCode[ErrorCode["AlreadyRegisteredPhone"] = 17] = "AlreadyRegisteredPhone";
        ErrorCode[ErrorCode["DuplicatedPassword"] = 18] = "DuplicatedPassword";
        ErrorCode[ErrorCode["PreviousPasswordIncncorrect"] = 19] = "PreviousPasswordIncncorrect";
        ErrorCode[ErrorCode["PasswordAlreadyInHistory"] = 20] = "PasswordAlreadyInHistory";
        ErrorCode[ErrorCode["MailSendFailure"] = 21] = "MailSendFailure";
        ErrorCode[ErrorCode["invalidUserName"] = 22] = "invalidUserName";
        ErrorCode[ErrorCode["Unknown"] = 23] = "Unknown";
        ErrorCode[ErrorCode["InactiveWebSite"] = 24] = "InactiveWebSite";
        ErrorCode[ErrorCode["NoValidSMSProvider"] = 25] = "NoValidSMSProvider";
        ErrorCode[ErrorCode["EmptyProvider"] = 26] = "EmptyProvider";
    })(ErrorCode = Danel.ErrorCode || (Danel.ErrorCode = {}));
})(Danel || (Danel = {}));
//# sourceMappingURL=Errors.js.map