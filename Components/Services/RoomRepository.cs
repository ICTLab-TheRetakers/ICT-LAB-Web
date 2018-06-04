using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ICT_LAB_Web.Components.DataContext;
using ICT_LAB_Web.Components.Entities;
using ICT_LAB_Web.Components.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

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

        public async Task<Room> Update(Room room)
        {
            var roomToUpdate = await _dbContext.Rooms.FindAsync(room.RoomCode);
            if (roomToUpdate == null)
            {
                return null;
            }

            _dbContext.Entry(roomToUpdate).CurrentValues.SetValues(room);
            var result = await _dbContext.SaveChangesAsync();

            return result == 1 ? room : null;
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

        public Task<List<Room>> GetByDepartment(string department)
        {
            return _dbContext.Rooms.Where(q => q.Department.ToLower() == department.ToLower()).ToListAsync();
        }
    }
}
