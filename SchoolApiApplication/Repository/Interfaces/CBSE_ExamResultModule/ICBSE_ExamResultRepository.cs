using SchoolApiApplication.DTO.CBSE_ExamResultModule;
using SchoolApiApplication.DTO.ClassWiseTeacherAndStudentDto;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.StudentAttendanceModule;

namespace SchoolApiApplication.Repository.Interfaces.CBSE_ExamResultModule
{
    public interface ICBSE_ExamResultRepository
    {
        public Task<CBSE_ExamResultDto> GetExamResultGridList(CBSE_ExamResultRequestDto requestDto);
        public Task<int> ExamResultUpsert(CBSE_ExamResultDto obj, int UserId);
        public Task<ExamResultResponseDto> ExamNameList(int AcademicYearId,int GradeId, int DivisionId);
        public Task<ExamResultResponseDto> SubjectNameList(int AcademicYearId, int ExamMasterId);
        public Task<ExamResultResponseDto> MarkGradeList(int AcademicYearId);
        public Task<DatatableResponseModel> GetCBSE_ExamResultGridSelect(DatatableRequestWrapper requestObjectWrapper);
    }
}