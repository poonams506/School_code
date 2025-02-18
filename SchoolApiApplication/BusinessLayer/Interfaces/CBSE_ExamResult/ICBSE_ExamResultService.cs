using SchoolApiApplication.DTO.CBSE_ExamResultModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.CBSE_ExamResult
{
    public interface ICBSE_ExamResultService
    {
        public Task<CBSE_ExamResultDto> GetExamResultGridList(CBSE_ExamResultRequestDto requestDto);
        public Task<int> ExamResultUpsert(CBSE_ExamResultDto obj, int UserId);
        public Task<ExamResultResponseDto> ExamNameList(int AcademicYearId, int GradeId, int DivisionId);
        public Task<ExamResultResponseDto> SubjectNameList(int AcademicYearId, int ExamMasterId);
        public Task<ExamResultResponseDto> MarkGradeList(int AcademicYearId);
        public Task<DatatableResponseModel> GetCBSE_ExamResultGridSelect(DatatableRequestWrapper requestObjectWrapper);
    }
}
