using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Danel.Common;
using Danel.WebApp.Stores;
using System.Drawing;

namespace Danel.WebApp.Dal.Model
{
    public class AccountDetailsDTO
    {
        public string Number { get; set; }
        public string Name { get; set; }
        public string ManagedBy { get; set; }
        public string AccountID { get; set; } // danel mispar tik
        public string InvestmentPolicy { get; set; } //       
        public string VBPolicy { get; set; }
        public string FCPolicy { get; set; }
    }

    public class AccountDashDTO
    {
        public AccountDashDTO()
        {
            this.Account = new AccountDetailsDTO();
        }

        public AccountDetailsDTO Account { get; set; }
        public double PortfolioValue { get; set; }
        public double? YieldLastYear { get; set; }
        public double? YieldStartYear { get; set; }
        public double? Yield3Years { get; set; }
    }

    public class ResetPasswordReponse
    {
        public string last3Digits { get; set; }
        public string currentCode { get; set; }
        public string currenPhone { get; set; }
        public string email { get; set; }
    }

    public class TrasnsactionsSummaryDTO
    {
        public TrasnsactionsSummaryDTO()
        {
            this.Account = new AccountDetailsDTO();
        }

        public AccountDetailsDTO Account { get; set; }
        public double TotalTaxLastYear { get; set; }
        public double TotalSellLastYear { get; set; }
        public double TotalBuyLastYear { get; set; }
    }
    public class ParametersDTO
    {
        public ParameterItem[] ParameterItems { get; set; }
    }

    public class PortfolioDashDTO
    {
        public string AccountNumber { get; set; }
        public PortfolioCategoryDTO[] Categories { get; set; }
        public HoldingItem[] Holdings { get; set; }
        public Double PortfolioAmount { get; set; }

        public PortfolioDashDTO()
        {
        }

        public PortfolioDashDTO(int numOfCategories, int numOfSecurities)
        {
            this.Categories = new PortfolioCategoryDTO[numOfCategories];
            this.Holdings = new HoldingItem[numOfSecurities];
        }
    }





    public class PortfolioCategoryDTO
    {
        public string Color { get; set; }
        public string Name { get; set; }
        public double Amount { get; set; }
        public double PercentOfPortfolio { get; set; }
        public ReportFilterType GroupType { get; set; }
        //public string Name { get; set; }
        //public double Value { get; set; }
    }

    public class ParameterItem
    {
        public WebParameter WebParameter { get; set; }
        public string Value { get; set; }
    }


    public class HoldingItem
    {
        public long? ID { get; set; }
        public string Name { get; set; }
        public string ChannelName { get; set; }
        public double LastRate { get; set; }
        public double Quantity { get; set; }
        public double Amount { get; set; }
        public double AverageBuyRate { get; set; }
        public double PercentOfPortfolio { get; set; }
        public string Currency { get; set; }
    }

    public class YieldDashDTO
    {
        public string AccountNumber { get; set; }
        public YieldDashMonth[] Months { get; set; }
        public YieldDashMonth[] GridMonths { get; set; }
    }

    public class YieldDashMonthDTO
    {
        public int Month { get; set; }
        public int Year { get; set; }
        public double Yield { get; set; }
    }

    public class TransactionDashDTO
    {
        public TransactionDTO[] Transactions { get; set; }
        public TransactionDashDTO(int numOfTransactions)
        {
            this.Transactions = new TransactionDTO[numOfTransactions];
        }
    }

    public class UsersDashDTO
    {
        public UsersDTO[] Users { get; set; }
        public UsersDashDTO(int numOfUsers)
        {
            this.Users = new UsersDTO[numOfUsers];
        }
    }

    public class UsersDTO
    {
        public string UserID { get; set; }
        public string UserName { get; set; }
        public string UserPassword { get; set; }
        public UserType UserType { get; set; }
        public bool UserBlocked { get; set; }
        public bool UserDeleted { get; set; }
        public string UserIdentification { get; set; }
        public string UserEmail { get; set; }
        public string UserPhone { get; set; }
        public string UserAddress { get; set; }
        public DateTime LastLoginDate { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
    }

    public class UserDetailsDTO
    {
        public string userId { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string address { get; set; }
        public string phone { get; set; }
        public DanelEntityDTO[] authorizedEntityList;
    }

    public class DanelEntityDTO
    {
        public string Id { get; set; }
        public int EntityType { get; set; }
    }

    public class AdvisorDetails
    {
        public string advisorName { get; set; }
        public string advisorEmail { get; set; }
        public string advisorPhone { get; set; }
        public string supportPhone { get; set; }
        public Image img { get; set; }
        public string imgString { get; set; }
        public Dictionary<int, string> builtInMessages { get; set; }


    }



    public class TransactionDTO
    {
        public DateTime Date { get; set; }

        public string ActionType { get; set; }

        public int? SecurityID { get; set; }

        public string SecurityName { get; set; }
        public string TransactionDescription { get; set; }
        public string ActionDescription { get; set; }

        public double? Quantity { get; set; }

        public double Rate { get; set; }

        public string Currency { get; set; }

        public double Commision { get; set; }

        public double Tax { get; set; }

        public double Amount { get; set; }
    }

    public class IndexDto
    {
        public string Id { get; set; }

        public string Name { get; set; }
    }



}