using AutoMapper;
using Danel.Common;
using Danel.Common.Api.Request;
using Danel.Common.Api.Response;
using Danel.WebApp.Dal.Model;
using Danel.WebApp.DataManagers;

using Danel.WebApp.Services;
using Danel.WebApp.Services.AuthService;
using Danel.WebApp.Stores;
using Danel.X.Web.Common;
using Danel.X.Web.Common.Communication;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Principal;
using System.Web;
using System.Web.Http;

namespace Danel.WebApp.ApiControllers
{
    /// <summary>
    /// Responsible for loginq/logout
    /// Just a small wrapper around AuthService
    /// </summary>
    public class TransactionController : BaseApiController
    {
        //[AcceptVerbs("POST")]
        //public TransactionDashDTO Transaction(EmptyRequest emptyRequest)
        //{
        //    var req = DIContainer.Instance.Resolve<ITransactionsDataManager>().GetRequset(emptyRequest.entityList);
        //    req.Request.Period = "lastY";

        //    DanelDataResponse danelDataResponse = DIContainer.Instance.Resolve<IRequestHandler>().HandleRequest(req);
        //    TransactionDashDTO dto = DIContainer.Instance.Resolve<ITransactionsDataManager>().ConvertToDTO(danelDataResponse);
        //    return dto;
        //}

        [AcceptVerbs("POST")]
        public TransactionDashDTO Transaction(TransactionRequest req)
        {
            var request = DIContainer.Instance.Resolve<ITransactionsDataManager>().GetRequset(req);

            DanelDataResponse danelDataResponse = DIContainer.Instance.Resolve<IRequestHandler>().HandleRequest(request);

            TransactionDashDTO dto = DIContainer.Instance.Resolve<ITransactionsDataManager>().ConvertToDTO(danelDataResponse, false);
            return dto;
        }

        [AcceptVerbs("POST")]
        public TrasnsactionsSummaryDTO TotalTransactions(EmptyRequest emptyRequest)
        {
            AccountDetailsDTO account = DIContainer.Instance.Resolve<IAccountsDataManager>().GetByNumber(emptyRequest.entityList.Count > 1 ? "-1" : emptyRequest.entityList[0].Id);

            var req = DIContainer.Instance.Resolve<ITransactionsDataManager>().GetRequset(emptyRequest, WebTransactionsState.Summarized);

            DateTime parameterToDate = LocalSettings.GetParseDatadDate(emptyRequest);
            DateTime minEndDate = new DateTime(Math.Min(parameterToDate.Ticks, DateTime.Now.Ticks));
            req.Request.To = minEndDate;
            req.Request.From = minEndDate.AddYears(-1);


            DanelDataResponse danelDataResponse = DIContainer.Instance.Resolve<IRequestHandler>().HandleRequest(req);

            //Should Add Code to convert compount response to AccountDashDTO
            TrasnsactionsSummaryDTO dto = DIContainer.Instance.Resolve<ITransactionsDataManager>().ConvertSummaryToDTO(danelDataResponse);

            Mapper.Map(account, dto.Account);

            return dto;
        }

    }

}
