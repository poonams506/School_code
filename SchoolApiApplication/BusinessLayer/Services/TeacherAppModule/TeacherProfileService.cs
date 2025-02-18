using DocumentFormat.OpenXml.Bibliography;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.TeacherAppModule;
using SchoolApiApplication.DTO.GalleryModule;
using SchoolApiApplication.DTO.HomeworkModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.NoticeModule;
using SchoolApiApplication.DTO.ParentAppModule;
using SchoolApiApplication.DTO.SchoolMonthEventModule;
using SchoolApiApplication.DTO.StudentAttendanceModule;
using SchoolApiApplication.DTO.TeacherAppModule;
using SchoolApiApplication.DTO.TeacherModule;
using SchoolApiApplication.DTO.TeacherOneDayLectureModule;
using SchoolApiApplication.Repository.Interfaces.ParentAppModule;
using SchoolApiApplication.Repository.Interfaces.TeacherAppModule;
using SchoolApiApplication.Repository.Services.ParentAppModule;

namespace SchoolApiApplication.BusinessLayer.Services.TeacherAppModule
{
    public class TeacherProfileService: ITeacherProfileService
    {
        private readonly ITeacherProfileRepository _teacherProfileRepository;
        public TeacherProfileService(ITeacherProfileRepository teacherProfileRepository)
        {
            _teacherProfileRepository = teacherProfileRepository;
        }
        public async Task<int> TeacherProfileUpdate(TeacherProfileDto TeacherProfileDtoObj, int UserId)
        {
            return await _teacherProfileRepository.TeacherProfileUpdate(TeacherProfileDtoObj, UserId);
        }
        public async Task<TeacherDto> GetTeacherProfile(long? TeacherId)
        {
            return await _teacherProfileRepository.GetTeacherProfile(TeacherId);
        }
        public async Task<List<StudentAttendanceGridDto>> GetStudentAttendanceGridList(StudentAttendanceRequestDto requestDto)
        {
            return await _teacherProfileRepository.GetStudentAttendanceGridList(requestDto);

        }

        public async Task<int> GetStudentAttendanceUpsert(StudentAttendanceUpsertDto saudObj, int UserId)
        {
            return await _teacherProfileRepository.GetStudentAttendanceUpsert(saudObj, UserId);
        }
        public async Task<ClassTeacherGradeDivisionListDto> ClassTeacherGradeDivisionList(int teacherId, int academicYearId)
        {
            return await _teacherProfileRepository.ClassTeacherGradeDivisionList(teacherId, academicYearId);
        }
        public async Task<HomeworkListDto> GetHomeworkList(int month, int year, int academicYearId, int userId)
        {
            return await _teacherProfileRepository.GetHomeworkList(month, year, academicYearId, userId);
        }

        public async Task<int> PublishUnpublishHomeworkParticular(PublishUnpublishHomeworkDto publishRequest, int UserId)
        {
            return await _teacherProfileRepository.PublishUnpublishHomeworkParticular(publishRequest, UserId);
        }

        public async Task<HomeworkUpsertDto> HomeWorkSelect(long HomeworkId)
        {
            return await _teacherProfileRepository.HomeWorkSelect(HomeworkId);
        }

        public async Task<int> HomeWorkDelete(long? HomeworkId)
        {
            return await _teacherProfileRepository.HomeWorkDelete(HomeworkId);
        }

        public async Task<int> HomeWorkUpsert(HomeworkUpsertDto hwudObj, Int32 UserId)
        {
            return await _teacherProfileRepository.HomeWorkUpsert(hwudObj, UserId);
        }

        public async Task<int> PublishUnpublishNoticeParticular(PublishUnpublishNoticeDto publishRequest, int UserId)
        {
            return await _teacherProfileRepository.PublishUnpublishNoticeParticular(publishRequest, UserId);
        }

        public async Task<int> NoticeDelete(long? NoticeId)
        {
            return await _teacherProfileRepository.NoticeDelete(NoticeId);
        }

        public async Task<NoticeUpsertDto> NoticeSelect(long NoticeId)
        {
            return await _teacherProfileRepository.NoticeSelect(NoticeId);
        }

        public async Task<NoticeListDto> GetNoticeList(int AcademicYearId, byte NoticeTypeId, int RefId, int month, int year)
        {
            return await _teacherProfileRepository.GetNoticeList(AcademicYearId, NoticeTypeId, RefId, month, year);
        }

        public async Task<int> NoticeUpsert(NoticeUpsertDto hwudObj, int UserId)
        {
            return await _teacherProfileRepository.NoticeUpsert(hwudObj, UserId);
        }

        public async Task<StudentTeacherAppResponseDto> StudentTeacherAppSelect(int AcademicYearId, int GradeId, int DivisionId)
        {
            return await _teacherProfileRepository.StudentTeacherAppSelect(AcademicYearId, GradeId, DivisionId);
        }
        public async Task<ClassAttendanceMissingReportResponseDto> ClassAttendanceMissingReport(int AcademicYearId, int teacherId, int Month, int Year)
        {
            return await _teacherProfileRepository.ClassAttendanceMissingReport(AcademicYearId, teacherId,Month, Year);

        }
        public async Task<TeacherOneDayLectureResponseDto> TeacherOneDayLectureSelect(int AcademicYearId, int TeacherId, int DayNo)
        {
            return await _teacherProfileRepository.TeacherOneDayLectureSelect(AcademicYearId, TeacherId, DayNo);

        }
        public async Task<SchoolMonthEventResponseDto> SchoolMonthEventStaffSelect(int AcademicYearId)
        {
            return await _teacherProfileRepository.SchoolMonthEventStaffSelect(AcademicYearId);

        }
        public async Task<SchoolMonthEventResponseDto> SchoolMonthEventParentSelect(int AcademicYearId, int GradeId, int DivisionId)
        {
            return await _teacherProfileRepository.SchoolMonthEventParentSelect(AcademicYearId, GradeId, DivisionId);
        }

        public async Task<TeacherClassSubjectResponseDto> GetSubjectDropdownByClassTeacher(TeacherClassSubjectRequestDto RequestDto)
        {
            return await _teacherProfileRepository.GetSubjectDropdownByClassTeacher(RequestDto);

        }

       public async Task<TeacherAttendanceHolidayResponseDto> GetTeacherAttendanceHoliday(int AcademicYearId)
        {
            return await _teacherProfileRepository.GetTeacherAttendanceHoliday(AcademicYearId);
        }

        public async Task<GalleryListDto> GetGalleryGridList(int AcademicYearId, byte GalleryTypeId, int RefId)
        {
            return await _teacherProfileRepository.GetGalleryGridList(AcademicYearId, GalleryTypeId, RefId);
        }

        public async Task<GalleryUpsertDto> GallerySelect(long GalleryId)
        {
            return await _teacherProfileRepository.GallerySelect(GalleryId);
        }

        public async Task<int> GalleryUpsert(GalleryUpsertDto gallery, int UserId)
        {
            return await _teacherProfileRepository.GalleryUpsert(gallery, UserId);
        }

        public async Task<int> GalleryDelete(long? GalleryId)
        {
            return await _teacherProfileRepository.GalleryDelete(GalleryId);
        }

        public async Task<int> PublishUnpublishGalleryParticular(PublishUnpublishGalleryDto publishRequest, int UserId)
        {
            return await _teacherProfileRepository.PublishUnpublishGalleryParticular(publishRequest, UserId);
        }
    }
}
