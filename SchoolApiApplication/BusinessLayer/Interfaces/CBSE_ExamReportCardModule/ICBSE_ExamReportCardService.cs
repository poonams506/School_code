using SchoolApiApplication.DTO.CBSE_ExamModule;
using SchoolApiApplication.DTO.CBSE_ExamReportCard;

namespace SchoolApiApplication.BusinessLayer.Interfaces.CBSE_ExamReportCard
{
    public interface ICBSE_ExamReportCardService
    {
        public Task<CBSE_ExamNameResponseDto> GetExamMasterListForReport(ExamNameRequestDto obj);
        public Task<CBSE_ExamReportCardNameDto> GetExamReportCardSelect(long ExamReportCardNameId,int AcademicYearId);
        public Task<DatatableResponseModel> GetExamReportCardGridSelect(DatatableRequestWrapper requestObjectWrapper, int UserId);
        public Task<int> ExamReportCardDelete(long ExamReportCardNameId, int UserId);
        public Task<int> ExamReportCardUpsert(ExamReportCardUpsertDto obj, int UserId, int AcademicYearId);
    }
}
