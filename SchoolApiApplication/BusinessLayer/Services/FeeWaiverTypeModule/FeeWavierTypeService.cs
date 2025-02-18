using SchoolApiApplication.BusinessLayer.Interfaces.FeeWavierTypeModule;
using SchoolApiApplication.Common;
using SchoolApiApplication.DTO.FeeWaiverTypeModule;
using SchoolApiApplication.DTO.FeeWavierTypeModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.Repository.Interfaces.FeeWavierTypeModule;

namespace SchoolApiApplication.BusinessLayer.Services.FeeWaiverTypeModule
{
    public class FeeWavierTypeService : IFeeWavierTypeService
    {
        private readonly IFeeWavierTypeRepository _FeeWavierTypeRepository;

        public FeeWavierTypeService(IFeeWavierTypeRepository FeeWavierTypeRepository)
        {
            _FeeWavierTypeRepository = FeeWavierTypeRepository;
        }

        public async Task<CommonSuccessResponse> FeeWavierTypeUpsert(FeeWavierTypeUpsertDto FeeWavierTypeObj, int UserId)
        {
            return await _FeeWavierTypeRepository.FeeWavierTypeUpsert(FeeWavierTypeObj, UserId);
        }
        
        public async Task<DatatableResponseModel> GetFeeWavierTypeList(DatatableRequestWrapper requestObjectWrapper)
        {
            return  await _FeeWavierTypeRepository.GetFeeWavierTypeGridList(requestObjectWrapper);
        }

        public async Task<FeeWavierTypeSelectDto> GetFeeWavierTypeSelect(long FeeWavierTypeId, short AcademicYearId)
        {

            return await _FeeWavierTypeRepository.GetFeeWavierTypeSelect(FeeWavierTypeId, AcademicYearId);
        }

        public async Task<FeeWavierTypeDeleteResponseDto> FeeWavierTypeDelete(long FeeWavierTypeId,int UserId)
        {
            return await _FeeWavierTypeRepository.FeeWavierTypeDelete(FeeWavierTypeId, UserId);
        }
    }
}

    
