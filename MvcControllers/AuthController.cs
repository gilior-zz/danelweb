using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Threading.Tasks;
using Microsoft.Owin.Security;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Security.Claims;
using System.Security.Principal;
using Danel.Common;

namespace Danel.WebApp.MvcControllers
{
    
    public class AuthController : BaseController
    {

        [AllowAnonymous]
        public ActionResult Login()
        {
            return View();
        }

      
        public ActionResult ResetPassword()
        {
            //LayoutModel model = new LayoutModel()
            //{
            //    //BaseHref = baseHref,
            //    Bundles = new string[]
            //    {
            //        "~/bundles/lib",
            //        "~/bundles/lib/kendo",
            //        "~/bundles/common",
            //        "~/bundles/directives",
            //        "~/bundles/controllers",
            //    }
            //};
            return View();
        }
       
        public ActionResult RecoverName()
        {
            return View();
        }


      
        public ActionResult NewRegister()
        {
            return View();
        }


    }
}
