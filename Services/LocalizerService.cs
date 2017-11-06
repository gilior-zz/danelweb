using Danel.Common.Services;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Danel.WebApp.Services
{
    public sealed class LocalizerService
    {
        private static readonly Lazy<LocalizerService> lazy =
            new Lazy<LocalizerService>(() => new LocalizerService());

        public Dictionary<string, string> LocalizationItems { get; set; }
        public static LocalizerService Instance { get { return lazy.Value; } }



        public string GetTranslatedText(object txt)
        {
            var LocalizationItem = this.LocalizationItems[txt.ToString()];
            return LocalizationItem.ToString();
        }



        private LocalizerService()
        {
        }
    }
}