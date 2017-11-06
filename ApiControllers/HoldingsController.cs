using Danel.Common;
using Danel.Common.Api.Response;
using Danel.WebApp.Dal.Model;
using Danel.WebApp.DataManagers;
using Danel.WebApp.Services.AuthService;
using Danel.WebApp.Stores;
using Danel.X.Web.Common;
using Danel.X.Web.Common.Communication;
using System;
using System.Linq;
using System.Web.Http;



namespace Danel.WebApp.ApiControllers
{
    public class HoldingsController : BaseApiController
    {
        [AcceptVerbs("POST")]
        public PortfolioDashDTO GroupedHoldings(HoldingGroupedRequest holdingGroupedRequest)
        {
            var req = DIContainer.Instance.Resolve<IPortfolioDataManager>().GetRequset(holdingGroupedRequest, (ReportFilterType)holdingGroupedRequest.groupID);

            DanelDataResponse danelDataResponse = DIContainer.Instance.Resolve<IRequestHandler>().HandleRequest(req);

            PortfolioDashDTO dto = DIContainer.Instance.Resolve<IPortfolioDataManager>().ConvertToDTO(danelDataResponse);

            return dto;
        }

        [AcceptVerbs("POST")]
        public PortfolioDashDTO DetaliedPortfolio(EmptyRequest emptyRequest)
        {
            var req = DIContainer.Instance.Resolve<IPortfolioDataManager>().GetRequset(emptyRequest, ReportFilterType.Securities);

            DanelDataResponse danelDataResponse = DIContainer.Instance.Resolve<IRequestHandler>().HandleRequest(req);

            PortfolioDashDTO dto = DIContainer.Instance.Resolve<IPortfolioDataManager>().ConvertToDTO(danelDataResponse);

            return dto;
        }
    }
}