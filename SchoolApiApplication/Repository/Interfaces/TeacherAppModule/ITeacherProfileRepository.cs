using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.DTO.GalleryModule;
using SchoolApiApplication.DTO.HomeworkModule;
using SchoolApiApplication.DTO.NoticeModule;
using SchoolApiApplication.DTO.ParentAppModule;
using SchoolApiApplication.DTO.SchoolMonthEventModule;
using SchoolApiApplication.DTO.StudentAttendanceModule;
using SchoolApiApplication.DTO.TeacherAppModule;
using SchoolApiApplication.DTO.TeacherModule;
using SchoolApiApplication.DTO.TeacherOneDayLectureModule;

namespace SchoolApiApplication.Repository.Interfaces.TeacherAppModule
{
    public interface ITeacherProfileRepository
    {
        public Task<int> TeacherProfileUpdate(TeacherProfileDto TeacherProfileDtoObj, int UserId);
        public Task<TeacherDto> GetTeacherProfile(long? TeacherId);
        Task<List<StudentAttendanceGridDto>> GetStudentAttendanceGridList(StudentAttendanceRequestDto requestDto);
        Task<int> GetStudentAttendanceUpsert(StudentAttendanceUpsertDto saudObj, int UserId);
        Task<ClassTeacherGradeDivisionListDto> ClassTeacherGradeDivisionList(int teacherId, int academicYearId);
        Task<HomeworkListDto> GetHomeworkList(int month, int year, int academicYearId, int userId);
        Task<int> PublishUnpublishHomeworkParticular(PublishUnpublishHomeworkDto publishRequest, int UserId);
        Task<HomeworkUpsertDto> HomeWorkSelect(long HomeworkId);
        Task<int> HomeWorkDelete(long? HomeworkId);
        Task<int> HomeWorkUpsert(HomeworkUpsertDto hwudObj, int UserId);
        Task<NoticeUpsertDto> NoticeSelect(long NoticeId);
        Task<int> PublishUnpublishNoticeParticular(PublishUnpublishNoticeDto publishRequest, int UserId);
        Task<int> NoticeDelete(long? NoticeId);
        Task<NoticeListDto> GetNoticeList(int AcademicYearId, byte NoticeTypeId, int RefId, int month, int year);

        Task<int> NoticeUpsert(NoticeUpsertDto notice, int UserId);

        Task<GalleryListDto> GetGalleryGridList(int AcademicYearId, byte GalleryTypeId, int RefId);

        Task<GalleryUpsertDto> GallerySelect(long GalleryId);

        Task<int> GalleryUpsert(GalleryUpsertDto gallery, int UserId);

        Task<int> GalleryDelete(long? GalleryId);

        Task<int> PublishUnpublishGalleryParticular(PublishUnpublishGalleryDto publishRequest, int UserId);

        Task<StudentTeacherAppResponseDto> StudentTeacherAppSelect(int AcademicYearId, int GradeId, int DivisionId);
        public Task<ClassAttendanceMissingReportResponseDto> ClassAttendanceMissingReport(int AcademicYearId, int TeacherId, int Month, int Year);
        public Task<TeacherOneDayLectureResponseDto> TeacherOneDayLectureSelect(int AcademicYearId, int TeacherId, int DayNo);
        public Task<SchoolMonthEventResponseDto> SchoolMonthEventStaffSelect(int AcademicYearId);
        public Task<SchoolMonthEventResponseDto> SchoolMonthEventParentSelect(int AcademicYearId, int GradeId, int DivisionId);

        Task<TeacherClassSubjectResponseDto> GetSubjectDropdownByClassTeacher(TeacherClassSubjectRequestDto RequestDto);
        Task<TeacherAttendanceHolidayResponseDto> GetTeacherAttendanceHoliday(int AcademicYearId);
    }
}
