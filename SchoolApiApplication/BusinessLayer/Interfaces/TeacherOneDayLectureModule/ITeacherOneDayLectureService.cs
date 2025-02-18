using SchoolApiApplication.DTO.TeacherOneDayLectureModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.TeacherOneDayLectureModule
{
    public interface ITeacherOneDayLectureService
    {
        public Task<TeacherOneDayLectureResponseDto> TeacherOneDayLectureSelect(int AcademicYearId, int TeacherId, int DayNo);

    }
}
