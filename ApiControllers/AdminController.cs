using Danel.Common;
using Danel.Common.Api.Response;
using Danel.WebApp.Dal.Model;
using Danel.WebApp.DataManagers;
using Danel.WebApp.Services.AuthService;
using Danel.X.Web.Common.Communication;
using Microsoft.Owin.Security;
using System.Net;
using System.Security.Claims;
using System.Web;
using System.Web.Http;
using Constants;
using System.Collections.Generic;
using Danel.Common.Api.Entity;
using Newtonsoft.Json;
using Danel.WebApp.Attributes;


namespace Danel.WebApp.ApiControllers
{
    [Role(Role = Constants.Roles.WebAdmin)]
    public class AdminController : BaseApiController
    {
        // GET: Admin
        [AcceptVerbs("POST")]
        public UsersDashDTO GetAllUsers(EmptyRequest emptyRequest)
        {          
            var req = DIContainer.Instance.Resolve<IUsersDataManager>().GetRequset(emptyRequest);
            req.WebUserRequestType = WebUserRequestType.GetAllWebUsers;
            DanelDataResponse danelDataResponse = DIContainer.Instance.Resolve<IRequestHandler>().HandleRequest(req);            
            UsersDashDTO dto = DIContainer.Instance.Resolve<IUsersDataManager>().ConvertToDTO(danelDataResponse);
            return dto;
        }

        [AcceptVerbs("POST")]
        public void ImpersonateAs(ImpersonateRequest impersonateRequest)
        {
            var req = DIContainer.Instance.Resolve<IUsersDataManager>().GetRequset(impersonateRequest);
            DanelDataResponse danelDataResponse = DIContainer.Instance.Resolve<IRequestHandler>().HandleRequest(req);
            var res = danelDataResponse as ImpersonateResponse;
            var ids = res.authorizedEntityList.Split(',');
            List<DanelEntity> lis = new List<DanelEntity>();
            for (int i = 0; i < ids.Length; i++)
            {
                lis.Add(new DanelEntity() { EntityType = ApiEntityType.Account, Id = ids[i] });
            }
            var userDetails = new UserDetails()
          {                
              address = impersonateRequest.userAddress,
              authorizedEntityList = res.authorizedEntityList,
              email = impersonateRequest.userEmail,
              name = impersonateRequest.name,
              phone = impersonateRequest.userPhone,
              userId = impersonateRequest.userId,
              lastLoginDate = impersonateRequest.lastLoginDate,
              Entities = lis
          };
            IAuthService authService = DIContainer.Instance.Resolve<IAuthService>();
            Dictionary<string, string> claim_value = new Dictionary<string, string>();

            claim_value.Add(Claims.CLAIM_USER_USERID, userDetails.userId);
            claim_value.Add(Claims.CLAIM_USER_NAME, userDetails.name);
            claim_value.Add(Claims.CLAIM_USER_EMAIL, userDetails.email);
            claim_value.Add(Claims.CLAIM_USER_PHONE, userDetails.phone);
            claim_value.Add(Claims.CLAIM_USER_ADRESS, userDetails.address);
            claim_value.Add(Claims.CLAIM_USER_LAST_LOGIN_DATE, userDetails.lastLoginDate);
            claim_value.Add(Claims.CLAIM_USER_AUTHORIZED_ENTITY_LIST, JsonConvert.SerializeObject(userDetails.Entities));

            authService.UpdateUserClaims(claim_value);

        }

        [AcceptVerbs("POST")]
        public void RemoveImpersonateAs(ImpersonateRequest impersonateRequest)
        {
            IAuthService authService = DIContainer.Instance.Resolve<IAuthService>();
            List<string> lis = new List<string>();
            lis.Add(Claims.CLAIM_USER_USERID);
            //lis.Add(Claims.CLAIM_USER_FIRST_NAME);
            lis.Add(Claims.CLAIM_USER_EMAIL);
            lis.Add(Claims.CLAIM_USER_PHONE);
            lis.Add(Claims.CLAIM_USER_ADRESS);
            lis.Add(Claims.CLAIM_USER_AUTHORIZED_ENTITY_LIST);
            authService.RemoveUserClaims(lis);
        }


    }
}