using ICT_LAB_Web.Components.DataContext;
using ICT_LAB_Web.Components.Entities;
using ICT_LAB_Web.Components.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ICT_LAB_Web.Components.Services
{
    public class ReservationRepository : IReservationRepository
    {
        private ReservationSystemContext _dbContext = new ReservationSystemContext();

        public async Task<Reservation> Add(Reservation reservation)
        {
            _dbContext.Reservations.Add(reservation);
            await _dbContext.SaveChangesAsync();

            return reservation;
        }

        public async Task<Reservation> Update(Reservation reservationToUpdate)
        {
            var originalReservation = await _dbContext.Reservations.FirstOrDefaultAsync(q => q.UserId == reservationToUpdate.UserId
                && q.ReservationId == reservationToUpdate.ReservationId);

            if (originalReservation == null)
            {
                return null;
            }

            originalReservation.Description = reservationToUpdate.Description;
            originalReservation.StartTime = reservationToUpdate.StartTime;
            originalReservation.EndTime = reservationToUpdate.EndTime;

            _dbContext.Entry(originalReservation).State = EntityState.Modified;
            var result = await _dbContext.SaveChangesAsync();

            return result == 1 ? originalReservation : null;
        }

        public async Task<bool> Delete(int? id)
        {
            Reservation reservationToDelete = await _dbContext.Reservations.FirstOrDefaultAsync(q => q.ReservationId == id.Value);
            _dbContext.Reservations.Remove(reservationToDelete);

            var result = await _dbContext.SaveChangesAsync();
            return result == 1 ? true : false;
        }

        public async Task<List<Reservation>> Get(string user, DateTime? from, DateTime? till)
        {
            List<Reservation> response;
            if (!from.HasValue && !till.HasValue)
            {
                response = await _dbContext.Reservations.Where(q => q.UserId == user).ToListAsync();
            }
            else
            {
                response = await _dbContext.Reservations.Where(q => q.UserId == user
                        && q.StartTime >= from.Value && q.EndTime <= till.Value).ToListAsync();
            }

            return response;
        }

        public async Task<List<Reservation>> GetBetweenDates(DateTime start, DateTime end, string room)
        {
            List<Reservation> response = await _dbContext.Reservations.Where(q => q.RoomCode == room &&
                   q.StartTime <= start && (q.EndTime >= end || end > q.EndTime)).ToListAsync();
            return response;
        }

        public async Task<Reservation> GetById(int? id)
        {
            var response = await _dbContext.Reservations.FirstOrDefaultAsync(q => q.ReservationId == id.Value);
            return response;
        }

        public async Task<List<Reservation>> GetByDate(DateTime date)
        {
            var response = await _dbContext.Reservations.Where(q => q.StartTime.Date == date.Date).ToListAsync();
            return response;
        }

        public async Task<List<Reservation>> GetAll()
        {
            var response = await _dbContext.Reservations.ToListAsync();
            return response;
        }

        public async Task<Reservation> GetByStart(string user, DateTime? start)
        {
            Reservation response;
            if (!start.HasValue)
            {
                response = await _dbContext.Reservations.FirstOrDefaultAsync(q => q.UserId == user);
            }
            else
            {
                response = await _dbContext.Reservations.FirstOrDefaultAsync(q => q.UserId == user
                        && q.StartTime >= start.Value);
            }

            return response;
        }

        public async Task<List<Reservation>> GetByRoom(string room, DateTime? from, DateTime? till)
        {
            List<Reservation> response;
            if (!from.HasValue && !till.HasValue)
            {
                response = await _dbContext.Reservations.Where(q => q.RoomCode.ToLower() == room.ToLower()).ToListAsync();
            }
            else
            {
                response = await _dbContext.Reservations.Where(q => q.RoomCode.ToLower() == room.ToLower()
                        && q.StartTime >= from.Value && q.EndTime <= till.Value).ToListAsync();
            }

            return response;
        }

        public async Task<bool> CheckIfReservationExists(Reservation reservation)
        {
            List<Reservation> response = null;
            response = await _dbContext.Reservations.Where(q => q.RoomCode.ToLower() == reservation.RoomCode.ToLower() && q.StartTime.Day == reservation.StartTime.Day
                && (reservation == q || (q.StartTime <= reservation.StartTime && q.EndTime > reservation.StartTime)
                || (q.StartTime < reservation.EndTime && q.EndTime >= reservation.EndTime)
                || (q.StartTime >= reservation.StartTime && q.EndTime <= reservation.EndTime))).ToListAsync();

            if (response.Count > 0)
            {
                if (response.FirstOrDefault(q => q.ReservationId == reservation.ReservationId) != null)
                {
                    return false;
                }

                if (response.Count == 1)
                {
                    if (response[0].EndTime == reservation.StartTime)
                    {
                        return false;
                    }
                }

                return true;
            }

            return false;
        }
    }
}
