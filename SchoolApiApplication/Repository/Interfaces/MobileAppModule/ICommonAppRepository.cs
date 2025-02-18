using SchoolApiApplication.DTO.MobileAppModule;

namespace SchoolApiApplication.Repository.Interfaces.MobileAppModule
{
    public interface ICommonAppRepository
    {
        Task<SchoolDetailMobileDto> GetSchoolDetail();
        Task<StudentDetailMobileResponseDto> GetStudentsByUserId(int UserId, int AcademicYearId);

    }
}
