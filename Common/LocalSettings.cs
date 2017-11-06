using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Xml.Serialization;
using System.Reflection;
using log4net;
using Danel.WebApp.Dal.Model;
using Danel.X.WebApp.Common;
using Danel.WebApp.DataManagers;
using Danel.X.Web.Common.Communication;
using Danel.Common.Api.Response;

namespace Danel.Common
{
    /// <summary>
    /// Responsible for reading globals settings from local file path
    /// Usually application registers two type of IGlobalSettingsProvider. The 1st is this class and the second
    /// is the DAL.
    /// This way the local settings file gets higher priority then the DB settings
    /// This class uses a simple XML file structure discribed below as 
    /// </summary>
    public class LocalSettings : IGlobalProvider
    {
        private string filePath;
        private ILog logger;
        private LocalSettingsXml xml;

        public LocalSettings(string filePath, ILog logger)
        {
            this.filePath = filePath;
            this.logger = logger;

            this.logger.Debug("Loading local settings from: " + filePath);

            if (!File.Exists(filePath))
            {
                //
                //  Local settings file is not a must !!!
                //
                this.xml = new LocalSettingsXml();
                this.logger.Warn("Local settings was not found");
            }
            else
            {
                Reload();

                this.logger.Debug("LocalSettings was loaded from file. Setting count: " + this.xml.Globals.Count);
            }

            LogAllGlobals();
        }

        public static DateTime GetParseDatadDate(UiRequestBase emptyRequest)
        {
            var dataDate = ParameterService.GetParsedDate();
            var req = DIContainer.Instance.Resolve<IAccountsDataManager>().GetLastPositionRequest(emptyRequest);
            var res = DIContainer.Instance.Resolve<IRequestHandler>().HandleRequest(req) as DanelLastPositionResponse;
            if (res.LastPosition.HasValue)
            {
                if (dataDate > res.LastPosition)
                    dataDate = res.LastPosition.Value;
            }
            return dataDate;
        }

        public void Save()
        {
            using (FileStream fs = File.Open(this.filePath, FileMode.Create, FileAccess.Write))
            {
                XmlSerializer serializer = new XmlSerializer(typeof(LocalSettingsXml));
                serializer.Serialize(fs, this.xml);
            }
        }

        public void Reload()
        {
            using (FileStream fs = File.Open(this.filePath, FileMode.Open, FileAccess.Read))
            {
                XmlSerializer serializer = new XmlSerializer(typeof(LocalSettingsXml));
                this.xml = (LocalSettingsXml)serializer.Deserialize(fs);
            }
        }

        public Global FindGlobal(string globalName)
        {
            return (from g in this.xml.Globals
                    where g.Name == globalName
                    select new Common.Global()
                    {
                        Name = g.Name,
                        Value = g.Value,
                    }).SingleOrDefault();
        }

        public void LogAllGlobals()
        {
            this.logger.Debug("LocalSettings");
            foreach (LocalSettingsGlobalXml global in this.xml.Globals)
            {
                this.logger.Debug("    " + global.Name + " = " + global.Value);
            }
        }

        public void AddGlobal(string globalName, string globalValue)
        {
            this.xml.Globals.Add(new LocalSettingsGlobalXml()
            {
                Name = globalName,
                Value = globalValue,
            });
        }

        public Global[] GetAllGlobals()
        {
            return (from g in this.xml.Globals select new Global() { Name = g.Name, Value = g.Value }).ToArray();
        }
    }

    /// <summary>
    /// The root class which represent the structure of a local settings XML file
    /// </summary>
    [XmlType("Settings")]
    public class LocalSettingsXml
    {
        public List<LocalSettingsGlobalXml> Globals { get; set; }

        public LocalSettingsXml()
        {
            this.Globals = new List<LocalSettingsGlobalXml>();
        }
    }

    [XmlType("Global")]
    public class LocalSettingsGlobalXml
    {
        public string Name { get; set; }
        public string Value { get; set; }
    }
}
