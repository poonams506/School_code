using DocumentFormat.OpenXml.Spreadsheet;
using SchoolApiApplication.BusinessLayer.Interfaces.ParentAppModule;
using SchoolApiApplication.DTO.ParentAppModule;
using SchoolApiApplication.Repository.Interfaces.ParentAppModule;
using SchoolApiApplication.Repository.Interfaces.StudentModule;
using SchoolApiApplication.Repository.Services.StudentModule;

namespace SchoolApiApplication.BusinessLayer.Services.ParentAppModule
{
    public class StudentProfileService: IStudentProfileService
    {
        private readonly IStudentProfileRepository _studentProfileRepository;
        public StudentProfileService(IStudentProfileRepository studentProfileRepository)
        {
            _studentProfileRepository = studentProfileRepository;
        }
        public async Task<StudentProfileMobileDto> GetStudentProfile(long StudentId)
        {
            return await _studentProfileRepository.GetStudentProfile(StudentId);

        }
        public async Task<int> StudentProfileUpdate(StudentProfileMobileDto StudentProfileObj, int UserId)
        {
            return await _studentProfileRepository.StudentProfileUpdate(StudentProfileObj, UserId);
        }

        public async  Task<ParentProfileMobileResponseDto> GetParentProfile(long StudentId)
        {
            return await _studentProfileRepository.GetParentProfile(StudentId);
        }
        public async  Task<int> ParentProfileUpdate(ParentProfileMobileDto ParentProfileObj, int UserId)
        {
            return await _studentProfileRepository.ParentProfileUpdate(ParentProfileObj, UserId);
        }
    }
}
