using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.FeeWavierTypeModule;
using SchoolApiApplication.Common;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.FeeWaiverTypeModule;
using SchoolApiApplication.DTO.FeeWavierTypeModule;
using System.Security.Claims;

namespace SchoolApiApplication.Controllers.FeeWavierTypeModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeeWavierTypeController : ControllerBase
    {
        private readonly IFeeWavierTypeService _FeeWavierTypeService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public FeeWavierTypeController(IHttpContextAccessor httpContextAccessor, IFeeWavierTypeService FeeWavierTypeService)
        {
            _httpContextAccessor = httpContextAccessor;
            _FeeWavierTypeService = FeeWavierTypeService;
        }
        [Authorize]
        [HttpPost]
        [Route("GetFeeWavierTypeList")]
        public async Task<ActionResult<DatatableResponseModel>> GetFeeWavierTypeGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var FeeWavierType = await _FeeWavierTypeService.GetFeeWavierTypeList(requestObjectWrapper);
               
                return Ok(FeeWavierType);

            }


            return Ok(await Task.FromResult(new DatatableResponseModel()));
        }
        [Authorize]
        [HttpGet("GetFeeWavierTypeSelect")]
        public async Task<ActionResult<FeeWavierTypeSelectDto>> GetFeeWavierTypeSelect(long FeeWavierType, short AcademicYearId)
        {
               var result = await _FeeWavierTypeService.GetFeeWavierTypeSelect(FeeWavierType, AcademicYearId);
                if(result != null && result.FeeWavierTypesInstallmentsDetailsTypes != null)
                {
                    foreach (var item in result.FeeWavierTypesInstallmentsDetailsTypes)
                    {
                        if (item.LateFeeStartDate != null && item.LateFeeStartDate.Value.Day > 0)
                        {
                            item.NgbLateFeeStartDate = new SchoolNgbDateModel
                            {
                                year = item.LateFeeStartDate.Value.Year,
                                month = item.LateFeeStartDate.Value.Month,
                                day = item.LateFeeStartDate.Value.Day
                            };
                        }
                        if (item.DiscountEndDate!=null && item.DiscountEndDate.Value.Day > 0)
                        {
                            item.NgbDiscountEndDate = new SchoolNgbDateModel
                            {
                                year = item.DiscountEndDate.Value.Year,
                                month = item.DiscountEndDate.Value.Month,
                                day = item.DiscountEndDate.Value.Day
                            };
                        }
                    }
                }
                return Ok(result);
        }
        [Authorize]
        [HttpPost]
        [Route("FeeWavierTypeUpsert")]
        public async Task<ActionResult<CommonSuccessResponse>> FeeWavierTypeUpsert([FromBody]FeeWavierTypeUpsertDto FeeWavierTypeObj)
        {
          
                int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                FeeWavierTypeObj.UserId = userId;
                FeeWavierTypeObj.DiscountInPercent = FeeWavierTypeObj.DiscountInPercent / 100;
                FeeWavierTypeObj.LatePerDayFeeInPercent = FeeWavierTypeObj.LatePerDayFeeInPercent / 100;
                    if (FeeWavierTypeObj.FeeWavierTypesInstallmentsDetailsTypes != null)
                    {
                        foreach (var item in FeeWavierTypeObj.FeeWavierTypesInstallmentsDetailsTypes)
                        {
                            if (item.NgbLateFeeStartDate != null && item.NgbLateFeeStartDate.day > 0)
                            {
                                item.LateFeeStartDate = new DateTime(item.NgbLateFeeStartDate.year,
                                 item.NgbLateFeeStartDate.month,
                                 item.NgbLateFeeStartDate.day);
                            }
                            else
                            {
                                item.LateFeeStartDate = null;
                            }
                            if (item.NgbDiscountEndDate != null && item.NgbDiscountEndDate.day > 0)
                            {
                                item.DiscountEndDate = new DateTime(item.NgbDiscountEndDate.year,
                                 item.NgbDiscountEndDate.month,
                                 item.NgbDiscountEndDate.day);
                            }
                            else
                            {
                               item.DiscountEndDate = null;
                            }
                        }
                   
                    }
                var FeeWavierType = await _FeeWavierTypeService.FeeWavierTypeUpsert(FeeWavierTypeObj, userId);
                return Ok(FeeWavierType);
        }
            

        [HttpDelete]
        [Route("FeeWavierTypeDelete")]
        public async Task<ActionResult<FeeWavierTypeDeleteResponseDto>> FeeWavierTypeDelete(long feeWavierTypeId)
        {

            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                return Ok(await _FeeWavierTypeService.FeeWavierTypeDelete(feeWavierTypeId, userId));
            }

            return Ok(await Task.FromResult(new FeeWavierTypeDeleteResponseDto()));

        }
    }
}


