using Danel.Common.Api.Request;
using Danel.Common.Api.Response;
using Danel.WebApp.Dal.Model;
using Danel.WebApp.Stores;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Danel.WebApp.DataManagers
{
    public interface IAccountsDataManager
    {
        DanelAccountsRequest GenerateAccountsRequest(AccountsRequest accountsRequest);
        AccountDetailsDTO[] ConvertToDTO(DanelDataResponse danelDataResponse);

        AccountDetailsDTO GetByNumber(string accountNumber); 
        AccountDetailsDTO[] GetAll(int userId);
        bool ValidateAccountNumber(int userId, string accountNumber);
        string GetDefaultAccountNumber(int userId);
        string GetAllAcountsIDs();

        DanelLastPositionRequest GetLastPositionRequest(UiRequestBase req);


    }
}