using Core.Entities.Halko;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class ParticipantPointConfig : IEntityTypeConfiguration<ParticipantPoint>
    {
        public void Configure( EntityTypeBuilder<ParticipantPoint> builder )
        {
            builder.Property ( p => p.Initial ).IsRequired();
        }
    }
}