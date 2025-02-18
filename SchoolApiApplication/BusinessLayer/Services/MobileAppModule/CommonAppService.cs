using SchoolApiApplication.BusinessLayer.Interfaces.MobileAppModule;
using SchoolApiApplication.DTO.MobileAppModule;
using SchoolApiApplication.DTO.StudentAttendanceModule;
using SchoolApiApplication.Repository.Interfaces.MobileAppModule;
using SchoolApiApplication.Repository.Interfaces.ParentAppModule;

namespace SchoolApiApplication.BusinessLayer.Services.MobileAppModule
{
    public class CommonAppService : ICommonAppService
    {
        private readonly ICommonAppRepository _commonAppRepository;
        public CommonAppService(ICommonAppRepository commonAppRepository)
        {
            _commonAppRepository = commonAppRepository;
        }
        public async  Task<SchoolDetailMobileDto> GetSchoolDetail()
        {
           return await   _commonAppRepository.GetSchoolDetail();
        }

        public async Task<StudentDetailMobileResponseDto> GetStudentsByUserId(int UserId, int AcademicYearId)
        {
            return await _commonAppRepository.GetStudentsByUserId(UserId, AcademicYearId);
        }
    }
}
