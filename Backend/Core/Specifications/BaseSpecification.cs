using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Core.Specifications
{
    public class BaseSpecification<T> : ISpecification<T>
    {
        #region Constructors

        public BaseSpecification()
        {
        }

        public BaseSpecification( Expression<Func<T, bool>> criteria )
        {
            Criteria = criteria;
        }

        #endregion
        
        #region Implementing Members
        
        public Expression<Func<T, bool>> Criteria { get; }
        public List<Expression<Func<T, object>>> Includes { get; } = new();
        public Expression<Func<T, object>> OrderBy { get; private set; }
        public Expression<Func<T, object>> OrderByDescending { get; private set; }
        
        #endregion
        
        #region Protected Methods

        /// <summary>
        /// Add 'include' to query of T entity
        /// </summary>
        /// <param name="includeExpression">The specific type to add</param>
        protected void AddInclude( Expression<Func<T, object>> includeExpression )
        {
            Includes.Add ( includeExpression );
        }

        
        /// <summary>
        /// Add 'order by' to query of T entity
        /// </summary>
        /// <param name="orderByExpression">The column to ordering</param>
        protected void AddOrderBy( Expression<Func<T, object>> orderByExpression )
        {
            OrderBy = orderByExpression;
        }

        
        /// <summary>
        /// Add 'order by desc' to query of T entity
        /// </summary>
        /// <param name="orderByDescExpression">The column to desc ordering</param>
        protected void AddOrderByDescending( Expression<Func<T, object>> orderByDescExpression )
        {
            OrderByDescending = orderByDescExpression;
        }
        
        #endregion
    }
}