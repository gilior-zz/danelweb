using Danel.Common;
using Danel.Common.Api.Entity;
using Danel.Common.Api.Request;
using Danel.Common.Api.Response;
using Danel.WebApp.ApiControllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Danel.WebApp.Dal.Model;
using Danel.WebApp.Stores;
using Danel.X.Web.Common;
using Danel.X.Web.Common.Communication;
using Microsoft.Ajax.Utilities;


namespace Danel.WebApp.DataManagers
{
    public class IndexDataManager : IIndexDataManager
    {
        public IndexDto[] GetIndexes(UiRequestBase uiRequestBase)
        {
            var indexRequest = new DanelIndexesRequest();
            indexRequest.EntityList = uiRequestBase.entityList;
            indexRequest.UserToken = uiRequestBase.token;
            var indexResponse = (DanelIndexesResponse)DIContainer.Instance.Resolve<IRequestHandler>().HandleRequest(indexRequest);

            return ConvertIndexesResponsetoDto(indexResponse);
        }

        private IndexDto[] ConvertIndexesResponsetoDto(DanelIndexesResponse response)
        {
            if (!response.IndexList.Any())
                return null;

            var indexDto = new IndexDto[response.IndexList.Count];
            int i = 0;

            foreach (var index in response.IndexList)
            {
                indexDto[i] = new IndexDto { Id = index.Id, Name = index.Name };
                i++;
            }

            return indexDto;
        }

    }
}