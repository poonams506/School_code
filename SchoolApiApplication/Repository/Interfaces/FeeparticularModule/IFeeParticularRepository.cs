
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.DTO.ClerkModule;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.FeeparticularModule;
using SchoolApiApplication.DTO.FeeParticularModule;
using SchoolApiApplication.DTO.MasterModule;
using System.Data;

namespace SchoolApiApplication.Repository.Interfaces.FeeparticularModule
{
    public interface IFeeParticularRepository
    {
        public Task<DatatableResponseModel> GetFeeParticularGridList(DatatableRequestWrapper requestObjectWrapper);
        public Task<FeeStructureDto> GetFeeParticularSelect(int ClassId, int AcademicYearId);
        public Task<int> FeeParticularInsert(FeeStructureDto FeeParticularInsertObj, Int32 UserId);
        public Task<int> FeeParticularUpdate(FeeStructureDto FeeParticularUpdateObj, Int32 UserId);
        public Task<FeeWaiverResponseDto> GetAllApplicableWaiverData(int AcademicYearId);
        public Task<GradeDivisionWithDisabledCommonMasterDto> GetGradeDivisionFeeParticularMasterList(int AcademicYearId);
       public Task<int> PublishUnpublishGradeDivisionParticulars(PublishUnpublishParticularDto publishRequest, int UserId);
       public Task<int> FeeParticularClone(FeeParticularCloneDto cloneRequest, int UserId);
        public Task<int> FeeParticularDelete(int GradeId, int DivisionId, int academicYearId ,int UserId);
        public Task<int> CopyFeeParticularsFromLastAY(int GradeId, int DivisionId);

        #region Student Kit Fee Structure
        Task<DatatableResponseModel> GetStudentKitFeeParticularGridList(DatatableRequestWrapper requestObjectWrapper);
        Task<StudentKitFeeStructureDto> GetStudentKitFeeParticularByClassId(int ClassId, int AcademicYearId);
        Task<int> StudentKitFeeParticularInsert(StudentKitFeeStructureDto FeeParticularInsertObj, int UserId);
        Task<int> StudentKitFeeParticularUpdate(StudentKitFeeStructureDto FeeParticularUpdateObj, int UserId);
        Task<GradeDivisionWithDisabledCommonMasterDto> GetGradeDivisionStudentKitFeeParticularMasterList(int AcademicYearId);
        public Task<int> PublishUnpublishGradeDivisionStudentKitParticulars(PublishUnpublishParticularDto publishRequest, int UserId);
        public Task<int> StudentKitFeeParticularClone(FeeParticularCloneDto cloneRequest, int UserId);
        public Task<int> StudentKitFeeParticularDelete(int GradeId, int DivisionId, int academicYearId, int UserId);
        public Task<int> CopyStudentKitFeeParticularsFromLastAY(int GradeId, int DivisionId);

        #endregion
    }

}
