using Danel.Common;
using Danel.Common.Api.Entity;
using Danel.Common.Api.Request;
using Danel.Common.Api.Response;
using Danel.Common.Expansion;
using Danel.WebApp.ApiControllers;
using System;
using System.Collections.Generic;
using System.Linq;
using Danel.WebApp.Dal.Model;
using Danel.WebApp.Stores;
using Danel.X.Web.Common;
using Danel.X.Web.Common.Communication;
using System.Globalization;
using Danel.X.WebApp.Common;

namespace Danel.WebApp.DataManagers
{
    public class YieldDataManager : IYieldDataManager
    {

        public YieldDashDTO GetYield(YieldUiRequest request)
        {

            DateTime parameterToDate = LocalSettings.GetParseDatadDate(request);
            if (!request.entityList.Any())
                throw new DanelException(ErrorCode.InvalidAccountNumber, "מספר החשבון שהתקבל אינו תקין");

            DateTime endDate = new DateTime(Math.Min(parameterToDate.Ticks, DateTime.Now.Ticks));
            DateTime startDate = DateTime.Now;

            if (request.period == "Yearly" || request.period == "Quarterly")
            {
                startDate = endDate.AddYears(-1);
            }
            else if (request.period == "YearStart")
            {
                startDate = new DateTime(endDate.Year, 1, 1);
            }

            var yieldPeriod = request.period == "Quarterly" ? YieldPeriodDetailedLevelEnum.Quarterly : YieldPeriodDetailedLevelEnum.Monthly;

            var yieldRequest = new DanelYieldRequest
            {
                RequestId = Guid.NewGuid().ToString(),
                EntityList = request.entityList,
                UserToken = request.token,
                DanelYieldDataRequestList = new List<DanelYieldDataRequest>()
            };

            var danelYieldDataRequest = new DanelYieldDataRequest
            {
                StartDate = startDate,
                EndDate = endDate,
                YieldPeriodDetailedLevelEnum = yieldPeriod,
                YieldSelectorsDetailLevel = SelectorsDetailLevelEnum.Centralized,
                EntityList = request.entityList,
                UserToken = request.token,
                //YieldPeriodRequestType = YieldPeriodRequestType.YearlyTwelveMonth
            };

            yieldRequest.DanelYieldDataRequestList.Add(danelYieldDataRequest);

            DanelIndexDescriptor danelIndexDescriptor = null;
            if (!string.IsNullOrEmpty(request.index1Id))
            {
                danelIndexDescriptor = new DanelIndexDescriptor()
                {
                    DateScaleInterval = DanelDate.DateInterval.None,
                    DateScaleValue = 0,
                    IndexId = Convert.ToInt32(request.index1Id)
                };

                yieldRequest.IndexList.Add(danelIndexDescriptor);
            }

            if (!string.IsNullOrEmpty(request.index2Id))
            {
                danelIndexDescriptor = new DanelIndexDescriptor()
                {
                    DateScaleInterval = DanelDate.DateInterval.None,
                    DateScaleValue = 0,
                    IndexId = Convert.ToInt32(request.index2Id)
                };

                yieldRequest.IndexList.Add(danelIndexDescriptor);
            }

            var yieldResponse = (DanelYieldResponse)DIContainer.Instance.Resolve<IRequestHandler>().HandleRequest(yieldRequest);

            return ConvertYieldToDto(yieldResponse, yieldPeriod);
        }

        public CompoundRequest GetRequset(string accountID, DateTime date)
        {
            throw new NotImplementedException();
        }

