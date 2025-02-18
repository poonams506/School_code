using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.DTO.GalleryModule;
using SchoolApiApplication.DTO.HomeworkModule;
using SchoolApiApplication.DTO.NoticeModule;
using SchoolApiApplication.DTO.SchoolMonthEventModule;
using SchoolApiApplication.DTO.StudentAttendanceModule;
using SchoolApiApplication.DTO.TeacherAppModule;
using SchoolApiApplication.DTO.TeacherModule;
using SchoolApiApplication.DTO.TeacherOneDayLectureModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.TeacherAppModule
{
    public interface ITeacherProfileService
    {
        public Task<int> TeacherProfileUpdate(TeacherProfileDto TeacherProfileDtoObj, int UserId);
        public Task<TeacherDto> GetTeacherProfile(long? TeacherId);
        public Task<List<StudentAttendanceGridDto>> GetStudentAttendanceGridList(StudentAttendanceRequestDto requestDto);
        public Task<int> GetStudentAttendanceUpsert(StudentAttendanceUpsertDto saudObj, int UserId);
        public Task<ClassTeacherGradeDivisionListDto> ClassTeacherGradeDivisionList(int teacherId, int academicYearId);
        public Task<HomeworkListDto> GetHomeworkList(int month, int year, int academicYearId, int userId);
        Task<int> PublishUnpublishHomeworkParticular(PublishUnpublishHomeworkDto publishRequest, int UserId);
        Task<HomeworkUpsertDto> HomeWorkSelect(long HomeworkId);
        Task<int> HomeWorkDelete(long? HomeworkId);
        Task<int> HomeWorkUpsert(HomeworkUpsertDto hwudObj, Int32 UserId);
        Task<NoticeUpsertDto> NoticeSelect(long NoticeId);
        Task<int> PublishUnpublishNoticeParticular(PublishUnpublishNoticeDto publishRequest, int UserId);
        Task<int> NoticeDelete(long? NoticeId);
        Task<NoticeListDto> GetNoticeList(int AcademicYearId, byte NoticeTypeId, int RefId, int month, int year);
        Task<int> NoticeUpsert(NoticeUpsertDto hwudObj, int UserId);
        Task<GalleryListDto> GetGalleryGridList(int AcademicYearId, byte GalleryTypeId, int RefId);

        Task<GalleryUpsertDto> GallerySelect(long GalleryId);

        Task<int> GalleryUpsert(GalleryUpsertDto gallery, int UserId);

        Task<int> GalleryDelete(long? GalleryId);

        Task<int> PublishUnpublishGalleryParticular(PublishUnpublishGalleryDto publishRequest, int UserId);

        Task<StudentTeacherAppResponseDto> StudentTeacherAppSelect(int AcademicYearId, int GradeId, int DivisionId);
        Task<ClassAttendanceMissingReportResponseDto> ClassAttendanceMissingReport(int AcademicYearId, int teacherId, int Month, int Year);
        Task<TeacherOneDayLectureResponseDto> TeacherOneDayLectureSelect(int AcademicYearId, int TeacherId, int DayNo);
        Task<SchoolMonthEventResponseDto> SchoolMonthEventStaffSelect(int AcademicYearId);
        Task<SchoolMonthEventResponseDto> SchoolMonthEventParentSelect(int AcademicYearId, int GradeId, int DivisionId);

        Task<TeacherClassSubjectResponseDto> GetSubjectDropdownByClassTeacher(TeacherClassSubjectRequestDto RequestDto);
        Task<TeacherAttendanceHolidayResponseDto> GetTeacherAttendanceHoliday(int AcademicYearId);
    }
}
