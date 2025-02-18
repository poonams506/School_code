using SchoolApiApplication.BusinessLayer.Interfaces.StudentReportModule;
using SchoolApiApplication.DTO.FeePaymentModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.StudentReportModule;
using SchoolApiApplication.Repository.Interfaces.SchoolEventModule;
using SchoolApiApplication.Repository.Interfaces.StudentReportModule;
using SchoolApiApplication.Repository.Services.SchoolEventModule;

namespace SchoolApiApplication.BusinessLayer.Services.StudentReportModule
{
    public class StudentReportService : IStudentReportService
    {
        private readonly IStudentReportRepository _studentReportRepository;

        public StudentReportService(IStudentReportRepository studentReportRepository)
        {
            _studentReportRepository = studentReportRepository;
        }

        public async Task<CasteWiseStudentCountResponseDto> GetCasteWiseStudentCountSelect(RequestReportDto obj)

        {
            return await _studentReportRepository.GetCasteWiseStudentCountSelect(obj);
        }


        public async Task<CategoryWiseStudentCountReportResponseDTO> GetcategoryStudentCountSelect(RequestReportDto obj)
        {
            return await _studentReportRepository.GetcategoryStudentCountSelect(obj);
        }

        public async Task<ReligionWiseStudentCountReporResponsetDTO> GetReligionStudentCountSelect(RequestReportDto obj)
        {
            return await _studentReportRepository.GetReligionStudentCountSelect(obj);
        }


        public async  Task<RTEStudentCountReportResponseDto> GetRTEStudentCountSelect(RequestReportDto obj)
        {
            return await _studentReportRepository.GetRTEStudentCountSelect(obj);
        }

       

        public async Task<StudentGenderCountReportResponseDto> GetTotalStudentCountSelect(RequestReportDto obj)
        {
            return await _studentReportRepository.GetTotalStudentCountSelect(obj);
        }

      
        public async Task<StudentGenderListResponseDto> GetStudentGenderListSelect(RequestReportDto obj)
        {
            return await _studentReportRepository.GetStudentGenderListSelect(obj);
        }

        public async Task<StudentRTEGenderListResponseDto> GetRTEStudentListSelect(RequestReportDto obj)
        {
            return await _studentReportRepository.GetRTEStudentListSelect(obj);
        }


        public async Task<StudentAllFeeReceiptSelectDto> GetStudentAllFeeReceiptSelectDto(Int32 academicYearId, long studentId, Int32 classId)
        {
            return await _studentReportRepository.GetStudentAllFeeReceiptSelectDto(academicYearId, studentId, classId);
        }

        public async Task<StudentNameList> GetStudentNames(short AcademicYearId, short GradeId, short DivisionId, bool WithArchive)
        {
            return await _studentReportRepository.GetStudentNames(AcademicYearId, GradeId, DivisionId, false) ;
        }
    }
}
