using Danel.Common.Api.Request;
using Danel.WebApp.Dal.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace Danel.WebApp.DataManagers
{
    public class NewRegisterManager : INewRegisterManager
    {
        public NewRegisterRequest GetRequset(MessageRequest m)
        {
            var req = new NewRegisterRequest();
            req.Email = m.email;
            req.IdentityNumber = m.identityNumber;
            req.Phone = m.phone;
            var numericPhone = Regex.Replace(req.Phone, "[^0-9]+", string.Empty);
            req.NumericPhone = numericPhone;
            return req;
        }
    }
}