using Danel.Common.Api.Request;
using Danel.WebApp.Dal.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Danel.WebApp.DataManagers
{
    public class ContactDataManager : IContactDataManager
    {
        public DanelResetPasswordRequest GetRequset(MessageRequest m)
        {
            var res = new DanelResetPasswordRequest() { UserName = m.senderName, EntityList = m.entityList, UserToken = m.token };
            return res;
        }
    }
}