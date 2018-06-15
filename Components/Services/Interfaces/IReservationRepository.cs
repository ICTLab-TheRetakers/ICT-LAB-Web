using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ICT_LAB_Web.Components.Entities;

namespace ICT_LAB_Web.Components.Services.Interfaces
{
    public interface IReservationRepository
    {
        Task<List<Reservation>> Get(string user, DateTime? from, DateTime? till);
        Task<Reservation> GetById(int? id);
        Task<Reservation> GetByStart(string user, DateTime? start);
        Task<List<Reservation>> GetByRoom(string room, DateTime? from, DateTime? till);
        Task<List<Reservation>> GetAll();
        Task<List<Reservation>> GetByDate(DateTime date);
        Task<List<Reservation>> GetBetweenDates(DateTime date);
        Task<Reservation> Add(Reservation reservation);
        Task<Reservation> Update(Reservation reservation);
        Task<bool> Delete(int? id);
        Task<bool> CheckIfReservationExistss(Reservation reservation);
    }
}
