using Danel.Common;
using Danel.Common.Api.Response;
using Danel.Common.Services;
using Danel.Sms;

using Danel.WebApp.Dal.Model;
using Danel.WebApp.DataManagers;
using Danel.WebApp.Services;
using Danel.X.Web.Common;
using Danel.X.Web.Common.Communication;
using Danel.X.Web.Common.Utiles;
using Danel.X.WebApp.Common;
using DanelWebMail;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web.Http;
using System.Xml.Linq;

namespace Danel.WebApp.ApiControllers
{
    [AllowAnonymous]
    public class ContactController : ApiController
    {
        [AcceptVerbs("POST")]
        public bool SendMessage(MessageRequest m)
        {
            try
            {

                var websiteName = "בית השקעות";
                var parameters = WebCacheManager.Instance.GetValue<Dictionary<WebParameter, string>>("generalParameters", null);
                if (parameters.ContainsKey(WebParameter.CompanyDisplayName))
                {
                    websiteName = parameters[WebParameter.CompanyDisplayName].ToString();
                }
                var to = ParameterService.GetParametervalue(WebParameter.WebSiteUpdatesEmail, "");
                //List<string> l = WebConfigManager.Instance["mailing-list"].Split(';').ToList();
                MailSender.Instance.SendMail
                              (to, to,
                              m.subject,
                              string.Format("\n\n{0}\n\n{1}\n\n{2}\n\n{3}\n\n{4}",
                              "Message from " + websiteName + "  web site",
                          m.senderName, m.email, m.phone, m.content));
                return true;
            }
            catch (Exception)
            {

                return false;
            }

        }

        [AcceptVerbs("POST")]
        public bool SendToInbox(MessageRequest m)
        {

            var req = DIContainer.Instance.Resolve<IInboxDataManager>().GetRequset(m);
            try
            {
                DIContainer.Instance.Resolve<IRequestHandler>().HandleRequest(req);
                return true;
            }
            catch (Exception)
            {

                return false;
            }

        }

        [AcceptVerbs("POST")]
        public string SendNewRegister(MessageRequest m)
        {


            var websiteName = "בית השקעות";
            var parameters = WebCacheManager.Instance.GetValue<Dictionary<WebParameter, string>>("generalParameters", null);
            if (parameters.ContainsKey(WebParameter.CompanyDisplayName))
            {
                websiteName = parameters[WebParameter.CompanyDisplayName].ToString();
            }
            var errorCode = ErrorCode.None;
            NewRegisterResponse res = null;

            var req = DIContainer.Instance.Resolve<INewRegisterManager>().GetRequset(m);
            try
            {
                res = DIContainer.Instance.Resolve<IRequestHandler>().NewRegister(req);
            }
            catch (Exception)
            {
                throw new DanelException(errorCode, "תקלת קישור");
            }

            errorCode = SetSubjectAndErrorCode(m, errorCode, res);

            // send mail to company
            //==================================
            try
            {
                SendMailToCompany(m, errorCode);
            }
            catch (Exception) { }

            if (res.ResponseCode != ResponseCode.Success)
                throw new DanelException(errorCode, "רישום לא הצליח");

            string body = GenerateUserHTMLBody(m, websiteName, res);

            // send notification to user
            //==================================
            SendNotificationToUser(m, ref websiteName, ref parameters, res, req, body);

            return res.GeneratedPassword;
        }

