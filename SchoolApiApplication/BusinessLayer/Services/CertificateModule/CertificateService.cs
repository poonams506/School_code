using DocumentFormat.OpenXml.Bibliography;
using SchoolApiApplication.BusinessLayer.Interfaces.CertificateModule;
using SchoolApiApplication.DTO.Certificate_Module;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.TeacherOneDayLectureModule;
using SchoolApiApplication.Repository.Interfaces.CertificateModule;
using SchoolApiApplication.Repository.Interfaces.DivisionModule;
using SchoolApiApplication.Repository.Services.CertificateModule;
using SchoolApiApplication.Repository.Services.DivisionModule;

namespace SchoolApiApplication.BusinessLayer.Services.CertificateModule
{
    public class CertificateService : ICertificateService
    {
        private readonly ICertificateRepository _certificateRepository;

        public CertificateService(ICertificateRepository certificateRepository)
        {
            _certificateRepository = certificateRepository;
        }
        public async Task<CertificateDto> BonafiedCertificateSelect(Int16 AcademicYearId, Int16 GradeId, Int16 DivisionId, Int16 StudentId)
        {
            return await _certificateRepository.BonafiedCertificateSelect( AcademicYearId,GradeId,DivisionId,StudentId);
        }

        public async Task<CertificateIdModelResponse> CertificateUpsert(CertificateAuditDto CertificateObj, int UserId)
        {
            return await _certificateRepository.CertificateUpsert(CertificateObj, UserId);
        }

        public async Task<CertificateIdModelResponse> LeavingCertificateUpsert(LeavingCertificateDto CertificateObj, int UserId)
        {
            return await _certificateRepository.LeavingCertificateUpsert(CertificateObj, UserId);
        }

        public async Task<CertificateDto> CharacterCertificateSelect(Int16 AcademicYearId, Int16 GradeId, Int16 DivisionId, Int16 StudentId)
        {
            return await _certificateRepository.CharacterCertificateSelect(AcademicYearId, GradeId, DivisionId, StudentId);
        }

        public async Task<CertificateAuditDto> GetCertificate(long? CertificateAuditsId, short AcademicYearId)
        {
            return await _certificateRepository.GetCertificate(CertificateAuditsId, AcademicYearId);
        }

        public async Task<DatatableResponseModel> GetCertificateList(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _certificateRepository.GetCertificateList(requestObjectWrapper);
        }

        public async Task<StudentNameModelResponse> GetStudentNames(short AcademicYearId, short GradeId, short DivisionId, bool WithArchive)
        {
            return await _certificateRepository.GetStudentNames(AcademicYearId, GradeId, DivisionId, WithArchive);
        }

        public async Task<CertificateDto> IdCardSelect(Int16 AcademicYearId, Int16 GradeId, Int16 DivisionId, Int16 StudentId)
        {
            return await _certificateRepository.IdCardSelect(AcademicYearId, GradeId, DivisionId, StudentId);
        }

        public async Task<CertificateDto> LeavingCertificateSelect(Int16 AcademicYearId, Int16 GradeId, Int16 DivisionId, Int16 StudentId)
        {
            return await _certificateRepository.LeavingCertificateSelect(AcademicYearId, GradeId, DivisionId, StudentId);
        }

        public async Task<CertificateDto> LeavingCertificatePrintSelect(int LeavingCertificateAuditsId, int StudentId)
        {
            return await _certificateRepository.LeavingCertificatePrintSelect(LeavingCertificateAuditsId, StudentId);
        }

        public async Task<LeavingCertificateHistory> GetLeavingCertificateHistory(int StudentId)
        {
            return await _certificateRepository.GetLeavingCertificateHistory(StudentId);
        }
        public async Task<CertificateIdModelResponse> LeavingCertificateStatusUpdate(int LeavingCertificateAuditsId, int StudentId, int StatusId, int UserId)
        {
            return await _certificateRepository.LeavingCertificateStatusUpdate(LeavingCertificateAuditsId, StudentId, StatusId, UserId);
        }
        public async Task<CertificateIdModelResponse> LeavingCertificateGenerateAsDuplicate(int LeavingCertificateAuditsId, int UserId)
        {
            return await _certificateRepository.LeavingCertificateGenerateAsDuplicate(LeavingCertificateAuditsId, UserId);
        }

        public async Task<DatatableResponseModel> GetListLeavingCertificateSelect(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _certificateRepository.GetListLeavingCertificateSelect(requestObjectWrapper);
        }
    }
}
