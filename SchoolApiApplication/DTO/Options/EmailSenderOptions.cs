namespace SchoolApiApplication.DTO.Options
{
	public class EmailSenderOptions
	{
		public string SmtpServer { get; set; }
		public int SmtpPort { get; set; }
		public string SmtpUsername { get; set;}
		public string SmtpPassword { get; set;}
		public bool UseSsl { get; set; }

	}
}
