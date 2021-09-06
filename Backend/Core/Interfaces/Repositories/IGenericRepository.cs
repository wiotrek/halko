﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Specifications;

namespace Core.Interfaces
{
    /// <summary>
    /// Common methods for all entities to retrieve data
    /// </summary>
    /// <typeparam name="T">The entity</typeparam>
    public interface IGenericRepository<T> where T : BaseEntity
    {
        /// <summary>
        /// Select * from T where ColumnId = id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Single row from db of specific T</returns>
        Task<T> GetByIdAsync( int id );
        
        /// <summary>
        /// Select * from T with specification
        /// </summary>
        /// <returns>Single row from db of specific T</returns>
        Task<T> GetEntityWithSpecAsync( ISpecification<T> spec );
        
        /// <summary>
        /// Select * from T with specification
        /// </summary>
        /// <returns>All row from db of specific T with applying specification</returns>
        Task<IReadOnlyList<T>> ListAsync( ISpecification<T> spec );

        /// <summary>
        /// Select * from T
        /// </summary>
        /// <returns>All row from db of specific T without specification</returns>
        Task<IReadOnlyList<T>> ListAllAsync();
        
        /// <summary>
        /// Select count(*) fromt T
        /// </summary>
        /// <param name="spec">The filtered data to count</param>
        /// <returns>Amount of data after filtered by spec</returns>
        Task<int> CountAsync( ISpecification<T> spec );

        /// <summary>
        /// Local store entites before saving to database
        /// </summary>
        /// <param name="entity"></param>
        void Add( T entity );
        
        /// <summary>
        /// Local storage entity before replace with new to database
        /// </summary>
        /// <param name="entity"></param>
        void Update( T entity );

        /// <summary>
        /// Local storage entity before remove from database
        /// </summary>
        /// <param name="entity"></param>
        void Delete( T entity );
        
        /// <summary>
        /// The instance of entity type TEntity cannot be tracked because another instance with
        /// the same key value for Id is already being tracked.
        /// Only one entity instance with a given key value can be attached before saving changes.
        /// </summary>
        /// <param name="entity">Given entity</param>
        /// <param name="entityId">Given entity id</param>
        void DetachLocal<TEntity>( TEntity entity, int entityId ) where TEntity : BaseEntity;
    }
}