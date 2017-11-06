

module Danel {
    export interface Subject {
        SubjectID: number;
        SubjectName: string;
    }
    export class ChangePassword {
        new_password: string;
        new_password_2: string;
        current_password: string;
    }
    export interface AccountDash {
        Account: AccountDetails;
        PortfolioValue: number;
        YieldLastYear?: number;
        YieldStartYear?: number;
        Yield3Years?: number;
    }

    export interface ResetPasswordReponse {
        last3Digits: string;
        currentCode: string;
        currenPhone: string;
        email: string;
    }

    export interface TransactionsSummary {
        Account: AccountDetails;
        TotalTax: number;
        TotalSellLastYear: number;
        TotalBuyLastYear: number;
    }

    export interface PortfolioDash {
        Categories: PortfolioCategory[];
        Holdings: HoldingItem[];
    }

    export interface ContactAdvisorInfo {
        advisorName: string;
        advisorEmail: string;
        advisorPhone: string;
        supportPhone: string;
        img: typeof Image;
        imgString: string;
        builtInMessages: any;

    }

    export interface Parameters {
        ParameterItems: ParameterItem[];

    }

    export interface ParameterItem {
        WebParameter: number;
        Value: string;
    }


    export interface PortfolioCategory {
        Name: string;
        PercentOfPortfolio: number;
        Amount: number;
        Color: string;
    }

    export interface HoldingItem {
        ID: number;
        Name: string;
        ChannelName: string;
        LastRate: number;
        Quantity: number;
        Amount: number;
        AverageBuyRate: number;
        PercentOfPortfolio: number;
        Currency: string;
    }

    export interface YieldDash {
        Months: YieldDashMonth[];
        GridMonths: YieldDashMonth[];
    }

    export interface YieldDashMonth {
        Month: number;
        Year: number;
        Yield: number;
        YieldGross: number;
        Index1: number;
        Index2: number;
        Profit: number;

        //
        //  Is generated locally. Not sent from server
        //
        MonthName: string;

        PortfolioValue: number;
        Deposits: number;
        Withdrawals: number;
        Tax: number;
        NetAccumulated: number;
        Dummy: number;
        ID: string;
    }

    export interface TransactionDash {
        Transactions: Transaction[];
    }

    export interface Transaction {
        Date: Date

        ActionType: string

        SecurityID: number;

        SecurityName: string;

        Quantity: number;

        Rate: number;

        Currency: string;

        Commision: number;

        Tax: number;

        Amount: number;


        //Date: Date;
        //TransactionType: string;
        //SecurityNumber: string;
        //SecurityName: string;
        //Amount: number;
    }

    export interface IndexDetails {
        Id: string;
        Name: string;
        SelectedId: number;
    }
    export class Message {
        senderName: string;
        address: string;
        email: string;
        phone: string;
        subject: string;
        content: string;
        status: string;
        identityNumber: string;
        birthDate: Date;

    }



    export enum WebParameter {
        AllowWebMessageToAdvisor = 0,
        ContactToAdvisorFilePath = 1,
        DefaultHtml = 2,
        DirectCommunication = 3,
        EnforcePasswordsHistory = 4,
        FalseLoginsToWebSite = 5,
        ForgotIDMsg = 6,
        IdleTimeForWebSite = 7,
        IncomingTiming = 8,
        IncomingTimingMinutes = 9,
        IncomingWatchFile = 10,
        IncomingWebUsersFilePath = 11,
        IsActiveWebSite = 12,
        IsDMZServer = 13,
        LogoAlignment = 14,
        CompanyDisplayName = 15,
        MediatorCommunication = 16,
        OutgoingTiming = 17,
        OutgoingTimingMinutes = 18,
        OutgoingWatchFile = 19,
        OutgoingWebUsersFilePath = 20,
        PasswordsHistoryCounter = 21,
        WebsiteDataFromDate = 22,
        WebsiteDataToDate = 23,
        WebsiteDefinitionsPath = 24,
        WebsiteMainColor = 25,
        WebSiteRegistrationType = 26,
        WebSiteSendingType = 27,
        WebSiteUpdatesEmail = 28,
        CompanyWebsiteLink = 29,
        ColorsPlate = 30,
        DisplayTermsOfUseOnLogin = 31,
        LinkToHomePageForFunds = 32,
        WebSiteUrl = 33,
        ContextualColor = 34,
        SMSProvider = 35,
        SMSUser = 36,
        SMSPassword = 37,
        HeaderAndTotalColor = 38,
        SMSSenderPhone = 39,
        WebSiteMenuItems = 40,
        WebSiteGroupingItems = 41,
        WebSiteCustomYieldInMonths = 42,
        WebSitePolicyType = 43
    }

    export enum WebSiteCommunicationOption {
        Email = 1,
        Phone = 2,
    }

    export enum ActiveWebSiteState {
        pending, activated, disabled
    }



}