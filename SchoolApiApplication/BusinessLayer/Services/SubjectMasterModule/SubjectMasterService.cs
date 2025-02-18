using SchoolApiApplication.BusinessLayer.Interfaces.SubjectMasterModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.SubjectMasterModule;
using SchoolApiApplication.Repository.Interfaces.GradeModule;
using SchoolApiApplication.Repository.Interfaces.SubjectMasterModule;
using SchoolApiApplication.Repository.Services.GradeModule;

namespace SchoolApiApplication.BusinessLayer.Services.SubjectMasterModule
{
    public class SubjectMasterService : ISubjectMasterService
    {
        private readonly ISubjectMasterRepository _subjectMasterRepository;
        public SubjectMasterService(ISubjectMasterRepository subjectMasterRepository)
        {
            _subjectMasterRepository = subjectMasterRepository;
        }

        public async Task<SubjectMasterDto> GetSubjectMaster(int SubjectMasterId)
        {
            return await _subjectMasterRepository.GetSubjectMaster(SubjectMasterId);
        }

        public async Task<DatatableResponseModel> GetSubjectMasterList(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _subjectMasterRepository.GetSubjectMasterList(requestObjectWrapper);
        }

        public async Task<SubjectMasterDeleteResponceDto> SubjectMasterDelete(int SubjectMasterId, int UserId)
        {
            return await _subjectMasterRepository.SubjectMasterDelete(SubjectMasterId, UserId);
        }

        public async Task<int> SubjectMasterUpsert(SubjectMasterDto SubjectMasterObj, int UserId)
        {
            return await _subjectMasterRepository.SubjectMasterUpsert(SubjectMasterObj, UserId);
        }

        public async Task<TimetableSubjectDropdownResponseDto> GetAllSubjectsByClassList(TimetableSubjectDropdownRequestDto requestDto)
        {
            return await _subjectMasterRepository.GetAllSubjectsByClassList(requestDto);
        }
    }
}
