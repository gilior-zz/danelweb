using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Danel.Common.Api.Entity;

namespace Danel.WebApp.Dal.Model
{
    public abstract class UiRequestBase
    {
        public string name { get; set; }

        public List<DanelEntity> entityList;

        public string role { get; set; }

        public string token { get; set; }
    }
}