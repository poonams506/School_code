using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.PromoteModule;
using SchoolApiApplication.DTO.PromoteModule;
using System.Security.Claims;

namespace SchoolApiApplication.Controllers.PromoteModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class PromoteController : ControllerBase
    {
        private readonly IPromoteService _promoteService;
        private readonly IHttpContextAccessor _httpContextAccessor;


        public PromoteController(IHttpContextAccessor httpContextAccessor, IPromoteService promoteService)
        {

            _httpContextAccessor = httpContextAccessor;
            _promoteService = promoteService;
        }

      

        [Authorize]
        [HttpPost]
        [Route("GetPromoteList")]
        public async Task<ActionResult<PromoteGridResponseDto>> GetPromoteList(PromoteGridRequestDto requestDto)
        {
            var promoteGridResponseDto = new PromoteGridResponseDto();
            if (_httpContextAccessor.HttpContext != null)
            {
                {

                    promoteGridResponseDto.PromoteList = await _promoteService.GetPromoteGridList(requestDto);
                    return Ok(promoteGridResponseDto);
                }
            }
            return Ok(await Task.FromResult(new PromoteGridResponseDto()));

        }

        [Authorize]
        [HttpPost]
        [Route("StudentPassOrFailUpdate")]
        public async Task<ActionResult<bool>> StudentPassOrFailUpdate(List<PromoteGridDto> lstPromoteList, int academicYearId, string action)
        {
            var promoteGridResponseDto = new PromoteGridResponseDto();
            if (_httpContextAccessor.HttpContext != null)
            {
                {
                    int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                    return Ok(await _promoteService.StudentPassOrFailUpdate(lstPromoteList, academicYearId, action, userId));
                }
            }
            return Ok(await Task.FromResult(new bool()));

        }

        [Authorize]
        [HttpPost]
        [Route("PromoteStudentToNextYear")]
        public async Task<ActionResult<bool>> PromoteStudentToNextYear(List<PromoteGridDto> lstPromoteList, int nextAcademicYearId, int academicYearId, int gradeId, int divisionId)
        {
            var promoteGridResponseDto = new PromoteGridResponseDto();
            if (_httpContextAccessor.HttpContext != null)
            {
                {
                    int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                    return Ok(await _promoteService.PromoteStudentToNextYear(lstPromoteList, nextAcademicYearId, academicYearId, gradeId, divisionId, userId));
                }
            }
            return Ok(await Task.FromResult(new bool()));

        }


    }
}
