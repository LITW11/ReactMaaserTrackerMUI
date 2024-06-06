using Microsoft.EntityFrameworkCore;

namespace ReactMaaserTrackerMUI.Data
{
    public class MaaserTrackerContext : DbContext
    {
        private readonly string _connectionString;

        public MaaserTrackerContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }
        }

        public DbSet<IncomeSource> IncomeSources { get; set; }
        public DbSet<MaaserPayment> MaaserPayments { get; set; }
        public DbSet<IncomePayment> IncomePayments { get; set; }

    }
}