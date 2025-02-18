using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.DTO.ParentAppModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.ParentAppModule
{
    public interface IStudentProfileService
    {
        Task<StudentProfileMobileDto> GetStudentProfile(long StudentId);
        Task<int> StudentProfileUpdate(StudentProfileMobileDto StudentProfileObj, int UserId);

        Task<ParentProfileMobileResponseDto> GetParentProfile(long StudentId);
        Task<int> ParentProfileUpdate(ParentProfileMobileDto ParentProfileObj, int UserId);
    }
}
