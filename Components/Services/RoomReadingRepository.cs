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
    public class RoomReadingRepository : IRoomReadingRepository
    {
        private ReservationSystemContext _dbContext = new ReservationSystemContext();

        public async Task<RoomReading> Add(RoomReading reading)
        {
            _dbContext.RoomReadings.Add(reading);
            await _dbContext.SaveChangesAsync();

            return reading;
        }

        public async Task<bool> Delete(string room)
        {
            List<RoomReading> readingsToDelete = await _dbContext.RoomReadings.Where(q => q.RoomCode == room)
                .ToListAsync();
            _dbContext.RoomReadings.RemoveRange(readingsToDelete);

            var result = await _dbContext.SaveChangesAsync();
            return result == 0 ? true : false;
        }

        public async Task<List<RoomReading>> Get(string room, string type, DateTime? from, DateTime? till)
        {
            List<RoomReading> response;
            if (!from.HasValue && !till.HasValue)
            {
                response = await _dbContext.RoomReadings.Where(q => q.RoomCode.ToLower() == room.ToLower()
                && q.Type == type)
                    .ToListAsync();
            }
            else
            {
                response = await _dbContext.RoomReadings.Where(q => q.RoomCode.ToLower() == room.ToLower()
                        && q.CreatedOn >= from.Value && q.CreatedOn <= till.Value && q.Type.ToLower() == type.ToLower()).ToListAsync();
            }

            return response;
        }

        public Task<List<RoomReading>> GetByRoom(string room)
        {
            return _dbContext.RoomReadings.Where(q => q.RoomCode.ToLower() == room.ToLower()).ToListAsync();
        }
    }
}
