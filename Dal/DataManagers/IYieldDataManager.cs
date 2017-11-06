using Danel.WebApp.ApiControllers;
using System.Collections.Generic;
using Danel.WebApp.Dal.Model;
using Danel.WebApp.Stores;
using Danel.Common.Api.Entity;

namespace Danel.WebApp.DataManagers
{
    public interface IYieldDataManager
    {
        YieldDashDTO GetYield(YieldUiRequest request);
        YieldSummary GetYearYieldSummary(EmptyRequest emptyRequest);
    }
}