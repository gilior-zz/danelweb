using Danel.Common.Api.Request;
using Danel.Common.Api.Response;
using Danel.WebApp.ApiControllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Danel.WebApp.Dal.Model;
using Danel.WebApp.Stores;
using Danel.Common.Api.Entity;

namespace Danel.WebApp.DataManagers
{
    public interface ITransactionsDataManager
    {
        DanelTransactionsRequest GetRequset(EmptyRequest emptyRequest, WebTransactionsState webTransactionsState = WebTransactionsState.Detailed);
        DanelTransactionsRequest GetRequset(TransactionRequest req);
        TransactionDashDTO ConvertToDTO(DanelDataResponse danelDataResponse, bool topTen = true);
        TrasnsactionsSummaryDTO ConvertSummaryToDTO(DanelDataResponse danelDataResponse);
    }
}