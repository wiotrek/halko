using Core.Entities.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class PointConfig : IEntityTypeConfiguration<Point>
    {
        public void Configure( EntityTypeBuilder<Point> builder )
        {
            builder.Property ( p => p.Id ).IsRequired();
            builder.Property ( p => p.Name ).IsRequired().HasMaxLength ( 150 );

            builder.HasMany ( p => p.Participants )
                .WithOne()
                .OnDelete ( DeleteBehavior.NoAction );
        }
    }
}