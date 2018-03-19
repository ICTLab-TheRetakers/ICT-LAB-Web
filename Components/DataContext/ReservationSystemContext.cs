using ICT_LAB_Web.Components.Entities;
using Microsoft.EntityFrameworkCore;

namespace ICT_LAB_Web.Components.DataContext
{
    public partial class ReservationSystemContext : DbContext
    {
        public virtual DbSet<Device> Devices { get; set; }
        public virtual DbSet<Issue> Issues { get; set; }
        public virtual DbSet<Notification> Notifications { get; set; }
        public virtual DbSet<Participant> Participants { get; set; }
        public virtual DbSet<Reservation> Reservations { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<RoomReading> RoomReadings { get; set; }
        public virtual DbSet<Room> Rooms { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql(@"Host=localhost;Database=reservationsystem;Username=postgres;Password=root");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Device>(entity =>
            {
                entity.HasKey(e => e.DeviceId);

                entity.ToTable("devices");

                entity.HasIndex(e => e.RoomCode)
                    .HasName("devices_uk")
                    .IsUnique();

                entity.Property(e => e.DeviceId)
                    .HasColumnName("device_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.RoomCode)
                    .IsRequired()
                    .HasColumnName("room_code");
            });

            modelBuilder.Entity<Issue>(entity =>
            {
                entity.HasKey(e => new { e.RoomCode, e.IssueId });

                entity.ToTable("issues");

                entity.Property(e => e.RoomCode).HasColumnName("room_code");

                entity.Property(e => e.IssueId)
                    .HasColumnName("issue_id")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedOn).HasColumnName("created_on");

                entity.Property(e => e.Description).HasColumnName("description");

                entity.Property(e => e.Resolved)
                    .IsRequired()
                    .HasColumnName("resolved")
                    .HasColumnType("bit");

                entity.HasOne(d => d.RoomCodeNavigation)
                    .WithMany(p => p.Issues)
                    .HasForeignKey(d => d.RoomCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("issues_rooms_fk");
            });

            modelBuilder.Entity<Notification>(entity =>
            {
                entity.HasKey(e => e.NotificationId);

                entity.ToTable("notifications");

                entity.Property(e => e.NotificationId).HasColumnName("notification_id");

                entity.Property(e => e.CreatedOn).HasColumnName("created_on");

                entity.Property(e => e.Description).HasColumnName("description");

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Notifications)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("notifications_users_fk");
            });

            modelBuilder.Entity<Participant>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.RoomCode, e.StartTime });

                entity.ToTable("participants");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.Property(e => e.RoomCode).HasColumnName("room_code");

                entity.Property(e => e.StartTime).HasColumnName("start_time");
            });

            modelBuilder.Entity<Reservation>(entity =>
            {
                entity.HasKey(e => new { e.StartTime, e.RoomCode, e.UserId });

                entity.ToTable("reservations");

                entity.Property(e => e.StartTime).HasColumnName("start_time");

                entity.Property(e => e.EndTime).HasColumnName("end_time");

                entity.Property(e => e.RoomCode).HasColumnName("room_code");

                entity.Property(e => e.UserId).HasColumnName("user_id");
            });


            modelBuilder.Entity<Role>(entity =>
            {
                entity.HasKey(e => e.RoleId);

                entity.ToTable("roles");

                entity.Property(e => e.RoleId).HasColumnName("role_id");

                entity.Property(e => e.Type).HasColumnName("type");
            });

            modelBuilder.Entity<RoomReading>(entity =>
            {
                entity.HasKey(e => new { e.RoomCode, e.CreatedOn, e.Type });

                entity.ToTable("room_readings");

                entity.Property(e => e.RoomCode).HasColumnName("room_code");

                entity.Property(e => e.CreatedOn).HasColumnName("created_on");

                entity.Property(e => e.Type).HasColumnName("type");

                entity.Property(e => e.Value).HasColumnName("value");

                entity.HasOne(d => d.RoomCodeNavigation)
                    .WithMany(p => p.RoomReadings)
                    .HasPrincipalKey(p => p.RoomCode)
                    .HasForeignKey(d => d.RoomCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("readings_devices_fk");
            });

            modelBuilder.Entity<Room>(entity =>
            {
                entity.HasKey(e => e.RoomCode);

                entity.ToTable("rooms");

                entity.Property(e => e.RoomCode)
                    .HasColumnName("room_code")
                    .ValueGeneratedNever();

                entity.Property(e => e.HasComputer)
                    .HasColumnName("has_computer")
                    .HasColumnType("bit");

                entity.Property(e => e.HasSmartboard)
                    .HasColumnName("has_smartboard")
                    .HasColumnType("bit");

                entity.Property(e => e.HasWindows)
                    .HasColumnName("has_windows")
                    .HasColumnType("bit");

                entity.Property(e => e.Location).HasColumnName("location");

                entity.Property(e => e.StudentCapacity).HasColumnName("student_capacity");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.ToTable("users");

                entity.Property(e => e.UserId)
                    .HasColumnName("user_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email");

                entity.Property(e => e.FirstName).HasColumnName("first_name");

                entity.Property(e => e.LastName).HasColumnName("last_name");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password");

                entity.Property(e => e.Role).HasColumnName("role");

                entity.HasOne(d => d.RoleNavigation)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.Role)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("users_roles_fk");
            });
        }
    }
}