        private static ErrorCode SetSubjectAndErrorCode(MessageRequest m, ErrorCode errorCode, NewRegisterResponse res)
        {
            switch (res.ResponseCode)
            {
                case ResponseCode.AlreadyAnotherWebUser:
                    break;
                case ResponseCode.AlreadyRegisteredEmail:
                    m.subject = "New Register - Already Registered Email";
                    errorCode = ErrorCode.AlreadyRegisteredEmail;
                    break;
                case ResponseCode.AlreadyRegisteredIdentityNumber:
                    m.subject = "New Register - Already Registered Identity Number";
                    errorCode = ErrorCode.AlreadyRegisteredIdentityNumber;
                    break;
                case ResponseCode.AlreadyWebUser:
                    break;
                case ResponseCode.AuthorizationFaild:
                    break;
                case ResponseCode.Error:
                    m.subject = "New Register - Unknown Error";
                    errorCode = ErrorCode.Error;
                    break;
                case ResponseCode.NoSuchAccountOwner:
                    m.subject = "New Register -No Such Account Owner";
                    errorCode = ErrorCode.NoSuchAccountOwner;
                    break;
                case ResponseCode.PartialSuccess:
                    break;
                case ResponseCode.Success:
                    m.subject = "New Register -Success";
                    break;
                case ResponseCode.UnRecongnisedEmail:
                    m.subject = "New Register -No Such Account Owner Email";
                    errorCode = ErrorCode.UnRecongnisedEmail;
                    break;
                case ResponseCode.Undefined:
                    break;
                case ResponseCode.NoSuchIdentityNumber:
                    m.subject = "New Register -No Such Identity Number Email";
                    errorCode = ErrorCode.NoSuchIdentityNumber;
                    break;
                case ResponseCode.NoSuchPhone:
                    m.subject = "New Register -No Such Identity Number Email";
                    errorCode = ErrorCode.NoSuchPhone;
                    break;
                case ResponseCode.AlreadyRegisteredPhone:
                    m.subject = "New Register -Already Registered Phone Number";
                    errorCode = ErrorCode.AlreadyRegisteredPhone;
                    break;
            }

            return errorCode;
        }

        private void SendMailToCompany(MessageRequest m, ErrorCode errorCode)
        {
            var translatedText = LocalizerService.Instance.GetTranslatedText(errorCode.ToString());            
            string companyMail = ParameterService.GetParametervalue(WebParameter.WebSiteUpdatesEmail, "");
            if (!string.IsNullOrEmpty(companyMail))
            {
                XDocument xDocument = LoadXDocument("registration_status_company_notification.xml");

                SetNodeValue(xDocument, "senderName", m.senderName);
                SetNodeValue(xDocument, "email", m.email);
                SetNodeValue(xDocument, "identityNumber", m.identityNumber);
                SetNodeValue(xDocument, "phone", m.phone);
                SetNodeValue(xDocument, "birthDate", m.birthDate.ToShortDateString());
                SetNodeValue(xDocument, "status", translatedText);
                m.content = xDocument.ToString();
                SendMail(m, "WebSiteApplication@Registration.com", companyMail);
            }
        }

        /// <summary>
        /// returns XDocument object
        /// </summary>
        /// <param name="fileName">must be inside Content\customer_data\current_customer</param>
        /// <returns>returns XDocument object</returns>
        private XDocument LoadXDocument(string fileName)
        {
            fileName = Path.Combine(new string[] { "~", "Content", "customer_data", "current_customer", fileName });
            var mappedPath = System.Web.HttpContext.Current.Request.MapPath(fileName);
            var xDocument = XDocument.Load(mappedPath);
            return xDocument;
        }

        private void SetNodeValue(XDocument xDocument, string nodeName, string value)
        {
            var node = xDocument.Descendants(nodeName).FirstOrDefault();
            node.Value = value;
        }

        private void SetAttributeValue(XDocument xDocument, string nodeName, string attributeName, string value)
        {
            var node = xDocument.Descendants(nodeName).FirstOrDefault();
            var attribute = node.Attributes(attributeName).FirstOrDefault();
            attribute.Value = value;
        }



        private string GenerateUserHTMLBody(MessageRequest m, string websiteName, NewRegisterResponse res)
        {
            var xDocument = this.LoadXDocument("valid_registration.xml");

            var websiteAddress = WebConfigManager.Instance["website-url"].ToString() + "/login";

            var imgAddress = WebConfigManager.Instance["website-url"].ToString() + "/Content/customer_data/current_customer/top-header-logo.png";


            SetNodeValue(xDocument, "websiteName", websiteName);
            SetNodeValue(xDocument, "identityNumber", m.identityNumber);
            SetNodeValue(xDocument, "generatedPassword", res.GeneratedPassword);
            SetNodeValue(xDocument, "generatedPassword", res.GeneratedPassword);
            SetAttributeValue(xDocument, "a", "href", websiteAddress);
            SetAttributeValue(xDocument, "img", "src", imgAddress);

            var body = xDocument.ToString();
            return body;
        }

