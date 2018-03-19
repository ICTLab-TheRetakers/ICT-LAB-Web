using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ICT_LAB_Web.Components.DataContext;
using ICT_LAB_Web.Components.Entities;
using ICT_LAB_Web.Components.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ICT_LAB_Web.Components.Services
{
    public class ParticipantRepository : IParticipantRepository
    {
        private ReservationSystemContext _dbContext = new ReservationSystemContext();

        public async Task<Participant> Add(Participant participant)
        {
            _dbContext.Participants.Add(participant);
            await _dbContext.SaveChangesAsync();

            return participant;
        }

        public async Task<bool> Delete(string user)
        {
            Participant participantToDelete = await _dbContext.Participants
                .FirstOrDefaultAsync(q => q.UserId.ToLower() == user.ToLower());
            _dbContext.Participants.Remove(participantToDelete);

            var result = await _dbContext.SaveChangesAsync();
            return result == 1 ? true : false;
        }

        public async Task<List<Participant>> GetByRoom(string room, DateTime? start)
        {
            List<Participant> response;
            if (!start.HasValue)
            {
                response = await _dbContext.Participants.Where(q => q.RoomCode.ToLower() == room.ToLower()).ToListAsync();
            }
            else
            {
                response = await _dbContext.Participants.Where(q => q.RoomCode.ToLower() == room.ToLower()
                    && q.StartTime == start.Value).ToListAsync();
            }

            return response;
        }

        public Task<List<Participant>> GetByUser(string user)
        {
            return _dbContext.Participants.Where(q => q.UserId.ToLower() == user.ToLower()).ToListAsync();
        }
    }
}
