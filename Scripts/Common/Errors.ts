module Danel {
    export module Errors {
        export function toUserMessage(err) {
            if (err instanceof DanelError) {
                return (<DanelError>err).userMessage;
            }
            else {
                return err.message;
            }
        }
    }

    export class DanelError {
        public errorCode: ErrorCode;
        public userMessage: string;
        public internalMessage: string; 

        constructor(errorCode, userMessage, internalMessage) {
            var me = this;

            me.errorCode = errorCode;
            me.userMessage = userMessage;
            me.internalMessage = internalMessage;
        }
    }

    export enum ErrorCode {
        None = 0,
        InternalServerError = 1,
        ServerNotAvailable = 2,
        SecurityError = 3,
        InvalidAccountNumber = 4,
        CSRFValidationFailed = 5,
        TempPasswordExpired = 6,
        InvalidTempPassword = 7,
        AlreadyWebUser = 8,
        NoSuchAccountOwner = 9,
        UnRecongnisedEmail = 10,
        AlreadyAnotherWebUser = 11,
        AlreadyRegisteredIdentityNumber = 12,
        AlreadyRegisteredEmail = 13,
        Error = 14,
        NoSuchIdentityNumber = 15,
        NoSuchPhone = 16,
        AlreadyRegisteredPhone = 17,
        DuplicatedPassword = 18,
        PreviousPasswordIncncorrect = 19,
        PasswordAlreadyInHistory = 20,
        MailSendFailure = 21,
        invalidUserName = 22,
        Unknown = 23,
        InactiveWebSite = 24,
        NoValidSMSProvider = 25,
        EmptyProvider = 26

    }
}
