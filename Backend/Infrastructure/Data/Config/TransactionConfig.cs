using Core.Entities.Halko;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class TransactionConfig : IEntityTypeConfiguration<Transaction>
    {
        public void Configure( EntityTypeBuilder<Transaction> builder )
        {
            builder.Property ( p => p.ProductName ).IsRequired().HasMaxLength ( 50 );
            builder.Property ( p => p.Price ).HasColumnType ( "decimal(18, 2)" );
            
            builder.HasOne ( b => b.Participant ).WithMany()
                .HasForeignKey ( p => p.ParticipantId );
            
            builder.HasOne ( b => b.TransactionType ).WithMany()
                .HasForeignKey ( p => p.TransactionTypeId );
            
            builder.HasOne ( b => b.ProductCategory ).WithMany()
                .HasForeignKey ( p => p.ProductCategoryId );
            
            builder.HasOne ( b => b.Point ).WithMany()
                .HasForeignKey ( p => p.PointId );
        }
    }
}