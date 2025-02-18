using SchoolApiApplication.DTO.ParentAppModule;
using SchoolApiApplication.DTO.StudentModule;

namespace SchoolApiApplication.Repository.Interfaces.ParentAppModule
{
    public interface IStudentProfileRepository
    {
        Task<StudentProfileMobileDto> GetStudentProfile(long StudentId);
        Task<int> StudentProfileUpdate(StudentProfileMobileDto StudentProfileObj, int UserId);
        Task<ParentProfileMobileResponseDto> GetParentProfile(long StudentId);
        Task<int> ParentProfileUpdate(ParentProfileMobileDto ParentProfileObj, int UserId);
    }
}
