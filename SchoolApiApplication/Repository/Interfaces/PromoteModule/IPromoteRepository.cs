using SchoolApiApplication.DTO.CabDriverModule;
using SchoolApiApplication.DTO.PromoteModule;
using SchoolApiApplication.DTO.StudentAttendanceModule;

namespace SchoolApiApplication.Repository.Interfaces.PromoteModule
{
    public interface IPromoteRepository
    {
        //public Task<DatatableResponseModel> GetPromoteGridList(DatatableRequestWrapper requestOWrapper);

        public Task<List<PromoteGridDto>> GetPromoteGridList(PromoteGridRequestDto requestDto);
        public Task<bool> StudentPassOrFailUpdate(List<PromoteGridDto> lstPromoteList, int academicYearId, string action,int UserId);
        public Task<bool> PromoteStudentToNextYear(List<PromoteGridDto> lstPromoteList, int nextAcademicYearId, int academicYearId, int gradeId, int divisionId, int UserId);

    }
}
