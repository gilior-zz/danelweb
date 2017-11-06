using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Danel.Common;

namespace Danel.WebApp
{
    public class SiteContext
    {
        public const string AuthCookieName = "DanelAuthCookie";

        public static T GetGlobal<T>(GlobalName<T> name)
        {
            IGlobalProvider globals = DIContainer.Instance.Resolve<IGlobalProvider>();
            T val = globals.GetGlobal(name);
            return val;
        }
    }
}
