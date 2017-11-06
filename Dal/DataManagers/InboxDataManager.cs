using Danel.Common.Api.Request;
using Danel.WebApp.Dal.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Danel.WebApp.DataManagers
{
    public class InboxDataManager : IInboxDataManager
    {
        public DanelInboxRequest GetRequset(MessageRequest m)
        {
            var req = new DanelInboxRequest()
            {
                Cntent = m.content,
                Email = m.email,
                Phone = m.phone,
                UserID = m.userID,
                UserToken = m.token,
                EntityList = m.entityList,
                UserName = m.danelUserName
            };
            return req;
        }
    }
}