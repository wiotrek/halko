using Core.Entities.Halko;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class DeviceConfig : IEntityTypeConfiguration<Device>
    {
        public void Configure( EntityTypeBuilder<Device> builder )
        {
            builder.Property ( d => d.PriceBuyed ).HasColumnType ( "decimal(18, 2)" );
            builder.Property ( d => d.Price ).HasColumnType ( "decimal(18, 2)" );
            builder.Property ( d => d.Producer ).IsRequired().HasMaxLength ( 50 );
            builder.Property ( d => d.Model ).IsRequired().HasMaxLength ( 50 );
            builder.Property ( d => d.Color ).IsRequired().HasMaxLength ( 50 );
            builder.Property ( d => d.Comment ).IsRequired().HasMaxLength ( 1000 );
            builder.Property ( d => d.Imei ).IsRequired().HasMaxLength ( 15 );
            builder.HasIndex ( d => d.Imei );
            
            
            builder.HasOne ( d => d.DeviceState )
                .WithMany()
                .HasForeignKey ( d => d.DeviceStateId );

            builder.HasOne ( d => d.Point )
                .WithMany()
                .HasForeignKey ( d => d.PointId );
        }
    }
}