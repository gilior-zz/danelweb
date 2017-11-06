using Danel.Common.Api.Request;
using Danel.Common.Utils;
using Danel.WebApp.Dal.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace Danel.WebApp.DataManagers
{
    public class ProfileDataManager : IProfileDataManager
    {
        public DanelProfileRequest GetRequset(ProfileRequestType profileRequestType, MessageRequest m = null, ChangePasswordRequest cp = null)
        {
            var request = new DanelProfileRequest();        
            if (profileRequestType == ProfileRequestType.UserDetails)
            {
                request.Address = m.address;
                request.Email = m.email;
                request.Phone = m.phone;
                request.UserToken = m.token;
                request.EntityList = m.entityList;
            }

            if (profileRequestType == ProfileRequestType.ChangePassword)
            {
                request.Password = Encryptor.Encrypt(cp.new_password);
                request.Current_Password = Encryptor.Encrypt(cp.current_password);
                request.UserToken = cp.token;
                request.EntityList = cp.entityList;
            }
            if (profileRequestType == ProfileRequestType.ResetPassword)
            {
                request.Password = Encryptor.Encrypt(cp.new_password);            
                request.UserToken = cp.token;
                request.EntityList = cp.entityList;
            }
            request.ProfileRequestType = profileRequestType;
            return request;

        }
    }
}