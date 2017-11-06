using Danel.WebApp.Dal.Model;

namespace Danel.WebApp.DataManagers
{
    public interface IIndexDataManager
    {
        IndexDto[] GetIndexes(UiRequestBase uiRequestBase);
    }
}