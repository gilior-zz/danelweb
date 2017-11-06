using Castle.MicroKernel.Registration;
using Danel.WebApp.Services.AuthService;
using Danel.X.Web.Common.Communication;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;
using Danel.Common;
using Danel.WebApp.Bundling;
using Danel.WebApp.Services;
using Danel.WebApp.Stores;
using Danel.WebApp.Demo.Stores;
using Danel.WebApp.DataManagers;




namespace Danel.WebApp
{
    /// <summary>
    /// Contains all DI components and services registrations
    /// </summary>
    public class DIConfig
    {
        public static void Configure()
        {
            ILog logger = log4net.LogManager.GetLogger("Main");
            DIContainer.Instance.Register(Component.For<ILog>().Instance(logger));

            GlobalManager globalManager = new GlobalManager();
            globalManager.Register(new LocalSettings(HttpContext.Current.Server.MapPath("~/App_Data/Settings.xml"), logger));
            DIContainer.Instance.Register(Component.For<IGlobalProvider>().Instance(globalManager));

            DIContainer.Instance.Register(Component.For<IRequestHandler>().ImplementedBy<RpcRequestHandler>().LifestyleTransient());
            DIContainer.Instance.Register(Component.For<ITransactionsDataManager>().ImplementedBy<TransactionsDataManager>().LifestyleTransient());
            DIContainer.Instance.Register(Component.For<IPortfolioDataManager>().ImplementedBy<PortfolioDataManager>().LifestyleTransient());
            DIContainer.Instance.Register(Component.For<IProfileDataManager>().ImplementedBy<ProfileDataManager>().LifestyleTransient());
            DIContainer.Instance.Register(Component.For<IYieldDataManager>().ImplementedBy<YieldDataManager>().LifestyleTransient());
            DIContainer.Instance.Register(Component.For<IAccountsDataManager>().ImplementedBy<AccountsDataManager>().LifestyleTransient());
            DIContainer.Instance.Register(Component.For<IIndexDataManager>().ImplementedBy<IndexDataManager>().LifestyleTransient());
            DIContainer.Instance.Register(Component.For<IUsersDataManager>().ImplementedBy<UsersDataManager>().LifestyleTransient());
            DIContainer.Instance.Register(Component.For<IContactDataManager>().ImplementedBy<ContactDataManager>().LifestyleTransient());
            DIContainer.Instance.Register(Component.For<INewRegisterManager>().ImplementedBy<NewRegisterManager>().LifestyleTransient());
            DIContainer.Instance.Register(Component.For<ISessionDataManager>().ImplementedBy<SessionDataManager>().LifestyleTransient());
            DIContainer.Instance.Register(Component.For<IInboxDataManager>().ImplementedBy<InboxDataManager>().LifestyleTransient());
            DIContainer.Instance.Register(Component.For<IParametersDataManager>().ImplementedBy<ParametersDataManager>().LifestyleTransient());
            DIContainer.Instance.Register(Component.For<ISendEmailDataManager>().ImplementedBy<SendEmailDataManager>().LifestyleTransient());
            DIContainer.Instance.Register(Component.For<ISSODataManager>().ImplementedBy<SSODataManager>().LifestyleTransient());
            if (globalManager.GetGlobal(GlobalNames.DEMO_MODE))
            {
                DIContainer.Instance.Register(Component.For<ILoginStore>().ImplementedBy<LoginStoreDemo>().LifestyleTransient());
                //DIContainer.Instance.Register(Component.For<IAccountStore>().ImplementedBy<AccountStoreDemo>().LifestyleTransient());
                DIContainer.Instance.Register(Component.For<IDashboardStore>().ImplementedBy<DashboardStoreDemo>().LifestyleTransient());
            }
            else
            {
                throw new NotImplementedException();
            }

            //
            //  IAuthService is registered per WebRequest
            //  This allow us to load login details from the cookie to the lifetime of the web request
            //
            DIContainer.Instance.Register(Component.For<IAuthService>().ImplementedBy<AuthServiceOnAspNetIdentity>().LifestylePerWebRequest());
        }
    }
}
