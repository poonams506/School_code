using DocumentFormat.OpenXml.Spreadsheet;
using SchoolApiApplication.BusinessLayer.Interfaces.SubjectMappingModule;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.SubjectMappingModule;
using SchoolApiApplication.Repository.Interfaces.SubjectMappingModule;

namespace SchoolApiApplication.BusinessLayer.Services.SubjectMappingModule
{
    public class SubjectMappingService: ISubjectMappingService
    {
        private readonly ISubjectMappingRepository _subjectMappingRepository;
        public SubjectMappingService(ISubjectMappingRepository subjectMappingRepository)
        {
            _subjectMappingRepository = subjectMappingRepository;
        }

        public async Task<DatatableResponseModel> GetSubjectMappingList(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _subjectMappingRepository.GetSubjectMappingList(requestObjectWrapper);
        }

        public async Task<SubjectMappingDto> GetSubjectMasterDropDown()
        {
            return await _subjectMappingRepository.GetSubjectMasterDropDown();
        }

        public async Task<List<SubjectExistResposeDto>> SubjectMappingInsert(SubjectMappingDto subjectMappingObj, int UserId, int academicYearId, int gradeId, int divisionId)
        {
            return await _subjectMappingRepository.SubjectMappingInsert(subjectMappingObj, UserId, academicYearId, gradeId, divisionId);
        }

        public async Task<List<SubjectExistResposeDto>> SubjectMappingDelete( int UserId, int academicYearId, int gradeId, int divisionId, int subjectId)
        {
            return await _subjectMappingRepository.SubjectMappingDelete(UserId, academicYearId, gradeId, divisionId, subjectId);
        }

        public async Task<SubjectIndexNumberDetailsDto> SubjectIndexNumberDetailsSelect( int GradeId, int DivisionId, int AcademicYearId)
        {
            return await _subjectMappingRepository.SubjectIndexNumberDetailsSelect( GradeId, DivisionId, AcademicYearId);

        }

        //public async Task<int> UpsertSubjectIndexNumberDetails(SubjectIndexNumberDetailsDto obj, int UserId)
        //{
        //    return await _subjectMappingRepository.UpsertSubjectIndexNumberDetails(obj, UserId);
        //}


     

        public async Task<string> UpsertSubjectIndexNumberDetails(UpsertSubjectIndexNumberDetailsDto obj, int UserId)
        {
            return await _subjectMappingRepository.UpsertSubjectIndexNumberDetails(obj, UserId);
        }

        public async Task<int> SubjectMappingCloneDetails(SubjectMappingCloneDto cloneRequest, int UserId)
        {
            return await _subjectMappingRepository.SubjectMappingCloneDetails(cloneRequest, UserId);
        }

        public async Task<GradeDivisionWithDisabledCommonMasterDto> GetGradeDivisionSubjectMappingMasterList(int AcademicYearId)
        {
            return await _subjectMappingRepository.GetGradeDivisionSubjectMappingMasterList(AcademicYearId );
        }
    }
}