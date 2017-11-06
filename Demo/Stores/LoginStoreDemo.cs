using Danel.WebApp.Stores;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Danel.WebApp.Demo.Stores
{
    public class LoginStoreDemo : ILoginStore 
    {
        public Login ValidateCredentials(string name, string password)
        {
            if (name == "test" && password == "123")
            {
                return new Login()
                {
                    ID = 70,
                    CustomerID = 1,
                    Name = "ליאור גשרי",
                    Role = "User",
                    Address = "5th avenu,Manhattan",
                    Email = "client@gmail.com",
                    Phone = "059-123456789",                  
                    IDNumber="043265982"
                };
            }

            return null;
        }
    }
}