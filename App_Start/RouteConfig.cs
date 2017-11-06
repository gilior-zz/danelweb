using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Danel.WebApp
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Views",
                url: "views/{controller}/{action}"
            );

            //routes.MapRoute(
            //     name: "ResetPassword",
            //     url: "ResetPassword",
            //     defaults: new { controller = "Auth", action = "ResetPassword" }
            // );

            //
            //  Returns the single page 
            //
            routes.MapRoute(
                name: "Default",
                url: "{*path}",
                defaults: new { controller = "Main", action = "Layout"}
            );
        }
    }
}
