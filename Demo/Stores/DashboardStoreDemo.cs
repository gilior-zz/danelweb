using Danel.WebApp.Stores;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Danel.WebApp.Demo.Stores
{
    public class DashboardStoreDemo : IDashboardStore
    {
        public YieldSummary GetYieldSummary(string accountNumber)
        {
            if (accountNumber.EndsWith("4"))
            {
                return new YieldSummary()
                {
                    PortfolioValue = 750000,
                    YieldLastYear = 0.08,
                    YieldStartYear = 0.02,
                };
            }

            return new YieldSummary()
            {
                PortfolioValue = 1250000,
                YieldLastYear = 0.04,
                YieldStartYear = -0.035,
            };
        }

        public PortfolioDash GetPortfolio(string accountNumber)
        {
            if (accountNumber.EndsWith("4"))
            {
                return new PortfolioDash()
                {
                    AccountNumber = accountNumber,
                    Categories = new PortfolioCategory[]
                    {
                        new PortfolioCategory()
                        {
                            Name = "שיקלי", Value = 0.1
                        },
                        new PortfolioCategory()
                        {
                            Name = "צמוד מדד", Value = 0.2
                        },
                        new PortfolioCategory()
                        {
                            Name = "מניות", Value = 0.3
                        },
                        new PortfolioCategory()
                        {
                            Name = "אגח", Value = 0.4
                        },
                    }
                };
            }

            return new PortfolioDash()
            {
                AccountNumber = accountNumber,
                Categories = new PortfolioCategory[]
                {
                    new PortfolioCategory()
                    {
                        Name = "שיקלי", Value = 0.464
                    },
                    new PortfolioCategory()
                    {
                        Name = "צמוד מדד", Value = 0.327
                    },
                    new PortfolioCategory()
                    {
                        Name = "מניות", Value = 0.196
                    },
                    new PortfolioCategory()
                    {
                        Name = "אגח", Value = 0.064
                    },
                }
            };
        }

        public YieldDash GetYield(string accountNumber)
        {
            if (accountNumber.EndsWith("4"))
            {
                return new YieldDash()
                {
                    AccountNumber = accountNumber,
                    Months = new YieldDashMonth[]
                    {
                        new YieldDashMonth() {
                            Month = 10,
                            Year = 13,
                            Yield = 0.01
                        },
                        new YieldDashMonth()
                        {
                            Month = 11,
                            Year = 13,
                            Yield = 0.02
                        },
                        new YieldDashMonth()
                        {
                            Month = 12,
                            Year = 13,
                            Yield = 0.03
                        },
                        new YieldDashMonth()
                        {
                            Month = 1,
                            Year = 14,
                            Yield = 0.04
                        },

                        new YieldDashMonth()
                        {
                            Month = 2,
                            Year = 14,
                            Yield = 0.05
                        },
                        new YieldDashMonth()
                        {
                            Month = 3,
                            Year = 14,
                            Yield = -0.06
                        },
                        new YieldDashMonth()
                        {
                            Month = 4,
                            Year = 14,
                            Yield = 0.07
                        },
                        new YieldDashMonth()
                        {
                            Month = 5,
                            Year = 14,
                            Yield = 0.08
                        },

                        new YieldDashMonth()
                        {
                            Month = 6,
                            Year = 14,
                            Yield = 0.07
                        },
                        new YieldDashMonth()
                        {
                            Month = 7,
                            Year = 14,
                            Yield = 0.06
                        },
                        new YieldDashMonth()
                        {
                            Month = 8,
                            Year = 14,
                            Yield = 0.05
                        },
                        new YieldDashMonth()
                        {
                            Month = 9,
                            Year = 14,
                            Yield = 0.04
                        },
                    }
                };
            }

            return new YieldDash()
            {
                AccountNumber = accountNumber,
                Months = new YieldDashMonth[]
                {
                    new YieldDashMonth() {
                        Month = 10,
                        Year = 13,
                        Yield = 0.021
                    },
                    new YieldDashMonth()
                    {
                        Month = 11,
                        Year = 13,
                        Yield = 0.03
                    },
                    new YieldDashMonth()
                    {
                        Month = 12,
                        Year = 13,
                        Yield = 0.01
                    },
                    new YieldDashMonth()
                    {
                        Month = 1,
                        Year = 14,
                        Yield = 0.021
                    },

                    new YieldDashMonth()
                    {
                        Month = 2,
                        Year = 14,
                        Yield = 0.021
                    },
                    new YieldDashMonth()
                    {
                        Month = 3,
                        Year = 14,
                        Yield = -0.03
                    },
                    new YieldDashMonth()
                    {
                        Month = 4,
                        Year = 14,
                        Yield = 0.01
                    },
                    new YieldDashMonth()
                    {
                        Month = 5,
                        Year = 14,
                        Yield = 0.021
                    },

                    new YieldDashMonth()
                    {
                        Month = 6,
                        Year = 14,
                        Yield = 0.021
                    },
                    new YieldDashMonth()
                    {
                        Month = 7,
                        Year = 14,
                        Yield = 0.03
                    },
                    new YieldDashMonth()
                    {
                        Month = 8,
                        Year = 14,
                        Yield = 0.01
                    },
                    new YieldDashMonth()
                    {
                        Month = 9,
                        Year = 14,
                        Yield = 0.021
                    },
                }
            };
        }

        public TransactionDash GetTransaction(string accountNumber)
        {
            return new TransactionDash()
            {
                AccountNumber= accountNumber,
                Transactions = new Transaction[]
                {
                    new Transaction()
                    {
                        Date = new DateTime(2014, 3, 25),
                        TransactionType = "דיבידנד",
                        SecurityNumber = "70509818",
                        SecurityName = "AMERICAN INT.GROUP",
                        Amount = 0,
                    },
                    new Transaction()
                    {
                        Date = new DateTime(2014, 3, 22),
                        TransactionType = "דיבידנד",
                        SecurityNumber = "662577",
                        SecurityName = "פועלים",
                        Amount = 0,
                    },
                    new Transaction()
                    {
                        Date = new DateTime(2014, 2, 14),
                        TransactionType = "מכירה",
                        SecurityNumber = "1091818",
                        SecurityName = "תכלית תא 100",
                        Amount = 178,
                    },
                }
            };
        }
    }
}