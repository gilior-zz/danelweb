using Danel.Common;
using Danel.Common.Api.Response;

using Danel.WebApp.Dal.Model;
using Danel.WebApp.DataManagers;
using Danel.X.Web.Common;
using Danel.X.Web.Common.Communication;
using Danel.X.Web.Common.Utiles;
using Danel.X.WebApp.Common;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Web.Http;

namespace Danel.WebApp.ApiControllers
{
    [AllowAnonymous]
    public class ParametersController : BaseApiController
    {

        [AcceptVerbs("POST")]
        public ParametersDTO GetAllParameter(EmptyRequest req)
        {

            var parameters = ParameterService.GetAllParameter();
            if (parameters == null)
                throw new DanelException(ErrorCode.Error, "generalParameters is null");
            return new ParametersDTO() { ParameterItems = parameters.Select(i => new ParameterItem() { WebParameter = i.Key, Value = i.Value }).ToArray() };

        }


        [AcceptVerbs("POST")]
        public ParametersDTO GetParameter(ParameterRequest req)
        {

            var parameters = WebCacheManager.Instance.GetValue<Dictionary<WebParameter, string>>("generalParameters", null);
            if (parameters == null)
                throw new DanelException(ErrorCode.Error, "generalParameters is null");
            if ((int)req.webParameter == -1)
                return new ParametersDTO() { ParameterItems = parameters.Select(i => new ParameterItem() { WebParameter = i.Key, Value = i.Value }).ToArray() };
            Dictionary<WebParameter, string> dic = new Dictionary<WebParameter, string>();
            if (req.webParameter.HasFlag(WebParameter.AllowWebMessageToAdvisor) && parameters.ContainsKey(WebParameter.AllowWebMessageToAdvisor))
                dic.Add(WebParameter.AllowWebMessageToAdvisor, parameters[WebParameter.AllowWebMessageToAdvisor].ToString());
            if (req.webParameter.HasFlag(WebParameter.ContactToAdvisorFilePath) && parameters.ContainsKey(WebParameter.ContactToAdvisorFilePath))
                dic.Add(WebParameter.ContactToAdvisorFilePath, parameters[WebParameter.ContactToAdvisorFilePath].ToString());
            if (req.webParameter.HasFlag(WebParameter.DefaultHtml) && parameters.ContainsKey(WebParameter.DefaultHtml))
                dic.Add(WebParameter.DefaultHtml, parameters[WebParameter.DefaultHtml].ToString());
            if (req.webParameter.HasFlag(WebParameter.DirectCommunication) && parameters.ContainsKey(WebParameter.DirectCommunication))
                dic.Add(WebParameter.DirectCommunication, parameters[WebParameter.DirectCommunication].ToString());
            if (req.webParameter.HasFlag(WebParameter.EnforcePasswordsHistory) && parameters.ContainsKey(WebParameter.EnforcePasswordsHistory))
                dic.Add(WebParameter.EnforcePasswordsHistory, parameters[WebParameter.EnforcePasswordsHistory].ToString());
            if (req.webParameter.HasFlag(WebParameter.FalseLoginsToWebSite) && parameters.ContainsKey(WebParameter.FalseLoginsToWebSite))
                dic.Add(WebParameter.FalseLoginsToWebSite, parameters[WebParameter.FalseLoginsToWebSite].ToString());
            if (req.webParameter.HasFlag(WebParameter.ForgotIDMsg) && parameters.ContainsKey(WebParameter.ForgotIDMsg))
                dic.Add(WebParameter.ForgotIDMsg, parameters[WebParameter.ForgotIDMsg].ToString());
            if (req.webParameter.HasFlag(WebParameter.IdleTimeForWebSite) && parameters.ContainsKey(WebParameter.IdleTimeForWebSite))
                dic.Add(WebParameter.IdleTimeForWebSite, parameters[WebParameter.IdleTimeForWebSite].ToString());
            if (req.webParameter.HasFlag(WebParameter.IncomingTiming) && parameters.ContainsKey(WebParameter.IncomingTiming))
                dic.Add(WebParameter.IncomingTiming, parameters[WebParameter.IncomingTiming].ToString());
            if (req.webParameter.HasFlag(WebParameter.IncomingWatchFile) && parameters.ContainsKey(WebParameter.IncomingWatchFile))
                dic.Add(WebParameter.IncomingWatchFile, parameters[WebParameter.IncomingWatchFile].ToString());
            if (req.webParameter.HasFlag(WebParameter.IncomingWebUsersFilePath) && parameters.ContainsKey(WebParameter.IncomingWebUsersFilePath))
                dic.Add(WebParameter.IncomingWebUsersFilePath, parameters[WebParameter.IncomingWebUsersFilePath].ToString());
            if (req.webParameter.HasFlag(WebParameter.IsActiveWebSite) && parameters.ContainsKey(WebParameter.IsActiveWebSite))
                dic.Add(WebParameter.IsActiveWebSite, parameters[WebParameter.IsActiveWebSite].ToString());
            if (req.webParameter.HasFlag(WebParameter.IsDMZServer) && parameters.ContainsKey(WebParameter.IsDMZServer))
                dic.Add(WebParameter.IsDMZServer, parameters[WebParameter.IsDMZServer].ToString());
            if (req.webParameter.HasFlag(WebParameter.LogoAlignment) && parameters.ContainsKey(WebParameter.LogoAlignment))
                dic.Add(WebParameter.LogoAlignment, parameters[WebParameter.LogoAlignment].ToString());
            if (req.webParameter.HasFlag(WebParameter.CompanyDisplayName) && parameters.ContainsKey(WebParameter.CompanyDisplayName))
                dic.Add(WebParameter.CompanyDisplayName, parameters[WebParameter.CompanyDisplayName].ToString());
            if (req.webParameter.HasFlag(WebParameter.MediatorCommunication) && parameters.ContainsKey(WebParameter.MediatorCommunication))
                dic.Add(WebParameter.MediatorCommunication, parameters[WebParameter.MediatorCommunication].ToString());
            if (req.webParameter.HasFlag(WebParameter.OutgoingTiming) && parameters.ContainsKey(WebParameter.OutgoingTiming))
                dic.Add(WebParameter.OutgoingTiming, parameters[WebParameter.OutgoingTiming].ToString());
            if (req.webParameter.HasFlag(WebParameter.OutgoingTimingMinutes) && parameters.ContainsKey(WebParameter.OutgoingTimingMinutes))
                dic.Add(WebParameter.OutgoingTimingMinutes, parameters[WebParameter.OutgoingTimingMinutes].ToString());
            if (req.webParameter.HasFlag(WebParameter.OutgoingWebUsersFilePath) && parameters.ContainsKey(WebParameter.OutgoingWebUsersFilePath))
                dic.Add(WebParameter.OutgoingWebUsersFilePath, parameters[WebParameter.OutgoingWebUsersFilePath].ToString());
            if (req.webParameter.HasFlag(WebParameter.PasswordsHistoryCounter) && parameters.ContainsKey(WebParameter.PasswordsHistoryCounter))
                dic.Add(WebParameter.PasswordsHistoryCounter, parameters[WebParameter.PasswordsHistoryCounter].ToString());
            if (req.webParameter.HasFlag(WebParameter.WebsiteDataFromDate) && parameters.ContainsKey(WebParameter.WebsiteDataFromDate))
                dic.Add(WebParameter.WebsiteDataFromDate, parameters[WebParameter.WebsiteDataFromDate].ToString());
            if (req.webParameter.HasFlag(WebParameter.WebsiteDataToDate) && parameters.ContainsKey(WebParameter.WebsiteDataToDate))
                dic.Add(WebParameter.WebsiteDataToDate, parameters[WebParameter.WebsiteDataToDate].ToString());
            if (req.webParameter.HasFlag(WebParameter.WebsiteDefinitionsPath) && parameters.ContainsKey(WebParameter.WebsiteDefinitionsPath))
                dic.Add(WebParameter.WebsiteDefinitionsPath, parameters[WebParameter.WebsiteDefinitionsPath].ToString());
            if (req.webParameter.HasFlag(WebParameter.WebsiteMainColor) && parameters.ContainsKey(WebParameter.WebsiteMainColor))
            {
                var colorvalue = parameters[WebParameter.WebsiteMainColor];
                if (!string.IsNullOrEmpty(colorvalue))
                {
                    int colorInt;
                    if (int.TryParse(colorvalue, out colorInt))
                    {
                        var maincolor = ColorTranslator.FromWin32(colorInt);
                        if (maincolor != null)
                        {
                            var colorDefinition = string.Format("rgba({0},{1},{2},{3})", maincolor.R, maincolor.G, maincolor.B, maincolor.A);
                            dic.Add(WebParameter.WebsiteMainColor, colorDefinition);
                        }
                    }
                }
            }
            if (req.webParameter.HasFlag(WebParameter.WebSiteRegistrationType) && parameters.ContainsKey(WebParameter.WebSiteRegistrationType))
                dic.Add(WebParameter.WebSiteRegistrationType, parameters[WebParameter.WebSiteRegistrationType].ToString());
            if (req.webParameter.HasFlag(WebParameter.WebSiteSendingType) && parameters.ContainsKey(WebParameter.WebSiteSendingType))
                dic.Add(WebParameter.WebSiteSendingType, parameters[WebParameter.WebSiteSendingType].ToString());
            if (req.webParameter.HasFlag(WebParameter.WebSiteUpdatesEmail) && parameters.ContainsKey(WebParameter.WebSiteUpdatesEmail))
                dic.Add(WebParameter.WebSiteUpdatesEmail, parameters[WebParameter.WebSiteUpdatesEmail].ToString());
            if (req.webParameter.HasFlag(WebParameter.CompanyWebsiteLink) && parameters.ContainsKey(WebParameter.CompanyWebsiteLink))
                dic.Add(WebParameter.CompanyWebsiteLink, parameters[WebParameter.CompanyWebsiteLink].ToString());
            if (req.webParameter.HasFlag(WebParameter.ColorsPlate) && parameters.ContainsKey(WebParameter.ColorsPlate))
            {
                StringBuilder sb = new StringBuilder();
                var colorsDefinition = parameters[WebParameter.ColorsPlate].Split(';');
                foreach (var definition in colorsDefinition)
                {
                    if (string.IsNullOrEmpty(definition)) continue;
                    var definitionItems = definition.Split(',');
                    int colorNUmber;
                    if (int.TryParse(definitionItems[1], out colorNUmber))
                    {
                        var color = ColorTranslator.FromWin32(colorNUmber);
                        var rgba = string.Format("rgba({0},{1},{2},{3})", color.R, color.G, color.B, color.A);
                        sb.Append(rgba).Append("^");
                    }
                }
                dic.Add(WebParameter.ColorsPlate, sb.ToString());
            }
            if (req.webParameter.HasFlag(WebParameter.DisplayTermsOfUseOnLogin) && parameters.ContainsKey(WebParameter.DisplayTermsOfUseOnLogin))
                dic.Add(WebParameter.DisplayTermsOfUseOnLogin, parameters[WebParameter.DisplayTermsOfUseOnLogin].ToString());

            if (req.webParameter.HasFlag(WebParameter.LinkToHomePageForFunds) && parameters.ContainsKey(WebParameter.LinkToHomePageForFunds))
                dic.Add(WebParameter.LinkToHomePageForFunds, parameters[WebParameter.LinkToHomePageForFunds].ToString());
            if (req.webParameter.HasFlag(WebParameter.WebSiteUrl))
                dic.Add(WebParameter.WebSiteUrl, WebConfigManager.Instance["website-url"].ToString());

            if (req.webParameter.HasFlag(WebParameter.ContextualColor) && parameters.ContainsKey(WebParameter.ContextualColor))
                dic.Add(WebParameter.ContextualColor, parameters[WebParameter.ContextualColor].ToString());
            if (req.webParameter.HasFlag(WebParameter.SMSProvider) && parameters.ContainsKey(WebParameter.SMSProvider))
                dic.Add(WebParameter.SMSProvider, parameters[WebParameter.SMSProvider].ToString());
            if (req.webParameter.HasFlag(WebParameter.SMSUser) && parameters.ContainsKey(WebParameter.SMSUser))
                dic.Add(WebParameter.SMSUser, parameters[WebParameter.SMSUser].ToString());
            if (req.webParameter.HasFlag(WebParameter.SMSPassword) && parameters.ContainsKey(WebParameter.SMSPassword))
                dic.Add(WebParameter.SMSPassword, parameters[WebParameter.SMSPassword].ToString());
            if (req.webParameter.HasFlag(WebParameter.HeaderAndTotalColor) && parameters.ContainsKey(WebParameter.HeaderAndTotalColor))
            {
                var colorvalue = parameters[WebParameter.HeaderAndTotalColor];
                if (!string.IsNullOrEmpty(colorvalue))
                {
                    int colorInt;
                    if (int.TryParse(colorvalue, out colorInt))
                    {
                        var headerAndTotalcolor = ColorTranslator.FromWin32(colorInt);
                        if (headerAndTotalcolor != null)
                        {
                            var colorDefinition = string.Format("rgba({0},{1},{2},{3})", headerAndTotalcolor.R, headerAndTotalcolor.G, headerAndTotalcolor.B, headerAndTotalcolor.A);
                            dic.Add(WebParameter.ContextualColor, colorDefinition);
                        }
                    }
                }
            }

            if (req.webParameter.HasFlag(WebParameter.SMSSenderPhone) && parameters.ContainsKey(WebParameter.SMSSenderPhone))
                dic.Add(WebParameter.SMSSenderPhone, parameters[WebParameter.SMSSenderPhone].ToString());


            ParameterItem[] items = new ParameterItem[dic.Count];
            for (int i = 0; i < dic.Count; i++)
            {
                var val = dic.ElementAt(i).Value;
                var key = dic.ElementAt(i).Key;
                items[i] = new ParameterItem() { Value = val, WebParameter = key };
            }
            return new ParametersDTO() { ParameterItems = items };
        }

        [AcceptVerbs("POST")]
        public string Title(EmptyRequest req)
        {
            var websiteName = "בית השקעות";
            var parameters = WebCacheManager.Instance.GetValue<Dictionary<WebParameter, string>>("generalParameters", null);
            if (parameters.ContainsKey(WebParameter.CompanyDisplayName))
            {
                websiteName = parameters[WebParameter.CompanyDisplayName].ToString();
            }
            return websiteName;
        }

        [AcceptVerbs("POST")]
        public string Billboard(EmptyRequest req)
        {
            string html = "";
            var request = DIContainer.Instance.Resolve<IParametersDataManager>().GetRequset(req);
            var res = DIContainer.Instance.Resolve<IRequestHandler>().HandleRequest(request);
            var response = res as BillboardResponse;
            if (response != null)
            {
                html = response.Html;
            }
            return html;
        }






    }
}
