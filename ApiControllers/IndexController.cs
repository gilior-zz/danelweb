using Danel.Common;
using Danel.Common.Api.Response;
using Danel.WebApp.Dal.Model;
using Danel.WebApp.DataManagers;
using Danel.WebApp.Services;
using Danel.WebApp.Stores;
using Danel.X.Web.Common;
using Danel.X.Web.Common.Communication;
using System;
using System.Web.Http;



namespace Danel.WebApp.ApiControllers
{
    public class IndexController : BaseApiController
    {

         [AcceptVerbs("POST")]
        public IndexDto[] GetAll(EmptyRequest emptyRequest)
        {
            return DIContainer.Instance.Resolve<IIndexDataManager>().GetIndexes(emptyRequest);
        }
    }
}