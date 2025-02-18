using SchoolApiApplication.DTO.TeacherModule;

namespace SchoolApiApplication.Repository.Interfaces.TeacherModule
{
    public interface ITeacherRepository
    {
        public Task<TeacherDto> GetTeacherProfile(long? TeacherId);
        public Task<TeacherDto> TeacherProfileUpsert(TeacherDto TeacherObj, int UserId);
        public Task<DatatableResponseModel> GetTeacherList(DatatableRequestWrapper requestObjectWrapper);
        public Task<TeacherDeleteRespose> TeacherProfileDelete(long? TeacherId,int UserId);
    }

}