        private YieldSummary ConvertYearYieldSummaryToDto(DanelYieldResponse yieldResponse, List<DanelEntity> accountIdList)
        {
            if (yieldResponse == null || !yieldResponse.DanelYieldDataResponseList.Any())
                return null;

            var yieldSummary = new YieldSummary();

            var danelYieldDataResponse = yieldResponse.DanelYieldDataResponseList.FirstOrDefault();
            var danelYieldDataPeriod = danelYieldDataResponse.DanelYieldDataPeriodList.FirstOrDefault();

            if (danelYieldDataPeriod != null)
                yieldSummary.YieldLastYear = danelYieldDataPeriod.NominalYield.Value > 1000 ? 0 : Math.Round(danelYieldDataPeriod.NominalYield.Value, 2);
            else
                yieldSummary.YieldLastYear = 0;

            danelYieldDataResponse = yieldResponse.DanelYieldDataResponseList[1];
            danelYieldDataPeriod = danelYieldDataResponse.DanelYieldDataPeriodList.FirstOrDefault();

            if (danelYieldDataPeriod != null)
                yieldSummary.YieldStartYear = danelYieldDataPeriod.NominalYield.Value > 1000 ? 0 : Math.Round(danelYieldDataPeriod.NominalYield.Value, 2);
            else
                yieldSummary.YieldStartYear = 0;

            danelYieldDataResponse = yieldResponse.DanelYieldDataResponseList[2];
            danelYieldDataPeriod = danelYieldDataResponse.DanelYieldDataPeriodList.FirstOrDefault();

            if (danelYieldDataPeriod != null)
                yieldSummary.Yield3Years = danelYieldDataPeriod.NominalYield.Value > 1000 ? 0 : Math.Round(danelYieldDataPeriod.NominalYield.Value, 2);
            else
                yieldSummary.Yield3Years = 0;

            return yieldSummary;
        }

        private YieldDashDTO ConvertYieldToDto(DanelYieldResponse yieldResponse, YieldPeriodDetailedLevelEnum yieldPeriod)
        {
            if (yieldResponse == null || !yieldResponse.DanelYieldDataResponseList.Any())
                return null;

            var index = 0;
            var month = 0;
            var danelYieldDataResponse = yieldResponse.DanelYieldDataResponseList.FirstOrDefault();
            var yieldDashDTO = new YieldDashDTO();
            yieldDashDTO.Months = new YieldDashMonth[danelYieldDataResponse.DanelYieldDataPeriodList.Count];// + 1]; //+1 for total row
            yieldDashDTO.GridMonths = new YieldDashMonth[danelYieldDataResponse.DanelYieldDataPeriodList.Count + 1]; //+1 for total row
            double acc = 0;
            foreach (var danelYieldDataPeriod in danelYieldDataResponse.DanelYieldDataPeriodList)
            {
                month = danelYieldDataPeriod.ToDate.Value.Month;
                //if (yieldPeriod == YieldPeriodDetailedLevelEnum.Quarterly)
                //    month = GetQuarter(danelYieldDataPeriod.ToDate.Value.Month);
                acc += danelYieldDataPeriod.NominalYieldWithoutTax.Value > 1000 ? 0 : danelYieldDataPeriod.NominalYieldWithoutTax.Value;
                var yieldDashMonth = new YieldDashMonth
                {
                    Year = danelYieldDataPeriod.ToDate.Value.Year,
                    Month = month,
                    PortfolioValue = danelYieldDataPeriod.ClosingPortfolioAmount.Value,
                    Profit = danelYieldDataPeriod.PeriodProfit.Value,
                    Tax = danelYieldDataPeriod.Taxes,
                    Deposits = danelYieldDataPeriod.Deposits,
                    Withdrawals = danelYieldDataPeriod.Withdrawals,
                    YieldGross = danelYieldDataPeriod.NominalYield.Value,
                    GrossAccumulated = danelYieldDataPeriod.AccumulatedNominalYield.Value,
                    Yield = danelYieldDataPeriod.NominalYieldWithoutTax.Value > 1000 ? 0 : danelYieldDataPeriod.NominalYieldWithoutTax.Value,
                    Index1 = danelYieldDataPeriod.IndexNominalYieldList.Count > 0 ? danelYieldDataPeriod.IndexNominalYieldList[0] : 0,
                    Index2 = danelYieldDataPeriod.IndexNominalYieldList.Count > 1 ? danelYieldDataPeriod.IndexNominalYieldList[1] : 0,
                    NetAccumulated = acc,
                    DateText = Convert.ToString(danelYieldDataPeriod.ToDate.Value.Month) + "/" + Convert.ToString(danelYieldDataPeriod.ToDate.Value.Year),
                    Dummy = index
                };
                yieldDashDTO.Months[index++] = yieldDashMonth;
                yieldDashDTO.GridMonths[index - 1] = yieldDashMonth;
            }
            var totalRow = new YieldDashMonth
            {
                Deposits = danelYieldDataResponse.DanelYieldDataPeriodList.Sum(i => i.Deposits),
                Withdrawals = danelYieldDataResponse.DanelYieldDataPeriodList.Sum(i => i.Withdrawals),
                Tax = danelYieldDataResponse.DanelYieldDataPeriodList.Sum(i => i.Taxes),
                //Yield = danelYieldDataResponse.DanelYieldDataPeriodList.Sum(i => i.NominalYieldWithoutTax.Value > 1000 ? 0 : i.NominalYieldWithoutTax.Value),
                Yield = danelYieldDataResponse.DanelYieldDataPeriodList.LastOrDefault().AccumulatedNominalYieldWithoutTax ?? 0,
                //YieldGross = danelYieldDataResponse.DanelYieldDataPeriodList.WeightedAverage(i => ((DanelYieldDataPeriod)i).NominalYieldWithoutTax.Value > 1000 ? 0 : ((DanelYieldDataPeriod)i).NominalYieldWithoutTax.Value, i => ((DanelYieldDataPeriod)i).NominalYield.Value > 1000 ? 0 : ((DanelYieldDataPeriod)i).NominalYieldWithoutTax.Value),
                YieldGross = danelYieldDataResponse.DanelYieldDataPeriodList.LastOrDefault().AccumulatedNominalYield ?? 0,
                Profit = danelYieldDataResponse.DanelYieldDataPeriodList.Sum(i => i.PeriodProfit ?? 0),
                PortfolioValue = danelYieldDataResponse.DanelYieldDataPeriodList.Select(i => i.ClosingPortfolioAmount ?? 0).LastOrDefault(),
                DateText = string.Format("{0}\"{1}", "סה", "כ"),
                ID = "total-row"
            };
            yieldDashDTO.GridMonths[index] = totalRow;
            return yieldDashDTO;
        }

