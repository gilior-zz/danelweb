using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Danel.WebApp.Filters;

namespace Danel.WebApp
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            //
            //  Stop using DataContractSerializer and use XmlSerializer instead
            //  DataContractSerializer ignores elements if they arrive in incorrect order
            //  XmlSerializer has no order validation
            //
            config.Formatters.XmlFormatter.UseXmlSerializer = true;

            //
            //  Currently, we do not use this capability
            //
            config.MapHttpAttributeRoutes();

            //
            //  For support only RPC styleAPI
            //
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            //
            //  Register exception filter which handles all undhandled exception during Web API invocation
            //  The filter generates a well known response error
            //
            config.Filters.Add(new DanelExceptionFilterAttribute());

            //
            //  All WebAPI are accessible for authenticated users only
            //  AuthController is public
            //
            config.Filters.Add(new AuthorizeAttribute());

            //
            //  CSRF protection
            //
            config.Filters.Add(new ValidateCSRFTokenAttribute());

            //
            //  Credentials protection
            //
            config.Filters.Add(new ValidateCredentialsAttribute());

            config.Filters.Add(new ValidateCharactersAttribute());


        }
    }
}
