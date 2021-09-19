using Core.Entities.Halko;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class SettlementConfig : IEntityTypeConfiguration<Settlement>
    {
        public void Configure( EntityTypeBuilder<Settlement> builder )
        {
            builder.Property ( d => d.DayBilans ).HasColumnType ( "decimal(18, 2)" );
            builder.Property ( d => d.DayBilansInCash ).HasColumnType ( "decimal(18, 2)" );
            builder.Property ( d => d.DayBilansInCart ).HasColumnType ( "decimal(18, 2)" );
            builder.Property ( d => d.MonthBilansInCart ).HasColumnType ( "decimal(18, 2)" );
            builder.Property ( d => d.Income ).HasColumnType ( "decimal(18, 2)" );
            builder.Property ( d => d.Outcome ).HasColumnType ( "decimal(18, 2)" );
            
            builder.HasOne ( d => d.Point )
                .WithMany()
                .HasForeignKey ( d => d.PointId );
        }
    }
}