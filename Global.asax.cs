using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security;
using System.Web.SessionState;
using System.Web.Http;
using System.Web.Optimization;
using log4net.Config;
using System.Data.Entity;
using log4net;
using Danel.WebApp.Services.AuthService;
using Danel.Common;
using System.Threading;
using Microsoft.Owin.Security;
using System.Security.Claims;
using Danel.WebApp.DataManagers;
using Danel.X.Web.Common.Communication;
using Danel.WebApp.Dal.Model;
using Danel.Common.Api.Entity;
using Danel.Common.Api.Request;
using Danel.Common.Configuration;
using System.IO;

using Danel.Common.Api.Response;
using System.Diagnostics;
using System.Drawing;
using Danel.X.Web.Common.Utiles;
using Danel.X.Web.Common;
using Danel.WebApp.Filters;
using Danel.WebApp.Services;

namespace Danel.WebApp
{
    public class Global : HttpApplication
    {

        protected void Session_Start(object sender, EventArgs e)
        {
            var req = DIContainer.Instance.Resolve<ISessionDataManager>().GetRequest();
            var danelRes = DIContainer.Instance.Resolve<IRequestHandler>().HandleRequest(req);
            var res = danelRes as OnSessionStartResponse;
            if (res != null && res.GeneralParameters != null)
            {
              
                WebCacheManager.Instance.SetValue("generalParameters", res.GeneralParameters);
                LocalizerService.Instance.LocalizationItems = res.localizationItems;
                //var websiteDirectory = WebConfigManager.Instance["website-directory"].ToString();
                //var customStylePath = string.Format("{0}\\{1}", websiteDirectory, @"Content\customStyle.less");          

                //var mainLessPath = string.Format("{0}\\{1}", websiteDirectory, @"Content\Site.less");

                //var compiledLessPath = string.Format("{0}\\{1}", websiteDirectory, @"Content\Site.css");


                //var content = File.ReadAllText(customStylePath);
                //var colorvalue = res.GeneralParameters[WebParameter.WebsiteMainColor];
                //if (!string.IsNullOrEmpty(colorvalue))
                //{
                //    int colorInt;
                //    if (int.TryParse(colorvalue, out colorInt))
                //    {
                //        var maincolor = ColorTranslator.FromWin32(colorInt);
                //        if (maincolor != null)
                //        {
                //            var colorDefinition = string.Format("@leading-color:rgb({0},{1},{2});", maincolor.R, maincolor.G, maincolor.B);

                //            File.WriteAllText(customStylePath, colorDefinition);
                //            Process.Start("cmd", "/c lessc " + mainLessPath + " " + compiledLessPath + "");
                //        }
                //    }
                //}


                //  var f = File.Open(Server.MapPath(file),FileMode.Open);


            }


        }

        void Session_End(Object sender, EventArgs E)
        {
            //IAuthService authService = DIContainer.Instance.Resolve<IAuthService>();
            //AuthServiceOnAspNetIdentity a = new AuthServiceOnAspNetIdentity();
            //var currentContext = CacheManager.Instance.GetValue<AuthServiceOnAspNetIdentity>("AuthenticationManager", null);
            EmptyRequest emptyRequest = new EmptyRequest();
            var token = WebCacheManager.Instance.GetValue("TokenID", string.Empty);
            emptyRequest.token = token;
            var accounts = WebCacheManager.Instance.GetValue(token, new AccountDetailsDTO[0]);
            var list = new List<DanelEntity>();
            foreach (var item in accounts.Where(i => i.AccountID != "-1"))
                list.Add(new DanelEntity() { EntityType = ApiEntityType.Account, Id = item.AccountID });
            emptyRequest.entityList = list;
            var req = DIContainer.Instance.Resolve<IUsersDataManager>().GetRequset(emptyRequest);
            req.WebUserRequestType = WebUserRequestType.Logout;
            DIContainer.Instance.Resolve<IRequestHandler>().HandleRequest(req);
        }

        void Application_Start(object sender, EventArgs e)
        {
            XmlConfigurator.Configure();

            ILog logger = log4net.LogManager.GetLogger("Main");
            logger.Debug("Application_Start - BEGIN");

            try
            {
                LogSiteDetails(logger);

                DIConfig.Configure();

                AreaRegistration.RegisterAllAreas();

                GlobalConfiguration.Configure(WebApiConfig.Register);

                GlobalFilters.Filters.Add(new NoCacheAttribute());

                RouteConfig.RegisterRoutes(RouteTable.Routes);

                BundleConfig.Configure(BundleTable.Bundles);

                MapConfig.Configure();
            }
            finally
            {
                logger.Debug("Application_Start - END");
            }
        }

        private static void LogSiteDetails(ILog logger)
        {
            string siteName = System.Web.Hosting.HostingEnvironment.ApplicationHost.GetSiteName();
            logger.Debug("    SiteName: " + siteName);
        }
    }
}