using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities.Halko;

namespace Core.Interfaces
{
    public interface IParticipantService
    {
        Task<IEnumerable<ParticipantPoint>> GetParticipants(string pointName);
        Task<int> CreateParticipant(ParticipantPoint participant, string pointName);
        Task<ParticipantPoint> UpdateParticipant( ParticipantPoint participantPoint, string pointName );
        Task<int> DeleteParticipant( int id );
    }
}