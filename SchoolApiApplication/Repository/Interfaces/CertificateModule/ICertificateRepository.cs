using SchoolApiApplication.DTO.Certificate_Module;
using SchoolApiApplication.DTO.DivisionModule;
using SchoolApiApplication.DTO.TeachingLoadAnalysisModule;

namespace SchoolApiApplication.Repository.Interfaces.CertificateModule
{
    public interface ICertificateRepository
    {
        public Task<CertificateDto> BonafiedCertificateSelect (Int16 AcademicYearId, Int16 GradeId, Int16 DivisionId, Int16 StudentId);
        public Task<CertificateDto> LeavingCertificateSelect(Int16 AcademicYearId, Int16 GradeId, Int16 DivisionId, Int16 StudentId);
        public Task<CertificateDto> CharacterCertificateSelect(Int16 AcademicYearId, Int16 GradeId, Int16 DivisionId, Int16 StudentId);
        public Task<CertificateDto> IdCardSelect(Int16 AcademicYearId, Int16 GradeId, Int16 DivisionId, Int16 StudentId);
        public Task<CertificateAuditDto> GetCertificate(long? CertificateAuditsId, Int16 AcademicYearId);
        public Task<CertificateIdModelResponse> CertificateUpsert(CertificateAuditDto CertificateObj, int UserId);
        public Task<CertificateIdModelResponse> LeavingCertificateUpsert(LeavingCertificateDto CertificateObj, int UserId);
        public Task<DatatableResponseModel> GetCertificateList(DatatableRequestWrapper requestObjectWrapper);
        public Task<StudentNameModelResponse> GetStudentNames(Int16 AcademicYearId, Int16 GradeId, Int16 DivisionId, bool WithArchive);

        public Task<LeavingCertificateHistory> GetLeavingCertificateHistory(int StudentId);
        public Task<CertificateDto> LeavingCertificatePrintSelect(int LeavingCertificateAuditsId, int StudentId);
        public Task<CertificateIdModelResponse> LeavingCertificateStatusUpdate(int LeavingCertificateAuditsId, int StudentId, int StatusId, int UserId);
        public Task<CertificateIdModelResponse> LeavingCertificateGenerateAsDuplicate(int LeavingCertificateAuditsId, int UserId);

        public Task<DatatableResponseModel> GetListLeavingCertificateSelect(DatatableRequestWrapper requestObjectWrapper);


    }
}
