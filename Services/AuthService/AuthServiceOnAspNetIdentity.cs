using System;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Security.Principal;
using System.Web;
using ActiveUp.Net.Groupware.vCard;
using Danel.Common;
using Danel.Common.Api.Request;
using Danel.X.Web.Common;
using Danel.X.Web.Common.Communication;
using log4net;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using Newtonsoft.Json;
using Constants;
using System.Web.Mvc;
using System.Collections.Generic;
using Danel.WebApp.DataManagers;
using Danel.WebApp.Dal.Model;
using Danel.Common.Api.Entity;
using Danel.Common.Api.Response;
using Danel.X.WebApp.Common;

namespace Danel.WebApp.Services.AuthService
{
    public class AuthServiceOnAspNetIdentity : IAuthService
    {
        //
        //  A standard MS role claim
        //  We use standard CLAIM so we can use MS built-in authentication filter Authorize
        //







        // the login details
        private AuthLoginResponseInfo loginResult;
        private ClaimsIdentity claims;

        public AuthServiceOnAspNetIdentity()
        {
            ClaimsPrincipal user = AuthenticationManager.User;

            //
            //  User is not null even when not authenticated. Need to explictly check for the IsAuthenticated flag
            //
            if (user.Identity != null && user.Identity.IsAuthenticated)
            {
                loginResult = new AuthLoginResponseInfo();
                var loginDetails = new LoginDetails()
                {
                    loginResult = ReadClaimStringOrNull(user, Claims.CLAIM_STATUS),
                    id = ReadClaimStringOrNull(user, Claims.CLAIM_ID),
                    userId = ReadClaimStringOrNull(user, Claims.CLAIM_USERID),
                    role = ReadClaimStringOrNull(user, Claims.CLAIM_USER_ROLE),
                    authorizedEntityList = ReadClaimStringOrNull(user, Claims.CLAIM_AUTHORIZED_ENTITY_LIST),
                    changePassword = ReadClaimStringOrNull(user, Claims.CLAIM_CHANGE_PASSWORD),

                };

                var userDetails = new UserDetails()
                {
                    userId = ReadClaimStringOrNull(user, Claims.CLAIM_USER_USERID),
                    name = ReadClaimStringOrNull(user, Claims.CLAIM_USER_NAME),
                    email = ReadClaimStringOrNull(user, Claims.CLAIM_USER_EMAIL),
                    phone = ReadClaimStringOrNull(user, Claims.CLAIM_USER_PHONE),
                    address = ReadClaimStringOrNull(user, Claims.CLAIM_USER_ADRESS),
                    authorizedEntityList = ReadClaimStringOrNull(user, Claims.CLAIM_USER_AUTHORIZED_ENTITY_LIST),
                    lastLoginDate = ReadClaimStringOrNull(user, Claims.CLAIM_USER_LAST_LOGIN_DATE),
                };

                var adminDetails = new UserDetails()
                {
                    userId = ReadClaimStringOrNull(user, Claims.CLAIM_ADMIN_ID),
                    name = ReadClaimStringOrNull(user, Claims.CLAIM_ADMIN_FIRST_NAME),
                    email = ReadClaimStringOrNull(user, Claims.CLAIM_ADMIN_EMAIL),
                    phone = ReadClaimStringOrNull(user, Claims.CLAIM_ADMIN_PHONE),
                    address = ReadClaimStringOrNull(user, Claims.CLAIM_ADMIN_ADRESS)
                };

                loginResult.loginDetails = loginDetails;
                loginResult.userDetails = userDetails;
                loginResult.adminDetails = adminDetails;
            }
        }

