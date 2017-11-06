using System.Security.Claims;
using System.Collections.Generic;
namespace Danel.WebApp.Services.AuthService
{
    public interface IAuthService
    {
        AuthLoginResponseInfo CurrentLoginInfo { get; }
        void UpdateUserClaims(Dictionary<string, string> claim_value);
        void RemoveUserClaims(List<string> claimsToRemove);
        AuthLoginResponseInfo Login(string userName, string password, bool rememberMe);
        AuthLoginResponseInfo LoginWithToken(string token);
        string GetCacheDataAccessId();
        void Logout();
        string ReadClaimStringOrNull(ClaimsPrincipal user, string claimName);
        int ReadClaimInt(ClaimsPrincipal user, string claimName);
        AuthLoginResponseInfo LoginSSO(string userGuid);
    }
}
