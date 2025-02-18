using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.ExportModule;
using SchoolApiApplication.DTO.ExportModule;
using SchoolApiApplication.Repository.Interfaces.ExportModule;
using SchoolApiApplication.Repository.Services.ExportModule;

namespace SchoolApiApplication.BusinessLayer.Services.ExportModule
{
    
    public class StudentKitPaymentAnalyticsExportService : IStudentKitPaymentAnalyticsExportService
    {
        private readonly IStudentKitPaymentAnalyticExportsRepository _studentKitPaymentAnalyticsExportRepository;

        public StudentKitPaymentAnalyticsExportService(IStudentKitPaymentAnalyticExportsRepository studentKitPaymentAnalyticsExportRepository)
        {
            _studentKitPaymentAnalyticsExportRepository = studentKitPaymentAnalyticsExportRepository;
        }

        public async Task<StudentKitPaymentAnalyticsExportDto> GetExportStudentKitPaymentAnalyticsSchool(Int16 AcademicYearId)
        {
            return await _studentKitPaymentAnalyticsExportRepository.GetExportStudentKitPaymentAnalyticsSchool(AcademicYearId);
        }


        public async Task<StudentKitPaymentAnalyticsExportDto> GetExportStudentKitPaymentAnalyticsGrade(Int16 AcademicYearId, Int16 GradeId)
        {
            return await _studentKitPaymentAnalyticsExportRepository.GetExportStudentKitPaymentAnalyticsGrade(AcademicYearId, GradeId);
        }

        public async Task<StudentKitPaymentAnalyticsExportDto> GetExportStudentKitPaymentAnalyticsDivision(Int16 AcademicYearId, Int16 GradeId, Int16 DivisionId)
        {
            return await _studentKitPaymentAnalyticsExportRepository.GetExportStudentKitPaymentAnalyticsDivision(AcademicYearId, GradeId, DivisionId);
        }

    }
}
