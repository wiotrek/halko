using System.Threading.Tasks;
using Core.Entities.Halko;

namespace Core.Interfaces
{
    public interface ISettlementService
    {
        Task<int> CreateSettlement( Settlement settlement );
    }
}