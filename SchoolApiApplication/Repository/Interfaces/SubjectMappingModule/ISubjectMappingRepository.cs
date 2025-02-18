using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.SchoolEventModule;
using SchoolApiApplication.DTO.StudentAttendanceModule;
using SchoolApiApplication.DTO.SubjectMappingModule;
using SchoolApiApplication.DTO.TeacherGradeDivisionMappingModule;
using static SchoolApiApplication.Repository.Services.SubjectMappingModule.SubjectMappingRepository;

namespace SchoolApiApplication.Repository.Interfaces.SubjectMappingModule
{
    public interface ISubjectMappingRepository
    {
        public Task<DatatableResponseModel> GetSubjectMappingList(DatatableRequestWrapper requestObjectWrapper);
        public Task<List<SubjectExistResposeDto>> SubjectMappingInsert(SubjectMappingDto subjectMappingObj, int UserId, int academicYearId, int gradeId, int divisionId);
        public Task<List<SubjectExistResposeDto>> SubjectMappingDelete(int UserId, int academicYearId, int gradeId, int divisionId, int subjectId);
        public Task<SubjectMappingDto> GetSubjectMasterDropDown();
        public Task<SubjectIndexNumberDetailsDto> SubjectIndexNumberDetailsSelect( int GradeId, int DivisionId, int AcademicYearId);
        public Task<string> UpsertSubjectIndexNumberDetails(UpsertSubjectIndexNumberDetailsDto obj, int UserId);
        public Task<int> SubjectMappingCloneDetails(SubjectMappingCloneDto cloneRequest, int UserId);

        public Task<GradeDivisionWithDisabledCommonMasterDto> GetGradeDivisionSubjectMappingMasterList(int AcademicYearId);


        // public Task<CheckSubjectIndexNumberResponseDto> CheckSubjectIndexNumberAsync(CheckSubjectIndexNumberRequestDto request);
    }
}