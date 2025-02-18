using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SchoolApiApplication.BusinessLayer.Interfaces.UserModule;
using SchoolApiApplication.DTO.UserModule;
using SchoolApiApplication.Helper;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Helper.Interfaces;
using SchoolApiApplication.Common;
using SchoolApiApplication.BusinessLayer.Interfaces.StorageModule;
using SchoolApiApplication.BusinessLayer.Interfaces.ParentAppModule;
using SchoolApiApplication.BusinessLayer.Interfaces.MobileAppModule;
using SchoolApiApplication.DTO.CommonModule;

namespace SchoolApiApplication.Controllers.UserModule
{
    [Route("[controller]")]
    public class AuthController : Controller
    {
        private readonly IConfiguration _config;
        private readonly IUserService _userService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IEmailSender _emailSender;
        private readonly IStorageService _storageService;
        private readonly IStudentProfileService   _studentProfileService;
        private readonly ICommonAppService _commonAppService;
        private readonly IFirebaseNotificationSender _firebaseNotificationSender;
        public AuthController(ILogger<AuthController> logger, IConfiguration config,
            IHttpContextAccessor httpContextAccessor, IUserService userService,
            IEmailSender emailSender, IStorageService storageService, IStudentProfileService studentProfileService,
            ICommonAppService commonAppService, IFirebaseNotificationSender firebaseNotificationSender)
        {
            _config = config;
            _httpContextAccessor = httpContextAccessor; 
            _userService = userService;
            _emailSender = emailSender;
            _storageService = storageService;
            _studentProfileService= studentProfileService;
            _commonAppService = commonAppService;
            _firebaseNotificationSender = firebaseNotificationSender;
        }

