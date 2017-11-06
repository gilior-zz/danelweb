using Danel.Common;
using Danel.WebApp.Dal.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Danel.WebApp.Services.AuthService;
using Danel.X.Web.Common;
using Danel.Common.Api.Request;
using Danel.Common.Api.Response;

namespace Danel.WebApp.DataManagers
{
    public class AccountsDataManager : IAccountsDataManager
    {
        private AccountDetailsDTO[] _accounts;

        public AccountsDataManager()
        {
            var authService = DIContainer.Instance.Resolve<IAuthService>();

            var cacheId = authService.GetCacheDataAccessId();

            if (!string.IsNullOrEmpty(cacheId))
            {
                _accounts = WebCacheManager.Instance.GetValue(cacheId, new AccountDetailsDTO[0]);
                //_accounts = (AccountDetailsDTO[])CacheManager.Instance[cacheId];
                //if (_accounts == null)
                //    _accounts = new AccountDetailsDTO[0];
            }
            else
                _accounts = new AccountDetailsDTO[0];
        }



        public DanelAccountsRequest GenerateAccountsRequest(AccountsRequest accountsRequest)
        {
            var res = new DanelAccountsRequest { UserId = accountsRequest.userId, UserToken = accountsRequest.token, EntityList = accountsRequest.entityList };
            return res;
        }

        public AccountDetailsDTO[] ConvertToDTO(DanelDataResponse danelDataResponse)
        {
            var response = danelDataResponse as DanelAccountsResponse;
            int count = response.AccountsDetails.Accounts.Count;
            AccountDetailsDTO[] res = new AccountDetailsDTO[count];
            for (int i = 0; i < count; i++)
            {
                res[i] = new AccountDetailsDTO();
                res[i].AccountID = response.AccountsDetails.Accounts[i].AccountID;
                res[i].ManagedBy = response.AccountsDetails.Accounts[i].ManagedBy;
                res[i].Name = response.AccountsDetails.Accounts[i].Name;
                res[i].Number = response.AccountsDetails.Accounts[i].Number;
                res[i].InvestmentPolicy = response.AccountsDetails.Accounts[i].InvestmentPolicy;                
                res[i].FCPolicy = response.AccountsDetails.Accounts[i].FCPolicy;                
                res[i].VBPolicy = response.AccountsDetails.Accounts[i].VBPolicy;                
            }


            _accounts = res;

            return res;
        }

        public AccountDetailsDTO GetByNumber(string accountNumber)
        {
            if (_accounts.Count() == 0)
                return new AccountDetailsDTO() { Number = "-1" };
            var acc = _accounts.Where(i => i.AccountID == accountNumber).FirstOrDefault();
            if (acc == null)
            {
                throw new Exception("Account number: " + accountNumber + " was not found");
            }

            return acc;
        }

        public AccountDetailsDTO[] GetAll(int userId)
        {
            return _accounts;
        }

        public bool ValidateAccountNumber(int userId, string accountNumber)
        {
            return true;
        }

        public string GetDefaultAccountNumber(int userId)
        {
            return _accounts[0].AccountID;
        }

        public string GetAllAcountsIDs()
        {
            string res = string.Join(",", _accounts.Where(i => i.AccountID != "-1").Select(i => i.AccountID));
            return res;
        }

        public DanelLastPositionRequest GetLastPositionRequest(UiRequestBase req)
        {
            int accountID = -1;
            if (req.entityList.Count == 1)
                accountID = int.Parse(req.entityList[0].Id);
            var res = new DanelLastPositionRequest { UserToken = req.token, EntityList = req.entityList, AccountID = accountID };
            return res;
        }
    }
}