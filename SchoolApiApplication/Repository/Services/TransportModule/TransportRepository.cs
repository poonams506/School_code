using Dapper;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using SchoolApiApplication.DTO.ParentAppModule;
using SchoolApiApplication.DTO.TransportModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.TransportModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.TransportModule
{
    public class TransportRepository : ITransportRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public TransportRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<DatatableResponseModel> GetAreaGridListSelect(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            String strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspTransportAreaGridSelect",
                     new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<AreaDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }

        public async Task<AreaDto> GetAreaSelect(long AreaId, int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AreaId", AreaId);
            parameters.Add("@AcademicYearId", AcademicYearId);
            return await db.QueryFirstOrDefaultAsync<AreaDto>("uspTransportAreaSelect", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<AreaDto> AreaUpsert(AreaDto Obj, int UserId,int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AreaId", Obj.AreaId);
            parameters.Add("@AreaName", Obj.AreaName);
            parameters.Add("@PickPrice", Obj.PickPrice);
            parameters.Add("@DropPrice", Obj.DropPrice);
            parameters.Add("@PickAndDropPrice", Obj.PickAndDropPrice);
            parameters.Add("@Description", Obj.Description);
            parameters.Add("@AcademicYearId",AcademicYearId);
            parameters.Add("@UserId", UserId);

            return await db.QueryFirstOrDefaultAsync<AreaDto>("uspTransportAreaUpsert", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<AreaDeleteRespose> AreaDelete(long AreaId, int AcademicYearId, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AreaId", AreaId);
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<AreaDeleteRespose>("uspTransportAreaDelete", parameters, commandType: CommandType.StoredProcedure);

        }
        public async Task<RouteListResponse> GetRouteGridListSelect(int AcademicYearId,string ConsumerName)
        {
            RouteListResponse routeListResponse =new  RouteListResponse();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@ConsumerName", ConsumerName);
            var routeList = await db.QueryAsync<RouteDto>("uspTransportRouteGridSelect", parameters, commandType: CommandType.StoredProcedure);
            if (routeList != null && routeList.Any())
            {
                foreach (var route in routeList)
                {
                    // Check if StartTime is not null before formatting
                    if (route.FirstPickUpTime.HasValue)
                    {
                        // Convert the start time to the desired format
                        route.FormattedFirstPickUpTime = route.FirstPickUpTime.Value.ToString("hh:mm tt");
                    }
                    if (route.LastPickUpTime.HasValue)
                    {
                        // Convert the start time to the desired format
                        route.FormattedLastPickUpTime = route.LastPickUpTime.Value.ToString("hh:mm tt");
                    }
                }
                routeListResponse.RouteList = routeList.ToList();
            }
            return routeListResponse;
        }

        public async Task<RouteDto> GetRouteSelect(long RouteId, int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@RouteId", RouteId);
            parameters.Add("@AcademicYearId", AcademicYearId);
            return await db.QueryFirstOrDefaultAsync<RouteDto>("uspTransportRouteSelect", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<RouteDto> RouteUpsert(RouteDto Obj, int UserId, int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@RouteId", Obj.RouteId);
            parameters.Add("@IsSharedVehicle", Obj.IsSharedVehicle);
            parameters.Add("@RouteName", Obj.RouteName);
            parameters.Add("@FirstPickUpTime", Obj.FirstPickUpTime);
            parameters.Add("@LastPickUpTime", Obj.LastPickUpTime);
            parameters.Add("@CoOrdinatorId", Obj.CoOrdinatorId);
            parameters.Add("@CoOrdinatorRoleId", Obj.CoOrdinatorRoleId);
            parameters.Add("@VehicleId", Obj.VehicleId);
            parameters.Add("@AcademicYearId",AcademicYearId);
            parameters.Add("@UserId", UserId);

            return await db.QueryFirstOrDefaultAsync<RouteDto>("uspTransportRouteUpsert", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<RouteDeleteRespose> RouteDelete(long RouteId, int AcademicYearId, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@RouteId", RouteId);
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<RouteDeleteRespose>("uspTransportRouteDelete", parameters, commandType: CommandType.StoredProcedure);

        }
        public async Task<StoppageListResponse> GetStoppageGridListSelect(StoppageGridInputDto requestDto)
        {
            StoppageListResponse stoppageListResponse = new StoppageListResponse();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", requestDto.AcademicYearId);
            parameters.Add("@RouteId", requestDto.RouteId);
            parameters.Add("@ConsumerName", requestDto.ConsumerName);
            var stoppageList = await db.QueryAsync<StoppageDto>("uspTransportStoppageGridSelect", parameters, commandType: CommandType.StoredProcedure);
            if (stoppageList != null && stoppageList.Any())
            {
                foreach (var stoppage in stoppageList)
                {
                    // Check if StartTime is not null before formatting
                    if (stoppage.PickUpTime.HasValue)
                    {
                        // Convert the start time to the desired format
                        stoppage.FormattedPickUpTime = stoppage.PickUpTime.Value.ToString("hh:mm tt");
                    }
                    if (stoppage.DropPickUpTime.HasValue)
                    {
                        // Convert the start time to the desired format
                        stoppage.FormattedDropPickUpTime = stoppage.DropPickUpTime.Value.ToString("hh:mm tt");
                    }
                }
                stoppageListResponse.StoppageList = stoppageList.ToList();
            }
            return stoppageListResponse;
        }

        public async Task<StoppageDto> GetStoppageSelect(long StoppageId, int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@StoppageId", StoppageId);
            parameters.Add("@AcademicYearId", AcademicYearId);
            return await db.QueryFirstOrDefaultAsync<StoppageDto>("uspTransportStoppageSelect", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<int> StoppageUpsert(StoppageDto Obj, int UserId, int AcademicYearId,long RouteId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@StoppageId", Obj.StoppageId);
            parameters.Add("@OrderNo", Obj.OrderNo);
            parameters.Add("@StoppageName", Obj.StoppageName);
            parameters.Add("@AreaId", Obj.AreaId);
            parameters.Add("@PickPrice", Obj.PickPrice);
            parameters.Add("@DropPrice", Obj.DropPrice);
            parameters.Add("@PickAndDropPrice", Obj.PickAndDropPrice);
            parameters.Add("@PickUpTime", Obj.PickUpTime);
            parameters.Add("@DropPickUpTime", Obj.DropPickUpTime);
            parameters.Add("@KiloMeter", Obj.KiloMeter);
            parameters.Add("@AcademicYearId",AcademicYearId);
            parameters.Add("@RouteId", RouteId);
            parameters.Add("@StopLat", Obj.StopLat);
            parameters.Add("@StopLng", Obj.StopLng);
            parameters.Add("@UserId", UserId);

            return await db.QueryFirstOrDefaultAsync<int>("uspTransportStoppageUpsert", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<StoppageDeleteRespose> StoppageDelete(long StoppageId, int AcademicYearId, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@StoppageId", StoppageId);
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<StoppageDeleteRespose>("uspTransportStoppageDelete", parameters, commandType: CommandType.StoredProcedure);

        }


        public async Task<DatatableResponseModel> GetVehicleList(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            string strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspSchoolVehicleGridSelect",
                    new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<VehicleDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }
        public async Task<VehicleDto> GetVehicleSelect(int VehicleId, int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@VehicleId", VehicleId);
            parameters.Add("@AcademicYearId", AcademicYearId);
            return await db.QueryFirstOrDefaultAsync<VehicleDto>("uspVehicleSelect", parameters, commandType: CommandType.StoredProcedure);
        }


        public async Task<int> VehicleUpsert(VehicleDto vehicleObj, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@VehicleId", vehicleObj.VehicleId);
            parameters.Add("@AcademicYearId", vehicleObj.AcademicYearId);
            parameters.Add("@VehicleNumber", vehicleObj.VehicleNumber);
            parameters.Add("@TotalSeats", vehicleObj.TotalSeats);
            parameters.Add("@RagistrationNumber", vehicleObj.RagistrationNumber);
            parameters.Add("@ChassisNumber", vehicleObj.ChassisNumber);
            parameters.Add("@OwnerName", vehicleObj.OwnerName);
            parameters.Add("@FinancerName", vehicleObj.FinancerName);
            parameters.Add("@EnginNumber", vehicleObj.EnginNumber);
            parameters.Add("@CompanyName", vehicleObj.CompanyName);
            parameters.Add("@TankCapacity", vehicleObj.TankCapacity);
            parameters.Add("@Model", vehicleObj.Model);
            parameters.Add("@Type", vehicleObj.Type);
            parameters.Add("@FuelType", vehicleObj.FuelType);
            parameters.Add("@CabDriverId", vehicleObj.CabDriverId);
            parameters.Add("@Conductor", vehicleObj.Conductor);
            parameters.Add("@DeviceId", vehicleObj.DeviceId);
            parameters.Add("@ProviderName", vehicleObj.ProviderName);
            parameters.Add("@VehicleDetailId", vehicleObj.VehicleDetailId);
            parameters.Add("@VehicleRegistrationStartDate", vehicleObj.VehicleRegistrationStartDate);
            parameters.Add("@VehicleRegistrationEndDate", vehicleObj.VehicleRegistrationEndDate);
            parameters.Add("@VehiclePermitStartDate", vehicleObj.VehiclePermitStartDate);
            parameters.Add("@VehiclePermitEndDate", vehicleObj.VehiclePermitEndDate);
            parameters.Add("@VehicleInsuranceStartDate", vehicleObj.VehicleInsuranceStartDate);
            parameters.Add("@VehicleInsuranceEndDate", vehicleObj.VehicleInsuranceEndDate);
            parameters.Add("@VehiclePollutionStartDate", vehicleObj.VehiclePollutionStartDate);
            parameters.Add("@VehiclePollutionEndDate", vehicleObj.VehiclePollutionEndDate);
            parameters.Add("@VehicleRoadTaxStartDate", vehicleObj.VehicleRoadTaxStartDate);
            parameters.Add("@VehicleRoadTaxEndDate", vehicleObj.VehicleRoadTaxEndDate);
            parameters.Add("@VehicleFitnessStartDate", vehicleObj.VehicleFitnessStartDate);
            parameters.Add("@VehicleFitnessEndDate", vehicleObj.VehicleFitnessEndDate);
            parameters.Add("@Description", vehicleObj.Description);
            parameters.Add("@IsActive", vehicleObj.IsActive);
            parameters.Add("@UserId", UserId);

            return await db.QueryFirstOrDefaultAsync<int>("uspVehicleUpsert", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<VehicleDeleteResposeDto> VehicleDelete(int VehicleId, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@VehicleId", VehicleId);

            var parameters2 = new DynamicParameters();
            parameters2.Add("@VehicleId", VehicleId);
            parameters2.Add("@UserId", UserId);
            var result = await db.QueryFirstOrDefaultAsync<VehicleDeleteResposeDto>("uspCheckVehicleExist", parameters, commandType: CommandType.StoredProcedure);
            if (result.VehicleCount==0 )
            {
                return await db.QueryFirstOrDefaultAsync<VehicleDeleteResposeDto>("uspVehicleDelete", parameters2, commandType: CommandType.StoredProcedure);
            }

            return result;
        }

        public async Task<DropdownResponseDto> GetCabdriverDropdown()
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var cabDriverDropdownList = await db.QueryAsync<CabDriverDropDownReasponseDto>("uspCabDriverDropdown", commandType: CommandType.StoredProcedure);
            DropdownResponseDto responseDto = new DropdownResponseDto();
            if (cabDriverDropdownList  != null && cabDriverDropdownList.Any())
            {
                responseDto.CabDriverDropdownList = cabDriverDropdownList.ToList();
            }
            return responseDto;
        }

        public async Task<DropdownResponseDto> GetAreaNameDropdown(int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            var areaNameDropdownList = await db.QueryAsync<AreaNameDropDownReasponseDto>("uspAreaNameDropdown", parameters, commandType: CommandType.StoredProcedure);
            DropdownResponseDto responseDto = new DropdownResponseDto();
            if (areaNameDropdownList  != null && areaNameDropdownList.Any())
            {
                responseDto.AreaNameDropdownList =areaNameDropdownList.ToList();
            }
            return responseDto;
        }


        public async Task<DropdownResponseDto> GetVehicleDropdown()
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var vehicleDropdownList = await db.QueryAsync<VehicleDropDownReasponseDto>("uspVehicleDropdown", commandType: CommandType.StoredProcedure);
            DropdownResponseDto responseDto = new DropdownResponseDto();
            if (vehicleDropdownList  != null && vehicleDropdownList.Any())
            {
                responseDto.VehicleDropdownList=vehicleDropdownList.ToList();
            }
            return responseDto;
        }

        public async Task<int> ActiveInActiveVehicle(ActiceInActiveVehicleDto activeRequest, int UserId)
        {

            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            var parameters = new DynamicParameters();
            parameters.Add("@VehicleId", activeRequest.VehicleId);
            parameters.Add("@IsActive", activeRequest.IsActive);
            parameters.Add("@UserId", UserId);


            return await db.ExecuteAsync("uspVehicleActiveInActive", parameters, commandType: CommandType.StoredProcedure);
        }


        public async Task<TransportStaffResponseDto> GetTransportStaffList()
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var lstTransportStaff= await db.QueryAsync<TransportStaffDto>("uspTransportStaffSelect", commandType: CommandType.StoredProcedure);
            return new TransportStaffResponseDto { TransportStaffList = lstTransportStaff.ToList() };
        }

        public async Task<SchoolTreeviewItemResponseDto> GetTransportConsumerTreeViewItem(StoppageConsumerTreeviewRequestDto RequestDto)
        {
         using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                SchoolTreeviewItemResponseDto response = new SchoolTreeviewItemResponseDto();
                using (var multi = await connection.QueryMultipleAsync("uspTransportConsumerSelect",
                      new { RequestDto.AcademicYearId, RequestDto.RoleId, RequestDto.StoppageId },
                     commandType: CommandType.StoredProcedure))
                {
                   var LstConsumer = multi.Read<TransportConsumerDto>().ToList();

                    if (RequestDto.RoleId != 5)
                    {
                        response.LstConsumerTreeviewItem.Add(new SchoolTreeviewItem
                        {
                            Text = GetRoleNameById(RequestDto.RoleId),
                            Value = RequestDto.RoleId,
                            IsFeeApplicableToStaff = LstConsumer[0].IsFeeApplicableToStaff,
                            Children = LstConsumer.Select(x => new SchoolTreeviewItem
                            {
                                Text = x.UserName,
                                Value = x.UserId

                            }).ToList()
                        });
                    }
                    else
                    {

                        var studentTreeView = new SchoolTreeviewItem
                        {
                            Text = "Student",
                            Value = RequestDto.RoleId,
                            IsFeeApplicableToStaff = LstConsumer[0].IsFeeApplicableToStaff,
                            Children = new List<SchoolTreeviewItem>()
                        };

                        var lstClasses = LstConsumer.Where(x => x.ClassId != null)
                            .Select(x => x.ClassId)
                            .Distinct()
                            .ToList();
                        foreach (var classId in lstClasses)
                        {
                            studentTreeView.Children.Add(new SchoolTreeviewItem
                            {
                                Text = LstConsumer.First(x => x.ClassId == classId).ClassName,
                                Value = classId.Value,
                                Children = LstConsumer.Where(x => x.ClassId == classId).Select(x => new SchoolTreeviewItem
                                {
                                    Text = x.UserName,
                                    Value = x.UserId
                                }).ToList()
                            });
                        }
                        response.LstConsumerTreeviewItem.Add(studentTreeView);
                    }
                    

                   
                    return response;
                }
            }
           
        }

      

        public async  Task<int> SaveTransportConsumerList(ConsumerTransportMappingUpsertDto RequestDto)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            DataTable consumerTransport = new();
            consumerTransport.Columns.Add(nameof(ConsumerTransportMappingDto.TransportConsumerStoppageMappingId), typeof(int));
            consumerTransport.Columns.Add(nameof(ConsumerTransportMappingDto.RoleId), typeof(int));
            consumerTransport.Columns.Add(nameof(ConsumerTransportMappingDto.ConsumerId), typeof(int));
            consumerTransport.Columns.Add(nameof(ConsumerTransportMappingDto.StoppageId), typeof(long));
            consumerTransport.Columns.Add(nameof(ConsumerTransportMappingDto.AcademicYearId), typeof(int));
            consumerTransport.Columns.Add(nameof(ConsumerTransportMappingDto.FromDate), typeof(DateTime));
            consumerTransport.Columns.Add(nameof(ConsumerTransportMappingDto.ToDate), typeof(DateTime));
            consumerTransport.Columns.Add(nameof(ConsumerTransportMappingDto.PickDropId), typeof(int));
            consumerTransport.Columns.Add(nameof(ConsumerTransportMappingDto.PickDropPrice), typeof(float));
            RequestDto.Consumers.ForEach(consumer =>
            {
                var row = consumerTransport.NewRow();
                row[nameof(ConsumerTransportMappingDto.TransportConsumerStoppageMappingId)] = consumer.TransportConsumerStoppageMappingId;
                row[nameof(ConsumerTransportMappingDto.RoleId)] = consumer.RoleId;
                row[nameof(ConsumerTransportMappingDto.ConsumerId)] = consumer.ConsumerId;
                row[nameof(ConsumerTransportMappingDto.StoppageId)] = consumer.StoppageId;
                row[nameof(ConsumerTransportMappingDto.AcademicYearId)] = consumer.AcademicYearId;
                row[nameof(ConsumerTransportMappingDto.FromDate)] = consumer.FromDate;
                row[nameof(ConsumerTransportMappingDto.ToDate)] = consumer.ToDate;
                row[nameof(ConsumerTransportMappingDto.PickDropId)] = consumer.PickDropId;
                row[nameof(ConsumerTransportMappingDto.PickDropPrice)] = consumer.PickDropPrice;

                consumerTransport.Rows.Add(row);
            });

            var parameters = new DynamicParameters();
            parameters.Add("@Consumers", consumerTransport.AsTableValuedParameter("[dbo].[TransportConsumerType]"));
            parameters.Add("@UserId", RequestDto.UserId);

            return await db.ExecuteAsync("uspConsumerTransportMappingUpsert", parameters, commandType: CommandType.StoredProcedure);

        }

        public async Task<ConsumerTransportMappingUpsertDto> GetAllConsumerByStoppageId(ConsumerByStoppageIdInputDto requestDto)
        {
            ConsumerTransportMappingUpsertDto result = new ConsumerTransportMappingUpsertDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", requestDto.AcademicYearId);
            parameters.Add("@StoppageId", requestDto.StoppageId);
            parameters.Add("@ConsumerName", requestDto.ConsumerName);

            var lstMapping = await db.QueryAsync<ConsumerTransportMappingDto>("uspConsumerMappingSelectByStoppageId", parameters, commandType: CommandType.StoredProcedure);
            result.Consumers = lstMapping.ToList();
            return result;
        }

       public async Task<ConsumerDeleteResposeDto> DeleteStoppageConsumer(int TransportConsumerStoppageMappingId,int RoleId,int AcademicYearId,int UserId)
       {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@TransportConsumerStoppageMappingId", TransportConsumerStoppageMappingId);
            parameters.Add("@RoleId", RoleId);
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<ConsumerDeleteResposeDto>("uspTransportConsumerMappingDelete", parameters, commandType: CommandType.StoredProcedure);

       }

       public async  Task<List<ConsumerTransportMappingDto>> GetExistingTransportConsumerMapping(int TransportConsumerStoppageMappingId, int RoleId, int ConsumerId, short AcademicYearId)
       {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@TransportConsumerStoppageMappingId", TransportConsumerStoppageMappingId);
            parameters.Add("@RoleId", RoleId);
            parameters.Add("@ConsumerId", ConsumerId);
            parameters.Add("@AcademicYearId", AcademicYearId);
            var existingConsumers= await db.QueryAsync<ConsumerTransportMappingDto>("uspExistingTransportConsumerSelect", parameters, commandType: CommandType.StoredProcedure);
            return existingConsumers.ToList();
        }



        private string GetRoleNameById(int RoleId)
        {
            switch (RoleId)
            {
                case 3: return "Teacher";
                case 2: return "Admin";
                case 4: return "Clerk";
                case 6: return "Cab Driver";
                case 5: return "Student";
            }
            return string.Empty;
        }


        public async Task<ActiveTripResponseDto> GetActiveTripForAdminSelect(short AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            var ActiveTripList = await db.QueryAsync<ActiveTripDto>("uspCabDriveActiveTripforAdminSelect", parameters, commandType: CommandType.StoredProcedure);
            ActiveTripResponseDto responseDto = new ActiveTripResponseDto();
            if (ActiveTripList != null && ActiveTripList.Any())
            {
                responseDto.ActiveTripList = ActiveTripList.ToList();
            }
            return responseDto;

        }

        public async Task<StoppageTrackResponseLisDto> GetStoppageTrackForAdmin(int AcademicYearId,int RouteId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@RouteId", RouteId);
            parameters.Add("@AcademicYearId", AcademicYearId);
            var StoppageTrackResponseList = await db.QueryAsync<StoppageLatLngDto>("uspStoppageLatLagSelectForAdmin", parameters, commandType: CommandType.StoredProcedure);
            StoppageTrackResponseLisDto responseDto = new StoppageTrackResponseLisDto();
            if (StoppageTrackResponseList != null && StoppageTrackResponseList.Any())
            {
                responseDto.StoppageTrackResponseList = StoppageTrackResponseList.ToList();
            }
            return responseDto;
        }
    }
}

