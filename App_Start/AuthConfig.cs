using log4net;
using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
//using Microsoft.Owin.Security.Facebook;
//using Microsoft.Owin.Security.MicrosoftAccount;
using Owin;
//using System;
//using System.Web;
using Danel.Common;

namespace Danel.WebApp
{
    public partial class AuthConfig
    {
        public static void Configure(IAppBuilder app)
        {
            ILog logger = DIContainer.Instance.Resolve<ILog>();

            //
            //  Enable the application to use a cookie to store information for the logged in user
            //
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString("/Auth/Login"),
                CookieName = SiteContext.AuthCookieName,
            });
        }
    }
}
