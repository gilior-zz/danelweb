using Danel.Common;
using Danel.WebApp.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Danel.WebApp.Services.AuthService;
using Danel.X.Web.Common;

namespace Danel.WebApp.MvcControllers
{
    public class MainController : BaseController
    {
        public ActionResult Layout()
        {
            //
            //  Request.ApplicationPath returns the virtual path name according to IIS configuration not according to the request URL
            //  In case the user uses /danel but IIS configuratio is Danel the URL will be replaced by angular to /Danel
            //  To prevent this small issue we use Request.Url.Segments[1] instead of Request.ApplicationPath
            //
            string baseHref;
            if (Request.ApplicationPath != "/")
            {
                baseHref = "/" + Request.Url.Segments[1];
                if (!baseHref.EndsWith("/"))
                {
                    //
                    //  base href must end with / 
                    //  Else, Angular understanding of this base is wrong
                    //                
                    baseHref += "/";
                }
            }
            else
            {
                baseHref = "/";
            }
            //var length = Request.Url.Segments.Length;
            //var segments = Request.Url.Segments;
            //if (length == 3)
            //{
            //    var url = segments[1].Remove(segments[1].LastIndexOf("/"));
            //    if (url == Constants.ResetPass.Reset_Password)
            //    {
            //        var guid = segments[2];
            //        CacheManager.Instance[Constants.ResetPass.Temporary_Password] = guid;
            //    }
            //}
            LayoutModel model = new LayoutModel()
            {
                BaseHref = baseHref,
                Bundles = new string[]
                {
                    "~/bundles/lib",
                    "~/bundles/lib/kendo",
                    "~/bundles/common",
                    "~/bundles/directives",
                    "~/bundles/controllers",
                }
            };

            return View(model);
        }

        [ChildActionOnly]
        public ActionResult Header()
        {
            return View();
        }

        [ChildActionOnly]
        public ActionResult SiteProgress()
        {
            return View();
        }

        public ActionResult Home()
        {
            return View();
        }

        [ChildActionOnly]
        public ActionResult AppDetails()
        {
            AppDetailsModel model = new AppDetailsModel()
            {
                AppUrl = (Request.ApplicationPath == "/" ? "" : Request.ApplicationPath),
                AuthCookieName = SiteContext.AuthCookieName,
            };

            IAuthService authService = DIContainer.Instance.Resolve<IAuthService>();

            model.CurrentLoginInfo = authService.CurrentLoginInfo;

            return View(model);
        }

        [ChildActionOnly]
        public ActionResult WebSiteParams()
        {
            Dictionary<WebParameter, string> model = WebCacheManager.Instance.GetValue<Dictionary<WebParameter, string>>("generalParameters", null);


            return View(model);
        }

    }

    public class LayoutModel
    {
        public string BaseHref { get; set; }
        public string[] Bundles { get; set; }
    }

    public class AppDetailsModel
    {
        public string AppUrl { get; set; }
        public string AuthCookieName { get; set; }
        public AuthLoginResponseInfo CurrentLoginInfo { get; set; }
    }
}
