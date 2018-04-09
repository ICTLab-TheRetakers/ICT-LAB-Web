using ICT_LAB_Web.Components.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ICT_LAB_Web.Components.Services.Interfaces
{
    public interface IRoomReadingRepository
    {
        Task<List<RoomReading>> Get(string room, string type, DateTime? from, DateTime? till);
        Task<List<RoomReading>> GetByRoom(string room);
        Task<List<RoomReading>> GetByRoom(string room, int limit);
        Task<RoomReading> Add(RoomReading reading);
        Task<bool> Delete(string room);
    }
}
