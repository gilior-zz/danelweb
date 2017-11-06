using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.IO;

namespace Danel.Common
{
    /// <summary>
    /// Common global values for all Danel projects
    /// </summary>
    public static class GlobalNames
    {
        /// <summary>
        /// Under DEMO_MODE we do not contact Danel Web Services but rather returns unreal data to the client
        /// </summary>
        public readonly static GlobalName<bool> DEMO_MODE = new GlobalName<bool>("DEMO_MODE", false);

        /// <summary>
        /// Allow for bundling and minification
        /// </summary>
        public readonly static GlobalName<bool> ENABLE_BUNDLING_AND_MINIFICATION = new GlobalName<bool>("ENABLE_BUNDLING_AND_MINIFICATION", false);

        public readonly static GlobalName<bool> ENABLE_CSRF_VALIDATION = new GlobalName<bool>("ENABLE_CSRF_VALIDATION", true);

        public readonly static GlobalName<string> CSRF_TOKEN_NAME = new GlobalName<string>("CSRF_TOKEN_NAME", "DANEL_CSRF_TOKEN");

        
    }
}
