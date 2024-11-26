using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography;
using System.Text;
using System.Diagnostics;

namespace backend.DataModels
{
    public class PrivateUser
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Auto-generate the UserId
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; } // Store hashed password
        public List<Workout> Workouts { get; set; } = new List<Workout>(); // A user can have multiple workouts    

        // Constructor to create a new user with hashed password
        public PrivateUser(string userName, string password)
        {
            this.UserName = userName;
            this.Password = HashPassword(password);
        }

        // Helper method for hashing passwords
        private static string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(bytes);
        }

        public static bool VerifyPassword(string enteredPassword, string storedPassword)
        {
            return HashPassword(enteredPassword) == storedPassword;
        }

    }
}

