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
    public class TransactionController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}
