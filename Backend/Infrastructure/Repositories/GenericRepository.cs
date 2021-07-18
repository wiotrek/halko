using System.Collections.Generic;
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
        
        public async Task<T> GetByIdAsync( int id )
        {
            return await _context.Set<T>().FindAsync ( id );
        }
        
        public async Task<T> GetEntityWithSpecAsync( ISpecification<T> spec )
        {
            return await ApplySpecification ( spec ).FirstOrDefaultAsync();
        }

        public async Task<IReadOnlyList<T>> ListAsync( ISpecification<T> spec )
        {
            return await ApplySpecification ( spec ).ToListAsync();
        }

        public async Task<IReadOnlyList<T>> ListAllAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public void Add( T entity )
        {
            _context.Set<T>().Add ( entity );
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