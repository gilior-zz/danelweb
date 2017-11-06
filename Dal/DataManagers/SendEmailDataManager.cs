using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Danel.Common.Api.Request;
using Danel.WebApp.Dal.Model;
using Danel.Common.Utils;

namespace Danel.WebApp.DataManagers
{
    public class SendEmailDataManager : ISendEmailDataManager
    {
        public SendEmailRequest GetRequset(MessageRequest messageRequest, string from, string to)
        {
            SendEmailRequest sendEmailRequest = new SendEmailRequest();
            DanelMailMessage danelMailMessage = new DanelMailMessage();
            danelMailMessage.From = from;
            danelMailMessage.To = to;
            danelMailMessage.IsHTMLBody = true;
            danelMailMessage.Body = messageRequest.content;

            sendEmailRequest.DanelMailMessage = danelMailMessage;

            return sendEmailRequest;
        }
    }
}