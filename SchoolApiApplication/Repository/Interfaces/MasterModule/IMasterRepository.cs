
using SchoolApiApplication.DTO.MasterModule;

namespace SchoolApiApplication.Repository.Interfaces.MasterModule
{
    public interface IMasterRepository
    {
         Task<AddressMasterDto> GetAddressMasterData();
         Task<List<MediumType>> GetMediumTypeData();
         Task<List<AcademicYear>> GetAcademicYearData();
         Task<GradeDivisionMasterDto> GetGradeDivisionMasterList(int AcademicYearId);
         Task<List<MonthMasterDto>> GetMonthMasterList();
         Task<CommonDropdownSelectListItemResponseDto> GetStudentDropdownData(int AcademicYearId);
         Task<TeacherDropdownSelectListResponseDto> GetTeacherDropdownData(int AcademicYearId);
         Task<TeacherDropdownSelectListResponseDto> GetTeacherDropdownWithoutSubject();
         Task<CommonDropdownSelectListItemResponseDto> GetClerkDropdownData(int AcademicYearId);
         Task<CommonDropdownSelectListItemResponseDto> GetCabDriverDropdownData(int AcademicYearId);
    }

}
