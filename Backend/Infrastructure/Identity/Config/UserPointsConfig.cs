using Core.Entities.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Identity.Config
{
    public class UserPointsConfig : IEntityTypeConfiguration<UserPoints>
    {
        public void Configure( EntityTypeBuilder<UserPoints> builder )
        {
            builder.HasOne(p => p.Point)
                    .WithMany()
                    .HasForeignKey(k => k.PointId)
                    .OnDelete(DeleteBehavior.NoAction)
                    .IsRequired();

            builder.HasOne(a => a.AppUser)
                    .WithMany()
                    .HasForeignKey(k => k.AppUserId)
                    .OnDelete(DeleteBehavior.NoAction)
                    .IsRequired();
        }
    }
}