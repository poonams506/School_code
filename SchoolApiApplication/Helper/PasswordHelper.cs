
namespace SchoolApiApplication.Helper
{
    public static class PasswordHelper
    {
        // Generates a new salt for password hashing
        public static string GenerateSalt(int workFactor)
        {
            return BCrypt.Net.BCrypt.GenerateSalt(workFactor);
        }

        // Hashes a password using Bcrypt with the specified salt
        public static string HashPassword(string password, string salt)
        {
            return BCrypt.Net.BCrypt.HashPassword(password, salt);
        }

        // Verifies a password against a hashed password using Bcrypt
        public static bool VerifyPassword(string password, string hashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
        }
    }
}

