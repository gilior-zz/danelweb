using Danel.Common;
using Danel.WebApp.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Danel.WebApp.Services.AuthService;
using Danel.X.Web.Common.Communication;

namespace Danel.WebApp.ApiControllers
{
   
    public class BaseApiController : ApiController
    {
        private IAuthService authService;

        public BaseApiController()
        {
            this.authService = null;
        }

        protected IAuthService AuthService
        {
            get
            {
                if (this.authService == null)
                {
                    this.authService = DIContainer.Instance.Resolve<IAuthService>();
                }

                return this.authService;
            }
        }
    }
}
