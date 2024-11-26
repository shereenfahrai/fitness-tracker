
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.DataModels
{
    public class Workout
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Auto-generate the WorkoutId
        public int WorkoutId { get; set; }
        public required string Name { get; set; } // Name of the workout (e.g. "Leg Day")
        public DateTime Date { get; set; } // Date that the workout was performed
        public int UserId { get; set; } // Foreign key to the User table
        // public required PrivateUser User { get; set; } // Navigation property to the User table
        public List<Exercise> Exercises { get; set; } = new List<Exercise>(); // A workout has many exercises
    }
}
