using Core.Entities.Halko;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class TransactionTypeConfiguration : IEntityTypeConfiguration<TransactionType>
    {
        public void Configure( EntityTypeBuilder<TransactionType> builder )
        {
            builder.HasIndex ( x => x.Type ).IsUnique();
        }
    }
}