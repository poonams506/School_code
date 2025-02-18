using SchoolApiApplication.BusinessLayer.Interfaces.TeacherModule;
using SchoolApiApplication.DTO.TeacherModule;
using SchoolApiApplication.Repository.Interfaces.TeacherModule;

namespace SchoolApiApplication.BusinessLayer.Services.TeacherModule
{
    public class TeacherService : ITeacherService
    {
        private readonly ITeacherRepository _TeacherRepository;
        public TeacherService(ITeacherRepository TeacherRepository)
        {
            _TeacherRepository = TeacherRepository;
        }
        public async Task<TeacherDto> GetTeacherProfile(long? TeacherId)
        {
            return await _TeacherRepository.GetTeacherProfile(TeacherId);
        }
        public async Task<TeacherDto> TeacherProfileUpsert(TeacherDto TeacherObj, int UserId)
        {
            return await _TeacherRepository.TeacherProfileUpsert(TeacherObj, UserId);
        }
        public async Task<DatatableResponseModel> GetTeacherList(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _TeacherRepository.GetTeacherList(requestObjectWrapper);
        }

        public async Task<TeacherDeleteRespose> TeacherProfileDelete(long? TeacherId, int UserId)
        {
            return await _TeacherRepository.TeacherProfileDelete(TeacherId,UserId);
        }
    }
}
