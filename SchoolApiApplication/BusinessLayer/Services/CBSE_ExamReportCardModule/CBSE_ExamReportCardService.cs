using DocumentFormat.OpenXml.Spreadsheet;
using SchoolApiApplication.BusinessLayer.Interfaces.CBSE_ExamReportCard;
using SchoolApiApplication.DTO.CBSE_ExamModule;
using SchoolApiApplication.DTO.CBSE_ExamReportCard;
using SchoolApiApplication.Repository.Interfaces.CBSE_ExamReportCard;

namespace SchoolApiApplication.BusinessLayer.Services.CBSE_ExamReportCard
{

    public class CBSE_ExamReportCardService : ICBSE_ExamReportCardService
        {
            private readonly ICBSE_ExamReportCardRepository _reportCardRepository;

            public CBSE_ExamReportCardService(ICBSE_ExamReportCardRepository reportCardRepository)
            {
                _reportCardRepository = reportCardRepository;
            }

        public async Task<int> ExamReportCardDelete(long ExamReportCardNameId, int UserId)
        {
            return await _reportCardRepository.ExamReportCardDelete(ExamReportCardNameId, UserId);
        }

        public async Task<int> ExamReportCardUpsert(ExamReportCardUpsertDto obj, int UserId, int AcademicYearId)
        {
            return await _reportCardRepository.ExamReportCardUpsert(obj, UserId, AcademicYearId);

        }

        public async Task<CBSE_ExamNameResponseDto> GetExamMasterListForReport(ExamNameRequestDto obj)
            {
                return await _reportCardRepository.GetExamMasterListForReport(obj);
            }

        public async Task<DatatableResponseModel> GetExamReportCardGridSelect(DatatableRequestWrapper requestObjectWrapper, int UserId)
        {
            return await _reportCardRepository.GetExamReportCardGridSelect(requestObjectWrapper, UserId);
        }

        public async Task<CBSE_ExamReportCardNameDto> GetExamReportCardSelect(long ExamReportCardNameId,int AcademicYearId)
        {
            return await _reportCardRepository.GetExamReportCardSelect(ExamReportCardNameId, AcademicYearId);
        }
    }
    }

