using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Danel.WebApp.Stores
{
    /// <summary>
    /// Manages all logins
    /// Should be implemented by contacting Danel web services
    /// </summary>
    public interface IAccountStore
    {
        AccountDetails GetByNumber(int userId, string accountNumber);
        AccountDetails[] GetAll(int userId);
        bool ValidateAccountNumber(int userId, string accountNumber);
        string GetDefaultAccountNumber(int userId);
    }

    public class AccountStore
    {
        public const string ALL_ACCOUNTS = "ALL";
    }

    public class AccountDetails
    {
        public int UserID { get; set; }
        public string Number { get; set; }
        public string Name { get; set; }
        public string ManagedBy { get; set; }
    }
}
