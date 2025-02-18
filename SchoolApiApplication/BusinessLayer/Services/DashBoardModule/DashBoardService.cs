using SchoolApiApplication.BusinessLayer.Interfaces.DashBoardModule;
using SchoolApiApplication.DTO.DashboardModule;
using SchoolApiApplication.Repository.Interfaces.ClerkModule;
using SchoolApiApplication.Repository.Interfaces.DashBoardModule;
using SchoolApiApplication.Repository.Services.ClerkModule;

namespace SchoolApiApplication.BusinessLayer.Services.DashBoardModule
{
    public class DashBoardService : IDashBoardService
    {
        private readonly IDashBoardRepository _dashBoardRepository;

        public DashBoardService(IDashBoardRepository DashBoardRepository)
        {
            _dashBoardRepository = DashBoardRepository;
        }

        public async Task<DashboardCountDto> GetDashboardCount()
        {
            return await _dashBoardRepository.GetDashboardCount();
        }

        public async Task<AdminDashboardCountDto> GetAdminDashboardCount(short AcademicYearId)
        {
            return await _dashBoardRepository.GetAdminDashboardCount(AcademicYearId);
        }

        

        public async Task<TeacherDashboardCountDto> GetTeacherDashboardCount(short AcademicYearId, short TeacherId)
        {
            return await _dashBoardRepository.GetTeacherDashboardCount(AcademicYearId, TeacherId);
        }

      

        public async Task<DashBoardStaffDetailsDto> GetDashBoardStaffDetails()
        {
            return await _dashBoardRepository.GetDashBoardStaffDetails();
        }

        public async Task<GirlsBoysCountDto> GetDashboardGirlsBoysCount()
        {
            return await _dashBoardRepository.GetDashboardGirlsBoysCount();
        }
        public async Task<IdealTeacherListResponseDto> GetIdealTeacherList(short AcademicYearId)
        {
            return await _dashBoardRepository.GetIdealTeacherList(AcademicYearId);
        }
    }
}
