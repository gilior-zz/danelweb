using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;

namespace Danel.Common
{
    /// <summary>
    /// Responsible for fetching globals (key + value) from any kind of data storage
    /// </summary>
    public interface IGlobalProvider
    {
        Global FindGlobal(string globalName);
        Global[] GetAllGlobals();
    }

    /// <summary>
    /// A global is a pair of key and value
    /// </summary>
    [Serializable]
    public class Global
    {
        public string Name { get; set; }
        public string Value { get; set; }
    }

    /// <summary>
    /// Manages a list of global sources. Each source is an implementation of IGlobalSettingsProvider
    /// When requested, the GlobalSettingsManager iterates its internal sources list and returns the first global that was found
    /// The first IGlobalSettingsProvider source that is registered has the higher priority
    /// </summary>
    public class GlobalManager : IGlobalProvider
    {
        /// <summary>
        /// List of regsieterd sources
        /// </summary>
        private List<IGlobalProvider> providers;
        private static LocalDataStoreSlot slot = Thread.AllocateDataSlot();

        public GlobalManager()
        {
            this.providers = new List<IGlobalProvider>();
        }

        private void PushQuery(string name)
        {
            Stack<string> queries = (Stack<string>)Thread.GetData(slot);
            if (queries == null)
            {
                queries = new Stack<string>();
                Thread.SetData(slot, queries);
            }

            queries.Push(name);
        }

        private void PopQuery()
        {
            Stack<string> queries = (Stack<string>)Thread.GetData(slot);
            if (queries == null)
            {
                throw new Exception("No running queries stack");
            }

            queries.Pop();
        }

        private bool HasQuery(string name)
        {
            Stack<string> queries = (Stack<string>)Thread.GetData(slot);
            if (queries == null)
            {
                return false;
            }

            bool res = queries.Contains(name);
            return res;
        }

        public void Register(IGlobalProvider source)
        {
            this.providers.Add(source);
        }

        public void Unregister(IGlobalProvider source)
        {
            this.providers.Remove(source);
        }

        public Global FindGlobal(string name)
        {
            if (HasQuery(name))
            {
                //
                //  User is requesting the same global twice while the first search was not over yet
                //  This indicate of a recursive pattern
                //
                return null;
            }

            //
            //  Push/Pop query are used to detected recursive FindGlobal request
            //
            PushQuery(name);

            try
            {
                foreach (IGlobalProvider source in this.providers.ToArray())
                {
                    Global global = source.FindGlobal(name);
                    if (global != null)
                    {
                        return global;
                    }
                }

                return null;
            }
            finally
            {
                PopQuery();
            }
        }

        public Global[] GetAllGlobals()
        {
            Dictionary<string, Global> mergedGlobals = new Dictionary<string, Global>();

            foreach(IGlobalProvider provider in this.providers)
            {
                Global[] globals = provider.GetAllGlobals();
                foreach (Global global in globals)
                {
                    if (!mergedGlobals.ContainsKey(global.Name))
                    {
                        mergedGlobals.Add(global.Name, global);
                    }
                }
            }

            return mergedGlobals.Values.ToArray();
        }
    }

    /// <summary>
    /// A list of extension methods to help consume the IGlobalSettingsProvider interface easily
    /// </summary>
    public static class GlobalProviderExtensions
    {
        public static T GetGlobal<T>(this IGlobalProvider globals, GlobalName<T> name)
        {
            Global global = globals.FindGlobal(name.Name);
            if (global == null)
            {
                if (!name.HasDefaultValue)
                {
                    throw new Exception("Global " + name.Name + " was not found and no default value was set");
                }

                return name.DefaultValue;
            }

            //
            //  Special care for null value
            //  If T is nullable we need to return null. Else, continue with normal execution
            //
            Type type = typeof(T);
            if (type.IsGenericType && type.GetGenericTypeDefinition() == typeof(bool?).GetGenericTypeDefinition())
            {
                if (string.IsNullOrEmpty(global.Value))
                {
                    //
                    //  default(T) for nullable type is null
                    //
                    return default(T);
                }
                else
                {
                    //
                    //  Parse the value using the real type inside the Nullable type
                    //
                    Type realType = type.GetGenericArguments()[0];
                    return (T)Convert.ChangeType(global.Value, realType);
                }
            }


            return (T)Convert.ChangeType(global.Value, typeof(T));
        }

        public static string GetString(this IGlobalProvider globals, string name)
        {
            Global global = globals.FindGlobal(name);
            if (global == null)
            {
                throw new Exception("Global: " + name + " was not found");
            }

            return global.Value;
        }

        public static string GetStringOrDefault(this IGlobalProvider globals, string name, string defValue)
        {
            Global global = globals.FindGlobal(name);
            if (global != null)
            {
                return global.Value;
            }

            return defValue;
        }

        public static int GetIntOrDefault(this IGlobalProvider globals, string name, int defValue)
        {
            Global global = globals.FindGlobal(name);
            if (global != null)
            {
                return int.Parse(global.Value);
            }

            return defValue;
        }

        public static bool GetBoolOrDefault(this IGlobalProvider globals, string name, bool defValue)
        {
            Global global = globals.FindGlobal(name);
            if (global != null)
            {
                return bool.Parse(global.Value);
            }

            return defValue;
        }

        public static bool HasGlobal(this IGlobalProvider globals, string name)
        {
            Global global = globals.FindGlobal(name);
            return (global != null);
        }

        public static Global GetGlobal(this IGlobalProvider globals, string name)
        {
            Global global = globals.FindGlobal(name);
            if (global == null)
            {
                throw new Exception("Global with name: " + name + " was not found");
            }

            return global;
        }
    }
}
