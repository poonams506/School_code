using DocumentFormat.OpenXml.Spreadsheet;
using SchoolApiApplication.BusinessLayer.Interfaces.CBSE_ExamResult;
using SchoolApiApplication.DTO.CBSE_ExamResultModule;
using SchoolApiApplication.Repository.Interfaces.CBSE_ExamModule;
using SchoolApiApplication.Repository.Interfaces.CBSE_ExamResultModule;

namespace SchoolApiApplication.BusinessLayer.Services.CBSE_ExamResult
{
    public class CBSE_ExamResultService : ICBSE_ExamResultService
    {
        private readonly ICBSE_ExamResultRepository _examResultRepository;

        public CBSE_ExamResultService(ICBSE_ExamResultRepository examResultRepository)
        {
            _examResultRepository = examResultRepository;
        }

      

        public async Task<int> ExamResultUpsert(CBSE_ExamResultDto obj, int UserId)
        {
            return await _examResultRepository.ExamResultUpsert(obj, UserId);
        }

        public async Task<CBSE_ExamResultDto>GetExamResultGridList(CBSE_ExamResultRequestDto requestDto)
        {
            return await _examResultRepository.GetExamResultGridList(requestDto);
        }

        public async Task<ExamResultResponseDto> SubjectNameList(int AcademicYearId, int ExamMasterId)
        {
            return await _examResultRepository.SubjectNameList(AcademicYearId, ExamMasterId);
        }
        public async  Task<ExamResultResponseDto> ExamNameList(int AcademicYearId, int GradeId, int DivisionId)
        {
            return await _examResultRepository.ExamNameList(AcademicYearId, GradeId, DivisionId);
        }
        public async Task<ExamResultResponseDto> MarkGradeList(int AcademicYearId)
        {
            return await _examResultRepository.MarkGradeList(AcademicYearId);
        }

        public async Task<DatatableResponseModel> GetCBSE_ExamResultGridSelect(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _examResultRepository.GetCBSE_ExamResultGridSelect(requestObjectWrapper);
        }

        //public async Task<DatatableResponseModel> CBSE_ExamResultGridSelect(DatatableRequestWrapper requestObjectWrapper)
        //{
        //    return await _examResultRepository.CBSE_ExamResultGridSelect(requestObjectWrapper);
        //}
    }
}
