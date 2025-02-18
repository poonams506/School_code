namespace SchoolApiApplication.DTO.CommonModule
{
  

    public class FCMNotificationUserDto
    {
        public string Token { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Body { get; set; } = string.Empty;
        public Dictionary<string, string> Data { get; set; } = new Dictionary<string, string>();

    }

    public class FCMNotificationResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public string MessageId { get; set; } = string.Empty;
        public string Error { get; set; } = string.Empty;
    }

    public class FCMUserList
    {
        public int UserId { get; set; }
        public int RoleId { get; set; }
        public int? StudentId { get; set; }
        public int? TeacherId { get; set; }
        public int? ClerkId { get; set; }
        public int? CabDriverId { get; set; }

        public string FullName { get; set;} = string.Empty;
        public string FCMToken { get; set; } = string.Empty;
    }

}
