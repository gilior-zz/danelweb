using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Castle.Windsor;

namespace Danel.Common
{
    /// <summary>
    /// A singleton wrapper around castle windsor IoC container
    /// </summary>
    public class DIContainer
    {
        private static WindsorContainer container = new WindsorContainer();

        public static WindsorContainer Instance
        {
            get
            {
                return container;
            }
        }
    }
}
