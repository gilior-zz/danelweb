using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Danel.WebApp.Stores
{
    /// <summary>
    /// Manages all logins
    /// Should be implemented by contacting Danel web services
    /// </summary>
    public interface ILoginStore
    {
        Login ValidateCredentials(string name, string password);
    }

    public class Login
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public int CustomerID { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }       
        public string IDNumber { get; set; }
    }
}
