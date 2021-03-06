using System.Collections.Generic;
using System.Threading.Tasks;
using ICT_LAB_Web.Components.Entities;

namespace ICT_LAB_Web.Components.Services.Interfaces
{
    public interface IRoomRepository
    {
        Task<Room> Get(string room);
        Task<List<Room>> GetAll();
        Task<Room> Add(Room room);
        Task<Room> Update(Room room);
        Task<bool> Delete(string room);
    }
}
