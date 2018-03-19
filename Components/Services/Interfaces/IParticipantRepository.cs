using ICT_LAB_Web.Components.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ICT_LAB_Web.Components.Services.Interfaces
{
    public interface IParticipantRepository
    {
        Task<List<Participant>> GetByUser(string user);
        Task<List<Participant>> GetByRoom(string room, DateTime? start);
        Task<Participant> Add(Participant participant);
        Task<bool> Delete(string user);
    }
}
