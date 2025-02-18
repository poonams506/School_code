using SchoolApiApplication.DTO.TeacherOneDayLectureModule;

namespace SchoolApiApplication.Repository.Interfaces.TeacherOneDayLectureModule
{
    public interface ITeacherOneDayLectureRepository
    {

        public Task<TeacherOneDayLectureResponseDto> TeacherOneDayLectureSelect(int AcademicYearId, int TeacherId, int DayNo);

    }
}
