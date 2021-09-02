using Core.Entities.Halko;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class DeviceServiceConfig : IEntityTypeConfiguration<DeviceService>
    {
        public void Configure( EntityTypeBuilder<DeviceService> builder )
        {
            builder.Property ( d => d.OwnerCost ).HasColumnType ( "decimal(18, 2)" );
            builder.Property ( d => d.ServiceCost ).HasColumnType ( "decimal(18, 2)" );
            builder.Property ( d => d.Name ).IsRequired().HasMaxLength ( 150 );
            builder.Property ( d => d.Owner ).IsRequired().HasMaxLength ( 150 );
            builder.Property ( d => d.OwnerContact ).IsRequired().HasMaxLength ( 50 );
            builder.Property ( d => d.TroubleDescription ).IsRequired().HasMaxLength ( 1000 );
            builder.Property ( d => d.GiveBackInfo ).HasMaxLength ( 1000 );
            builder.Property ( d => d.Imei ).IsRequired().HasMaxLength ( 15 );
            builder.HasIndex ( d => d.Imei );
            
            
            builder.HasOne ( d => d.Participant )
                .WithMany()
                .HasForeignKey ( d => d.ParticipantId );

            builder.HasOne ( d => d.Point )
                .WithMany()
                .HasForeignKey ( d => d.PointId );
        }
    }
}