using AutoMapper;
using Danel.WebApp.Dal.Model;
using Danel.WebApp.Stores;

namespace Danel.WebApp
{
    /// <summary>
    /// Contains AutoMapper configuration
    /// </summary>
    public class MapConfig
    {
        public static void Configure()
        {
            Mapper.CreateMap<AccountDetails, AccountDetailsDTO>();

            Mapper.CreateMap<YieldSummary, AccountDashDTO>();

            Mapper.CreateMap<PortfolioDash, PortfolioDashDTO>();
            Mapper.CreateMap<PortfolioCategory, PortfolioCategoryDTO>();

            Mapper.CreateMap<YieldDash, YieldDashDTO>();
            Mapper.CreateMap<YieldDashMonth, YieldDashMonthDTO>();

            Mapper.CreateMap<TransactionDash, TransactionDashDTO>();
            Mapper.CreateMap<Transaction, TransactionDTO>();
        }
    }
}