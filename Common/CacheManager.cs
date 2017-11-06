using System;
using System.ComponentModel;
using System.Web;

namespace Danel.Common
{
    public class CacheManager
    {
        // Singleton Functions
        private CacheManager() { }

        private static CacheManager _cacheManager = null;
        public static CacheManager Instance
        {
            get { return _cacheManager ?? (_cacheManager = new CacheManager()); }
        }

        public T GetValue<T>(string name, T replacementValue)
        {
            if (HttpRuntime.Cache[name] == null)
                return replacementValue;
            var retVal = HttpRuntime.Cache[name];
            return (T)retVal;
        }

        public void SetValue<T>(string key, T val)
        {
            HttpRuntime.Cache[key] = val;
        }


        public object this[String Name]
        {
            get
            {
                return HttpRuntime.Cache[Name] ?? null;
            }

            set
            {
                HttpRuntime.Cache[Name] = value;
            }
        }
    }
}
