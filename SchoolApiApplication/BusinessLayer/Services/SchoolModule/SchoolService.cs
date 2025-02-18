using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.SchoolModule;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.SchoolModule;
using SchoolApiApplication.Repository.Interfaces.SchoolModule;

namespace SchoolApiApplication.BusinessLayer.Services.SchoolModule
{
    public class SchoolService : ISchoolService
    {
        private readonly ISchoolRepository _schoolRepository;
        public SchoolService(ISchoolRepository schoolRepository)
        {
            _schoolRepository = schoolRepository;
        }
        public async Task<SchoolDto> GetSchoolProfile(Int16 SchoolId)
        {
            return await _schoolRepository.GetSchoolProfile(SchoolId);
        }
        public async Task<int> SchoolProfileUpsert(SchoolDto SchoolObj, int UserId)
        {
            return await _schoolRepository.SchoolProfileUpsert(SchoolObj, UserId);
        }

        public async Task<SchoolSettingDto> GetSchoolSettingProfile(Int16 SchoolId, int AcademicYearId)
        {
            return await _schoolRepository.GetSchoolSettingProfile(SchoolId, AcademicYearId);
        }
        public async Task<int> SchoolSettingUpsert(SchoolSettingDto SchoolObj, int UserId)
        {
            return await _schoolRepository.SchoolSettingUpsert(SchoolObj, UserId);
        }

        public async Task<AppVersionDto> GetCurrentSchoolAppVersion()
        {
            return await _schoolRepository.GetCurrentSchoolAppVersion();
        }

    }
}
