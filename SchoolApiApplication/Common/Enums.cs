using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace SchoolApiApplication.Common
{
    public enum UploadFileType
    {
        SCHOOL_UPLOAD=1,
        STUDENT_UPLOAD=2,
        NOTICE_MEDIA_FILE_UPLOAD=3,
        NOTICE_TEXT_FILE_UPLOAD=4,
        HOMEWORK_MEDIA_FILE_UPLOAD=5,
        HOMEWORK_TEXT_FILE_UPLOAD=6,
        PARENT_UPLOAD=7,
        ADMIN_UPLOAD= 8,
        TEACHER_UPLOAD=9,
        CLERK_UPLOAD = 10,
        CAB_DRIVER_UPLOAD=11,
        SURVEY_FILE_UPLOAD=12,
        STUDENT_QR_UPLOAD=13,
        GALLERY_TEXT_FILE_UPLOAD=14,
        GALLERY_MEDIA_FILE_UPLOAD = 15

    }

    public enum CommonSuccessResponseEnum
    {
        [Description("Success")]
        SUCCESS =200,
        [Description("Fee Wavier already exist")]
        FEE_WAVIER_ALREADY_EXIST = 101,
        [Description("Data updated successfully")]
        FEE_WAVIER_ALREADY_USED =102,
    }
}
