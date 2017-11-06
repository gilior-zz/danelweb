using log4net;
using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
//using Microsoft.Owin.Security.Facebook;
//using Microsoft.Owin.Security.MicrosoftAccount;
using Owin;
using System;
using System.Web;

[assembly: OwinStartupAttribute(typeof(Danel.WebApp.Startup))]
namespace Danel.WebApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            AuthConfig.Configure(app);
        }
    }
}
