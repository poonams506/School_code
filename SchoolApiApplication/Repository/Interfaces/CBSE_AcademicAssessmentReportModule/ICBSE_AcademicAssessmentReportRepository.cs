using SchoolApiApplication.DTO.CBSE_AcademicAssessmentReportModule;
using SchoolApiApplication.DTO.CBSE_ExamModule;
using SchoolApiApplication.DTO.CBSE_ExamReportCard;

namespace SchoolApiApplication.Repository.Interfaces.CBSE_AcademicAssessmentReportModule
{
    public interface ICBSE_AcademicAssessmentReportRepository
    {
        public Task<CBSE_AcademicAssessmentReportDto> ResultReportSearchSelect(int AcademicYearId, int GradeId, int DivisionId, long StudentId);
        public Task<ResultTempleteReportSearchResponseDto> ResultTempleteReportSearchSelect(long StudentId, int AcademicYearId, int GradeId, int DivisionId, int ExamReportCardNameId);
        public Task<ReportCardTempleteDropdownResponceDto> ReportCardTemplateDropdown(int AcademicYearId, int GradeId, int DivisionId);
        public Task<StudentMonthlyAttendanceResponceDto> StudentMonthlyAttendanceSelect(int StudentId, int AcademicYearId);
    }
}