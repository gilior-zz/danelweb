using Danel.Common;
using Danel.Common.Api.Entity;
using Danel.Common.Api.Request;
using Danel.Common.Api.Response;
using Danel.WebApp.ApiControllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Danel.WebApp.Dal.Model;
using System.Drawing;
using Danel.X.Web.Common;
using System.Globalization;
using Danel.Common.Expansion;
using Danel.Common.Scheduling;
using Danel.X.WebApp.Common;

namespace Danel.WebApp.DataManagers
{
    public class PortfolioDataManager : IPortfolioDataManager
    {
        private DateTime parsedDate()
        {
            var parameters = WebCacheManager.Instance.GetValue<Dictionary<WebParameter, string>>("generalParameters", null);
            DateTime parameterToDate = DateTime.Now;
            if (parameters != null)
            {

                var val = parameters[WebParameter.WebsiteDataToDate].ToString();


                parameterToDate = val.GetValidDate();
            }
            return parameterToDate;
        }
        private static Dictionary<int, int> colorsDic;
        private static Dictionary<int, string> colors = new Dictionary<int, string>()
        {
        //{0,"#a5cf4e" },      
        //{1,"#b5d771"},
        //{2,"#c7e093"},      
        // {3,"#ebf4d9"},
        // {4,"#ffffff"},
        // {5,"#636466"},
        // {6,"#818285"},
        // {7,"#bcbdc0"},
        // {8,"#dcddde"},
        // {9,"#231f20"}             	 	
		 {0,"#0c2d6e" },
        {1,"#515d92"},
        {2,"#bfad8e"},
         {3,"#cfc1a7"},
         {4,"#a29c5e"},
         {5,"#ceafbd"},
         {6,"#ddc0ce"},
         {7,"#979cc2"},
         {8,"#c5c7de"},
         {9,"#ddd3c0"} ,
                  {10,"#eee9de"} ,
                     {11,"#d0cca4"} ,
                      {12,"#e6e4cd"} ,
                       {13,"#ebd4df"} ,
                      {14,"#f4eaee"}
        };
        public DanelPortfolioRequest GetRequset(UiRequestBase uiRequestBase)
        {
            var res = new DanelPortfolioRequest();
            res.EntityList = uiRequestBase.entityList;
            res.UserToken = uiRequestBase.token;
            DateTime parameterToDate = LocalSettings.GetParseDatadDate(uiRequestBase);
            DateTime minEndDate = new DateTime(Math.Min(parameterToDate.Ticks, DateTime.Now.Ticks));
            res.Date = minEndDate;
            return res;
        }

        public DanelPortfolioRequest GetRequset(UiRequestBase uiRequestBase, DateTime date)
        {
            throw new NotImplementedException();
        }

        public PortfolioDashDTO ConvertToDTO(DanelDataResponse danelDataResponse)
        {
            //if (colorsDic == null)
            //{
            colorsDic = new Dictionary<int, int>();
            var parameters = WebCacheManager.Instance.GetValue<Dictionary<WebParameter, string>>("generalParameters", null);
            var colorsDefinition = ParameterService.GetParametervalue(WebParameter.ColorsPlate, "").Split(';');
            foreach (var definition in colorsDefinition)
            {
                if (string.IsNullOrEmpty(definition)) continue;
                var definitionItems = definition.Split(',');
                var indexItem = definitionItems[0];
                int index;
                if (int.TryParse(indexItem, out index))
                {
                    var colorItem = definitionItems[1];
                    int colorNumber;
                    if (int.TryParse(colorItem, out colorNumber))
                        colorsDic.Add(index, colorNumber);
                    else
                        continue;
                }
                else continue;

            }

            //}
            var port = danelDataResponse as DanelPortfolioResponse;

            int numOfCategories = port.PortfolioModel.GroupedData.Units.Sum(i => i.Groups.Count);
            int numOfSecurities = port.PortfolioModel.DetailedData.Securities.Count;

            PortfolioDashDTO pd = new PortfolioDashDTO(numOfCategories, numOfSecurities);
            int counter = 0;
            foreach (var un in port.PortfolioModel.GroupedData.Units)
            {
                foreach (var gr in un.Groups)
                {
                    int colorNumber;
                    Color c = Color.Transparent;
                    if (colorsDic.TryGetValue(counter % 16, out colorNumber))
                        c = ColorTranslator.FromWin32(colorNumber);
                    var rgb = string.Format("rgba({0},{1},{2},{3});", c.R, c.G, c.B, c.A);
                    var style = string.Format("{0}{1}{2}", "<div style='background-color:", rgb, "height:15px;width:15px'></div>");
                    pd.Categories[counter] = new PortfolioCategoryDTO()
                    {

                        Color = style,
                        Name = gr.Name.ToLower() == "ils" ? "שח" : gr.Name,
                        PercentOfPortfolio = gr.PercentOfPortfolio.IsEpsilon(1E-5),
                        Amount = gr.Amount,

                    };

                    counter++;
                }
            }

            counter = 0;
            foreach (var item in port.PortfolioModel.DetailedData.Securities)
            {

                pd.Holdings[counter] = new HoldingItem()
                {
                    Amount = item.Amount,
                    AverageBuyRate = item.AverageBuyRate,
                    ID = item.ID,
                    LastRate = item.LastRate,
                    Name = item.Name,
                    ChannelName = item.ChannelName,
                    Quantity = item.Quantity,
                    PercentOfPortfolio = item.PercentOfPortfolio,
                    Currency = item.Currency == "ILS" ? "שח" : item.Currency

                };
                counter++;
            }
            pd.PortfolioAmount = port.PortfolioModel.PortfolioAmount;
            return pd;
        }




        public DanelPortfolioRequest GetRequset(UiRequestBase uiRequestBase, ReportFilterType groupBy)
        {
            var res = new DanelPortfolioRequest();
            res.EntityList = uiRequestBase.entityList;
            res.UserToken = uiRequestBase.token;
            res.GroupBy = groupBy;
            DateTime parameterToDate = LocalSettings.GetParseDatadDate(uiRequestBase);
            DateTime minEndDate = new DateTime(Math.Min(parameterToDate.Ticks, DateTime.Now.Ticks));

            res.Date = minEndDate;
            return res;
        }
    }
}