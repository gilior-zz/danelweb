using Danel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Danel.WebApp.Dal.Model
{
    public class YieldUiRequest : UiRequestBase
    {
        public string period { get; set; }
        public string index1Id { get; set; }
        public string index2Id { get; set; }
    }

    public class AccountsRequest : UiRequestBase
    {
        public string userId { get; set; }
    }

    public class HoldingGroupedRequest : UiRequestBase
    {
        public int groupID { get; set; }
    }

    public class EmptyRequest : UiRequestBase
    {

    }

    public class TransactionRequest : UiRequestBase
    {
        public string period { get; set; }
        public DateTime? from { get; set; }
        public DateTime? to { get; set; }

    }

    public class AuthLoginRequest : UiRequestBase
    {
        public string userName { get; set; }
        public string password { get; set; }
        public bool rememberMe { get; set; }
    }

    public class ResendCodeRequest
    {
        public string currentCode { get; set; }
        public string currenPhone { get; set; }
    }

    public class ParameterRequest : UiRequestBase
    {
        public WebParameter webParameter { get; set; }
    }



    public class MessageRequest : UiRequestBase
    {
        public string email { get; set; }
        public string phone { get; set; }
        public string senderName { get; set; }
        public string content { get; set; }
        public string subject { get; set; }
        public string address { get; set; }
        public string status { get; set; }
        public string identityNumber { get; set; }
        public string userID { get; set; }
        public string danelUserName { get; set; }
        public DateTime birthDate { get; set; }

        public WebSiteCommunicationOption webSiteSigningOptions { get; set; }

    }

    public class ChangePasswordRequest : UiRequestBase
    {
        public string new_password { get; set; }
        public string current_password { get; set; }
        public bool isResetPasswordMode { get; set; }
    }

    public class ResetPasswordRequest : UiRequestBase
    {
        public string new_password { get; set; }
    }


    public class ImpersonateRequest : UiRequestBase
    {
        public string userId { get; set; }
        public string userPhone { get; set; }
        public string userAddress { get; set; }
        public string userEmail { get; set; }
        public string userName { get; set; }
        public string lastLoginDate { get; set; }
    }

    public class ContactAdvisorInfoRequest : UiRequestBase
    {
        public string userId { get; set; }
    }



}