        public AuthLoginResponseInfo LoginWithToken(string token)
        {
            var loginRequest = new LoginRequest()
            {
                RequestId = Guid.NewGuid().ToString(),
                Token = token,
                LoginRequestType = LoginRequestType.WithToken
            };
            var loginDetails = new LoginDetails();
            var userDetails = new UserDetails();
            var adminDetails = new UserDetails();
            LoginResponse loginResponse = null;
            try
            {
                loginResponse = DIContainer.Instance.Resolve<IRequestHandler>().Login(loginRequest);
            }
            catch (Exception ex)
            {
                throw new DanelException(ErrorCode.SecurityError, "תקלה בתהליך ההזדהות");
            }

            if (loginResponse.LoginResult == LoginResults.PasswordExpired)
                throw new DanelException(ErrorCode.TempPasswordExpired, "סיסמה זמנית אינה בתוקף");

            if (loginResponse.LoginResult == LoginResults.InvalidPassword)
                throw new DanelException(ErrorCode.InvalidTempPassword, "סיסמה זמנית אינה נכונה");


            if (loginResponse.LoginResult == LoginResults.OK ||
                loginResponse.LoginResult == LoginResults.UserAlreadyLogged)
            {

                loginDetails.loginResult = loginResponse.LoginResult == LoginResults.OK || loginResponse.LoginResult == LoginResults.UserAlreadyLogged ? "Ok" : "Error";
                loginDetails.userId = loginResponse.UserDetails.UserId;
                loginDetails.id = loginResponse.UserInfo.TokenID;
                loginDetails.role = loginResponse.UserInfo.UserType.ToString();
                loginDetails.authorizedEntityList = JsonConvert.SerializeObject(loginResponse.AuthorizedEntityList);
                loginDetails.changePassword = loginResponse.UserDetails.ChangePassword ? "True" : "False";


                if (loginDetails.role == UserType.WebAdmin.ToString())
                {
                    adminDetails.userId = loginResponse.UserDetails.UserId;
                    adminDetails.name = loginResponse.UserDetails.UserFirstName;
                    adminDetails.email = loginResponse.UserDetails.UserEmail.Trim();
                    adminDetails.phone = loginResponse.UserDetails.UserPhone;
                    adminDetails.address = loginResponse.UserDetails.UserAddress;
                }
                else
                {
                    userDetails.userId = loginResponse.UserDetails.UserId;
                    userDetails.name = loginResponse.UserDetails.UserFirstName;
                    userDetails.email = loginResponse.UserDetails.UserEmail.Trim();
                    userDetails.phone = loginResponse.UserDetails.UserPhone;
                    userDetails.address = loginResponse.UserDetails.UserAddress;
                    userDetails.authorizedEntityList = loginDetails.authorizedEntityList;
                    userDetails.lastLoginDate = loginResponse.UserDetails.LastLoginDate.ToString("dd/MM/yyyy");
                }


                //
                //  Create identity with all required information
                //
                var identity = new GenericIdentity(userDetails.name, DefaultAuthenticationTypes.ApplicationCookie);

                var claims = new ClaimsIdentity(identity);
                claims.AddClaim(new Claim(Claims.CLAIM_STATUS, loginDetails.loginResult));
                claims.AddClaim(new Claim(Claims.CLAIM_ID, loginDetails.id));
                claims.AddClaim(new Claim(Claims.CLAIM_USERID, loginDetails.userId));
                claims.AddClaim(new Claim(Claims.CLAIM_USER_ROLE, loginDetails.role));
                claims.AddClaim(new Claim(Claims.CLAIM_AUTHORIZED_ENTITY_LIST, loginDetails.authorizedEntityList));
                claims.AddClaim(new Claim(Claims.CLAIM_CHANGE_PASSWORD, loginDetails.changePassword));


                if (loginDetails.role == UserType.WebAdmin.ToString())
                {
                    claims.AddClaim(new Claim(Claims.CLAIM_ADMIN_ID, adminDetails.userId));
                    claims.AddClaim(new Claim(Claims.CLAIM_ADMIN_FIRST_NAME, adminDetails.name));
                    claims.AddClaim(new Claim(Claims.CLAIM_ADMIN_EMAIL, adminDetails.email));
                    claims.AddClaim(new Claim(Claims.CLAIM_ADMIN_PHONE, adminDetails.phone));
                    claims.AddClaim(new Claim(Claims.CLAIM_ADMIN_ADRESS, adminDetails.address));
                }
                else
                {
                    claims.AddClaim(new Claim(Claims.CLAIM_USER_USERID, userDetails.userId));
                    claims.AddClaim(new Claim(Claims.CLAIM_USER_NAME, userDetails.name));
                    claims.AddClaim(new Claim(Claims.CLAIM_USER_EMAIL, userDetails.email));
                    claims.AddClaim(new Claim(Claims.CLAIM_USER_PHONE, userDetails.phone));
                    claims.AddClaim(new Claim(Claims.CLAIM_USER_ADRESS, userDetails.address));
                    claims.AddClaim(new Claim(Claims.CLAIM_USER_AUTHORIZED_ENTITY_LIST, loginDetails.authorizedEntityList));
                    claims.AddClaim(new Claim(Claims.CLAIM_USER_LAST_LOGIN_DATE, userDetails.lastLoginDate));
                }

                //
                //  Create auth cookie
                //
                AuthenticationManager.SignOut(DefaultAuthenticationTypes.ExternalCookie);
                AuthenticationManager.SignIn(new AuthenticationProperties() { IsPersistent = false }, claims);

                CreateCSRFCookie();

                //
                //  Caching for later use
                //
                this.loginResult = loginResult;
                WebCacheManager.Instance["TokenID"] = loginDetails.id;
            }
            return new AuthLoginResponseInfo { loginDetails = loginDetails, userDetails = userDetails };
        }

