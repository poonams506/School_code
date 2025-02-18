using SchoolApiApplication.DTO.CommonModule;

namespace SchoolApiApplication.Helper.Interfaces
{
    public interface IFirebaseNotificationSender
    {
        Task<List<FCMNotificationResponseDto>> SendFcmNotificationAsync(List<FCMNotificationUserDto> lstFcmUserNotification);
    }
}
