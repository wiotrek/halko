using Core.Entities.Halko;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class ParticipantPointConfig : IEntityTypeConfiguration<ParticipantPoint>
    {
        public void Configure( EntityTypeBuilder<ParticipantPoint> builder )
        {
            builder.Property ( p => p.Initial ).IsRequired().HasMaxLength(5);
            builder.Property ( p => p.FirstName ).IsRequired().HasMaxLength(40);
            builder.Property ( p => p.LastName ).IsRequired().HasMaxLength(40);

            builder.HasOne ( p => p.Point )
                .WithMany()
                .HasForeignKey ( f => f.PointId );
        }
    }
}