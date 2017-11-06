using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Danel.WebApp.MvcControllers
{
    public class BaseController : Controller
    {
        protected new ViewResult View(object model = null)
        {
            string actionName = (string)RouteData.Values["action"];
            string controllerName = (string)RouteData.Values["controller"];

            string viewFilePath = "~/Scripts/Views/" + controllerName + "/" + actionName + ".cshtml";

            if (!System.IO.File.Exists(this.Server.MapPath(viewFilePath)))
            {
                viewFilePath = "~/Scripts/Views/" + controllerName + "/" + controllerName + actionName + ".cshtml";
            }

            if (!System.IO.File.Exists(this.Server.MapPath(viewFilePath)))
            {
                viewFilePath = "~/Scripts/Components/" + actionName + ".cshtml";
            }

            if (!System.IO.File.Exists(this.Server.MapPath(viewFilePath)))
            {
                viewFilePath = "~/Scripts/Widgets/" + actionName + ".cshtml";
            }

            if (!System.IO.File.Exists(this.Server.MapPath(viewFilePath)))
            {
                throw new Exception("No view was found for controller: " + controllerName + ", action: " + actionName);
            }

            ViewResult res = new ViewResult()
            {
                ViewName = viewFilePath,
            };

            res.ViewData.Model = model;

            return res;
        }
    }
}
