using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;
using Danel.WebApp.Bundling;
using Danel.Common;


namespace Danel.WebApp
{
    public class BundleConfig
    {
        public static void Configure(BundleCollection bundles)
        {
            bundles.IncludeDirectory("~/bundles/lib", "~/Scripts/Lib/q", "~/Scripts/Lib/pdf", "~/Scripts/Lib/jquery", "~/Scripts/Lib/angular");
            bundles.IncludeDirectory("~/bundles/lib/kendo", "~/Scripts/Lib/kendo", "~/Scripts/Lib/ls", "~/Scripts/Lib/sanitize");
            bundles.IncludeDirectory("~/bundles/common", "~/Scripts/Common", "~/Scripts/Requests", "~/Scripts/Model", "~/Scripts/Services", "~/Scripts/Stores");
            bundles.IncludeDirectory("~/bundles/directives", "~/Scripts/Widgets", "~/Scripts/Components", "~/Scripts/Filters");
            bundles.IncludeDirectory("~/bundles/controllers", "~/Scripts/Views");
            //bundles.IncludeDirectory("~/Scripts/Skins", "~/Scripts/Skins");
            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/kendo/kendo.common.min.css",
                      "~/Content/kendo/kendo.silver.min.css",
                      "~/Content/kendo/kendo.rtl.min.css",
                 "~/Content/Site.css"
                     ));

            //
            //  Enable minification only if set by Settings.xml
            //

            IGlobalProvider globals = DIContainer.Instance.Resolve<IGlobalProvider>();
            BundleTable.EnableOptimizations = globals.GetGlobal(GlobalNames.ENABLE_BUNDLING_AND_MINIFICATION);
        }
    }
}
