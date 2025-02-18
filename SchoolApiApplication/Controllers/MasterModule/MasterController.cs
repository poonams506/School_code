using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using SchoolApiApplication.BusinessLayer.Interfaces.MasterModule;
using SchoolApiApplication.BusinessLayer.Interfaces.MobileAppModule;
using SchoolApiApplication.BusinessLayer.Services.MobileAppModule;
using SchoolApiApplication.DTO.HomeworkModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.Extensions;

namespace SchoolApiApplication.Controllers.SchoolModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class MasterController : ControllerBase
    {
        private readonly IMasterService _masterService;
        private readonly CacheHelper _cacheHelper;
        private readonly ICommonAppService _commonAppService;

        public MasterController( IMasterService masterService, CacheHelper cacheHelper, ICommonAppService commonAppService)
        {
            _masterService = masterService;
            _commonAppService = commonAppService;
            _cacheHelper = cacheHelper;
        }
        [Authorize]
        [HttpGet("GetAddressMasterData")]
        public async Task<ActionResult<AddressMasterDto>> GetAddressMasterData()
        {
            if (_cacheHelper.Cache.TryGetValue("AddressMasterData", out AddressMasterDto addressMasterData))
            {
                return addressMasterData;
            }
            addressMasterData = await _masterService.GetAddressMasterData();
            _cacheHelper.Cache.Set("AddressMasterData", addressMasterData);
            return Ok(addressMasterData);

        }
        [Authorize]
        [HttpGet("GetMediumTypeData")]
        public async Task<ActionResult<MediumTypeResponse>> GetMediumTypeData()
        {
            
                var mediumTypeList = await _masterService.GetMediumTypeData();
                return Ok(new MediumTypeResponse { MediumTypes=mediumTypeList});
            
        }

        [Authorize]
        [HttpGet("GetAcademicYearData")]
        public async Task<ActionResult<AcademicYearResponse>> GetAcademicYearData()
        {
            
                var academicYearList = await _masterService.GetAcademicYearData();
                return Ok(new AcademicYearResponse { AcademicYears = academicYearList });
           
        }
        [Authorize]
        [HttpGet("GetGradeDivisionMasterList")]
        public async Task<ActionResult<GradeDivisionMasterDto>> GetGradeDivisionMasterList(int academicYearId)
        {
            if(academicYearId == 0)
            {
                var schoolDetail = await _commonAppService.GetSchoolDetail();
                academicYearId = schoolDetail.AcademicYearId; 
            }
            
                return Ok(await _masterService.GetGradeDivisionMasterList(academicYearId));
            
        }

        [Authorize]
        [HttpGet("GetMonthMasterList")]
        public async Task<ActionResult<MonthMasterResponse>> GetMonthMasterList()
        {
            
                var monthMasterList = await _masterService.GetMonthMasterList();
                return Ok(new MonthMasterResponse { MonthMasters = monthMasterList });
            
           
        }

        [Authorize]
        [HttpGet("GetStudentDropdownData")]
        public async Task<ActionResult<CommonDropdownSelectListItemResponseDto>> GetStudentDropdownData(int AcademicYearId)
        {
            if (AcademicYearId == 0)
            {
                var schoolDetail = await _commonAppService.GetSchoolDetail();
                AcademicYearId = schoolDetail.AcademicYearId;
            }
            var result = await _masterService.GetStudentDropdownData(AcademicYearId);
            return Ok(result);
        }

        [Authorize]
        [HttpGet("GetTeacherDropdownData")]
        public async Task<ActionResult<TeacherDropdownSelectListResponseDto>> GetTeacherDropdownData(int AcademicYearId)
        {
            if (AcademicYearId == 0)
            {
                var schoolDetail = await _commonAppService.GetSchoolDetail();
                AcademicYearId = schoolDetail.AcademicYearId;
            }
            var result = await _masterService.GetTeacherDropdownData(AcademicYearId);
            return Ok(result);
        }

        [Authorize]
        [HttpGet("GetTeacherDropdownWithoutSubject")]
        public async Task<ActionResult<TeacherDropdownSelectListResponseDto>> GetTeacherDropdownWithoutSubject()
        {
            var result = await _masterService.GetTeacherDropdownWithoutSubject();
            return Ok(result);
        }


        [Authorize]
        [HttpGet("GetClerkDropdownData")]
        public async Task<ActionResult<CommonDropdownSelectListItemResponseDto>> GetClerkDropdownData(int AcademicYearId)
        {
            if (AcademicYearId == 0)
            {
                var schoolDetail = await _commonAppService.GetSchoolDetail();
                AcademicYearId = schoolDetail.AcademicYearId;
            }
            var result = await _masterService.GetClerkDropdownData(AcademicYearId);
            return Ok(result);
        }

        [Authorize]
        [HttpGet("GetCabDriverDropdownData")]
        public async Task<ActionResult<CommonDropdownSelectListItemResponseDto>> GetCabDriverDropdownData(int AcademicYearId)
        {
            if (AcademicYearId == 0)
            {
                var schoolDetail = await _commonAppService.GetSchoolDetail();
                AcademicYearId = schoolDetail.AcademicYearId;
            }
            var result = await _masterService.GetCabDriverDropdownData(AcademicYearId);
            return Ok(result);
        }
    }
}
