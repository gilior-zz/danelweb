using System;
using AutoMapper;
using Danel.Common;
using Danel.Common.Api.Response;
using Danel.WebApp.Dal.Model;
using Danel.WebApp.DataManagers;
using Danel.WebApp.Services.AuthService;
using Danel.WebApp.Stores;
using Danel.X.Web.Common;
using Danel.X.Web.Common.Communication;
using System.Collections.Generic;
using System.Web.Http;
using Danel.X.Web.Common.Utiles;
namespace Danel.WebApp.ApiControllers
{
    /// <summary>
    /// Responsible for loginq/logout
    /// Just a small wrapper around AuthService
    /// </summary>
    public class DashboardController : BaseApiController
    {
        [AcceptVerbs("POST")]
        public AccountDashDTO Account(EmptyRequest emptyRequest)
        {
            YieldSummary yield = DIContainer.Instance.Resolve<IYieldDataManager>().GetYearYieldSummary(emptyRequest);

            AccountDetailsDTO account = DIContainer.Instance.Resolve<IAccountsDataManager>().GetByNumber(emptyRequest.entityList.Count > 1 ? "-1" : emptyRequest.entityList[0].Id);

            AccountDashDTO dto = new AccountDashDTO();
            Mapper.Map(yield, dto);
            Mapper.Map(account, dto.Account);
            var req = DIContainer.Instance.Resolve<IPortfolioDataManager>().GetRequset(emptyRequest, ReportFilterType.None);
            DanelDataResponse danelDataResponse = DIContainer.Instance.Resolve<IRequestHandler>().HandleRequest(req);

            var port = danelDataResponse as DanelPortfolioResponse;
            dto.PortfolioValue = port.PortfolioModel.PortfolioAmount;
            return dto;
        }

        [AcceptVerbs("POST")]
        public PortfolioDashDTO Portfolio(EmptyRequest emptyRequest)
        {
          
            var req = DIContainer.Instance.Resolve<IPortfolioDataManager>().GetRequset(emptyRequest, ReportFilterType.TradingChannels);

            DanelDataResponse danelDataResponse = DIContainer.Instance.Resolve<IRequestHandler>().HandleRequest(req);

            PortfolioDashDTO dto = DIContainer.Instance.Resolve<IPortfolioDataManager>().ConvertToDTO(danelDataResponse);
            return dto;
        }

        [AcceptVerbs("POST")]
        public YieldDashDTO Yield(YieldUiRequest request)
        {
            YieldDashDTO response;
            try
            {
                response = DIContainer.Instance.Resolve<IYieldDataManager>().GetYield(request);
            }
            catch (Exception ex)
            {
                throw new DanelException(ErrorCode.InternalServerError, "Error in GetYield Request");
            }

            return response;
        }

        [AcceptVerbs("POST")]
        public TransactionDashDTO Transaction(EmptyRequest emptyRequest)
        {
            var req = DIContainer.Instance.Resolve<ITransactionsDataManager>().GetRequset(emptyRequest);
            req.Request.Period = "lastY";

            DanelDataResponse danelDataResponse = DIContainer.Instance.Resolve<IRequestHandler>().HandleRequest(req);
            TransactionDashDTO dto = DIContainer.Instance.Resolve<ITransactionsDataManager>().ConvertToDTO(danelDataResponse);
            return dto;
        }

        [AcceptVerbs("POST")]
        public AdvisorDetails LoadContactAdvisorInfo(ContactAdvisorInfoRequest req)
        {
            var request = DIContainer.Instance.Resolve<IUsersDataManager>().GetContactAdvisorRequset(req);


            DanelDataResponse danelDataResponse = DIContainer.Instance.Resolve<IRequestHandler>().HandleRequest(request);
            AdvisorDetails advisorDetails = DIContainer.Instance.Resolve<IUsersDataManager>().ConvertAdvisorDetails(danelDataResponse);
            return advisorDetails;
        }
    }

}
