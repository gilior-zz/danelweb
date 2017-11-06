using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.IO;

namespace Danel.Common
{
    /// <summary>
    /// A GlobalName object represent a global variable that can be fetched from local file settings of from 
    /// database
    /// Each GlobalName object has a name and a type
    /// Since the GlobalName knows its type it offers a type sage usage for fetching global settings from
    /// configuration. See GlobalsManager for more details
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class GlobalName<T>
    {
        private string name;
        private bool hasDefValue;
        private T defValue;
        private bool localOnly;

        public GlobalName(string name)
        {
            this.name = name;
            this.hasDefValue = false;
            this.localOnly = false;
        }

        public GlobalName(string name, T defValue)
        {
            this.name = name;
            this.hasDefValue = true;
            this.defValue = defValue;
            this.localOnly = false;
        }

        public GlobalName<T> LocalOnly()
        {
            this.localOnly = true;

            return this;
        }

        public string Name
        {
            get
            {
                return this.name;
            }
        }

        public bool HasDefaultValue
        {
            get
            {
                return this.hasDefValue;
            }
        }

        public T DefaultValue
        {
            get
            {
                return this.defValue;
            }
        }

        public bool IsLocalOnly
        {
            get
            {
                return this.localOnly;
            }
        }
    }
}

