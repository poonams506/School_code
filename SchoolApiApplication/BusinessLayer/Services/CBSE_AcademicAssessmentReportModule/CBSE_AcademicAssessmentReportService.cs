using SchoolApiApplication.BusinessLayer.Interfaces.CBSE_AcademicAssessmentReportModule;
using SchoolApiApplication.DTO.CBSE_AcademicAssessmentReportModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.Repository.Interfaces.CBSE_AcademicAssessmentReportModule;

namespace SchoolApiApplication.BusinessLayer.Services.CBSE_AcademicAssessmentReportModule
{
    public class CBSE_AcademicAssessmentReportService : ICBSE_AcademicAssessmentReportService
    {
        private readonly ICBSE_AcademicAssessmentReportRepository academicAssessmentReportRepository;

        public CBSE_AcademicAssessmentReportService(ICBSE_AcademicAssessmentReportRepository _AcademicAssessmentReportRepository)
        {
            academicAssessmentReportRepository = _AcademicAssessmentReportRepository;
        }

        public async Task<ReportCardTempleteDropdownResponceDto> ReportCardTemplateDropdown(int AcademicYearId, int GradeId, int DivisionId)
        {
            return await academicAssessmentReportRepository.ReportCardTemplateDropdown(AcademicYearId, GradeId, DivisionId);
        }

        public async Task<CBSE_AcademicAssessmentReportDto> ResultReportSearchSelect(int AcademicYearId, int GradeId, int DivisionId, long StudentId)
        {
            return await academicAssessmentReportRepository.ResultReportSearchSelect(AcademicYearId, GradeId, DivisionId, StudentId);
        }

        public async Task<ResultTempleteReportSearchResponseDto> ResultTempleteReportSearchSelect(long StudentId, int AcademicYearId, int GradeId, int DivisionId, int ExamReportCardNameId)
        {
            return await academicAssessmentReportRepository.ResultTempleteReportSearchSelect(StudentId, AcademicYearId, GradeId, DivisionId, ExamReportCardNameId);

        }
        public async Task<StudentMonthlyAttendanceResponceDto> StudentMonthlyAttendanceSelect(int StudentId, int AcademicYearId)
        {
            return await academicAssessmentReportRepository.StudentMonthlyAttendanceSelect(StudentId,AcademicYearId);
        }
    }
}