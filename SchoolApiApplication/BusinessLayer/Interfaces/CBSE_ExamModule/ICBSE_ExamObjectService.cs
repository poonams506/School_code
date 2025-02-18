using SchoolApiApplication.DTO.CBSE_ExamModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.CBSE_ExamModule
{
    public interface ICBSE_ExamObjectService
    {
        public Task<CBSE_ExamObjectDto> CBSE_ExamObjectSelect(long ExamMasterId, int SubjectMasterId, int AcademicYearId);
        public Task<CBSE_ExamMasterDto> CBSE_ExamMasterSelect(int ExamMasterId);
        public Task<DatatableResponseModel> CBSE_ExamMasterGridSelect(DatatableRequestWrapper requestObjectWrapper, int UserId);
        public Task<ExamMasterDeleteResponceDto> CBSE_ExamMasterDelete(long? ExamMasterId, int UserId);
        public Task<int> CBSE_ExamMasterUpsert(CBSE_ExamMasterDto obj, int UserId, int AcademicYearId);
        public Task<CBSE_MarksGradeRelationDto> CBSE_MarksGradeRelationSelect(long MarksGradeRelationId);
        public Task<DatatableResponseModel> CBSE_MarksGradeRelationGridSelect(DatatableRequestWrapper requestObjectWrapper, int userId);

        public Task<MarksGradeRelationDeleteRespose> CBSE_MarksGradeRelationDelete(long MarksGradeRelationId, int UserId);
        public Task<int> CBSE_MarksGradeRelationUpsert(CBSE_MarksGradeRelationDto obj, int UserId, int AcademicYearId);

        public Task<DatatableResponseModel> CBSE_ExamObjectGridSelect(DatatableRequestWrapper requestObjectWrapper, int userId);

        public Task<ExamObjectDeleteRespose> CBSE_ExamObjectDelete(long? ExamMasterId, long SubjectMasterId, int AcademicYearId, int UserId);

        public Task<ExamObjectExistResponseDto> CBSE_ExamObjectUpsert(CBSE_ExamObjectDto obj, int UserId);
        public Task<CBSE_ResponseDto> CBSE_ExamTypeNameSelect();
        public Task<CBSE_ResponseDto> CBSE_TermNameSelect();

        public Task<CBSE_ClassExamMappingDto> CBSE_ClassExamMappingSelect(int ClassExamMappingId);
        public Task<DatatableResponseModel> CBSE_ClassExamMappingGridSelect(DatatableRequestWrapper requestObjectWrapper, int UserId);
        public Task<int> CBSE_ClassExamMappingDelete(long? examMasterId, int academicYearId, int gradeId, int divisionId);
        public Task<int> CBSE_ClassExamMappingUpsert(CBSE_ClassExamMappingDto obj, int UserId, int academicYearId, int examMasterId);
        public Task<CBSE_ExamNameResponseDto> CBSE_ExamNameSelect(int AcademicYearId);
        public Task<int> PublishUnpublishExamObjectParticular(PublishUnpublishExamObjectDto publishRequest, int UserId);



        public Task<ExamObjectDeleteResponseDto> CBSE_ObjectDelete(ExamObjectDeleteRequestDto obj, int UserId);

    }
}