        private static void SendNotificationToUser(MessageRequest m, ref string websiteName, ref Dictionary<WebParameter, string> parameters, NewRegisterResponse res, Danel.Common.Api.Request.NewRegisterRequest req, string body)
        {
            var webSiteRegistrationType = (WebSiteCommunicationOption)Convert.ToInt32(parameters[WebParameter.WebSiteSendingType]);
            switch (webSiteRegistrationType)
            {
                case WebSiteCommunicationOption.Email:
                    m.content = body;
                    parameters = WebCacheManager.Instance.GetValue<Dictionary<WebParameter, string>>("generalParameters", null);
                    if (parameters.ContainsKey(WebParameter.CompanyDisplayName))
                    {
                        websiteName = parameters[WebParameter.CompanyDisplayName].ToString();
                    }
                    var subject = string.Format("{0} {1}", "כניסה לאתר ", websiteName);
                    m.subject = subject;
                    var from = $"do.not.reply@{websiteName}.com";
                    SendMail(m, from, m.email);
                    break;
                case WebSiteCommunicationOption.Phone:
                    var message = string.Format("{0} {1} {2}: {3}", "סיסמתך לאתר", websiteName, "היא", res.GeneratedPassword);
                    SendSMSToUser(req.NumericPhone, res.GeneratedPassword, UserState.New);
                    break;

            }
        }

        private static void SendMail(MessageRequest m, string from, string to)
        {

            var req = DIContainer.Instance.Resolve<ISendEmailDataManager>().GetRequset(m, from, to);
            DanelDataResponse danelDataResponse = DIContainer.Instance.Resolve<IRequestHandler>().HandleRequest(req);
            var response = danelDataResponse as SendEmailResponse;
            switch (response.ServiceResult)
            {
                case ServiceResult.Completed:
                    break;
                default:
                    var msg = string.Format("שליחת מייל ל {0} נכשלה", req.DanelMailMessage.To);
                    throw new DanelException(ErrorCode.MailSendFailure, msg);
                    break;
            }
        }

        [AcceptVerbs("POST")]
        public void ResendCodeToUser(ResendCodeRequest req)
        {
            SendSMSToUser(req.currenPhone, req.currentCode, UserState.Exists);
        }



        [AcceptVerbs("POST")]
        public ResetPasswordReponse ResetPassword(MessageRequest m)
        {
            ResetPasswordReponse res = new ResetPasswordReponse();
            var websiteName = "בית השקעות";
            var parameters = WebCacheManager.Instance.GetValue<Dictionary<WebParameter, string>>("generalParameters", null);
            if (parameters.ContainsKey(WebParameter.CompanyDisplayName))
            {
                websiteName = parameters[WebParameter.CompanyDisplayName].ToString();
            }

            var req = DIContainer.Instance.Resolve<IContactDataManager>().GetRequset(m);
            DanelDataResponse danelDataResponse = DIContainer.Instance.Resolve<IRequestHandler>().HandleRequest(req);
            var response = danelDataResponse as ResetPasswordResponse;
            if (response != null)
            {
                switch (response.ResetPasswordStatus)
                {
                    case UserDetailsStatus.invalidUserName:
                        throw new DanelException(ErrorCode.invalidUserName, "invalidUserName");
                    case UserDetailsStatus.noValidEmail:
                        throw new DanelException(ErrorCode.UnRecongnisedEmail, "NoValidEmail");
                    case UserDetailsStatus.unknown:
                        throw new DanelException(ErrorCode.Unknown, "NoValidEmail");
                }

                // send notification to user
                XDocument xdocument = GenerateResetPasswordMessageBody(websiteName, response);
                var body = xdocument.ToString();
                m.email = response.Email;
                m.phone = response.Phone;

                var webSiteCommunicationOption = (WebSiteCommunicationOption)Convert.ToInt32(parameters[WebParameter.WebSiteSendingType]);
                switch (webSiteCommunicationOption)
                {
                    case WebSiteCommunicationOption.Email:
                        var subject = string.Format("{0} {1}", "כניסה לאתר ", websiteName);
                        m.subject = subject;
                        m.content = body;
                        var from = $"do.not.reply@{websiteName}.com";
                        SendMail(m, from, m.email);
                        res.email = response.Email;
                        return res;
                        break;
                    case WebSiteCommunicationOption.Phone:
                        var phone = Regex.Replace(response.Phone, "[^0-9]+", string.Empty);
                        var phoneLength = phone.Length;
                        var last3Digits = phone.Substring(phoneLength - 3);
                        SendSMSToUser(phone, response.TemporaryToken, UserState.Exists);
                        res.last3Digits = last3Digits;
                        res.currentCode = response.TemporaryToken;
                        res.currenPhone = phone;
                        return res;
                        break;
                    default:
                        throw new DanelException(ErrorCode.Unknown, "Unknown");
                        break;

                }

            }
            else
            {
                throw new DanelException(ErrorCode.Unknown, "Unknown");
            }
        }

