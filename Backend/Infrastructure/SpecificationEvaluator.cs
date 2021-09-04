using System.Linq;
using Core.Entities;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    /// <summary>
    /// Query builder with collecting all clause
    /// </summary>
    public class SpecificationEvaluator<TEntity> where TEntity : BaseEntity
    {
        /// <summary>
        /// Build query with additional parts
        /// </summary>
        /// <param name="inputQuery">The current query</param>
        /// <param name="spec">The specification attached to query</param>
        /// <returns>Query to execute</returns>
        public static IQueryable<TEntity> GetQuery( IQueryable<TEntity> inputQuery, ISpecification<TEntity> spec )
        {
            // Initial current query
            var query = inputQuery;


            // If where clause exist, add
            if( spec.Criteria != null )
                query = query.Where ( spec.Criteria );


            // If order clause in ascending way, add
            if( spec.OrderBy != null )
                query = query.OrderBy ( spec.OrderBy );


            // If order clause in descending way, add
            if( spec.OrderBy != null )
                query = query.OrderByDescending ( spec.OrderByDescending );


            // If skip and take clause exist, add
            if( spec.IsPagingEnabled )
                query = query.Skip ( spec.Skip ).Take ( spec.Take );
            

            // Attach all entities being part of TEntity
            query = spec.Includes.Aggregate ( query,
                ( current, include ) => current.Include ( include ) );


            return query;
        }
    }
}