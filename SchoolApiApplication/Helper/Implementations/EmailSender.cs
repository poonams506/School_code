using Microsoft.Extensions.Options;
using SchoolApiApplication.Helper.Interfaces;
using System.Net.Mail;
using System.Net;
using SchoolApiApplication.DTO.Options;

namespace SchoolApiApplication.Helper.Implementations
{
	public class EmailSender : IEmailSender
	{
		private readonly EmailSenderOptions _options;
		private readonly ILogger<EmailSender> _emailSenderLogger;
		public EmailSender(IOptions<EmailSenderOptions> options, ILogger<EmailSender> emailSenderLogger)
		{
			_options = options.Value;
			_emailSenderLogger = emailSenderLogger;

        }

		public async Task SendEmailAsync(string email, string subject, string message)
		{
			try
			{
				var smtpClient = new SmtpClient(_options.SmtpServer, _options.SmtpPort)
				{
					UseDefaultCredentials = false,
					Credentials = new NetworkCredential(_options.SmtpUsername, _options.SmtpPassword),
					EnableSsl = _options.UseSsl
				};

				var mailMessage = new MailMessage
				{
					From = new MailAddress(_options.SmtpUsername),
					Subject = subject,
					Body = message,
					IsBodyHtml = true
				};

				mailMessage.To.Add(new MailAddress(email));

				await smtpClient.SendMailAsync(mailMessage);
			}
			catch (Exception ex)
			{
				_emailSenderLogger.LogError(ex, "Error Log while sending email : ");

            }
		}
	}

}
