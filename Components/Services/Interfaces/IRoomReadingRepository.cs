using ICT_LAB_Web.Components.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ICT_LAB_Web.Components.Services.Interfaces
{
    public interface IRoomReadingRepository
    {
        Task<List<RoomReading>> Get(int device, string type, DateTime? from, DateTime? till);
        Task<List<RoomReading>> GetByDevice(int device);
        Task<List<RoomReading>> GetByDevice(int device, int limit);
        Task<RoomReading> Add(RoomReading reading);
        Task<bool> Delete(int device);
    }
}
