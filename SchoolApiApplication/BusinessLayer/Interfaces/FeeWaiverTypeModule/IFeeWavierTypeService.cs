
using DocumentFormat.OpenXml.Spreadsheet;
using SchoolApiApplication.Common;
using SchoolApiApplication.DTO.ClerkModule;
using SchoolApiApplication.DTO.FeeWaiverTypeModule;
using SchoolApiApplication.DTO.FeeWavierTypeModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.FeeWavierTypeModule
{
    public interface IFeeWavierTypeService
    {
        public  Task<DatatableResponseModel> GetFeeWavierTypeList(DatatableRequestWrapper requestObjectWrapper);
        public Task<FeeWavierTypeSelectDto> GetFeeWavierTypeSelect(long FeeWavierTypeId, short AcademicYearId);
        public Task<CommonSuccessResponse> FeeWavierTypeUpsert(FeeWavierTypeUpsertDto FeeWavierTypeObj, int UserId);
        public Task<FeeWavierTypeDeleteResponseDto> FeeWavierTypeDelete(long FeeWavierTypeId,int UserId);

    }
}
