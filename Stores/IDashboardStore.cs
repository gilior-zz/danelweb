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
    public interface IDashboardStore
    {
        YieldSummary GetYieldSummary(string accountNumber);
        PortfolioDash GetPortfolio(string accountNumber);
        YieldDash GetYield(string accountNumber);
        TransactionDash GetTransaction(string accountNumber);
    }

    public class YieldSummary
    {
        public double? PortfolioValue { get; set; }
        public double? YieldLastYear { get; set; }
        public double? YieldStartYear { get; set; }
        public double? Yield3Years { get; set; }
    }

    public class TransactionsSummary
    {
        public double TotalTax { get; set; }
        public double TotalSellLastYear { get; set; }
        public double TotalBuyLastYear { get; set; }
    }

    public class PortfolioDash
    {
        public string AccountNumber { get; set; }
        public PortfolioCategory[] Categories { get; set; }
    }

    public class PortfolioCategory
    {
        public string Name { get; set; }
        public double Value { get; set; }
    }

    public class YieldDash
    {
        public string AccountNumber { get; set; }
        public YieldDashMonth[] Months { get; set; }
    }

    public class YieldDashMonth
    {
        public int Month { get; set; }
        public int Year { get; set; }

        public double PortfolioValue { get; set; }
        public double Profit { get; set; }
        public double Tax { get; set; }

        public double YieldGross { get; set; }
        public double GrossAccumulated { get; set; }
        public double Yield { get; set; }
        public double NetAccumulated { get; set; }      
        public double Deposits { get; set; }      
        public double Withdrawals { get; set; }
        // Indexes
        public double Index1 { get; set; }
        public double Index2 { get; set; }
        
        // Calculated Fields
        public double MonthName { get; set; }
        public string DateText { get; set; }
        public int Dummy { get; set; }
        public string ID { get; set; }


    }

    public class TransactionDash
    {
        public string AccountNumber { get; set; }
        public Transaction[] Transactions { get; set; }
    }

    public class Transaction
    {
        public DateTime Date { get; set; }
        public string TransactionType { get; set; }
        public string SecurityNumber { get; set; }
        public string SecurityName { get; set; }
        public int Amount { get; set; }
    }
}