        public YieldSummary GetYearYieldSummary(EmptyRequest emptyRequest)
        {
            if (emptyRequest.entityList.Count == 0)
                throw new DanelException(ErrorCode.InvalidAccountNumber, "מספר החשבון שהתקבל אינו תקין");

            DateTime parameterToDate = LocalSettings.GetParseDatadDate(emptyRequest);

            var yieldRequest = new DanelYieldRequest
            {
                RequestId = Guid.NewGuid().ToString(),
                EntityList = emptyRequest.entityList,
                UserToken = emptyRequest.token,
                DanelYieldDataRequestList = new List<DanelYieldDataRequest>()
            };

            DateTime endDate = new DateTime(Math.Min(parameterToDate.Ticks, DateTime.Now.Ticks));

            var danelYieldDataRequest = new DanelYieldDataRequest
            {
                StartDate = endDate.AddYears(-1),
                EndDate = endDate,
                YieldPeriodDetailedLevelEnum = YieldPeriodDetailedLevelEnum.TotalYield,
                EntityList = emptyRequest.entityList,
                UserToken = emptyRequest.token,
                YieldPeriodRequestType = YieldPeriodRequestType.YearStart,
                YieldSelectorsDetailLevel = SelectorsDetailLevelEnum.Centralized
            };

            yieldRequest.DanelYieldDataRequestList.Add(danelYieldDataRequest);
            var lastYearYield = (DanelYieldResponse)DIContainer.Instance.Resolve<IRequestHandler>().HandleRequest(yieldRequest);




            danelYieldDataRequest = new DanelYieldDataRequest
            {
                StartDate = new DateTime(endDate.Year, 1, 1),
                EndDate = endDate,
                YieldPeriodDetailedLevelEnum = YieldPeriodDetailedLevelEnum.TotalYield,
                UserToken = emptyRequest.token,
                EntityList = emptyRequest.entityList,
                YieldPeriodRequestType = YieldPeriodRequestType.YearStart,
                YieldSelectorsDetailLevel = SelectorsDetailLevelEnum.Centralized
            };

            yieldRequest.DanelYieldDataRequestList.Clear();
            yieldRequest.DanelYieldDataRequestList.Add(danelYieldDataRequest);
            var startOfYearYield = (DanelYieldResponse)DIContainer.Instance.Resolve<IRequestHandler>().HandleRequest(yieldRequest);


            var webSiteCustomYieldInMonths = ParameterService.GetParametervalue(WebParameter.WebSiteCustomYieldInMonths, 36);
            var webSiteCustomYieldInYears = webSiteCustomYieldInMonths / 12;
            danelYieldDataRequest = new DanelYieldDataRequest
            {
                StartDate = endDate.AddYears(-webSiteCustomYieldInYears),
                EndDate = endDate,
                YieldPeriodDetailedLevelEnum = YieldPeriodDetailedLevelEnum.TotalYield,
                EntityList = emptyRequest.entityList,
                UserToken = emptyRequest.token,
                YieldPeriodRequestType = YieldPeriodRequestType.YearStart,
                YieldSelectorsDetailLevel = SelectorsDetailLevelEnum.Centralized
            };

            yieldRequest.DanelYieldDataRequestList.Clear();
            yieldRequest.DanelYieldDataRequestList.Add(danelYieldDataRequest);
            var threeYearsYield = (DanelYieldResponse)DIContainer.Instance.Resolve<IRequestHandler>().HandleRequest(yieldRequest);

            //var yieldResponse = (DanelYieldResponse)DIContainer.Instance.Resolve<IRequestHandler>().HandleRequest(yieldRequest);

            //var yieldSummary = ConvertYearYieldSummaryToDto(yieldResponse, emptyRequest.entityList);
            var yieldSummary = ConvertYearYieldSummaryToDto(lastYearYield, threeYearsYield, startOfYearYield, emptyRequest.entityList);

            return yieldSummary;
        }