        [AllowAnonymous]
        [HttpPost("applogin")]
       public async Task<ActionResult<UserLoginResponse>> applogin([FromBody] LoginDto model)
       {
            var connectionString = await _userService.GetTenantConnectionString(model.Code);
            if (string.IsNullOrEmpty(connectionString))
            {
                return Unauthorized();
            }

            if (_httpContextAccessor.HttpContext != null)
            {
                _httpContextAccessor.HttpContext.Items["SchoolDatabase"] = connectionString;
            }
            else
            {
                return Unauthorized();
            }

            var passwordSalt=await _userService.GetPasswordSaltByUsername(model.Username);
            if (string.IsNullOrEmpty(passwordSalt))
            {
                return Unauthorized();
            }

            var allPasswords = await _userService.GetAllOneTimePasswordByUsername(model.Username);
            
            var userId = await _userService.IsValidUser(model.Username, PasswordHelper.HashPassword(model.Password, passwordSalt), model.Password, allPasswords);
            if(userId == 0)
            {
                return Unauthorized();
            }


            var userDto = await _userService.GetUserById(userId);


            var roleDetails = await _userService.GetUserRoleModulePermissionById(userDto.UserId, null);
            var roles = new List<UserRolesDto>();
            if(roleDetails != null && roleDetails.RoleDetails!= null)
            {
                foreach (var item in roleDetails.RoleDetails)
                {
                    if (item.RoleId == 5 && item.RefId > 0)
                    {
                        var schoolDetail = await _commonAppService.GetSchoolDetail();
                        var lstStudentDetail = await _commonAppService.GetStudentsByUserId(userId, (int)schoolDetail.AcademicYearId);
                        for (int i = 0; i < lstStudentDetail.LstStudents.Count; i++)
                        {
                            var student = lstStudentDetail.LstStudents[i];
                            var studentInfo = await _studentProfileService.GetParentProfile(student.StudentId);
                            if (studentInfo != null && !roles.Any(x=>x.RoleId == 5))
                            {
                                if (studentInfo.FatherDetail != null && studentInfo.FatherDetail.ParentId > 0)
                                {
                                    roles.Add(new UserRolesDto { RoleId = item.RoleId, RoleName = item.RoleName, RoleKey = item.RoleKey, RefId = item.RefId });
                                }
                                else if (studentInfo.MotherDetail != null && studentInfo.MotherDetail.ParentId > 0)
                                {
                                    roles.Add(new UserRolesDto { RoleId = item.RoleId, RoleName = item.RoleName, RoleKey = item.RoleKey, RefId = item.RefId });
                                }
                                else if (studentInfo.GuardianDetail != null && studentInfo.GuardianDetail.ParentId > 0)
                                {
                                    roles.Add(new UserRolesDto { RoleId = item.RoleId, RoleName = item.RoleName, RoleKey = item.RoleKey, RefId = item.RefId });
                                }
                            }
                        }
                    }
                    else if(item.RoleId == 3 || item.RoleId == 6)
                    {
                        roles.Add(new UserRolesDto { RoleId = item.RoleId, RoleName = item.RoleName, RoleKey = item.RoleKey, RefId = item.RefId });
                    }
                }
            }

            if (roles.Count == 0)
            {
                return Unauthorized();
            }

            // Create a JWT token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config["JwtSettings:Secret"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                new Claim(ClaimTypes.NameIdentifier, userDto.UserId.ToString()),
                new Claim(ClaimTypes.Name, userDto.Uname??string.Empty),
                new Claim("SchoolCode", model.Code),
                }),
                Expires = DateTime.UtcNow.AddYears(10),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            ResetPasswordRequestDto resetPasswordObj = new ResetPasswordRequestDto();
            if (userDto.IsFirstTimeLogin == true)
            {
                ResetPasswordSaveDto resetPasswordSaveDto = new ResetPasswordSaveDto()
                {
                    ExpirationDate = DateTime.UtcNow.AddHours(24),
                    Token = Guid.NewGuid().ToString(),
                    UserId = userId,
                    Username = model.Username
                };
                await _userService.SaveResetPasswordDetails(resetPasswordSaveDto);
                resetPasswordObj.SchoolCode = model.Code;
                resetPasswordObj.Token = resetPasswordSaveDto.Token;
            }
            var getSchoolDetails = await _userService.GetSchoolDetailsByCode(model.Code);
            var result = new UserLoginResponse()
            {
                Token = tokenHandler.WriteToken(token),
                IsFirstTimeLogin = userDto.IsFirstTimeLogin == true,
                Roles = roles,
                resetPasswordObj = resetPasswordObj,
                LangaugeCode = getSchoolDetails?.LangaugeCode,
                SchoolName = getSchoolDetails?.SchoolName,
                AcademicYearId = getSchoolDetails?.AcademicYearId,

            };
            return Ok(await Task.FromResult(result));

        }

        [HttpPost("SaveFCMToken")]
        public async Task<ActionResult<int>> SaveFCMToken([FromBody] string FCMToken)
        {
            int userId=   Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
           
           //Save FCM token
           return Ok(await _userService.SaveFCMToken(userId, FCMToken));
        }

        [AllowAnonymous]
        [HttpPost("WebLogin")]
        public async Task<ActionResult<UserLoginResponse>> WebLogin([FromBody] LoginDto model)
        {
            var connectionString = await _userService.GetTenantConnectionString(model.Code);
            if (string.IsNullOrEmpty(connectionString))
            {
                return Unauthorized();
            }

            if (_httpContextAccessor.HttpContext != null)
            {
                _httpContextAccessor.HttpContext.Items["SchoolDatabase"] = connectionString;
            }
            else
            {
                return Unauthorized();
            }
            var passwordSalt = await _userService.GetPasswordSaltByUsername(model.Username);
            if (string.IsNullOrEmpty(passwordSalt))
            {
                return Unauthorized();
            }

            var allPasswords = await _userService.GetAllOneTimePasswordByUsername(model.Username);

            var userId = await _userService.IsValidUser(model.Username, PasswordHelper.HashPassword(model.Password, passwordSalt), model.Password, allPasswords);

            if (userId == 0)
            {
                return Unauthorized();
            }

            var userDto = await _userService.GetUserById(userId);
            var roleDetails = await _userService.GetUserRoleModulePermissionById(userDto.UserId, null);
            var roles = new List<UserRolesDto>();
            if (roleDetails != null && roleDetails.RoleDetails != null)
            {
                foreach (var item in roleDetails.RoleDetails)
                {
                    if(item.RoleId != 5 && item.RoleId != 6) // removed parent role for web
                    {
                        roles.Add(new UserRolesDto { RoleId = item.RoleId, RoleName = item.RoleName, RoleKey = item.RoleKey, RefId = item.RefId });
                    }
                }
            }

            if(roles.Count == 0)
            {
                return Unauthorized();
            }

            // Create a JWT token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config["JwtSettings:Secret"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                new Claim(ClaimTypes.NameIdentifier, userDto.UserId.ToString()),
                new Claim(ClaimTypes.Name, userDto.Uname??string.Empty),
                new Claim("SchoolCode", model.Code),
                }),
                Expires = DateTime.UtcNow.AddMinutes(Convert.ToInt32(_config["JwtSettings:ExpirationInMinutes"])),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            ResetPasswordRequestDto resetPasswordObj = new ResetPasswordRequestDto();
            if (userDto.IsFirstTimeLogin == true)
            {
                ResetPasswordSaveDto resetPasswordSaveDto = new ResetPasswordSaveDto()
                {
                    ExpirationDate = DateTime.UtcNow.AddHours(24),
                    Token = Guid.NewGuid().ToString(),
                    UserId = userId,
                    Username = model.Username
                };
                await _userService.SaveResetPasswordDetails(resetPasswordSaveDto);
                resetPasswordObj.SchoolCode = model.Code;
                resetPasswordObj.Token = resetPasswordSaveDto.Token;
            }
            var getSchoolDetails = await _userService.GetSchoolDetailsByCode(model.Code);
            var result = new UserLoginResponse()
            {
                Token = tokenHandler.WriteToken(token),
                IsFirstTimeLogin = userDto.IsFirstTimeLogin == true,
                Roles = roles,
                resetPasswordObj = resetPasswordObj,
                LangaugeCode = getSchoolDetails?.LangaugeCode,
                SchoolName = getSchoolDetails?.SchoolName,
                AcademicYearId = getSchoolDetails?.AcademicYearId,

            };
            return Ok(await Task.FromResult(result));

        }

        [Authorize]
        [HttpGet("getUserRoleModulePermissionDetail")]
       public async Task<ActionResult<UserRoleModulePermissionDto>> GetUserRoleModulePermissionDetail(int? roleId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var result = await _userService.GetUserRoleModulePermissionById(
                    Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value)
                    , roleId);
                if (!string.IsNullOrEmpty(result.LogoUrl))
                {
                    result.LogoUrl = await _storageService.GetFullPath(UploadFileType.SCHOOL_UPLOAD, result.LogoUrl);
                }
                if (!string.IsNullOrEmpty(result.ProfileImageURL))
                {
                    if (roleId == 5)
                    {
                        //Parent
                        result.ProfileImageURL = await _storageService.GetFullPath(UploadFileType.PARENT_UPLOAD, result.ProfileImageURL);
                    }
                    else if (roleId == 2)
                    {
                        //Admin
                        result.ProfileImageURL = await _storageService.GetFullPath(UploadFileType.ADMIN_UPLOAD, result.ProfileImageURL);
                    }
                    else if (roleId == 3)
                    {
                        //Teacher
                        result.ProfileImageURL = await _storageService.GetFullPath(UploadFileType.TEACHER_UPLOAD, result.ProfileImageURL);
                    }
                    else if (roleId == 4)
                    {
                        //Clerk
                        result.ProfileImageURL = await _storageService.GetFullPath(UploadFileType.CLERK_UPLOAD, result.ProfileImageURL);
                    }
                    else if (roleId == 6)
                    {
                        //Cab Driver
                        result.ProfileImageURL = await _storageService.GetFullPath(UploadFileType.CAB_DRIVER_UPLOAD, result.ProfileImageURL);
                    }
                }
             
                return Ok(result);
            }
            return Ok(await Task.FromResult(new UserRoleModulePermissionDto()));

        }

		[AllowAnonymous]
		[HttpPost("ForgotPassword")]
        public async Task<ActionResult<bool>> ForgotPassword([FromBody] ForgotPasswordRequestDto forgotPasswordRequestDto)
		{
			var connectionString = await _userService.GetTenantConnectionString(forgotPasswordRequestDto.SchoolCode);
			if (string.IsNullOrEmpty(connectionString))
			{
				return Unauthorized();
			}

			if (_httpContextAccessor.HttpContext != null)
			{
				_httpContextAccessor.HttpContext.Items["SchoolDatabase"] = connectionString;
			}
			else
			{
				return Unauthorized();
			}
			//Check if username is valid
			var userId = await _userService.IsUsernameValid(forgotPasswordRequestDto.Username);
			if (userId>0)
            {
                //Send reset password link
                ResetPasswordSaveDto resetPasswordSaveDto = new ResetPasswordSaveDto()
                {
                    ExpirationDate = DateTime.UtcNow.AddHours(24), 
                    Token=Guid.NewGuid().ToString(),
                    UserId= userId,
                    Username= forgotPasswordRequestDto.Username,
                    ResetPasswordUrl = _config["ResetPasswordUrl"]
                };

              await  _userService.SaveResetPasswordDetails(resetPasswordSaveDto);
              

                var emailBody = await this.RenderViewToStringAsync("ForgotPassword", resetPasswordSaveDto,TempData);
                await _emailSender.SendEmailAsync(forgotPasswordRequestDto.Username, "Reset Password", emailBody);
                
            }
            return Ok(true);
        }

        [AllowAnonymous]
        [HttpPost("ChangePassword")]
        public async Task<ActionResult<bool>> ChangePassword([FromBody] ResetPasswordRequestDto resetPasswordRequestDto)
        {
            var connectionString = await _userService.GetTenantConnectionString(resetPasswordRequestDto.SchoolCode);
            if (string.IsNullOrEmpty(connectionString))
            {
                return Unauthorized();
            }

            if (_httpContextAccessor.HttpContext != null)
            {
                _httpContextAccessor.HttpContext.Items["SchoolDatabase"] = connectionString;
            }
            else
            {
                return Unauthorized();
            }
           var userId=await _userService.IsResetPasswordTokenValid(resetPasswordRequestDto.Token,DateTime.UtcNow);
            if (userId > 0)
            {
                var passwordSalt = await _userService.GetPasswordSaltByUserId(userId);
                if (string.IsNullOrEmpty(passwordSalt))
                {
                    return Unauthorized();
                }
                resetPasswordRequestDto.UserId = userId;
                resetPasswordRequestDto.Password = PasswordHelper.HashPassword(resetPasswordRequestDto.ConfirmPassword, passwordSalt);
                return Ok(await _userService.ResetPassword(resetPasswordRequestDto));
            }
            ModelState.AddModelError("InvalidToken","Password Reset Token is not valid.");
            return BadRequest(ModelState);
        }

        [Authorize]
        [HttpPost("ResetPasswordByAdmin")]
        public async Task<ActionResult<string>> ResetPasswordByAdmin(string userNameEncrpty, int roleId)
        {
              
                return Ok(await _userService.ResetPasswordByAdmin(userNameEncrpty, roleId));
            
        }

        
    }
}