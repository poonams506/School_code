using SchoolApiApplication.DTO.FeePaymentModule;
using SchoolApiApplication.DTO.StudentReportModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.StudentReportModule
{
    public interface IStudentReportService
    {
        public Task<CasteWiseStudentCountResponseDto> GetCasteWiseStudentCountSelect(RequestReportDto obj);
        public Task<CategoryWiseStudentCountReportResponseDTO> GetcategoryStudentCountSelect(RequestReportDto obj);
        public Task<ReligionWiseStudentCountReporResponsetDTO> GetReligionStudentCountSelect(RequestReportDto obj);
        public Task<RTEStudentCountReportResponseDto> GetRTEStudentCountSelect(RequestReportDto obj);
        public Task<StudentGenderCountReportResponseDto> GetTotalStudentCountSelect(RequestReportDto obj);
        public Task<StudentGenderListResponseDto> GetStudentGenderListSelect(RequestReportDto obj);
        public Task<StudentRTEGenderListResponseDto> GetRTEStudentListSelect(RequestReportDto obj);

        public Task<StudentAllFeeReceiptSelectDto> GetStudentAllFeeReceiptSelectDto(Int32 academicYearId, long studentId, Int32 classId);

        public Task<StudentNameList> GetStudentNames(Int16 AcademicYearId, Int16 GradeId, Int16 DivisionId, bool WithArchive);
    }
}
