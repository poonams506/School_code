


using SchoolApiApplication.Common;
using SchoolApiApplication.DTO.FeeWaiverTypeModule;
using SchoolApiApplication.DTO.FeeWavierTypeModule;

namespace SchoolApiApplication.Repository.Interfaces.FeeWavierTypeModule
{
    public interface IFeeWavierTypeRepository
    {
        public Task<DatatableResponseModel> GetFeeWavierTypeGridList(DatatableRequestWrapper RequestWrapper);
        public Task<FeeWavierTypeSelectDto> GetFeeWavierTypeSelect(long FeeWavierTypeId,short AcademicYearId);
        public Task<CommonSuccessResponse> FeeWavierTypeUpsert(FeeWavierTypeUpsertDto FeeWavierTypeObj, int UserId);
        public Task<FeeWavierTypeDeleteResponseDto> FeeWavierTypeDelete(long FeeWavierTypeId,int UserId);
       
    }
}
