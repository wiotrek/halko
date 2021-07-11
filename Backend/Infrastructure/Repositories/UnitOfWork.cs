using System;
using System.Collections;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;

namespace Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        #region Private Members
        
        private readonly HalkoContext _context;
        private Hashtable _repositories;

        #endregion
        
        #region Constructors
        
        public UnitOfWork(HalkoContext context)
        {
            _context = context;
        }
        
        #endregion
        
        #region Implemented Methods
        
        /// <summary>
        /// Retrieve connection pool
        /// </summary>
        public void Dispose()
        {
            _context.Dispose();
        }

        public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
        {
            // Initialize key value object to hover entity type
            _repositories ??= new Hashtable();

            // The name of entity
            var type = typeof(TEntity).Name;

            // If type is inherit from BaseEntity
            if( !_repositories.ContainsKey ( type ) )
            {
                // Create instance repository as value for context including this type
                var repositoryType = typeof(GenericRepository<>);
                var repositoryInstance = Activator.CreateInstance ( 
                    repositoryType.MakeGenericType ( typeof(TEntity) ),
                    _context 
                );

                // Add next entity to save
                _repositories.Add ( type, repositoryInstance );
            }

            return (IGenericRepository<TEntity>) _repositories[type];
        }

        public async Task<int> CompleteAsync()
        {
            // context contains all collected entities in list of _repositories to save
            return await _context.SaveChangesAsync();
        }
        
        #endregion
    }
}