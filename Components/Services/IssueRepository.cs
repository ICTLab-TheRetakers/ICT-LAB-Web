using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ICT_LAB_Web.Components.DataContext;
using ICT_LAB_Web.Components.Entities;
using ICT_LAB_Web.Components.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ICT_LAB_Web.Components.Services
{
    public class IssueRepository : IIssueRepository
    {
        private ReservationSystemContext _dbContext = new ReservationSystemContext();

        public async Task<Issue> Add(Issue issue)
        {
            _dbContext.Issues.Add(issue);
            await _dbContext.SaveChangesAsync();

            return issue;
        }

        public async Task<Issue> Update(Issue issueToUpdate)
        {
            var originalIssue = await _dbContext.Issues.FirstOrDefaultAsync(q => q.IssueId == issueToUpdate.IssueId && q.RoomCode == issueToUpdate.RoomCode);
            if (originalIssue == null)
            {
                return null;
            }

            originalIssue.Resolved = issueToUpdate.Resolved;

            _dbContext.Entry(originalIssue).State = EntityState.Modified;
            var result = await _dbContext.SaveChangesAsync();

            return result == 1 ? originalIssue : null;
        }

        public async Task<bool> Delete(int issueId)
        {
            Issue issueToDelete = await _dbContext.Issues.FirstOrDefaultAsync(q => q.IssueId == issueId);
            _dbContext.Issues.Remove(issueToDelete);

            var result = await _dbContext.SaveChangesAsync();
            return result == 1 ? true : false;
        }

        public async Task<bool> DeleteFromRoom(string room)
        {
            List<Issue> issuesToDelete = await _dbContext.Issues.Where(q => q.RoomCode == room).ToListAsync();
            _dbContext.Issues.RemoveRange(issuesToDelete);

            var result = await _dbContext.SaveChangesAsync();
            return result == 1 ? true : false;
        }

        public async Task<Issue> Get(int issueId)
        {
            var response = await _dbContext.Issues.FirstOrDefaultAsync(q => q.IssueId == issueId);
            return response;
        }

        public Task<List<Issue>> GetByRoom(string room)
        {
            return _dbContext.Issues.Where(q => q.RoomCode.ToLower() == room.ToLower()).ToListAsync();
        }

        public Task<List<Issue>> GetAll()
        {
            return _dbContext.Issues.ToListAsync();
        }
    }
}
