using System.Collections.Generic;
using System.Threading.Tasks;
using ICT_LAB_Web.Components.Entities;

namespace ICT_LAB_Web.Components.Services.Interfaces
{
    public interface IIssueRepository
    {
        Task<Issue> Get(int issue);
        Task<List<Issue>> GetByRoom(string room);
        Task<Issue> Add(Issue issue);
        Task<Issue> Update(Issue issue);
        Task<bool> Delete(int issue);
        Task<bool> DeleteFromRoom(string room);
    }
}
