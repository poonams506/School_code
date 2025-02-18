using SchoolApiApplication.DTO.SubjectMasterModule;

namespace SchoolApiApplication.Repository.Interfaces.SubjectMasterModule
{
    public interface ISubjectMasterRepository
    {
        Task<SubjectMasterDto> GetSubjectMaster(int SubjectMasterId);
        Task<int> SubjectMasterUpsert(SubjectMasterDto SubjectMasterObj, int UserId);
        Task<DatatableResponseModel> GetSubjectMasterList(DatatableRequestWrapper requestObjectWrapper);
        Task<SubjectMasterDeleteResponceDto> SubjectMasterDelete(int SubjectMasterId,int UserId);
        Task<TimetableSubjectDropdownResponseDto> GetAllSubjectsByClassList(TimetableSubjectDropdownRequestDto requestDto);

    }
}
