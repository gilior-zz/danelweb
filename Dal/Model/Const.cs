using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Constants
{

    public class ResetPass
    {
         public const string Reset_Password = "ResetPassword";
         public const string Temporary_Password = "TemporaryPassword";
    }
    public class Claims
    {
        //
        //  A standard MS role claim
        //  We use standard CLAIM so we can use MS built-in authentication filter Authorize
        //
        public const string CLAIM_ROLE = @"http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

        //
        //  Danel non standard claims
        //
        public const string CLAIM_STATUS = "Status";
        public const string CLAIM_ID = "Id";
        public const string CLAIM_USERID = "UserId";
        public const string CLAIM_USER_ROLE = "UserRole";
        public const string CLAIM_AUTHORIZED_ENTITY_LIST = "AuthorizedEntityList";
        public const string CLAIM_CHANGE_PASSWORD = "changePassword";


        public const string CLAIM_USER_USERID = "UserUserId";
        public const string CLAIM_USER_NAME = "UserUserName";
        //public const string CLAIM_USER_FIRST_NAME = "UserFirstName";
        public const string CLAIM_USER_EMAIL = "UserEmail";
        public const string CLAIM_USER_PHONE = "UserPhone";
        public const string CLAIM_USER_ADRESS = "UserAdress";
        public const string CLAIM_USER_AUTHORIZED_ENTITY_LIST = "UserAuthorizedEntityList";
        public const string CLAIM_USER_LAST_LOGIN_DATE = "userLastLoginDate";


        public const string CLAIM_ADMIN_FIRST_NAME = "AdminFirstName";
        public const string CLAIM_ADMIN_EMAIL = "AdminEmail";
        public const string CLAIM_ADMIN_PHONE = "AdminPhone";
        public const string CLAIM_ADMIN_ADRESS = "AdminAdress";
        public const string CLAIM_ADMIN_ID = "AdminID";
    }

    public class Roles
    {
          public const string WebAdmin = "WebAdmin";
          public const string ResetPassword = "ResetPassword";
    }
}