using Danel.Common;
using Danel.Common.Api;
using Danel.Common.Api.Request;
using Danel.Common.Api.Response;
using Danel.Common.Configuration;
using Danel.Common.Utils;
using Danel.WebApp.Dal.Model;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;

namespace Danel.WebApp.DataManagers
{
    public class UsersDataManager : IUsersDataManager
    {
        public DanelUsersRequest GetRequset(EmptyRequest emptyRequest)
        {

            var res = new DanelUsersRequest();
            res.UserToken = emptyRequest.token;
            res.EntityList = emptyRequest.entityList;
            return res;
        }




        public UsersDashDTO ConvertToDTO(DanelDataResponse danelDataResponse)
        {
            var userResponse = danelDataResponse as DanelUsersResponse;
            UsersDashDTO usersDashDTO = new UsersDashDTO(userResponse.WebUsers.Count);
            for (int i = 0; i < userResponse.WebUsers.Count; i++)
            {
                usersDashDTO.Users[i] = new UsersDTO()
                {
                    LastLoginDate = userResponse.WebUsers[i].LastLoginDate,
                    UserAddress = userResponse.WebUsers[i].UserAddress,
                    UserBlocked = userResponse.WebUsers[i].UserBlocked,
                    UserDeleted = userResponse.WebUsers[i].UserDeleted,
                    UserEmail = userResponse.WebUsers[i].UserEmail,
                    UserFirstName = userResponse.WebUsers[i].UserFirstName,
                    UserID = userResponse.WebUsers[i].UserID,
                    UserLastName = userResponse.WebUsers[i].UserLastName,
                    UserName = userResponse.WebUsers[i].UserName,
                    UserPassword = userResponse.WebUsers[i].UserPassword,
                    UserPhone = userResponse.WebUsers[i].UserPhone,
                    UserType = userResponse.WebUsers[i].UserType
                };
            }
            return usersDashDTO;
        }


        public DanelImpersonateRequest GetRequset(ImpersonateRequest req)
        {
            var request = new DanelImpersonateRequest() { UserID = req.userId, UserToken = req.token };
            return request;
        }


        public DanelEntityDTO[] ConvertToDanelEntityDTO(DanelDataResponse danelDataResponse)
        {
            var response = danelDataResponse as ImpersonateResponse;
            if (response != null)
            {

                var ids = response.authorizedEntityList.Split(',');
                DanelEntityDTO[] dto = new DanelEntityDTO[ids.Count()];
                for (int i = 0; i < dto.Length; i++)
                {
                    dto[i] = new DanelEntityDTO() { EntityType = 50, Id = ids[i] };
                }
                return dto;
            }
            return null;
        }

        public AdvisorDetails ConvertAdvisorDetails(DanelDataResponse danelDataResponse)
        {
            var res = danelDataResponse as AdvisorDetailsResponse;
            if (res == null)
                return null;
            if (string.IsNullOrEmpty(res.ImgString))
            {
                Image img = null;
                string imgString = string.Empty;
                img = Danel.WebApp.Properties.Resources.no_image;
                using (MemoryStream m = new MemoryStream())
                {
                    img.Save(m, img.RawFormat);
                    byte[] imageBytes = m.ToArray();
                    string base64String = Convert.ToBase64String(imageBytes);
                    res.ImgString = base64String;
                }
            }

            var adv = new AdvisorDetails()
            {
                advisorEmail = res.AadvisorEmail,
                advisorName = res.AdvisorName,
                advisorPhone = res.AdvisorPhone,
                builtInMessages = res.builtInMessages,
                supportPhone = res.SupportPhone,
                img = res.Img,
                imgString = res.ImgString
            };
            return adv;
        }


        public AdvisorDetailsaRequest GetContactAdvisorRequset(ContactAdvisorInfoRequest req)
        {
            return new AdvisorDetailsaRequest() { EntityList = req.entityList, UserID = req.userId, UserToken = req.token };
        }
    }
}