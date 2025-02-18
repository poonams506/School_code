using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.DashBoardModule;
using SchoolApiApplication.DTO.DashboardModule;

namespace SchoolApiApplication.Controllers.DashBoardModule
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DashBoardController : ControllerBase
    {
        private readonly IDashBoardService _dashBoardService;

        public DashBoardController(IDashBoardService dashBoardService)
        {
            _dashBoardService = dashBoardService;
        }

        [Authorize]
        [HttpGet]
        [Route("GetDashboardCount")]
        public async Task<ActionResult<DashboardCountDto>> GetDashboardCount()
        {
            var DashBoard = await _dashBoardService.GetDashboardCount();
            return Ok(DashBoard);
        }

        [Authorize]
        [HttpGet]
        [Route("GetDashboardStaffDetails")]
        public async Task<ActionResult<DashBoardStaffDetailsDto>> GetDashBoardStaffDetails()
        {
             var DashBoard = await _dashBoardService.GetDashBoardStaffDetails();
             return Ok(DashBoard);
        }

        [Authorize]
        [HttpGet]
        [Route("GetDashboardGirlsBoysCount")]
        public async Task<ActionResult<GirlsBoysCountDto>> GetDashboardGirlsBoysCount()
        {
            var DashBoard = await _dashBoardService.GetDashboardGirlsBoysCount();
            return Ok(DashBoard);
        }

        #region Principle/Clerk Dashboard
        [Authorize]
        [HttpGet("GetAdminDashboardCount")]
        public async Task<ActionResult<AdminDashboardCountDto>> GetAdminDashboardCount(short AcademicYearId)
        {
            var DashBoard = await _dashBoardService.GetAdminDashboardCount(AcademicYearId);
            return Ok(DashBoard);
        }


        [Authorize]
        [HttpGet("GetIdealTeacherList")]
        public async Task<ActionResult<IdealTeacherListResponseDto>> GetIdealTeacherList(short AcademicYearId)
        {
            var idealTeacher = await _dashBoardService.GetIdealTeacherList(AcademicYearId);
            return Ok(idealTeacher);
        }
        #endregion

        #region Teacher Dashboard
        [Authorize]
        [HttpGet("GetTeacherDashboardCount")]
        public async Task<ActionResult<TeacherDashboardCountDto>> GetTeacherDashboardCount(short AcademicYearId, short TeacherId)
        {
                var DashBoard = await _dashBoardService.GetTeacherDashboardCount(AcademicYearId, TeacherId);
                return Ok(DashBoard);
        }

      
        #endregion
    }
}
