using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.SchoolModule;
using SchoolApiApplication.DTO.UserModule;

namespace SchoolApiApplication.Repository.Interfaces.SchoolModule
{
    public interface ISchoolRepository
    {
        Task<SchoolDto> GetSchoolProfile(Int16 SchoolId);
        Task<int> SchoolProfileUpsert(SchoolDto SchoolObj, int UserId);
        Task<SchoolSettingDto> GetSchoolSettingProfile(Int16 SchoolId, int AcademicYearId);
        Task<int> SchoolSettingUpsert(SchoolSettingDto SchoolObj, int UserId);
        Task<AppVersionDto> GetCurrentSchoolAppVersion();
    }

}
