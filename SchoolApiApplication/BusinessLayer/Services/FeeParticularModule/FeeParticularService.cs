using DocumentFormat.OpenXml.Spreadsheet;
using DocumentFormat.OpenXml.VariantTypes;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.FeeParticularModule;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.FeeparticularModule;
using SchoolApiApplication.DTO.FeeParticularModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.Repository.Interfaces.ClerkModule;
using SchoolApiApplication.Repository.Interfaces.FeeparticularModule;
using SchoolApiApplication.Repository.Services.ClerkModule;
using SchoolApiApplication.Repository.Services.FeeparticularModule;

namespace SchoolApiApplication.BusinessLayer.Services.FeeParticularModule
{
    public class FeeParticularService : IFeeParticularService
    {
        private readonly IFeeParticularRepository _feeParticularRepository;
       
        public FeeParticularService(IFeeParticularRepository feeParticularRepository)
        {
            _feeParticularRepository = feeParticularRepository;
        }
        public async Task<DatatableResponseModel> GetFeeParticularGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _feeParticularRepository.GetFeeParticularGridList(requestObjectWrapper);
        }
        public async Task<FeeStructureDto> GetFeeParticularSelect(int ClassId, int AcademicYearId) 
        {
            return await _feeParticularRepository.GetFeeParticularSelect(ClassId, AcademicYearId); 
        }

        public async Task<int> FeeParticularInsert(FeeStructureDto FeeParticularInsertObj, Int32 UserId)
        {
            return await _feeParticularRepository.FeeParticularInsert(FeeParticularInsertObj,UserId);
       
        }

        public async Task<int> FeeParticularUpdate(FeeStructureDto FeeParticularUpdateObj, Int32 UserId)
        {
            return await _feeParticularRepository.FeeParticularUpdate(FeeParticularUpdateObj, UserId);

        }

        public async Task<FeeWaiverResponseDto> GetAllApplicableWaiverData(int AcademicYearId)
        {
            return await _feeParticularRepository.GetAllApplicableWaiverData(AcademicYearId);
        }

        public async Task<GradeDivisionWithDisabledCommonMasterDto> GetGradeDivisionFeeParticularMasterList(int AcademicYearId)
        {
            return await _feeParticularRepository.GetGradeDivisionFeeParticularMasterList(AcademicYearId);
        }
        public async Task<ActionResult<int>> PublishUnpublishGradeDivisionParticulars(PublishUnpublishParticularDto publishRequest, int UserId)
        {
            return await _feeParticularRepository.PublishUnpublishGradeDivisionParticulars(publishRequest, UserId);
        }

        public async Task<int> FeeParticularClone(FeeParticularCloneDto cloneRequest, int UserId)
        {
            return await _feeParticularRepository.FeeParticularClone(cloneRequest, UserId);
        }

        public async Task<int> FeeParticularDelete(int GradeId, int DivisionId, int academicYearId,int UserId)
        {
            return await _feeParticularRepository.FeeParticularDelete(GradeId, DivisionId, academicYearId,UserId);
        }
        public async Task<int> CopyFeeParticularsFromLastAY(int GradeId, int DivisionId)
        {
            return await _feeParticularRepository.CopyFeeParticularsFromLastAY(GradeId, DivisionId);
        }

        #region Student Kit Fee Structure
        public async Task<DatatableResponseModel> GetStudentKitFeeParticularGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _feeParticularRepository.GetStudentKitFeeParticularGridList(requestObjectWrapper);
        }
        public async Task<StudentKitFeeStructureDto> GetStudentKitFeeParticularByClassId(int ClassId, int AcademicYearId)
        {
            return await _feeParticularRepository.GetStudentKitFeeParticularByClassId(ClassId, AcademicYearId);
        }
        public async Task<int> StudentKitFeeParticularInsert(StudentKitFeeStructureDto FeeParticularInsertObj, int UserId)
        {
            return await _feeParticularRepository.StudentKitFeeParticularInsert(FeeParticularInsertObj, UserId);

        }
        public async Task<int> StudentKitFeeParticularUpdate(StudentKitFeeStructureDto FeeParticularUpdateObj, int UserId)
        {
            return await _feeParticularRepository.StudentKitFeeParticularUpdate(FeeParticularUpdateObj, UserId);

        }

        public async Task<GradeDivisionWithDisabledCommonMasterDto> GetGradeDivisionStudentKitFeeParticularMasterList(int AcademicYearId)
        {
            return await _feeParticularRepository.GetGradeDivisionStudentKitFeeParticularMasterList(AcademicYearId);

        }
        public async Task<int> PublishUnpublishGradeDivisionStudentKitParticulars(PublishUnpublishParticularDto publishRequest, int UserId)
        {
            return await _feeParticularRepository.PublishUnpublishGradeDivisionStudentKitParticulars(publishRequest, UserId);
        }
        public async Task<int> StudentKitFeeParticularClone(FeeParticularCloneDto cloneRequest, int UserId)
        {
            return await _feeParticularRepository.StudentKitFeeParticularClone(cloneRequest, UserId);
        }
        public async Task<int> StudentKitFeeParticularDelete(int GradeId, int DivisionId, int academicYearId, int UserId)
        {
            return await _feeParticularRepository.StudentKitFeeParticularDelete(GradeId, DivisionId, academicYearId, UserId);
        }
        public async Task<int> CopyStudentKitFeeParticularsFromLastAY(int GradeId, int DivisionId)
        {
            return await _feeParticularRepository.CopyStudentKitFeeParticularsFromLastAY(GradeId, DivisionId);
        }

        #endregion
    }
}
