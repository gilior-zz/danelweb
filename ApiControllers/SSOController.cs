using Danel.X.Web.Common.Communication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Danel.Common.Api;
using Newtonsoft.Json;
using Danel.Common.Utils;
using System.Net.Http.Headers;
using System.Configuration;
using Danel.WebApp.Services.AuthService;
using Danel.Common;
using Danel.WebApp.DataManagers;

using Danel.Common.Api.Response;
using System.IO;

namespace Danel.WebApp.ApiControllers
{
    [AllowAnonymous]
   // [ActiveWebSite]
    public class SSOController : BaseApiController
    {
        [AcceptVerbs("POST")]
        public async Task<IHttpActionResult> SSORequest(SSOInterface.SSORequest requst)
        {

            // create HttpClient
            using (var client = new HttpClient())
            {

                // set HttpClient headres
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


                // decrypt content (content is encrypted ssoItem)
                var decryptedSSOItem = Encryptor.Decrypt(requst.Content);

                // create ssoItem from decrypted SSOItem
                var ssoItem = JsonConvert.DeserializeObject<SSOInterface.SSOItem>(decryptedSSOItem);

                // if ssoItem has missing/bad fields
                if (!ssoItem.IsValid)
                {
                    return BadRequest();
                }



                // valid request from kali?      

                try
                {
                    var response = await client.PostAsJsonAsync($"{ConfigurationManager.AppSettings["sso-website-url"]}/api/SSO/IsSSOValid", requst);
                    //  valid SSO from kali?
                    if (!response.IsSuccessStatusCode)
                    {
                        return BadRequest();
                    }
                }
                catch (Exception ex) // unsuccefull connection
                {

                    return BadRequest();
                }



                //create user in danel server
                var req = DIContainer.Instance.Resolve<ISSODataManager>().GetRequset(ssoItem);
                var danelRes = DIContainer.Instance.Resolve<IRequestHandler>().HandleRequest(req);
                if (danelRes == null)
                {
                    return BadRequest();
                }

                var ssoResponse = danelRes as SSOResponse;
                if (ssoResponse == null || ssoResponse.SSOStatus == SSOStatus.Invalid)
                {
                    return BadRequest();
                }


                // add generated user guid to ssoItem
                ssoItem.NewUserGuid = ssoResponse.NewGuid.ToString();

                // Serialize ssoItem
                string json = JsonConvert.SerializeObject(ssoItem);

                // Encrypt ssoItem
                var encryptedSSOItem = Encryptor.Encrypt(json);


                // return new danel user guid
                return Ok(new SSOInterface.SSOResponse() { Content = encryptedSSOItem, Status = SSOInterface.Status.Continue });

            }
        }
    }
}
