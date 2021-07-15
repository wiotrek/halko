using Core.Entities.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Identity.Config
{
    public class PointConfig : IEntityTypeConfiguration<Point>
    {
        public void Configure( EntityTypeBuilder<Point> builder )
        {
            builder.Property ( p => p.Id ).IsRequired();
            builder.Property ( p => p.Name ).IsRequired().HasMaxLength ( 150 );
        }
    }
}