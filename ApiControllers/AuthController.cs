using Danel.Common;
using Danel.WebApp.Dal.Model;
using Danel.WebApp.DataManagers;
using Danel.WebApp.Services;
using Danel.WebApp.Services.AuthService;
using Danel.X.Web.Common;
using Danel.X.Web.Common.Communication;
using Danel.X.Web.Common.Utiles;
using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;


namespace Danel.WebApp.ApiControllers
{
    /// <summary>
    /// Responsible for login/logout
    /// Just a small wrapper around AuthService
    /// </summary>
    [AllowAnonymous]
  //  [ActiveWebSite]
    public class AuthController : BaseApiController
    {
        [AcceptVerbs("POST")]
        public AuthLoginResponse Login(AuthLoginRequest request)
        {


            IAuthService authService = DIContainer.Instance.Resolve<IAuthService>();
            var authLoginResponseInfo = authService.Login(request.userName, request.password, request.rememberMe);

            if (authLoginResponseInfo.loginDetails.loginResult != "Ok")
            {


                throw new DanelException(ErrorCode.SecurityError, "Invalid user name or password");
            }

            var retVal = new AuthLoginResponse();
            retVal.loginDetails = authLoginResponseInfo.loginDetails;
            retVal.userDetails = authLoginResponseInfo.userDetails;

            return retVal;
        }




        [AcceptVerbs("GET")]
        public HttpResponseMessage ResetPassword([FromUri(Name = "id")]string token)
        {
            IAuthService authService = DIContainer.Instance.Resolve<IAuthService>();
            AuthLoginResponseInfo authLoginResponseInfo = null;

            var response = Request.CreateResponse(HttpStatusCode.Found);
            response.Headers.Location = new Uri(WebConfigManager.Instance["website-url"].ToString());

            try
            {
                authLoginResponseInfo = authService.LoginWithToken(token);
            }
            catch (Exception)
            {
                return response;
            }
            return response;

        }

        [AcceptVerbs("GET")]
        public HttpResponseMessage SSO([FromUri(Name = "id")]string userGuid)
        {
            IAuthService authService = DIContainer.Instance.Resolve<IAuthService>();
            AuthLoginResponseInfo authLoginResponseInfo = null;

            var response = Request.CreateResponse(HttpStatusCode.Found);
            response.Headers.Location = new Uri(WebConfigManager.Instance["website-url"].ToString() + "/dashboard");

            try
            {
                authLoginResponseInfo = authService.LoginSSO(userGuid);
            }
            catch (Exception)
            {
                return response;
            }
            return response;

        }

        [AcceptVerbs("POST")]
        public void CheckCodeInjection(EmptyRequest request)
        {
            IAuthService authService = DIContainer.Instance.Resolve<IAuthService>();
            AuthLoginResponseInfo authLoginResponseInfo = null;

            var response = Request.CreateResponse(HttpStatusCode.Found);
            response.Headers.Location = new Uri(WebConfigManager.Instance["website-url"].ToString());

            try
            {
                authLoginResponseInfo = authService.LoginWithToken(request.token);
            }
            catch (Exception)
            {
                throw;
            }


        }





        [AcceptVerbs("POST")]
        public AuthLogoutResponse Logout(EmptyRequest emptyRequest)
        {
            //LoginDetails loginDetails = AuthService.CurrentLoginInfo.loginDetails;
            //var req = DIContainer.Instance.Resolve<IUsersDataManager>().GetRequset();
            //req.WebUserRequestType = WebUserRequestType.Logout;
            //req.UserToken = loginDetails.id;
            //DIContainer.Instance.Resolve<IRequestHandler>().HandleRequest(req);
            IAuthService authService = DIContainer.Instance.Resolve<IAuthService>();
            authService.Logout();
            return new AuthLogoutResponse()
            {
                OK = true,
            };
        }


    }



    public class AuthLoginResponse
    {
        public LoginDetails loginDetails { get; set; }
        public UserDetails userDetails { get; set; }
    }


    public class AuthLogoutResponse
    {
        public bool OK { get; set; }
    }
}