        private XDocument GenerateResetPasswordMessageBody(string websiteName, ResetPasswordResponse response)
        {
            var websiteAddress = WebConfigManager.Instance["website-url"].ToString() + "/login";
            var imgAddress = WebConfigManager.Instance["website-url"].ToString() + "/Content/customer_data/current_customer/top-header-logo.png";
            var resetPassAddress = WebConfigManager.Instance["website-url"].ToString() + "/api/Auth/ResetPassword/" + response.TemporaryToken;
            var xdocument = this.LoadXDocument("reset_password_user_notification.xml");
            SetNodeValue(xdocument, "websiteName", websiteName);
            SetAttributeValue(xdocument, "a", "href", resetPassAddress);
            SetAttributeValue(xdocument, "img", "src", imgAddress);
            return xdocument;
        }

        private static void SendSMSToUser(string phone, string token, UserState userState)
        {
            string message = "";
            var websiteName = "בית השקעות";
            var parameters = WebCacheManager.Instance.GetValue<Dictionary<WebParameter, string>>("generalParameters", null);
            if (parameters.ContainsKey(WebParameter.CompanyDisplayName))
                websiteName = parameters[WebParameter.CompanyDisplayName].ToString();

            var user = parameters[WebParameter.SMSUser];
            var pass = parameters[WebParameter.SMSPassword];
            var providerName = parameters[WebParameter.SMSProvider];
            var senderPhone = parameters[WebParameter.SMSSenderPhone];
            try
            {
                var provider = SmsProviderManager.Instance.GetProvider(providerName);
                switch (userState)
                {
                    case UserState.New:
                        message = string.Format("{0} {1} {2}: {3}", "סיסמתך לאתר", websiteName, "היא", token);
                        break;
                    case UserState.Exists:
                        message = string.Format("סיסמה זמנית לאתר היא {0}", token);
                        break;

                }

                provider.SendSms(message, user, pass, senderPhone, phone);
                if (string.IsNullOrEmpty(providerName))
                {
                    throw new DanelException(ErrorCode.EmptyProvider, "");
                }
            }
            catch (Exception ex)
            {
                switch (providerName)
                {
                    case "":
                        switch (userState)
                        {
                            case UserState.New:
                                message = string.Format("{0} {1} {2}: {3}", "סיסמתך לאתר", websiteName, "היא", token);
                                break;
                            case UserState.Exists:
                                var resetPassAddress = WebConfigManager.Instance["website-url"].ToString() + "/api/Auth/ResetPassword/" + token;
                                message = string.Format("קישור לאתר {0}", resetPassAddress);
                                break;
                        }
                        throw new DanelException(ErrorCode.EmptyProvider, message);
                        break;
                    default:
                        message = string.Format("משלוח הודעה למספר {0} נכשל. ניתן לבצע הליך שחזור סיסמא", phone);
                        throw new DanelException(ErrorCode.NoValidSMSProvider, message);

                }

            }
        }
    }
}
