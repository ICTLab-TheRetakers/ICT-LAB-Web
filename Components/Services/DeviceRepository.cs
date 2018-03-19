using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ICT_LAB_Web.Components.DataContext;
using ICT_LAB_Web.Components.Entities;
using ICT_LAB_Web.Components.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ICT_LAB_Web.Components.Services
{
    public class DeviceRepository : IDeviceRepository
    {
        private ReservationSystemContext _dbContext = new ReservationSystemContext();

        public async Task<Device> Add(Device device)
        {
            _dbContext.Devices.Add(device);
            await _dbContext.SaveChangesAsync();

            return device;
        }

        public async Task<bool> Delete(int deviceId)
        {
            Device deviceToDelete = await _dbContext.Devices.FirstOrDefaultAsync(q => q.DeviceId == deviceId);
            _dbContext.Devices.Remove(deviceToDelete);

            var result = await _dbContext.SaveChangesAsync();
            return result == 1 ? true: false;
        }

        public async Task<Device> Get(int deviceId)
        {
            var response = await _dbContext.Devices.FirstOrDefaultAsync(q => q.DeviceId == deviceId);
            return response;
        }

        public Task<List<Device>> GetByRoom(string room)
        {
            return _dbContext.Devices.Where(q => q.RoomCode.ToLower() == room.ToLower()).ToListAsync();
        }
    }
}