        public AuthLoginResponseInfo Login(string userName, string password, bool rememberMe)
        {
            string compnanyName = "בית השקעות";
            var parameters = WebCacheManager.Instance.GetValue<Dictionary<WebParameter, string>>("generalParameters", null);
            if (parameters != null)
            {
                var companyDisplayName = ParameterService.GetParametervalue(WebParameter.CompanyDisplayName, "");
                if (!string.IsNullOrEmpty(companyDisplayName))
                {
                    compnanyName = companyDisplayName;
                }
            }
            var loginCounter = WebCacheManager.Instance.GetValue("loginCounter", 1);
            var maxFails = ParameterService.GetParametervalue(WebParameter.FalseLoginsToWebSite, 1);


            var loginRequest = new LoginRequest()
            {
                RequestId = Guid.NewGuid().ToString(),
                UserName = userName,
                UserPassword = password
            };

            var loginDetails = new LoginDetails();
            var userDetails = new UserDetails();
            var adminDetails = new UserDetails();
            LoginResponse loginRes = null;
            try
            {
                loginRes = DIContainer.Instance.Resolve<IRequestHandler>().Login(loginRequest);
            }
            catch (Exception ex)
            {
                throw new DanelException(ErrorCode.SecurityError, "תקלת קישור");
            }
            if (loginRes.LoginResult == LoginResults.OK ||
                loginRes.LoginResult == LoginResults.UserAlreadyLogged)
            {
                WebCacheManager.Instance.SetValue("loginCounter", 1);
                loginDetails.loginResult = loginRes.LoginResult == LoginResults.OK || loginRes.LoginResult == LoginResults.UserAlreadyLogged ? "Ok" : "Error";
                loginDetails.userId = loginRes.UserDetails.UserId;
                loginDetails.id = loginRes.UserInfo.TokenID;
                loginDetails.role = loginRes.UserInfo.UserType.ToString();
                loginDetails.authorizedEntityList = JsonConvert.SerializeObject(loginRes.AuthorizedEntityList);
                loginDetails.changePassword = loginRes.UserDetails.ChangePassword ? "True" : "False";


                if (loginDetails.role == UserType.WebAdmin.ToString())
                {
                    adminDetails.userId = loginRes.UserDetails.UserId;
                    adminDetails.name = loginRes.UserDetails.UserName;
                    adminDetails.email = loginRes.UserDetails.UserEmail.Trim();
                    adminDetails.phone = loginRes.UserDetails.UserPhone;
                    adminDetails.address = loginRes.UserDetails.UserAddress;
                }
                else
                {
                    userDetails.userId = loginRes.UserDetails.UserId;
                    userDetails.name = loginRes.UserDetails.UserName;
                    userDetails.email = loginRes.UserDetails.UserEmail.Trim();
                    userDetails.phone = loginRes.UserDetails.UserPhone;
                    userDetails.address = loginRes.UserDetails.UserAddress;
                    userDetails.authorizedEntityList = loginDetails.authorizedEntityList;
                    userDetails.lastLoginDate = loginRes.UserDetails.LastLoginDate.ToString("dd/MM/yyyy");

                }
                //
                //  Create identity with all required information
                //
                var identity = new GenericIdentity(userName, DefaultAuthenticationTypes.ApplicationCookie);

                var claims = new ClaimsIdentity(identity);
                claims.AddClaim(new Claim(Claims.CLAIM_STATUS, loginDetails.loginResult));
                claims.AddClaim(new Claim(Claims.CLAIM_ID, loginDetails.id));
                claims.AddClaim(new Claim(Claims.CLAIM_USERID, loginDetails.userId));
                claims.AddClaim(new Claim(Claims.CLAIM_USER_ROLE, loginDetails.role));
                claims.AddClaim(new Claim(Claims.CLAIM_AUTHORIZED_ENTITY_LIST, loginDetails.authorizedEntityList));
                claims.AddClaim(new Claim(Claims.CLAIM_CHANGE_PASSWORD, loginDetails.changePassword));


                if (loginDetails.role == UserType.WebAdmin.ToString())
                {
                    claims.AddClaim(new Claim(Claims.CLAIM_ADMIN_ID, adminDetails.userId));
                    claims.AddClaim(new Claim(Claims.CLAIM_ADMIN_FIRST_NAME, adminDetails.name));
                    claims.AddClaim(new Claim(Claims.CLAIM_ADMIN_EMAIL, adminDetails.email));
                    claims.AddClaim(new Claim(Claims.CLAIM_ADMIN_PHONE, adminDetails.phone));
                    claims.AddClaim(new Claim(Claims.CLAIM_ADMIN_ADRESS, adminDetails.address));
                }
                else
                {
                    claims.AddClaim(new Claim(Claims.CLAIM_USER_USERID, userDetails.userId));
                    claims.AddClaim(new Claim(Claims.CLAIM_USER_NAME, userDetails.name));
                    claims.AddClaim(new Claim(Claims.CLAIM_USER_EMAIL, userDetails.email));
                    claims.AddClaim(new Claim(Claims.CLAIM_USER_PHONE, userDetails.phone));
                    claims.AddClaim(new Claim(Claims.CLAIM_USER_ADRESS, userDetails.address));
                    claims.AddClaim(new Claim(Claims.CLAIM_USER_AUTHORIZED_ENTITY_LIST, loginDetails.authorizedEntityList));
                    claims.AddClaim(new Claim(Claims.CLAIM_USER_LAST_LOGIN_DATE, userDetails.lastLoginDate));
                }

                //
                //  Create auth cookie
                //
                AuthenticationManager.SignOut(DefaultAuthenticationTypes.ExternalCookie);
                AuthenticationManager.SignIn(new AuthenticationProperties() { IsPersistent = rememberMe }, claims);

                CreateCSRFCookie();

                //
                //  Caching for later use
                //
                this.loginResult = loginResult;
                WebCacheManager.Instance["TokenID"] = loginDetails.id;
                WebCacheManager.Instance.SetValue("loginCounter", 1);

                return new AuthLoginResponseInfo { loginDetails = loginDetails, userDetails = userDetails };
            }

            else
            {
                
                if (loginCounter >= maxFails)
                {
                    var blockUserRequest = new LoginRequest()
                    {
                        RequestId = Guid.NewGuid().ToString(),
                        UserName = userName,
                        LoginRequestType = LoginRequestType.BlockUser

                    };
                    var loginResponse = DIContainer.Instance.Resolve<IRequestHandler>().Login(blockUserRequest);
                    if (loginResponse.LoginResult == LoginResults.UserBlocked)
                    {
                        WebCacheManager.Instance.SetValue("loginCounter", 1);
                        throw new DanelException(ErrorCode.SecurityError, "משתמש נחסם. יש לפנות ל" + compnanyName);
                    }
                    else
                    {
                        WebCacheManager.Instance.SetValue("loginCounter", 1);
                        throw new DanelException(ErrorCode.SecurityError, "תקלה בתהליך ההזדהות. אנא נסה שנית");
                    }

                }
                else
                {
                    WebCacheManager.Instance.SetValue("loginCounter", ++loginCounter);
                    throw new DanelException(ErrorCode.SecurityError, "שם משתמש או סיסמה אינם נכונים");
                }
            }





        }