        private YieldSummary ConvertYearYieldSummaryToDto(DanelYieldResponse lastYearYield, DanelYieldResponse threeYearsYield, DanelYieldResponse startOfYearYield, List<DanelEntity> entityList)
        {
            var yieldSummary = new YieldSummary();

            var lastYear = lastYearYield.DanelYieldDataResponseList.FirstOrDefault();
            if (lastYear != null)
            {
                var v = lastYear.DanelYieldDataPeriodList.FirstOrDefault().NominalYield.Value;
                if (v > 1000)
                    v = 0;
                yieldSummary.YieldLastYear = Math.Round(v, 2);
            }


            var yieldStartYear = startOfYearYield.DanelYieldDataResponseList.FirstOrDefault();
            if (yieldStartYear != null)
            {
                var v = yieldStartYear.DanelYieldDataPeriodList.FirstOrDefault().NominalYield.Value;

                if (v > 1000)
                    v = 0;
                yieldSummary.YieldStartYear = Math.Round(v, 2);
            }


            var Yield3Years = threeYearsYield.DanelYieldDataResponseList.FirstOrDefault();
            if (Yield3Years != null)
            {
                var v = Yield3Years.DanelYieldDataPeriodList.FirstOrDefault().NominalYield.Value;
                if (v > 1000)
                    v = 0;
                yieldSummary.Yield3Years = Math.Round(v, 2);
            }



            return yieldSummary;
            //yieldSummary.YieldLastYear=


        }

        private static int GetQuarter(int month)
        {
            if (month >= 1 && month <= 3)
                return 1;
            else if (month >= 4 && month <= 6)
                return 2;
            else if (month >= 7 && month <= 9)
                return 3;
            else
                return 4;

        }

        //private delegate YieldDashDTO YieldDataConverter(DanelYieldResponse yieldResponse, List<string> accountIdList, YieldPeriodDetailedLevelEnum yieldPeriod);

    }
}