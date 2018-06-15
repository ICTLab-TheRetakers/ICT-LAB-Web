using ICT_LAB_Web.Components.DataContext;
using ICT_LAB_Web.Components.Entities;
using ICT_LAB_Web.Components.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ICT_LAB_Web.Components.Services
{
    public class RoomRepository : IRoomRepository
    {
        private ReservationSystemContext _dbContext = new ReservationSystemContext();

        public async Task<Room> Add(Room room)
        {
            _dbContext.Rooms.Add(room);
            await _dbContext.SaveChangesAsync();

            return room;
        }

        public async Task<Room> Update(Room roomToUpdate)
        {
            var originalRoom = await _dbContext.Rooms.FirstOrDefaultAsync(q => q.RoomCode == roomToUpdate.RoomCode);
            if (originalRoom == null)
            {
                return null;
            }

            originalRoom.HasComputer = roomToUpdate.HasComputer;
            originalRoom.HasSmartboard = roomToUpdate.HasSmartboard;
            originalRoom.HasWindows = roomToUpdate.HasWindows;
            originalRoom.StudentCapacity = roomToUpdate.StudentCapacity;

            _dbContext.Entry(originalRoom).State = EntityState.Modified;
            var result = await _dbContext.SaveChangesAsync();

            return result == 1 ? originalRoom : null;
        }

        public async Task<bool> Delete(string room)
        {
            Room roomToDelete = await _dbContext.Rooms.FirstOrDefaultAsync(q => q.RoomCode.ToLower() == room.ToLower());
            _dbContext.Rooms.Remove(roomToDelete);

            var result = await _dbContext.SaveChangesAsync();
            return result == 1 ? true : false;
        }

        public async Task<Room> Get(string room)
        {
            var response = await _dbContext.Rooms.FirstOrDefaultAsync(q => q.RoomCode.ToLower() == room.ToLower());
            return response;
        }

        public async Task<List<Room>> GetAll()
        {
            return await _dbContext.Rooms.ToListAsync();
        }
    }
}
