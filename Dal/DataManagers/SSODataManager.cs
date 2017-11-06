using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Danel.Common.Api;
using Danel.Common.Api.Request;

namespace Danel.WebApp.DataManagers
{
    public class SSODataManager : ISSODataManager
    {
        public SSORequest GetRequset(SSOInterface.SSOItem ssoItem)
        {
            return new SSORequest() { SSOItem = ssoItem };
        }
    }
}