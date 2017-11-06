namespace Danel.WebApp.Services.AuthService
{
    public class AuthLoginResponseInfo
    {
        public LoginDetails loginDetails { get; set; }
        public UserDetails userDetails { get; set; }
        public UserDetails adminDetails { get; set; }
    }
}
