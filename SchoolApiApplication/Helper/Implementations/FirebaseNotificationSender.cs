using FirebaseAdmin.Messaging;
using HtmlAgilityPack;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.Helper.Interfaces;
using System.Text.RegularExpressions;

namespace SchoolApiApplication.Helper.Implementations
{
    public class FirebaseNotificationSender: IFirebaseNotificationSender
    {
        private string StripHtml(string html)
        {
            html = html.Replace("<br>", "    ");
            html = html.Replace("<p>", "");
            html = html.Replace("</p>", " ");
            var doc = new HtmlDocument();
            doc.LoadHtml(html);
            var text = doc.DocumentNode.InnerText;
            text = Regex.Replace(text, "&nbsp;", " ");
            text = Regex.Replace(text, "&amp;", "&");
            text = Regex.Replace(text, "&quot;", "\"");
            text = Regex.Replace(text, "&lt;", "<");
            text = Regex.Replace(text, "&gt;", ">");
            return text;
        }

        public  async Task<List<FCMNotificationResponseDto>> SendFcmNotificationAsync(List<FCMNotificationUserDto> lstFcmUserNotification)
        {

            var responses = new List<FCMNotificationResponseDto>();

            foreach (var tokenMessagePair in lstFcmUserNotification)
            {
                var message = new Message()
                {
                    Token = tokenMessagePair.Token,
                    Notification = new Notification
                    {
                        Title = tokenMessagePair.Title,
                        Body = StripHtml(tokenMessagePair.Body)
                    },
                    Data = tokenMessagePair.Data
                };

                try
                {
                    var response = await FirebaseMessaging.DefaultInstance.SendAsync(message);
                    responses.Add(new FCMNotificationResponseDto
                    {
                        Token = tokenMessagePair.Token,
                        MessageId = response
                    });
                }
                catch (FirebaseMessagingException ex)
                {
                    responses.Add(new FCMNotificationResponseDto
                    {
                        Token = tokenMessagePair.Token,
                        Error = ex.Message
                    });
                }
            }

            return responses;
        
        }
    }
}
