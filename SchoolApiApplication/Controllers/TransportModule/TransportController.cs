using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SchoolApiApplication.BusinessLayer.Interfaces.TransportModule;
using SchoolApiApplication.BusinessLayer.Interfaces.UserModule;
using SchoolApiApplication.BusinessLayer.Services.TransportModule;
using SchoolApiApplication.Common;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.FeePaymentModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.NoticeModule;
using SchoolApiApplication.DTO.ParentAppModule;
using SchoolApiApplication.DTO.StudentAttendanceModule;
using SchoolApiApplication.DTO.TransportModule;
using SchoolApiApplication.Helper.Interfaces;
using System.Security.Claims;

namespace SchoolApiApplication.Controllers.TransportModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransportController : ControllerBase
    {
        private readonly ITransportService _transportService;
        private readonly IFirebaseNotificationSender _firebaseNotificationSender;
        private readonly IUserService _userService;
        private readonly IConfiguration _config;


        public TransportController(ITransportService transportService, IConfiguration config, IUserService userService, IFirebaseNotificationSender firebaseNotificationSender)
        {
           
            _transportService = transportService;
            _firebaseNotificationSender = firebaseNotificationSender;
            _userService = userService;
            _config = config;
        }
        [Authorize]
        [HttpGet("GetAreaSelect")]
        public async Task<ActionResult<AreaDto>> GetAreaSelect(long areaId, int academicYearId)
        {
            var result = await _transportService.GetAreaSelect(areaId, academicYearId);
            return Ok(result);
        }
        [HttpPost]
        [Route("GetAreaGridListSelect")]
        public async Task<ActionResult<DatatableResponseModel>> GetAreaGridListSelect(DatatableRequestWrapper requestObjectWrapper)
        {
            var areaList = await _transportService.GetAreaGridListSelect(requestObjectWrapper);
            return Ok(areaList);
        }

        [HttpDelete]
        [Route("AreaDelete")]
        public async Task<ActionResult<AreaDeleteRespose>> AreaDelete(long areaId, int academicYearId)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            return Ok(await _transportService.AreaDelete(areaId, academicYearId, userId));
        }
        [Authorize]
        [HttpPost]
        [Route("AreaUpsert")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<AreaDto>> AreaUpsert(AreaDto areaDto, int academicYearId)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            return Ok(await _transportService.AreaUpsert(areaDto, userId, academicYearId));
        }

        [Authorize]
        [HttpGet("GetRouteSelect")]
        public async Task<ActionResult<RouteDto>> GetRouteSelect(long routeId, int academicYearId)
        {
            var result = await _transportService.GetRouteSelect(routeId, academicYearId);
            if (result != null)
            {
                if (result.FirstPickUpTime != null && result.FirstPickUpTime.Value.Hour > 0)
                {
                    result.ngbFirstPickUpTime = new SchoolNgbTimeModel
                    {
                        hour = result.FirstPickUpTime.Value.Hour,
                        minute = result.FirstPickUpTime.Value.Minute,
                        second = result.FirstPickUpTime.Value.Second
                    };
                }
                if (result.LastPickUpTime != null && result.LastPickUpTime.Value.Hour > 0)
                {
                    result.ngbLastPickUpTime = new SchoolNgbTimeModel
                    {
                        hour = result.LastPickUpTime.Value.Hour,
                        minute = result.LastPickUpTime.Value.Minute,
                        second = result.LastPickUpTime.Value.Second

                    };
                }
            }
            return Ok(result);

        }
        [HttpPost]
        [Route("GetRouteGridListSelect")]
        public async Task<ActionResult<RouteListResponse>> GetRouteGridListSelect([FromBody]RouteGridInputRequestDto request)
        {
            return Ok(await _transportService.GetRouteGridListSelect(request.AcademicYearId, request.ConsumerName));
        }

        [HttpDelete]
        [Route("RouteDelete")]
        public async Task<ActionResult<RouteDeleteRespose>> RouteDelete(long routeId, int academicYearId)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            return Ok(await _transportService.RouteDelete(routeId, academicYearId, userId));
        }
        [Authorize]
        [HttpPost]
        [Route("RouteUpsert")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<RouteDto>> RouteUpsert(RouteDto routeDto, int academicYearId)
        {
            var currentDate = DateTime.Now;
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            if (routeDto.ngbFirstPickUpTime != null && routeDto.ngbFirstPickUpTime.hour > 0)
            {
                routeDto.FirstPickUpTime = new DateTime(currentDate.Year,
                currentDate.Month,
                currentDate.Day,
                 routeDto.ngbFirstPickUpTime.hour,
                 routeDto.ngbFirstPickUpTime.minute,
                 routeDto.ngbFirstPickUpTime.second);
            }
            if (routeDto.ngbLastPickUpTime != null && routeDto.ngbLastPickUpTime.hour > 0)
            {
                routeDto.LastPickUpTime = new DateTime(
                    currentDate.Year,
                    currentDate.Month,
                    currentDate.Day,
                 routeDto.ngbLastPickUpTime.hour,
                 routeDto.ngbLastPickUpTime.minute,
                 routeDto.ngbLastPickUpTime.second);
            }
            var result =await _transportService.RouteUpsert(routeDto, userId, academicYearId);
            await SendNotification(routeDto, academicYearId);
            return (result);
        }

        private async Task<bool> SendNotification(RouteDto routeDto, int academicYearId)
        {
            try
            {
                if (routeDto.CoOrdinatorRoleId == 3)
                {
                    string[] parts = routeDto.CoOrdinatorId.Split('_');
                    string id = parts[1];
                    List<FCMNotificationUserDto> notificationUserDtos = new List<FCMNotificationUserDto>();
                    var allFCMUsers = await _userService.GetAllFCMTokenUsers(3, 0, 0, 0, "", id);
                    allFCMUsers.ForEach(user =>
                    {
                        try
                        {
                            var messageTitle = _config["FirebaseSetting:MessageTemplates:TransportAllocate_Cabdriver_Template:Title"];
                            var messageBody = _config["FirebaseSetting:MessageTemplates:TransportAllocate_Cabdriver_Template:Body"];
                            messageBody = messageBody.Replace("{token1}", routeDto.RouteName);

                            notificationUserDtos.Add(new FCMNotificationUserDto
                            {
                                Title = messageTitle,
                                Body = messageBody,
                                Token = user.FCMToken,
                                Data = new Dictionary<string, string>
                                {
                                }
                            });
                        }
                        catch (Exception)
                        {

                        }

                    });

                    await _firebaseNotificationSender.SendFcmNotificationAsync(notificationUserDtos);
                }

                else if (routeDto.CoOrdinatorRoleId == 4)
                {
                    string[] parts = routeDto.CoOrdinatorId.Split('_');
                    string id = parts[1];
                    List<FCMNotificationUserDto> notificationUserDtos = new List<FCMNotificationUserDto>();
                    var allFCMUsers = await _userService.GetAllFCMTokenUsers(4, 0, 0, 0, "", "",id);
                    allFCMUsers.ForEach(user =>
                    {
                        try
                        {
                            var messageTitle = _config["FirebaseSetting:MessageTemplates:TransportAllocate_Cabdriver_Template:Title"];
                            var messageBody = _config["FirebaseSetting:MessageTemplates:TransportAllocate_Cabdriver_Template:Body"];
                            messageBody = messageBody.Replace("{token1}", routeDto.RouteName);

                            notificationUserDtos.Add(new FCMNotificationUserDto
                            {
                                Title = messageTitle,
                                Body = messageBody,
                                Token = user.FCMToken,
                                Data = new Dictionary<string, string>
                                {
                                }
                            });
                        }
                        catch (Exception)
                        {

                        }

                    });

                    await _firebaseNotificationSender.SendFcmNotificationAsync(notificationUserDtos);
                }
                else if (routeDto.CoOrdinatorRoleId == 6)
                {
                    string[] parts = routeDto.CoOrdinatorId.Split('_');
                    string id = parts[1];
                    List<FCMNotificationUserDto> notificationUserDtos = new List<FCMNotificationUserDto>();
                    var allFCMUsers = await _userService.GetAllFCMTokenUsers(6, 0, 0, 0, "", "", "",id);
                    allFCMUsers.ForEach(user =>
                    {
                        try
                        {
                            var messageTitle = _config["FirebaseSetting:MessageTemplates:TransportAllocate_Cabdriver_Template:Title"];
                            var messageBody = _config["FirebaseSetting:MessageTemplates:TransportAllocate_Cabdriver_Template:Body"];
                            messageBody = messageBody.Replace("{token1}", routeDto.RouteName);

                            notificationUserDtos.Add(new FCMNotificationUserDto
                            {
                                Title = messageTitle,
                                Body = messageBody,
                                Token = user.FCMToken,
                                Data = new Dictionary<string, string>
                                {
                                }
                            });
                        }
                        catch (Exception)
                        {

                        }

                    });

                    await _firebaseNotificationSender.SendFcmNotificationAsync(notificationUserDtos);
                }

                var vehicleDetails = await _transportService.GetVehicleSelect(routeDto.VehicleId, academicYearId);
                if (vehicleDetails != null && vehicleDetails.VehicleId > 0)
                {
                    List<FCMNotificationUserDto> notificationUserDtos = new List<FCMNotificationUserDto>();
                    var allFCMUsers = await _userService.GetAllFCMTokenUsers(6, 0, 0, 0, "", "", "", vehicleDetails.CabDriverId.ToString());
                    allFCMUsers.ForEach(user =>
                    {
                        try
                        {
                            var messageTitle = _config["FirebaseSetting:MessageTemplates:TransportAllocate_Cabdriver_Template:Title"];
                            var messageBody = _config["FirebaseSetting:MessageTemplates:TransportAllocate_Cabdriver_Template:Body"];
                            messageBody = messageBody.Replace("{token1}", routeDto.RouteName);

                            notificationUserDtos.Add(new FCMNotificationUserDto
                            {
                                Title = messageTitle,
                                Body = messageBody,
                                Token = user.FCMToken,
                                Data = new Dictionary<string, string>
                                {
                                }
                            });
                        }
                        catch (Exception)
                        {

                        }

                    });

                    await _firebaseNotificationSender.SendFcmNotificationAsync(notificationUserDtos);
                }


            }
            catch (Exception)
            {

            }
         

            return await Task.FromResult(new bool());
        }


        [Authorize]
        [HttpGet("GetStoppageSelect")]
        public async Task<ActionResult<StoppageDto>> GetStoppageSelect(long stoppageId, int academicYearId)
        {

            var result = await _transportService.GetStoppageSelect(stoppageId, academicYearId);
            if (result != null)
            {
                if (result.PickUpTime != null && result.PickUpTime.Value.Hour > 0)
                {
                    result.ngbPickUpTime = new SchoolNgbTimeModel
                    {
                        hour = result.PickUpTime.Value.Hour,
                        minute = result.PickUpTime.Value.Minute,
                        second = result.PickUpTime.Value.Second
                    };
                }
                if (result.DropPickUpTime != null && result.DropPickUpTime.Value.Hour > 0)
                {
                    result.ngbDropPickUpTime = new SchoolNgbTimeModel
                    {
                        hour = result.DropPickUpTime.Value.Hour,
                        minute = result.DropPickUpTime.Value.Minute,
                        second = result.DropPickUpTime.Value.Second

                    };
                }
            }

            return Ok(result);
        }
        [HttpPost]
        [Route("GetStoppageGridListSelect")]
        public async Task<ActionResult<StoppageListResponse>> GetStoppageGridListSelect([FromBody]StoppageGridInputDto requestDto)
        {
            return Ok(await _transportService.GetStoppageGridListSelect(requestDto));
        }

        [HttpDelete]
        [Route("StoppageDelete")]
        public async Task<ActionResult<StoppageDeleteRespose>> StoppageDelete(long stoppageId, int academicYearId)
        {

            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            return Ok(await _transportService.StoppageDelete(stoppageId, academicYearId, userId));
        }
        [Authorize]
        [HttpPost]
        [Route("StoppageUpsert")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<int>> StoppageUpsert(StoppageDto stoppageDto, int academicYearId, long routeId)
        {
            var currentDate = DateTime.Now;
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            if (stoppageDto.ngbPickUpTime != null && stoppageDto.ngbPickUpTime.hour > 0)
            {
                stoppageDto.PickUpTime = new DateTime(
                    currentDate.Year,
                currentDate.Month,
                currentDate.Day,
                 stoppageDto.ngbPickUpTime.hour,
                 stoppageDto.ngbPickUpTime.minute,
                 stoppageDto.ngbPickUpTime.second);
            }
            if (stoppageDto.ngbDropPickUpTime != null && stoppageDto.ngbDropPickUpTime.hour > 0)
            {
                stoppageDto.DropPickUpTime = new DateTime(
                currentDate.Year,
                currentDate.Month,
                currentDate.Day,
                 stoppageDto.ngbDropPickUpTime.hour,
                 stoppageDto.ngbDropPickUpTime.minute,
                 stoppageDto.ngbDropPickUpTime.second);
            }
            return Ok(await _transportService.StoppageUpsert(stoppageDto, userId, academicYearId, routeId));
        }

        [HttpPost]
        [Route("GetVehicleList")]
        public async Task<ActionResult<DatatableResponseModel>> GetVehicleList(DatatableRequestWrapper requestObjectWrapper)
        {
            var VehicleList = await _transportService.GetVehicleList(requestObjectWrapper);
            return Ok(VehicleList);
        }

        [Authorize]
        [HttpGet("GetVehicleSelect")]
        public async Task<ActionResult<VehicleDto>> GetVehicleSelect(int VehicleId, int AcademicYearId)
        {
                var result = await _transportService.GetVehicleSelect(VehicleId, AcademicYearId);

                if (result != null)
                {
                    if (result.VehicleRegistrationStartDate != null && result.VehicleRegistrationStartDate.Value.Day > 0)
                    {
                        result.ngbVehicleRegistrationStartDate = new SchoolNgbDateModel
                        {
                            year = result.VehicleRegistrationStartDate.Value.Year,
                            month = result.VehicleRegistrationStartDate.Value.Month,
                            day = result.VehicleRegistrationStartDate.Value.Day
                        };
                    }
                    if (result.VehicleRegistrationEndDate != null && result.VehicleRegistrationEndDate.Value.Day > 0)
                    {
                        result.ngbVehicleRegistrationEndDate = new SchoolNgbDateModel
                        {
                            year = result.VehicleRegistrationEndDate.Value.Year,
                            month = result.VehicleRegistrationEndDate.Value.Month,
                            day = result.VehicleRegistrationEndDate.Value.Day
                        };
                    }


                    if (result.VehiclePermitStartDate != null && result.VehiclePermitStartDate.Value.Day > 0)
                    {
                        result.ngbVehiclePermitStartDate = new SchoolNgbDateModel
                        {
                            year = result.VehiclePermitStartDate.Value.Year,
                            month = result.VehiclePermitStartDate.Value.Month,
                            day = result.VehiclePermitStartDate.Value.Day
                        };
                    }
                    if (result.VehiclePermitEndDate != null && result.VehiclePermitEndDate.Value.Day > 0)
                    {
                        result.ngbVehiclePermitEndDate = new SchoolNgbDateModel
                        {
                            year = result.VehiclePermitEndDate.Value.Year,
                            month = result.VehiclePermitEndDate.Value.Month,
                            day = result.VehiclePermitEndDate.Value.Day
                        };
                    }

                    if (result.VehicleInsuranceStartDate != null && result.VehicleInsuranceStartDate.Value.Day > 0)
                    {
                        result.ngbVehicleInsuranceStartDate = new SchoolNgbDateModel
                        {
                            year = result.VehicleInsuranceStartDate.Value.Year,
                            month = result.VehicleInsuranceStartDate.Value.Month,
                            day = result.VehicleInsuranceStartDate.Value.Day
                        };
                    }
                    if (result.VehicleInsuranceEndDate != null && result.VehicleInsuranceEndDate.Value.Day > 0)
                    {
                        result.ngbVehicleInsuranceEndDate = new SchoolNgbDateModel
                        {
                            year = result.VehicleInsuranceEndDate.Value.Year,
                            month = result.VehicleInsuranceEndDate.Value.Month,
                            day = result.VehicleInsuranceEndDate.Value.Day
                        };
                    }

                    if (result.VehiclePollutionStartDate != null && result.VehiclePollutionStartDate.Value.Day > 0)
                    {
                        result.ngbVehiclePollutionStartDate = new SchoolNgbDateModel
                        {
                            year = result.VehiclePollutionStartDate.Value.Year,
                            month = result.VehiclePollutionStartDate.Value.Month,
                            day = result.VehiclePollutionStartDate.Value.Day
                        };
                    }
                    if (result.VehiclePollutionEndDate != null && result.VehiclePollutionEndDate.Value.Day > 0)
                    {
                        result.ngbVehiclePollutionEndDate = new SchoolNgbDateModel
                        {
                            year = result.VehiclePollutionEndDate.Value.Year,
                            month = result.VehiclePollutionEndDate.Value.Month,
                            day = result.VehiclePollutionEndDate.Value.Day
                        };
                    }

                    if (result.VehicleRoadTaxStartDate != null && result.VehicleRoadTaxStartDate.Value.Day > 0)
                    {
                        result.ngbVehicleRoadTaxStartDate = new SchoolNgbDateModel
                        {
                            year = result.VehicleRoadTaxStartDate.Value.Year,
                            month = result.VehicleRoadTaxStartDate.Value.Month,
                            day = result.VehicleRoadTaxStartDate.Value.Day
                        };
                    }
                    if (result.VehicleRoadTaxEndDate != null && result.VehicleRoadTaxEndDate.Value.Day > 0)
                    {
                        result.ngbVehicleRoadTaxEndDate = new SchoolNgbDateModel
                        {
                            year = result.VehicleRoadTaxEndDate.Value.Year,
                            month = result.VehicleRoadTaxEndDate.Value.Month,
                            day = result.VehicleRoadTaxEndDate.Value.Day
                        };
                    }
                    if (result.VehicleFitnessStartDate != null && result.VehicleFitnessStartDate.Value.Day > 0)
                    {
                        result.ngbVehicleFitnessStartDate = new SchoolNgbDateModel
                        {
                            year = result.VehicleFitnessStartDate.Value.Year,
                            month = result.VehicleFitnessStartDate.Value.Month,
                            day = result.VehicleFitnessStartDate.Value.Day
                        };
                    }
                    if (result.VehicleFitnessEndDate != null && result.VehicleFitnessEndDate.Value.Day > 0)
                    {
                        result.ngbVehicleFitnessEndDate = new SchoolNgbDateModel
                        {
                            year = result.VehicleFitnessEndDate.Value.Year,
                            month = result.VehicleFitnessEndDate.Value.Month,
                            day = result.VehicleFitnessEndDate.Value.Day
                        };
                    }
                }
                else
                {
                    result = new VehicleDto() { };
                }
                return Ok(result);
            
        }


        [Authorize]
        [HttpPost]
        [Route("VehicleUpsert")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<int>> VehicleUpsert()
        {
            
                int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                VehicleDto vehicleObj = JsonConvert.DeserializeObject<VehicleDto>(Request.Form["vehicle"], new TrimmingConverter());
                if (vehicleObj.ngbVehicleRegistrationStartDate != null && vehicleObj.ngbVehicleRegistrationStartDate.day > 0)
                {
                    vehicleObj.VehicleRegistrationStartDate = new DateTime
                    (vehicleObj.ngbVehicleRegistrationStartDate.year,
                     vehicleObj.ngbVehicleRegistrationStartDate.month,
                     vehicleObj.ngbVehicleRegistrationStartDate.day);
                }
                if (vehicleObj.ngbVehicleRegistrationEndDate != null && vehicleObj.ngbVehicleRegistrationEndDate.day > 0)
                {
                    vehicleObj.VehicleRegistrationEndDate = new DateTime
                    (vehicleObj.ngbVehicleRegistrationEndDate.year,
                     vehicleObj.ngbVehicleRegistrationEndDate.month,
                     vehicleObj.ngbVehicleRegistrationEndDate.day);
                }

                if (vehicleObj.ngbVehiclePermitStartDate != null && vehicleObj.ngbVehiclePermitStartDate.day > 0)
                {
                    vehicleObj.VehiclePermitStartDate = new DateTime
                    (vehicleObj.ngbVehiclePermitStartDate.year,
                     vehicleObj.ngbVehiclePermitStartDate.month,
                     vehicleObj.ngbVehiclePermitStartDate.day);
                }
                if (vehicleObj.ngbVehiclePermitEndDate != null && vehicleObj.ngbVehiclePermitEndDate.day > 0)
                {
                    vehicleObj.VehiclePermitEndDate = new DateTime
                    (vehicleObj.ngbVehiclePermitEndDate.year,
                     vehicleObj.ngbVehiclePermitEndDate.month,
                     vehicleObj.ngbVehiclePermitEndDate.day);
                }

                if (vehicleObj.ngbVehicleInsuranceStartDate != null && vehicleObj.ngbVehicleInsuranceStartDate.day > 0)
                {
                    vehicleObj.VehicleInsuranceStartDate = new DateTime
                    (vehicleObj.ngbVehicleInsuranceStartDate.year,
                     vehicleObj.ngbVehicleInsuranceStartDate.month,
                     vehicleObj.ngbVehicleInsuranceStartDate.day);
                }
                if (vehicleObj.ngbVehicleInsuranceEndDate != null && vehicleObj.ngbVehicleInsuranceEndDate.day > 0)
                {
                    vehicleObj.VehicleInsuranceEndDate = new DateTime
                    (vehicleObj.ngbVehicleInsuranceEndDate.year,
                     vehicleObj.ngbVehicleInsuranceEndDate.month,
                     vehicleObj.ngbVehicleInsuranceEndDate.day);
                }

                if (vehicleObj.ngbVehiclePollutionStartDate != null && vehicleObj.ngbVehiclePollutionStartDate.day > 0)
                {
                    vehicleObj.VehiclePollutionStartDate = new DateTime
                    (vehicleObj.ngbVehiclePollutionStartDate.year,
                     vehicleObj.ngbVehiclePollutionStartDate.month,
                     vehicleObj.ngbVehiclePollutionStartDate.day);
                }
                if (vehicleObj.ngbVehiclePollutionEndDate != null && vehicleObj.ngbVehiclePollutionEndDate.day > 0)
                {
                    vehicleObj.VehiclePollutionEndDate = new DateTime
                    (vehicleObj.ngbVehiclePollutionEndDate.year,
                     vehicleObj.ngbVehiclePollutionEndDate.month,
                     vehicleObj.ngbVehiclePollutionEndDate.day);
                }

                if (vehicleObj.ngbVehicleRoadTaxStartDate != null && vehicleObj.ngbVehicleRoadTaxStartDate.day > 0)
                {
                    vehicleObj.VehicleRoadTaxStartDate = new DateTime
                    (vehicleObj.ngbVehicleRoadTaxStartDate.year,
                     vehicleObj.ngbVehicleRoadTaxStartDate.month,
                     vehicleObj.ngbVehicleRoadTaxStartDate.day);
                }
                if (vehicleObj.ngbVehicleRoadTaxEndDate != null && vehicleObj.ngbVehicleRoadTaxEndDate.day > 0)
                {
                    vehicleObj.VehicleRoadTaxEndDate = new DateTime
                    (vehicleObj.ngbVehicleRoadTaxEndDate.year,
                     vehicleObj.ngbVehicleRoadTaxEndDate.month,
                     vehicleObj.ngbVehicleRoadTaxEndDate.day);
                }


                if (vehicleObj.ngbVehicleFitnessStartDate != null && vehicleObj.ngbVehicleFitnessStartDate.day > 0)
                {
                    vehicleObj.VehicleFitnessStartDate = new DateTime
                    (vehicleObj.ngbVehicleFitnessStartDate.year,
                     vehicleObj.ngbVehicleFitnessStartDate.month,
                     vehicleObj.ngbVehicleFitnessStartDate.day);
                }
                if (vehicleObj.ngbVehicleFitnessEndDate != null && vehicleObj.ngbVehicleFitnessEndDate.day > 0)
                {
                    vehicleObj.VehicleFitnessEndDate = new DateTime
                    (vehicleObj.ngbVehicleFitnessEndDate.year,
                     vehicleObj.ngbVehicleFitnessEndDate.month,
                     vehicleObj.ngbVehicleFitnessEndDate.day);
                }
                return Ok(await _transportService.VehicleUpsert(vehicleObj, userId));
           
        }


        [Authorize]
        [HttpPost]
        [Route("ActiveInActiveVehicle")]
        public async Task<ActionResult<int>> ActiveInActiveVehicle(ActiceInActiveVehicleDto activeRequest)
        {
            {
                int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                return Ok(await _transportService.ActiveInActiveVehicle(activeRequest, userId));
            }

        }


        [HttpDelete]
        [Route("VehicleDelete")]
        public async Task<ActionResult<VehicleDeleteResposeDto>> VehicleDelete(int VehicleId)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            return Ok(await _transportService.VehicleDelete(VehicleId, userId));
        }

        [HttpGet]
        [Route("GetCabDriverDropDown")]
        public async Task<ActionResult<DropdownResponseDto>> GetCabdriverDropdown()
        {
            return Ok(await _transportService.GetCabdriverDropdown());
        }

        [HttpGet]
        [Route("GetAreaNameDropdown")]
        public async Task<ActionResult<DropdownResponseDto>> GetAreaNameDropdown(int academicYearId)
        {
            return Ok(await _transportService.GetAreaNameDropdown(academicYearId));
        }

        [HttpGet]
        [Route("GetVehicleDropdown")]
        public async Task<ActionResult<DropdownResponseDto>> GetVehicleDropdown()
        {
            return Ok(await _transportService.GetVehicleDropdown());
        }

        [HttpGet]
        [Route("GetTransportStaffList")]
        public async Task<ActionResult<TransportStaffResponseDto>> GetTransportStaffList()
        {
            return Ok(await _transportService.GetTransportStaffList());
        }

        [HttpPost]
        [Route("GetTransportConsumerTreeViewItem")]
        public async Task<ActionResult<SchoolTreeviewItemResponseDto>> GetTransportConsumerTreeViewItem([FromBody] StoppageConsumerTreeviewRequestDto RequestDto)
        {
            return Ok(await _transportService.GetTransportConsumerTreeViewItem(RequestDto));
        }

        
        [HttpPost]
        [Route("SaveTransportConsumerList")]
        public async Task<ActionResult<CreateTransportConsumerResponse>> SaveTransportConsumerList([FromBody] ConsumerTransportMappingUpsertDto RequestDto)
        {
            RequestDto.UserId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            RequestDto.Consumers.ForEach(consumer =>
            {
                if (consumer.NgbFromDate != null && consumer.NgbFromDate.day > 0)
                {
                    consumer.FromDate = new DateTime(consumer.NgbFromDate.year, consumer.NgbFromDate.month, consumer.NgbFromDate.day);
                }
                if (consumer.NgbToDate != null && consumer.NgbToDate.day > 0)
                {
                    consumer.ToDate = new DateTime(consumer.NgbToDate.year, consumer.NgbToDate.month, consumer.NgbToDate.day);
                }
            });
            List<ConsumerTransportMappingDto> lstOverlappingConsumer = new List<ConsumerTransportMappingDto>();
            if (RequestDto.Consumers.Count > 0)
            {
                foreach (var consumer in RequestDto.Consumers)
                {
                    lstOverlappingConsumer =  await  ValidateOverlapExistingPeriod(consumer);
                }
            }

            if(lstOverlappingConsumer.Count > 0)
            {
                return Ok(new CreateTransportConsumerResponse { IsSuccess=false,lstOverlapPeriod=lstOverlappingConsumer });
            }
            await _transportService.SaveTransportConsumerList(RequestDto);

            try
            {
                var StudentList = RequestDto.Consumers.Where(x => x.RoleId == 5 && x.TransportConsumerStoppageMappingId==0).Select(x => x.ConsumerId).ToList();
                    if (StudentList.Count>0)
                    {
                        var allFCMUsers = await _userService.GetAllFCMTokenUsers(5, 0, 0, 0, string.Join(",", StudentList));
                        List<FCMNotificationUserDto> notificationUserDtos = new List<FCMNotificationUserDto>();
                        allFCMUsers.ForEach(user =>
                        {
                            try
                            {
                                var messageTitle = _config["FirebaseSetting:MessageTemplates:TransportAllocate_Student_Template:Title"];
                                var messageBody = _config["FirebaseSetting:MessageTemplates:TransportAllocate_Student_Template:Body"];

                                notificationUserDtos.Add(new FCMNotificationUserDto
                                {
                                    Title = messageTitle,
                                    Body = messageBody,
                                    Token = user.FCMToken,
                                    Data = new Dictionary<string, string>
                                    {
                                    }
                                });
                            }
                            catch (Exception)
                            {

                            }

                        });

                        await _firebaseNotificationSender.SendFcmNotificationAsync(notificationUserDtos);
                    }
            }
            catch (Exception)
            {

            }

            return Ok(new CreateTransportConsumerResponse());
        }



        [HttpPost]
        [Route("GetAllConsumerByStoppageId")]
        public async Task<ActionResult<ConsumerTransportMappingUpsertDto>> GetAllConsumerByStoppageId([FromBody]ConsumerByStoppageIdInputDto requestDto)
        {
            var consumerResult = await _transportService.GetAllConsumerByStoppageId(requestDto);
            consumerResult.Consumers.ForEach(consumer =>
            {
                if (consumer.FromDate != null && consumer.FromDate.Value.Day > 0)
                {
                    consumer.NgbFromDate = new SchoolNgbDateModel
                    {
                        year = consumer.FromDate.Value.Year,
                        month = consumer.FromDate.Value.Month,
                        day = consumer.FromDate.Value.Day
                    };
                    
                }
                if (consumer.ToDate != null && consumer.ToDate.Value.Day > 0)
                {
                    consumer.NgbToDate = new SchoolNgbDateModel
                    {
                        year = consumer.ToDate.Value.Year,
                        month = consumer.ToDate.Value.Month,
                        day = consumer.ToDate.Value.Day
                    };
                }
               
            });
            return Ok(consumerResult);
        }

        [HttpDelete]
        [Route("DeleteStoppageConsumer")]
        public async Task<ActionResult<ConsumerDeleteResposeDto>> DeleteStoppageConsumer(int TransportConsumerStoppageMappingId,int RoleId,int AcademicYearId)
        {
            var  userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            return Ok(await _transportService.DeleteStoppageConsumer(TransportConsumerStoppageMappingId, RoleId, AcademicYearId, userId));
        }

        private async Task<List<ConsumerTransportMappingDto>> ValidateOverlapExistingPeriod(ConsumerTransportMappingDto transportConsumer)
        {
            List<ConsumerTransportMappingDto> lstOverLappedPeriod = new List<ConsumerTransportMappingDto>();
            var lstExistingConsumerTransport = await _transportService.GetExistingTransportConsumerMapping(transportConsumer.TransportConsumerStoppageMappingId, transportConsumer.RoleId,transportConsumer.ConsumerId,transportConsumer.AcademicYearId);
            lstExistingConsumerTransport = lstExistingConsumerTransport.Where(x => x.TransportConsumerStoppageMappingId != transportConsumer.TransportConsumerStoppageMappingId).ToList();    
            foreach (var existingPeriod in lstExistingConsumerTransport)
            {
                if (existingPeriod.FromDate <= transportConsumer.ToDate
                    && existingPeriod.ToDate >= transportConsumer.FromDate && (existingPeriod.PickDropId == transportConsumer.PickDropId || transportConsumer.PickDropId == 3 || existingPeriod.PickDropId==3))
                {
                    lstOverLappedPeriod.Add(existingPeriod);
                }
            }
            return lstOverLappedPeriod;
        }

        [Authorize]
        [HttpGet("GetActiveTripForAdminSelect")]
        public async Task<ActionResult<ActiveTripResponseDto>> GetActiveTripForAdminSelect(short AcademicYearId)
        {

            var activeTripDetail = await _transportService.GetActiveTripForAdminSelect(AcademicYearId);
            return Ok(activeTripDetail);

        }

        [Authorize]
        [HttpGet]
        [Route("GetStoppageTrackForAdmin")]
        public async Task<ActionResult<StoppageTrackResponseLisDto>> GetStoppageTrackForAdmin(int AcademicYearId,int RouteId)
        {
            
            var result = await _transportService.GetStoppageTrackForAdmin(AcademicYearId, RouteId);
            return Ok(result);
        }


    }


}


    

