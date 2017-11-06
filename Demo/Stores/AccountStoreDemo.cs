//using Danel.WebApp.Stores;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;

//namespace Danel.WebApp.Demo.Stores
//{
//    public class AccountStoreDemo : IAccountStore
//    {
//        private static AccountDetails[] accounts = new AccountDetails[]
//        {
//            new AccountDetails(){UserID=1, Number="77", Name="77", ManagedBy="בנק מזרחי"},
//            new AccountDetails(){UserID=1, Number="-1", Name="כל החשבונות", ManagedBy="בנק לאומי"},
//            new AccountDetails(){UserID=1, Number="ALL", Name="כל החשבונות", ManagedBy=""},
//        };

//        public AccountDetails[] GetAll(int userId)
//        {
//            return accounts;
//        }


//        public bool ValidateAccountNumber(int userId, string accountNumber)
//        {
//            return true;
//        }

//        public string GetDefaultAccountNumber(int userId)
//        {
//            return accounts[0].Number;
//        }

//        public AccountDetails GetByNumber(int userId, string accountNumber)
//        {
//            // AccountDetails acc = (from account in accounts where account.Number == accountNumber select account).SingleOrDefault();
//            var acc = accounts.Where(i => i.Number == accountNumber).FirstOrDefault();
//            if (acc == null)
//            {
//                throw new Exception("Account number: " + accountNumber + " was not found");
//            }

//            return acc;
//        }
//    }
//}