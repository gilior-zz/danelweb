using Constants;
using Danel.Common;
using Danel.WebApp.Dal.Model;
using Danel.WebApp.Services.AuthService;
using System;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using System.Collections.Generic;
using System.Web.Script.Serialization;
using Danel.Common.Api.Entity;
using Danel.X.Web.Common;
using Danel.WebApp.Attributes;

namespace Danel.WebApp.Filters
{
    public class ValidateCredentialsAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext filterContext)
        {
            var attrs = filterContext.ControllerContext.ControllerDescriptor.GetCustomAttributes<AllowAnonymousAttribute>();
            if (attrs.Count > 0)
                return;

            attrs = filterContext.ActionDescriptor.GetCustomAttributes<AllowAnonymousAttribute>();
            if (attrs.Count > 0)
                return;
            //throw new DanelException(ErrorCode.SecurityError, "illegal role");
            var roleAttribute = filterContext.ControllerContext.ControllerDescriptor.GetCustomAttributes<RoleAttribute>();

            var req = filterContext.ActionArguments.FirstOrDefault();
            var uiRequestBase = req.Value as UiRequestBase;
            var accountsUnderSuspicion = uiRequestBase.entityList;
            var role = uiRequestBase.role;
            if (roleAttribute.Count > 0)
            {
                var requiredRole = roleAttribute.FirstOrDefault().Role;
                if (role != requiredRole)
                    throw new DanelException(ErrorCode.SecurityError, "illegal role");
            }

            IAuthService authService = DIContainer.Instance.Resolve<IAuthService>();
            //var cacheId = authService.GetCacheDataAccessId();
            var user = HttpContext.Current.GetOwinContext().Authentication.User;
            if (user.Identity != null && user.Identity.IsAuthenticated)
            {

                var loginedRole = authService.ReadClaimStringOrNull(user, Claims.CLAIM_USER_ROLE);
                var legalRole = loginedRole == role;

                if (!legalRole)
                    throw new Exception("illegal role");

                if (loginedRole == Roles.WebAdmin)
                    return;


                var claimEntities = authService.ReadClaimStringOrNull(user, Claims.CLAIM_AUTHORIZED_ENTITY_LIST);
                //var loginedEntities = CacheManager.Instance.GetValue(cacheId, new AccountDetailsDTO[0]);
                //var ids = Regex.Matches(loginedEntities, "(\"[0-9])\\w+");
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                var loginedEntities = (object[])serializer.DeserializeObject(claimEntities);
                List<string> userRealAcounts = new List<string>();
                if (loginedEntities != null)
                {
                    foreach (var item in loginedEntities)
                    {
                        var obj = item as Dictionary<string, object>;
                        if (obj != null)
                        {
                            var id = obj.FirstOrDefault().Value.ToString();
                            userRealAcounts.Add(id);
                            continue;
                        }
                    }
                }

                bool isSubset = !accountsUnderSuspicion.Select(i => i.Id).Except(userRealAcounts).Any();
                if (!isSubset)
                    throw new DanelException(ErrorCode.SecurityError, "illegat entities");
            }

        }
    }
}