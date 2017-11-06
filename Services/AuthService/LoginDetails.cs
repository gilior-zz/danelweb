namespace Danel.WebApp.Services.AuthService
{
    public class LoginDetails
    {
        public LoginDetails()
        {
            userId = "";
            loginResult = "";
            id = "";
            role = "";
            authorizedEntityList = "";
            changePassword = "";
           
        }

        public string loginResult { get; set; }
        public string userId { get; set; }
        public string id { get; set; }
        public string role { get; set; }
        public string authorizedEntityList { get; set; }
        public string changePassword { get; set; }
       
    }
}
