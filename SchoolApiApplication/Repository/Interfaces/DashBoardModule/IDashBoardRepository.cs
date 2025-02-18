using SchoolApiApplication.DTO.DashboardModule;

namespace SchoolApiApplication.Repository.Interfaces.DashBoardModule
{
    public interface IDashBoardRepository
    {
        public Task<GirlsBoysCountDto> GetDashboardGirlsBoysCount();
        public Task<DashBoardStaffDetailsDto> GetDashBoardStaffDetails();
        public Task<DashboardCountDto> GetDashboardCount();
        public Task<AdminDashboardCountDto> GetAdminDashboardCount(short AcademicYearId);
        public Task<TeacherDashboardCountDto> GetTeacherDashboardCount(short AcademicYearId, short TeacherId);
       public Task<IdealTeacherListResponseDto> GetIdealTeacherList(short AcademicYearId);


    }
}
 