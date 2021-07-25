using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities.Halko;
using Core.Enums;

namespace Core.Interfaces
{
    public interface IParticipantService
    {
        Task<IEnumerable<ParticipantPoint>> GetParticipants(string pointName);
        Task<EServiceResponse> CreateParticipant(ParticipantPoint participant, string pointName);
        Task<ParticipantPoint> UpdateParticipant( ParticipantPoint participantPoint, string pointName );
        Task<EServiceResponse> DeleteParticipant( int id );
    }
}