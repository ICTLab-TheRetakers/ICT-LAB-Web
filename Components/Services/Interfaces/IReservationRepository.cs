using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ICT_LAB_Web.Components.Entities;

namespace ICT_LAB_Web.Components.Services.Interfaces
{
    public interface IReservationRepository
    {
        Task<List<Reservation>> Get(string user, DateTime? from, DateTime? till);
        Task<List<Reservation>> GetByRoom(string room, DateTime? from, DateTime? till);
        Task<Reservation> Add(Reservation reservation);
        Task<Reservation> Update(Reservation reservation);
        Task<bool> Delete(string room, DateTime start);
    }
}
