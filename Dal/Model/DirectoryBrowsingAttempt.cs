using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Danel.WebApp.Dal.Model
{
    public class DirectoryBrowsingAttempt : IHttpHandler
    {
        public bool IsReusable { get { return true; } }
        public void ProcessRequest(HttpContext context) { context.Response.StatusCode = 404; }
    }
}