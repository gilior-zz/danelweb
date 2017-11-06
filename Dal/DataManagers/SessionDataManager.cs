using Danel.WebApp.DataManagers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Danel.WebApp.DataManagers
{
    public class SessionDataManager : ISessionDataManager
    {


        public Danel.Common.Api.Request.OnSessionStartRequest GetRequest()
        {
            return new Danel.Common.Api.Request.OnSessionStartRequest();
        }
    }
}