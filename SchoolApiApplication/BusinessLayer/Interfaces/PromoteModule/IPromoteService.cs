using SchoolApiApplication.DTO.PromoteModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.PromoteModule
{
    public interface IPromoteService
    {
        public Task<List<PromoteGridDto>> GetPromoteGridList(PromoteGridRequestDto requestDto);
        public Task<bool> StudentPassOrFailUpdate(List<PromoteGridDto> lstPromoteList, int academicYearId, string action, int UserId);
        public Task<bool> PromoteStudentToNextYear(List<PromoteGridDto> lstPromoteList, int nextAcademicYearId, int academicYearId, int gradeId, int divisionId, int UserId);
    }
}
