module Danel {
    export class YieldRequest extends UiRequestBase {
        period: string;               
        index1Id: string;
        index2Id: string;
    }

    export class AccountsRequest extends UiRequestBase {
        userId: string;
    }
    export class HoldingsGroupedRequest extends UiRequestBase {
        groupID: number;
    }

    export class TransactionRequest extends UiRequestBase {
        public period: string;
        public from: Date;
        public to: Date;
    }

    export class EmptyRequest extends UiRequestBase {

    }

    export class parameterRequest extends UiRequestBase {
        webParameter: WebParameter;
    }

    export class ContactAdvisorInfoRequest extends UiRequestBase {
        public userId: string;

    }



    export class ResendCodeRequest extends UiRequestBase {
        public currentCode: string;
        public currenPhone: string
    }

    export class AuthLoginRequest extends UiRequestBase {
        public userName: string;
        public password: string;
        public rememberMe: boolean;
    }

    export class MessageRequest extends UiRequestBase {
        public senderName: string;
        public address: string;
        public email: string;
        public phone: string;
        public subject: string;
        public content: string;
        public status: string;
        public identityNumber: string;
        userID: string;
        danelUserName: string;
        webSiteSigningOptions: WebSiteCommunicationOption;
        birthDate: Date;
    }

    export class ChangePasswordRequest extends UiRequestBase {
        public new_password: string;
        public current_password: string;
        userId: string;
        isResetPasswordMode: boolean;
    }

    export class ResetPasswordRequest extends UiRequestBase {
        public new_password: string;
    }


    export class ImpersonateRequest extends UiRequestBase {
        public userId: string;
        public userPhone: String;
        public userAddress: String;
        public userEmail: String;
        public userName: String;
        public lastLoginDate: String;
    }


}