        public void UpdateUserClaims(Dictionary<string, string> claim_value)
        {
            var claims = AuthenticationManager.User.Identities.GetEnumerator();
            if (claims != null)
            {
                claims.MoveNext();
                if (claims != null)
                {
                    foreach (var item in claim_value)
                    {
                        claims.Current.AddClaim(new Claim(item.Key, item.Value));
                    }
                    //claims.Current.AddClaim(new Claim(Claims.CLAIM_USER_USERID, userDetails.userId));
                    //claims.Current.AddClaim(new Claim(Claims.CLAIM_USER_FIRST_NAME, userDetails.name));
                    //claims.Current.AddClaim(new Claim(Claims.CLAIM_USER_EMAIL, userDetails.email));
                    //claims.Current.AddClaim(new Claim(Claims.CLAIM_USER_PHONE, userDetails.phone));
                    //claims.Current.AddClaim(new Claim(Claims.CLAIM_USER_ADRESS, userDetails.address));
                    //claims.Current.AddClaim(new Claim(Claims.CLAIM_USER_AUTHORIZED_ENTITY_LIST, JsonConvert.SerializeObject(userDetails.Entities)));
                    AuthenticationManager.SignIn(new AuthenticationProperties() { IsPersistent = true }, claims.Current);
                }
            }
        }

