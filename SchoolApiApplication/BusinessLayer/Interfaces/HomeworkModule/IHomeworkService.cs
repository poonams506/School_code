using SchoolApiApplication.DTO.HomeworkModule;
using SchoolApiApplication.DTO.ParentAppModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.HomeworkModule
{
    public interface IHomeworkService
    {
        Task<DatatableResponseModel> GetHomeworkGridList(DatatableRequestWrapper requestObjectWrapper, int userId);

        Task<HomeworkUpsertDto> HomeWorkSelect(long HomeworkId);

        Task<int> HomeWorkUpsert(HomeworkUpsertDto hwudObj, Int32 UserId);

        Task<int> HomeWorkDelete(long? HomeworkId, int UserId);

        Task<int> PublishUnpublishHomeworkParticular(PublishUnpublishHomeworkDto publishRequest, int UserId);
        Task<SubjectMappingDropdownResponseDto> GetSubjectMappingDropdown(short AcademicYearId, short GradeId, short DivisionId);
        Task<ParentAppHomeworkResponseDto> GetAllHomeworkForStudent(ParentAppHomeworkRequestDto requestDto);
    }
}
