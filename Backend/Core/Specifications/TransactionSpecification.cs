using System;
using Core.Entities.Halko;

namespace Core.Specifications
{
    public class TransactionSpecification : BaseSpecification<Transaction>
    {
        public TransactionSpecification(int transactionId) 
            : base(x => x.Id == transactionId)
        {
            AddInclude ( x => x.Participant );
            AddInclude ( x => x.ProductCategory );
            AddInclude ( x => x.TransactionType );
            AddInclude ( x => x.Point );
        }
        
        public TransactionSpecification( DateTime date, string pointName ) 
            : base( x => x.InsertedDateTime.Date == date 
                         && x.Point.Name == pointName )
        {
            AddInclude ( x => x.Participant );
            AddInclude ( x => x.ProductCategory );
            AddInclude ( x => x.TransactionType );
            AddInclude ( x => x.Point );
        }
        
        public TransactionSpecification( string pointName ) 
            : base( x =>  x.Point.Name == pointName )
        {
            AddInclude ( x => x.Participant );
            AddInclude ( x => x.ProductCategory );
            AddInclude ( x => x.TransactionType );
            AddInclude ( x => x.Point );
        }
    }
}