using System.ComponentModel;

namespace SchoolApiApplication.DTO.UserModule
{
	public class ForgotPasswordRequestDto
	{
		public string SchoolCode { get; set; }
		public string Username { get; set; }
	}

	public class ResetPasswordSaveDto
	{
		public string Username { get; set; }
        public string ResetPasswordUrl { get; set; }
        public int UserId { get; set; }
		public string Token { get; set; }
		public DateTime ExpirationDate { get; set; }

	}

	public class ResetPasswordRequestDto 
	{
		public int UserId { get; set; }
		public string Password { get; set; }
		public string ConfirmPassword { get; set; }
		public string Token { get; set; }
		public string SchoolCode { get; set; }	
	}
}
