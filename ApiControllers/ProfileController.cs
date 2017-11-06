using Constants;
using Danel.Common;
using Danel.Common.Api.Response;
using Danel.Common.Configuration;
using Danel.WebApp.Attributes;
using Danel.WebApp.Dal.Model;
using Danel.WebApp.DataManagers;
using Danel.WebApp.Services;
using Danel.WebApp.Services.AuthService;
using Danel.WebApp.Stores;
using Danel.X.Web.Common;
using Danel.X.Web.Common.Communication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Danel.WebApp.ApiControllers
{
    public class ProfileController : BaseApiController
    {
        [AcceptVerbs("POST")]
        public string UpdateProfile(MessageRequest m)
        {
            LoginDetails loginDetails = AuthService.CurrentLoginInfo.loginDetails;
            var req = DIContainer.Instance.Resolve<IProfileDataManager>().GetRequset(ProfileRequestType.UserDetails, m: m);
            req.UserID = loginDetails.userId;
            DanelDataResponse danelDataResponse = DIContainer.Instance.Resolve<IRequestHandler>().HandleRequest(req);
            var res = danelDataResponse as DanelProfileResponse;
            string result = string.Empty;
            switch (res.ProfileResponseStatus)
            {
                case ProfileResponseStatus.Success:
                    IAuthService authService = DIContainer.Instance.Resolve<IAuthService>();
                    List<string> lis = new List<string>();
                    lis.Add(Claims.CLAIM_USER_EMAIL);
                    lis.Add(Claims.CLAIM_USER_PHONE);
                    lis.Add(Claims.CLAIM_USER_ADRESS);
                    authService.RemoveUserClaims(lis);

                    var userDetails = new UserDetails()
                    {
                        address = m.address,
                        email = m.email,
                        phone = m.phone,
                    };

                    Dictionary<string, string> claim_value = new Dictionary<string, string>();

                    claim_value.Add(Claims.CLAIM_USER_EMAIL, userDetails.email);
                    claim_value.Add(Claims.CLAIM_USER_PHONE, userDetails.phone);
                    claim_value.Add(Claims.CLAIM_USER_ADRESS, userDetails.address);

                    authService.UpdateUserClaims(claim_value);

                    result = "נתונים עודכנו בהצלחה";
                    break;
                case ProfileResponseStatus.Unknown:
                    result = "בעיה בעדכון נתונים - אנא נסו מאוחר יותר";
                    break;
            }
            return result;
        }

        [AcceptVerbs("POST")]
        [Role(Role = "ResetPassword")]
        public int UpdatePassword(ChangePasswordRequest cp)
        {
            if (cp.new_password == cp.current_password)
            {
                throw new DanelException(ErrorCode.DuplicatedPassword, "Duplicated Password");
            }
            LoginDetails loginDetails = AuthService.CurrentLoginInfo.loginDetails;
            var req = DIContainer.Instance.Resolve<IProfileDataManager>().GetRequset(cp.isResetPasswordMode ? ProfileRequestType.ResetPassword : ProfileRequestType.ChangePassword, cp: cp);

            req.UserID = loginDetails.userId;
            DanelDataResponse danelDataResponse = DIContainer.Instance.Resolve<IRequestHandler>().HandleRequest(req);
            var res = danelDataResponse as DanelProfileResponse;
            switch (res.ProfileResponseStatus)
            {
                case ProfileResponseStatus.InvalidOldPassword:
                    throw new DanelException(ErrorCode.PreviousPasswordIncncorrect, "Previous Password Incncorrect");
                case ProfileResponseStatus.Unknown:
                    throw new DanelException(ErrorCode.InternalServerError, "InternalServerError");
                case ProfileResponseStatus.PasswordAlreadyInHistory:
                    throw new DanelException(ErrorCode.PasswordAlreadyInHistory, "Password Already In History");
            }
            return 1;
        }
    }
}