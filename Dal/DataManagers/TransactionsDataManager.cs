using AutoMapper;
using Danel.Common.Api.Entity;
using Danel.Common.Api.Request;
using Danel.Common.Api.Response;
using Danel.WebApp.ApiControllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Danel.WebApp.Dal.Model;
using Danel.X.Web.Common;
using Danel.Common;
using Danel.Common.Expansion;
using System.Globalization;
using Danel.Common.Scheduling;

using Danel.X.WebApp.Common;

namespace Danel.WebApp.DataManagers
{
    public class TransactionsDataManager : ITransactionsDataManager
    {

       
        public DanelTransactionsRequest GetRequset(EmptyRequest emptyRequest, WebTransactionsState webTransactionsState = WebTransactionsState.Detailed)
        {
            var res = new DanelTransactionsRequest();
            res.EntityList = emptyRequest.entityList;
            res.UserToken = emptyRequest.token;
            res.Request.WebTransactionsState = webTransactionsState;
            return res;
        }

        public DanelTransactionsRequest GetRequset(TransactionRequest req)
        {
            DateTime parameterToDate = LocalSettings.GetParseDatadDate(req);
            DateTime minEndDate = new DateTime(Math.Min(parameterToDate.Ticks, DateTime.Now.Ticks));
            var res = new DanelTransactionsRequest();
            res.EntityList = req.entityList;

            if (req.to.HasValue)
            {
                DateTime endDate = new DateTime(Math.Min(parameterToDate.Ticks, req.to.Value.Ticks));
                res.Request.To = endDate;
            }

            if (req.from.HasValue)
            {
                res.Request.From = req.from.Value;
            }

            switch (req.period)
            {
                case "lastM":
                    res.Request.To = minEndDate;
                    res.Request.From = new DateTime(minEndDate.Year, minEndDate.Month, 1);
                    break;
                case "lastQ":
                    DateTime quarterFirstDay = DanelDate.QuarterFirstDay(minEndDate);
                    res.Request.To = minEndDate;
                    res.Request.From = quarterFirstDay;

                    break;
                case "lastY":
                    res.Request.To = minEndDate;
                    res.Request.From = minEndDate.AddYears(-1);
                    break;
                case "beginningOfYear":
                    res.Request.To = minEndDate;
                    res.Request.From = new DateTime(minEndDate.Year, 1, 1);
                    break;
            }


            res.Request.Period = req.period;
            res.UserToken = req.token;
            res.Request.WebTransactionsState = WebTransactionsState.Detailed;
            return res;
        }

        public TransactionDashDTO ConvertToDTO(DanelDataResponse danelDataResponse, bool topTen = true)
        {

            var tran = danelDataResponse as DanelTransactionsResponse;
            int num = 0;

            if (topTen)
                num = tran.TransactionsModel.Units.Count > 10 ? 10 : tran.TransactionsModel.Units.Count;
            else
                num = tran.TransactionsModel.Units.Count;
            TransactionDashDTO td = new TransactionDashDTO(num);
            int counter = 0;
            foreach (var item in tran.TransactionsModel.Units.OrderByDescending(i => i.Date).Take(num))
            {
                td.Transactions[counter] = new TransactionDTO();
                td.Transactions[counter].ActionType = item.ActionTpe;
                td.Transactions[counter].Amount = item.Amount;
                td.Transactions[counter].Commision = item.Commision;
                td.Transactions[counter].Currency = item.Currency == "ILS" ? "שח" : item.Currency;
                td.Transactions[counter].Date = item.Date;

                td.Transactions[counter].Rate = item.Rate;
                td.Transactions[counter].SecurityID = item.SecurityID;
                td.Transactions[counter].SecurityName = item.SecurityName;
                var isOSH = item.SecurityName == "עו'ש";
                td.Transactions[counter].Quantity = isOSH ? null : item.Quantity;
                td.Transactions[counter].Tax = item.Tax;
                td.Transactions[counter].TransactionDescription = item.TransactionDescription;
                td.Transactions[counter].ActionDescription = item.ActionDescription;

                counter++;
            }
            return td;
        }


        public TrasnsactionsSummaryDTO ConvertSummaryToDTO(DanelDataResponse danelDataResponse)
        {
            var tran = danelDataResponse as DanelTransactionsResponse;
            TrasnsactionsSummaryDTO td = new TrasnsactionsSummaryDTO()
            {
                TotalTaxLastYear = tran.TrasnsactionsSummary.TotalTaxLastYear,
                TotalBuyLastYear = tran.TrasnsactionsSummary.TotalBuyLastYear,
                TotalSellLastYear = tran.TrasnsactionsSummary.TotalSellLastYear
            };
            return td;
        }
    }
}