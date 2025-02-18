namespace SchoolApiApplication.Common
{
    public class CommonSuccessResponse
    {
        public int Id { get; set; }
        public CommonSuccessResponseEnum StatusCode { get; set; }
        public string Message
        {
            get
            {
                return StatusCode.Description();
            }
        }
    }
}
