using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Danel.WebApp.Attributes
{
    public class RoleAttribute : Attribute
    {
        public string Role { get; set; }
       
    }
}