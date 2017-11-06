using Danel.Common;
using Danel.Common.Api.Entity;
using System.Collections.Generic;
namespace Danel.WebApp.Services.AuthService
{
    public class UserDetails
    {
        public UserDetails()
        {
            userId = "";
            name = "";
            email = "";
            phone = "";
            address = "";
            authorizedEntityList = "";
            lastLoginDate = "";
        }

        public string userId { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public string address { get; set; }
        public string authorizedEntityList { get; set; }
        public List<DanelEntity> Entities { get; set; }
        public string lastLoginDate { get; set; }
    }
}
