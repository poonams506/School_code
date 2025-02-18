using SchoolApiApplication.BusinessLayer.Interfaces.MasterModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.Repository.Interfaces.MasterModule;

namespace SchoolApiApplication.BusinessLayer.Services.MasterModule
{
    public class MasterService : IMasterService
    {
        private readonly IMasterRepository _masterRepository;
        public MasterService(IMasterRepository masterRepository)
        {
            _masterRepository = masterRepository;
        }
        public async Task<AddressMasterDto> GetAddressMasterData()
        {
            return await _masterRepository.GetAddressMasterData();
        }
        public async Task<List<MediumType>> GetMediumTypeData()
        {
            return await _masterRepository.GetMediumTypeData();
        }

        public async Task<List<AcademicYear>> GetAcademicYearData()
        {
            return await _masterRepository.GetAcademicYearData();
        }
        public async Task<GradeDivisionMasterDto> GetGradeDivisionMasterList(int AcademicYearId)
        {
            return await _masterRepository.GetGradeDivisionMasterList(AcademicYearId);
        }

        public async Task<List<MonthMasterDto>> GetMonthMasterList()
        {
            return await _masterRepository.GetMonthMasterList();
        }

        public async Task<CommonDropdownSelectListItemResponseDto> GetStudentDropdownData(int AcademicYearId)
        {
            return await _masterRepository.GetStudentDropdownData(AcademicYearId);
        }
        public async Task<TeacherDropdownSelectListResponseDto> GetTeacherDropdownData(int AcademicYearId)
        {
            return await _masterRepository.GetTeacherDropdownData(AcademicYearId);

        }

        public async Task<TeacherDropdownSelectListResponseDto> GetTeacherDropdownWithoutSubject()
        {
            return await _masterRepository.GetTeacherDropdownWithoutSubject();

        }
        public async Task<CommonDropdownSelectListItemResponseDto> GetClerkDropdownData(int AcademicYearId)
        {
            return await _masterRepository.GetClerkDropdownData(AcademicYearId);
        }
        public async Task<CommonDropdownSelectListItemResponseDto> GetCabDriverDropdownData(int AcademicYearId)
        {
            return await _masterRepository.GetCabDriverDropdownData(AcademicYearId);
        }
    }
}
