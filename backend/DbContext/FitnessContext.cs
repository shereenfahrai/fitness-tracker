using Microsoft.EntityFrameworkCore;
using backend.DataModels;

namespace backend.DbContext
{
    public class FitnessContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public FitnessContext(DbContextOptions<FitnessContext> options) : base(options) { }

        // Table for storing workouts
        public DbSet<Workout> Workouts { get; set; }

        // Table for storing users
        public DbSet<PrivateUser> Users { get; set; }
        
    }
}
