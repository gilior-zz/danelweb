using Danel.Common.Api.Request;
using Danel.Common.Api.Response;
using Danel.WebApp.ApiControllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Danel.WebApp.Dal.Model;
using Danel.Common;
using Danel.Common.Api.Entity;

namespace Danel.WebApp.DataManagers
{
    public interface IPortfolioDataManager
    {
        DanelPortfolioRequest GetRequset(UiRequestBase uiRequestBase);
        DanelPortfolioRequest GetRequset(UiRequestBase uiRequestBase, DateTime date);
        DanelPortfolioRequest GetRequset(UiRequestBase uiRequestBase, ReportFilterType groupBy);
        PortfolioDashDTO ConvertToDTO(DanelDataResponse danelDataResponse);
      
    }
}