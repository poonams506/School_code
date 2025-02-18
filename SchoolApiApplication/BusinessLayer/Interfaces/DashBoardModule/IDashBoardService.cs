using SchoolApiApplication.DTO.DashboardModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.DashBoardModule
{
    public interface IDashBoardService
    { 
      
        public Task<AdminDashboardCountDto> GetAdminDashboardCount(short AcademicYearId);
        public Task<TeacherDashboardCountDto> GetTeacherDashboardCount(short AcademicYearId, short TeacherId);
       public Task<DashboardCountDto> GetDashboardCount();
        public Task<GirlsBoysCountDto> GetDashboardGirlsBoysCount();
        public Task<DashBoardStaffDetailsDto> GetDashBoardStaffDetails();
        public Task<IdealTeacherListResponseDto> GetIdealTeacherList(short AcademicYearId);

    }
}
