using Danel.Common.Api;
using Danel.Common.Api.Request;
using Danel.Common.Api.Response;
using Danel.WebApp.Dal.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Danel.WebApp.DataManagers
{
    public interface IUsersDataManager
    {
      

        DanelUsersRequest GetRequset(EmptyRequest emptyRequest);
        DanelImpersonateRequest GetRequset(ImpersonateRequest req);
        UsersDashDTO ConvertToDTO(DanelDataResponse danelDataResponse);
        DanelEntityDTO[] ConvertToDanelEntityDTO(DanelDataResponse danelDataResponse);

        AdvisorDetails ConvertAdvisorDetails(DanelDataResponse danelDataResponse);

        AdvisorDetailsaRequest GetContactAdvisorRequset(ContactAdvisorInfoRequest req);
    }
}