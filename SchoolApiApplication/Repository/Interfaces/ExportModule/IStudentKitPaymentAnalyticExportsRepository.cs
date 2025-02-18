using SchoolApiApplication.DTO.ExportModule;

namespace SchoolApiApplication.Repository.Interfaces.ExportModule
{
    public interface IStudentKitPaymentAnalyticExportsRepository
    {
        public Task<StudentKitPaymentAnalyticsExportDto> GetExportStudentKitPaymentAnalyticsSchool(Int16 AcademicYearId);
        public Task<StudentKitPaymentAnalyticsExportDto> GetExportStudentKitPaymentAnalyticsGrade(Int16 AcademicYearId, Int16 GradeId);
        public Task<StudentKitPaymentAnalyticsExportDto> GetExportStudentKitPaymentAnalyticsDivision(Int16 AcademicYearId, Int16 GradeId, Int16 DivisionId);
    }
}
