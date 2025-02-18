using SchoolApiApplication.DTO.HomeworkModule;
using SchoolApiApplication.DTO.ParentAppModule;

namespace SchoolApiApplication.Repository.Interfaces.HomeworkModule
{
    public interface IHomeworkRepository
    {
        Task<DatatableResponseModel>GetHomeworkGridList(DatatableRequestWrapper requestObjectWrapper, int userId);

        Task<HomeworkUpsertDto> HomeWorkSelect(long HomeworkId);

        Task<int> HomeWorkUpsert(HomeworkUpsertDto hwudObj, int UserId);

        Task<int> PublishUnpublishHomeworkParticular(PublishUnpublishHomeworkDto publishRequest, int UserId);

        Task<int> HomeWorkDelete(long? HomeworkId, int UserId);
        public Task<SubjectMappingDropdownResponseDto> GetSubjectMappingDropdown(short AcademicYearId, short GradeId, short DivisionId);
        Task<ParentAppHomeworkResponseDto> GetAllHomeworkForStudent(ParentAppHomeworkRequestDto requestDto);
    }
}
