using System.Collections.Generic;
using System.Threading.Tasks;
using ICT_LAB_Web.Components.Entities;

namespace ICT_LAB_Web.Components.Services.Interfaces
{
    public interface IDeviceRepository
    {
        Task<Device> Get(int device);
        Task<List<Device>> GetByRoom(string room);
        Task<Device> Add(Device device);
        Task<bool> Delete(int device);
    }
}