        public string GetCacheDataAccessId()
        {
            ClaimsPrincipal user = AuthenticationManager.User;
            string cacheDataAccessId = null;

            //
            //  User is not null even when not authenticated. Need to explictly check for the IsAuthenticated flag
            //
            if (user.Identity != null && user.Identity.IsAuthenticated)
            {
                cacheDataAccessId = ReadClaimStringOrNull(user, Claims.CLAIM_ID);
            }

            return cacheDataAccessId;
        }

        [AllowAnonymous]
        public void Logout()
        {
            EmptyRequest emptyRequest = new EmptyRequest();
            var token = WebCacheManager.Instance.GetValue("TokenID", string.Empty);
            var accounts = WebCacheManager.Instance.GetValue(token, new AccountDetailsDTO[0]);
            var list = new List<DanelEntity>();
            foreach (var item in accounts)
                list.Add(new DanelEntity() { EntityType = ApiEntityType.Account, Id = item.AccountID });
            emptyRequest.entityList = list;
            emptyRequest.token = token;
            var req = DIContainer.Instance.Resolve<IUsersDataManager>().GetRequset(emptyRequest);
            req.WebUserRequestType = WebUserRequestType.Logout;



            DIContainer.Instance.Resolve<IRequestHandler>().HandleRequest(req);

            string csrfTokenName = DIContainer.Instance.Resolve<IGlobalProvider>().GetGlobal(GlobalNames.CSRF_TOKEN_NAME);

            DeleteCSRFCookie(csrfTokenName);

            AuthenticationManager.SignOut();
        }



        public string ReadClaimStringOrNull(ClaimsPrincipal user, string claimName)
        {
            var claim = user.FindFirst(claimName);
            if (claim == null)
            {
                return "";
            }


            return claim.Value;
        }

        public int ReadClaimInt(ClaimsPrincipal user, string claimName)
        {
            var claim = user.FindFirst(claimName);
            if (claim == null)
            {
                throw new Exception("Claim: " + claimName + " was not found for current logged-on user");
            }

            return int.Parse(claim.Value);
        }

        public AuthLoginResponseInfo CurrentLoginInfo
        {
            get { return loginResult; }
        }

        private void CreateCSRFCookie()
        {
            ILog logger = DIContainer.Instance.Resolve<ILog>();

            bool enabled = DIContainer.Instance.Resolve<IGlobalProvider>().GetGlobal(GlobalNames.ENABLE_CSRF_VALIDATION);
            if (!enabled)
            {
                logger.Info("CSRF validation is disabled");
                return;
            }

            string csrfTokenName = DIContainer.Instance.Resolve<IGlobalProvider>().GetGlobal(GlobalNames.CSRF_TOKEN_NAME);

            logger.Info("Creating CSRF cookie");

            byte[] bytes = new byte[16];
            RandomNumberGenerator.Create().GetBytes(bytes);
            string token = HttpUtility.UrlEncode(Convert.ToBase64String(bytes));

            logger.Info("Setting CSRF cookie: " + token);
            HttpCookie cookie = new HttpCookie(csrfTokenName, token);
            HttpContext.Current.Response.Cookies.Add(cookie);
        }

