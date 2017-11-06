using Danel.Common;
using Danel.X.Web.Common;
using log4net;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace Danel.WebApp.Filters
{
    public class ValidateCSRFTokenAttribute : AuthorizationFilterAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            ILog logger = DIContainer.Instance.Resolve<ILog>();

            bool enabled = DIContainer.Instance.Resolve<IGlobalProvider>().GetGlobal(GlobalNames.ENABLE_CSRF_VALIDATION);
            if (!enabled)
            {
                logger.Info("CSRF validation is disabled");
                return;
            }

            var attrs = actionContext.ControllerContext.ControllerDescriptor.GetCustomAttributes<AllowAnonymousAttribute>();
            if (attrs.Count > 0)
            {
                //
                //  The action is set with allow anonymous and should not be verified with CSRF
                //
                return;
            }

            attrs = actionContext.ActionDescriptor.GetCustomAttributes<AllowAnonymousAttribute>();
            if (attrs.Count > 0)
            {
                //
                //  The action is set with allow anonymous and should not be verified with CSRF
                //
                return;
            }

            string csrfTokenName = DIContainer.Instance.Resolve<IGlobalProvider>().GetGlobal(GlobalNames.CSRF_TOKEN_NAME);

            IEnumerable<string> values;
            if (!actionContext.Request.Headers.TryGetValues(csrfTokenName, out values))
            {
                throw new DanelException(ErrorCode.CSRFValidationFailed, "CSRF validation failed. CRSF token was not found");
            }

            CookieHeaderValue cookie = actionContext.Request.Headers.GetCookies(csrfTokenName).FirstOrDefault();
            if (cookie == null || cookie.Cookies.Count == 0)
            {
                throw new DanelException(ErrorCode.CSRFValidationFailed, "CSRF validation failed. CRSF cookie was not found");
            }

            string tokenExpected = cookie[csrfTokenName].Value;

            string tokenActual = values.FirstOrDefault();

            if (tokenActual != tokenExpected)
            {
                throw new DanelException(ErrorCode.CSRFValidationFailed, "CSRF validation failed. CRSF token " + tokenActual + " is not as expected");
            }
        }
    }
}
