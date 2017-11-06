using Danel.Common.Api.Request;
using Danel.WebApp.Dal.Model;
using Danel.WebApp.DataManagers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Danel.WebApp.DataManagers
{
    public class ParametersDataManager : IParametersDataManager
    {
        public BillboardRequest GetRequset(EmptyRequest req)
        {
            var res = new BillboardRequest();
            res.AccountID = Convert.ToInt32(req.entityList[0].Id);
            return res;
        }
    }
}