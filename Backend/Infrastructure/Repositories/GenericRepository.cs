using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        #region Private Members

        private readonly HalkoContext _context;
        
        #endregion
        
        #region DI Constructor

        public GenericRepository( HalkoContext context )
        {
            _context = context;
        }

        #endregion
        
        #region Implemented Methods
        
        public async Task<T> GetEntityWithSpecAsync( ISpecification<T> spec )
        {
            return await ApplySpecification ( spec ).FirstOrDefaultAsync();
        }
        
        #endregion
        
        #region Private Methods

        /// <summary>
        /// Collect all specifications like criteria, include, order to current query
        /// </summary>
        /// <param name="spec">Any specification query have</param>
        /// <returns></returns>
        private IQueryable<T> ApplySpecification( ISpecification<T> spec )
        {
            return SpecificationEvaluator<T>.GetQuery ( _context.Set<T>().AsQueryable(), spec );
        }
        
        #endregion
        
    }
}