using Danel.WebApp.ApiControllers;
using Danel.WebApp.Dal.Model;
using Danel.X.Web.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace Danel.WebApp.Filters
{
    public class ValidateCharactersAttribute : ActionFilterAttribute
    {
        string[] ILLEGAL = { "<", ">", "[", "]", "{", "}", "'", "'" };


        public override void OnActionExecuting(HttpActionContext filterContext)
        {
            var ctrl = filterContext.ControllerContext.Controller as ContactController;
            if (ctrl != null)
            {
                var args = filterContext.ActionArguments;
                if (args != null && args.Count == 1)
                {
                    var mr = args.FirstOrDefault().Value as MessageRequest;
                    if (mr != null)
                    {
                        if (!string.IsNullOrEmpty(mr.email) && ILLEGAL.Any(mr.email.Contains))
                            throw new DanelException(ErrorCode.SecurityError, "illegal character");
                        if (!string.IsNullOrEmpty(mr.phone) && ILLEGAL.Any(mr.phone.Contains) && !Regex.IsMatch(mr.phone, @"^[a-zA-Z]+$"))
                            throw new DanelException(ErrorCode.SecurityError, "illegal character");
                        if (!string.IsNullOrEmpty(mr.address) && ILLEGAL.Any(mr.address.Contains))
                            throw new DanelException(ErrorCode.SecurityError, "illegal character");
                        if (!string.IsNullOrEmpty(mr.content) && ILLEGAL.Any(mr.content.Contains))
                            throw new DanelException(ErrorCode.SecurityError, "illegal character");
                        double d;
                        //if (!string.IsNullOrEmpty(mr.identityNumber) && !double.TryParse(mr.identityNumber, out d))
                        //    throw new DanelException(ErrorCode.SecurityError, "illegal character");
                        if (!string.IsNullOrEmpty(mr.senderName) && ILLEGAL.Any(mr.senderName.Contains))
                            throw new DanelException(ErrorCode.SecurityError, "illegal character");
                        if (!string.IsNullOrEmpty(mr.subject) && ILLEGAL.Any(mr.subject.Contains))
                            throw new DanelException(ErrorCode.SecurityError, "illegal character");
                    }
                }
            }

        }
    }
}