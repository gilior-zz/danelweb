using System.Web.ApplicationServices;
using Danel.Common;
using Danel.Common.Api.Response;
using Danel.WebApp.Dal.Model;
using Danel.WebApp.DataManagers;
using Danel.WebApp.Services;
using Danel.WebApp.Services.AuthService;
using Danel.X.Web.Common.Communication;
using System.Web.Http;
using Danel.X.Web.Common;
using System;
using System.Collections.Generic;
using Danel.Common.Expansion;
using Danel.X.WebApp.Common;

namespace Danel.WebApp.ApiControllers
{
    /// <summary>
    /// Responsible for loginq/logout
    /// Just a small wrapper around AuthService
    /// </summary>
    public class AccountController : BaseApiController
    {
        [AcceptVerbs("POST")]
        public AccountDetailsDTO[] GetUserAccounts(AccountsRequest accountsRequest)
        {
            var req = DIContainer.Instance.Resolve<IAccountsDataManager>().GenerateAccountsRequest(accountsRequest);

            DanelDataResponse danelDataResponse = DIContainer.Instance.Resolve<IRequestHandler>().HandleRequest(req);

            AccountDetailsDTO[] dto = DIContainer.Instance.Resolve<IAccountsDataManager>().ConvertToDTO(danelDataResponse);

            var authService = DIContainer.Instance.Resolve<IAuthService>();

            var cacheId = authService.GetCacheDataAccessId();

            WebCacheManager.Instance[cacheId] = dto;

            return dto;
        }

        [AcceptVerbs("POST")]
        public DateTime? GetLastPositionDate(EmptyRequest emptyRequest)
        {

           

           
            var req = DIContainer.Instance.Resolve<IAccountsDataManager>().GetLastPositionRequest(emptyRequest);
            var res = DIContainer.Instance.Resolve<IRequestHandler>().HandleRequest(req) as DanelLastPositionResponse;
            if (res.LastPosition.HasValue)
            {
                var parameterToDate = ParameterService.GetParsedDate();
                if (parameterToDate.Ticks < res.LastPosition.Value.Ticks)
                    res.LastPosition = parameterToDate;
            }
            return res.LastPosition;
         
        }


    }
}
