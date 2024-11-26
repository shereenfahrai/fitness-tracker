using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.DataModels
{
    public class Exercise
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Auto-generate the ExerciseId
        public int ExerciseId { get; set; }
        public required string Name { get; set; }  // Name of the exercise (e.g. Squats, Deadlifts, etc.)
        public int Sets { get; set; } // Number of sets performed
        public int Repetitions { get; set; } // Number of repetitions per set
        public double Weight { get; set; } // Weight in pounds
        public int WorkoutId { get; set; }  // Foreign key to associate with a workout
        // public Workout Workout { get; set; }  // Navigation property to the Workout table
    }
}
