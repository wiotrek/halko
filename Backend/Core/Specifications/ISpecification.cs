using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Core.Specifications
{
    /// <summary>
    /// Requirements for retrieving data from T
    /// </summary>
    /// <typeparam name="T">The entity</typeparam>
    public interface ISpecification<T>
    {
        /// <summary>
        /// Data filter for specific entity
        /// </summary>
        Expression<Func<T, bool>> Criteria { get; }
        
        /// <summary>
        /// Join list of entities being part of T 
        /// </summary>
        List<Expression<Func<T, object>>> Includes { get; }
        
        /// <summary>
        /// Data sorting in ascending way
        /// </summary>
        Expression<Func<T, object>> OrderBy { get; }
        
        /// <summary>
        /// Data sorting in descending way
        /// </summary>
        Expression<Func<T, object>> OrderByDescending { get; }
        
        /// <summary>
        /// Amount data to take at the same time
        /// </summary>
        int Take { get; }
        
        /// <summary>
        /// Amount data to skip
        /// </summary>
        int Skip { get; }
        
        /// <summary>
        /// Check if on specific page exist any data to take
        /// </summary>
        bool IsPagingEnabled { get; }
    }
}