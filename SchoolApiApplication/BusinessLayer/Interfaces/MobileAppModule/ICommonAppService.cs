using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.DTO.MobileAppModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.MobileAppModule
{
    public interface ICommonAppService
    {
        Task<SchoolDetailMobileDto> GetSchoolDetail();
        Task<StudentDetailMobileResponseDto> GetStudentsByUserId(int UserId, int AcademicYearId);
    }
}