        private static void DeleteCSRFCookie(string csrfTokenName)
        {
            HttpCookie csrfCookie = HttpContext.Current.Request.Cookies[csrfTokenName];
            if (csrfCookie != null)
            {
                csrfCookie.Expires = DateTime.Now - TimeSpan.FromDays(365);
                HttpContext.Current.Response.Cookies.Add(csrfCookie);
            }
        }

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.Current.GetOwinContext().Authentication;
            }
        }


        public ClaimsIdentity CurrentClaims
        {
            get { return this.claims; }
        }


        public void RemoveUserClaims(List<string> claimsToRemove)
        {
            var currentClaims = AuthenticationManager.User.Identities.GetEnumerator();
            if (currentClaims != null)
            {
                currentClaims.MoveNext();
                if (currentClaims != null)
                {
                    foreach (var item in claimsToRemove)
                    {
                        var claim = currentClaims.Current.FindFirst(item);
                        currentClaims.Current.RemoveClaim(claim);
                    }
                    //var claim_a = currentClaims.Current.FindFirst(Claims.CLAIM_USER_USERID);
                    //var claim_b = currentClaims.Current.FindFirst(Claims.CLAIM_USER_FIRST_NAME);
                    //var claim_c = currentClaims.Current.FindFirst(Claims.CLAIM_USER_EMAIL);
                    //var claim_d = currentClaims.Current.FindFirst(Claims.CLAIM_USER_PHONE);
                    //var claim_e = currentClaims.Current.FindFirst(Claims.CLAIM_USER_ADRESS);
                    //var claim_f = currentClaims.Current.FindFirst(Claims.CLAIM_USER_AUTHORIZED_ENTITY_LIST);
                    //currentClaims.Current.RemoveClaim(claim_a);
                    //currentClaims.Current.RemoveClaim(claim_b);
                    //currentClaims.Current.RemoveClaim(claim_c);
                    //currentClaims.Current.RemoveClaim(claim_d);
                    //currentClaims.Current.RemoveClaim(claim_e);
                    //currentClaims.Current.RemoveClaim(claim_f);
                    AuthenticationManager.SignIn(new AuthenticationProperties() { IsPersistent = true }, currentClaims.Current);
                }
            }
        }

        public AuthLoginResponseInfo LoginSSO(string userGuid)
        {
            var loginRequest = new LoginRequest()
            {
                RequestId = Guid.NewGuid().ToString(),
                Token = userGuid,
                LoginRequestType = LoginRequestType.SSOUser
            };
            var loginDetails = new LoginDetails();
            var userDetails = new UserDetails();
            var adminDetails = new UserDetails();
            LoginResponse loginResponse = null;
            try
            {
                loginResponse = DIContainer.Instance.Resolve<IRequestHandler>().Login(loginRequest);
            }
            catch (Exception ex)
            {
                throw new DanelException(ErrorCode.SecurityError, "תקלה בתהליך ההזדהות");
            }

            if (loginResponse.LoginResult == LoginResults.PasswordExpired)
                throw new DanelException(ErrorCode.TempPasswordExpired, "סיסמה זמנית אינה בתוקף");

            if (loginResponse.LoginResult == LoginResults.InvalidPassword)
                throw new DanelException(ErrorCode.InvalidTempPassword, "סיסמה זמנית אינה נכונה");


            if (loginResponse.LoginResult == LoginResults.OK ||
                loginResponse.LoginResult == LoginResults.UserAlreadyLogged)
            {

                loginDetails.loginResult = loginResponse.LoginResult == LoginResults.OK || loginResponse.LoginResult == LoginResults.UserAlreadyLogged ? "Ok" : "Error";
                loginDetails.userId = loginResponse.UserDetails.UserId;
                loginDetails.id = loginResponse.UserInfo.TokenID;
                loginDetails.role = loginResponse.UserInfo.UserType.ToString();
                loginDetails.authorizedEntityList = JsonConvert.SerializeObject(loginResponse.AuthorizedEntityList);
                loginDetails.changePassword = loginResponse.UserDetails.ChangePassword ? "True" : "False";


                if (loginDetails.role == UserType.WebAdmin.ToString())
                {
                    adminDetails.userId = loginResponse.UserDetails.UserId;
                    adminDetails.name = loginResponse.UserDetails.UserFirstName;
                    adminDetails.email = loginResponse.UserDetails.UserEmail.Trim();
                    adminDetails.phone = loginResponse.UserDetails.UserPhone;
                    adminDetails.address = loginResponse.UserDetails.UserAddress;
                }
                else
                {
                    userDetails.userId = loginResponse.UserDetails.UserId;
                    userDetails.name = loginResponse.UserDetails.UserFirstName;
                    userDetails.email = loginResponse.UserDetails.UserEmail.Trim();
                    userDetails.phone = loginResponse.UserDetails.UserPhone;
                    userDetails.address = loginResponse.UserDetails.UserAddress;
                    userDetails.authorizedEntityList = loginDetails.authorizedEntityList;
                    userDetails.lastLoginDate = loginResponse.UserDetails.LastLoginDate.ToString("dd/MM/yyyy");
                }


                //
                //  Create identity with all required information
                //
                var identity = new GenericIdentity(userDetails.name, DefaultAuthenticationTypes.ApplicationCookie);

                var claims = new ClaimsIdentity(identity);
                claims.AddClaim(new Claim(Claims.CLAIM_STATUS, loginDetails.loginResult));
                claims.AddClaim(new Claim(Claims.CLAIM_ID, loginDetails.id));
                claims.AddClaim(new Claim(Claims.CLAIM_USERID, loginDetails.userId));
                claims.AddClaim(new Claim(Claims.CLAIM_USER_ROLE, loginDetails.role));
                claims.AddClaim(new Claim(Claims.CLAIM_AUTHORIZED_ENTITY_LIST, loginDetails.authorizedEntityList));
                claims.AddClaim(new Claim(Claims.CLAIM_CHANGE_PASSWORD, loginDetails.changePassword));


                if (loginDetails.role == UserType.WebAdmin.ToString())
                {
                    claims.AddClaim(new Claim(Claims.CLAIM_ADMIN_ID, adminDetails.userId));
                    claims.AddClaim(new Claim(Claims.CLAIM_ADMIN_FIRST_NAME, adminDetails.name));
                    claims.AddClaim(new Claim(Claims.CLAIM_ADMIN_EMAIL, adminDetails.email));
                    claims.AddClaim(new Claim(Claims.CLAIM_ADMIN_PHONE, adminDetails.phone));
                    claims.AddClaim(new Claim(Claims.CLAIM_ADMIN_ADRESS, adminDetails.address));
                }
                else
                {
                    claims.AddClaim(new Claim(Claims.CLAIM_USER_USERID, userDetails.userId));
                    claims.AddClaim(new Claim(Claims.CLAIM_USER_NAME, userDetails.name));
                    claims.AddClaim(new Claim(Claims.CLAIM_USER_EMAIL, userDetails.email));
                    claims.AddClaim(new Claim(Claims.CLAIM_USER_PHONE, userDetails.phone));
                    claims.AddClaim(new Claim(Claims.CLAIM_USER_ADRESS, userDetails.address));
                    claims.AddClaim(new Claim(Claims.CLAIM_USER_AUTHORIZED_ENTITY_LIST, loginDetails.authorizedEntityList));
                    claims.AddClaim(new Claim(Claims.CLAIM_USER_LAST_LOGIN_DATE, userDetails.lastLoginDate));
                }

                //
                //  Create auth cookie
                //
                AuthenticationManager.SignOut(DefaultAuthenticationTypes.ExternalCookie);
                AuthenticationManager.SignIn(new AuthenticationProperties() { IsPersistent = false }, claims);

                CreateCSRFCookie();

                //
                //  Caching for later use
                //
                this.loginResult = loginResult;
                WebCacheManager.Instance["TokenID"] = loginDetails.id;
            }
            return new AuthLoginResponseInfo { loginDetails = loginDetails, userDetails = userDetails };
        }
    }

}


//if (SiteContext.GetGlobal(GlobalNames.DEMO_MODE))
//{
//    //
//    //  Adding some delay so we can see the effect of the progress bar
//    //  Should be removed on production code
//    //

//}

//
//  Validate against Danel web services
//
//ILoginStore authService = DIContainer.Instance.Resolve<ILoginStore>();
//Login login = authService.ValidateCredentials(userName, password);
//if (login == null)
//{
//    return false;
//}
