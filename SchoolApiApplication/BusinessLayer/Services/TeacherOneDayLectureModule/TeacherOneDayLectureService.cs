using SchoolApiApplication.BusinessLayer.Interfaces.TeacherOneDayLectureModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.TeacherOneDayLectureModule;
using SchoolApiApplication.Repository.Interfaces.SchoolMonthEventModule;
using SchoolApiApplication.Repository.Interfaces.TeacherOneDayLectureModule;
using SchoolApiApplication.Repository.Services.SchoolMonthEventModule;
using SchoolApiApplication.Repository.Services.TeacherOneDayLectureModule;

namespace SchoolApiApplication.BusinessLayer.Services.TeacherOneDayLectureModule
{
    public class TeacherOneDayLectureService : ITeacherOneDayLectureService
    {
        private readonly ITeacherOneDayLectureRepository _teacherOneDayLectureRepository;

        public TeacherOneDayLectureService(ITeacherOneDayLectureRepository teacherOneDayLectureRepository)
        {
            _teacherOneDayLectureRepository = teacherOneDayLectureRepository;
        }

        public async Task<TeacherOneDayLectureResponseDto> TeacherOneDayLectureSelect(int AcademicYearId, int TeacherId, int DayNo)
        {
            return await _teacherOneDayLectureRepository.TeacherOneDayLectureSelect(AcademicYearId, TeacherId, DayNo);

        }
    }
}
