var Danel;
(function (Danel) {
    var ChangePassword = (function () {
        function ChangePassword() {
        }
        return ChangePassword;
    }());
    Danel.ChangePassword = ChangePassword;
    var Message = (function () {
        function Message() {
        }
        return Message;
    }());
    Danel.Message = Message;
    var WebParameter;
    (function (WebParameter) {
        WebParameter[WebParameter["AllowWebMessageToAdvisor"] = 0] = "AllowWebMessageToAdvisor";
        WebParameter[WebParameter["ContactToAdvisorFilePath"] = 1] = "ContactToAdvisorFilePath";
        WebParameter[WebParameter["DefaultHtml"] = 2] = "DefaultHtml";
        WebParameter[WebParameter["DirectCommunication"] = 3] = "DirectCommunication";
        WebParameter[WebParameter["EnforcePasswordsHistory"] = 4] = "EnforcePasswordsHistory";
        WebParameter[WebParameter["FalseLoginsToWebSite"] = 5] = "FalseLoginsToWebSite";
        WebParameter[WebParameter["ForgotIDMsg"] = 6] = "ForgotIDMsg";
        WebParameter[WebParameter["IdleTimeForWebSite"] = 7] = "IdleTimeForWebSite";
        WebParameter[WebParameter["IncomingTiming"] = 8] = "IncomingTiming";
        WebParameter[WebParameter["IncomingTimingMinutes"] = 9] = "IncomingTimingMinutes";
        WebParameter[WebParameter["IncomingWatchFile"] = 10] = "IncomingWatchFile";
        WebParameter[WebParameter["IncomingWebUsersFilePath"] = 11] = "IncomingWebUsersFilePath";
        WebParameter[WebParameter["IsActiveWebSite"] = 12] = "IsActiveWebSite";
        WebParameter[WebParameter["IsDMZServer"] = 13] = "IsDMZServer";
        WebParameter[WebParameter["LogoAlignment"] = 14] = "LogoAlignment";
        WebParameter[WebParameter["CompanyDisplayName"] = 15] = "CompanyDisplayName";
        WebParameter[WebParameter["MediatorCommunication"] = 16] = "MediatorCommunication";
        WebParameter[WebParameter["OutgoingTiming"] = 17] = "OutgoingTiming";
        WebParameter[WebParameter["OutgoingTimingMinutes"] = 18] = "OutgoingTimingMinutes";
        WebParameter[WebParameter["OutgoingWatchFile"] = 19] = "OutgoingWatchFile";
        WebParameter[WebParameter["OutgoingWebUsersFilePath"] = 20] = "OutgoingWebUsersFilePath";
        WebParameter[WebParameter["PasswordsHistoryCounter"] = 21] = "PasswordsHistoryCounter";
        WebParameter[WebParameter["WebsiteDataFromDate"] = 22] = "WebsiteDataFromDate";
        WebParameter[WebParameter["WebsiteDataToDate"] = 23] = "WebsiteDataToDate";
        WebParameter[WebParameter["WebsiteDefinitionsPath"] = 24] = "WebsiteDefinitionsPath";
        WebParameter[WebParameter["WebsiteMainColor"] = 25] = "WebsiteMainColor";
        WebParameter[WebParameter["WebSiteRegistrationType"] = 26] = "WebSiteRegistrationType";
        WebParameter[WebParameter["WebSiteSendingType"] = 27] = "WebSiteSendingType";
        WebParameter[WebParameter["WebSiteUpdatesEmail"] = 28] = "WebSiteUpdatesEmail";
        WebParameter[WebParameter["CompanyWebsiteLink"] = 29] = "CompanyWebsiteLink";
        WebParameter[WebParameter["ColorsPlate"] = 30] = "ColorsPlate";
        WebParameter[WebParameter["DisplayTermsOfUseOnLogin"] = 31] = "DisplayTermsOfUseOnLogin";
        WebParameter[WebParameter["LinkToHomePageForFunds"] = 32] = "LinkToHomePageForFunds";
        WebParameter[WebParameter["WebSiteUrl"] = 33] = "WebSiteUrl";
        WebParameter[WebParameter["ContextualColor"] = 34] = "ContextualColor";
        WebParameter[WebParameter["SMSProvider"] = 35] = "SMSProvider";
        WebParameter[WebParameter["SMSUser"] = 36] = "SMSUser";
        WebParameter[WebParameter["SMSPassword"] = 37] = "SMSPassword";
        WebParameter[WebParameter["HeaderAndTotalColor"] = 38] = "HeaderAndTotalColor";
        WebParameter[WebParameter["SMSSenderPhone"] = 39] = "SMSSenderPhone";
        WebParameter[WebParameter["WebSiteMenuItems"] = 40] = "WebSiteMenuItems";
        WebParameter[WebParameter["WebSiteGroupingItems"] = 41] = "WebSiteGroupingItems";
        WebParameter[WebParameter["WebSiteCustomYieldInMonths"] = 42] = "WebSiteCustomYieldInMonths";
        WebParameter[WebParameter["WebSitePolicyType"] = 43] = "WebSitePolicyType";
    })(WebParameter = Danel.WebParameter || (Danel.WebParameter = {}));
    var WebSiteCommunicationOption;
    (function (WebSiteCommunicationOption) {
        WebSiteCommunicationOption[WebSiteCommunicationOption["Email"] = 1] = "Email";
        WebSiteCommunicationOption[WebSiteCommunicationOption["Phone"] = 2] = "Phone";
    })(WebSiteCommunicationOption = Danel.WebSiteCommunicationOption || (Danel.WebSiteCommunicationOption = {}));
    var ActiveWebSiteState;
    (function (ActiveWebSiteState) {
        ActiveWebSiteState[ActiveWebSiteState["pending"] = 0] = "pending";
        ActiveWebSiteState[ActiveWebSiteState["activated"] = 1] = "activated";
        ActiveWebSiteState[ActiveWebSiteState["disabled"] = 2] = "disabled";
    })(ActiveWebSiteState = Danel.ActiveWebSiteState || (Danel.ActiveWebSiteState = {}));
})(Danel || (Danel = {}));
//# sourceMappingURL=Models.js.map