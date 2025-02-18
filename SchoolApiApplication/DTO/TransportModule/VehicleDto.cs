using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.SchoolModule;

namespace SchoolApiApplication.DTO.TransportModule
{
    public class VehicleDto
    {
        public int? VehicleId { get; set; }
        public int? AcademicYearId { get; set; }
        public string VehicleNumber { get; set; } = string.Empty;
        public int? TotalSeats { get; set; }
        public string RagistrationNumber { get; set; } = string.Empty;
        public string ChassisNumber { get; set; } = string.Empty;
        public string OwnerName { get; set; } = string.Empty;
        public string FinancerName { get; set; } = string.Empty;
        public string EnginNumber { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public string TankCapacity { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string FuelType { get; set; } = string.Empty;
        public string CabDriverName { get; set; } = string.Empty;
        public int? CabDriverId { get; set; }
        public string Conductor { get; set; } = string.Empty;
        public string DeviceId { get; set; } = string.Empty;
        public string ProviderName { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        public string Status { get; set; } = string.Empty;
        public int? VehicleDetailId { get; set; }
        public DateTime? VehicleRegistrationStartDate { get; set; }
        public SchoolNgbDateModel? ngbVehicleRegistrationStartDate { get; set; }
        public DateTime? VehicleRegistrationEndDate { get; set; }
        public SchoolNgbDateModel? ngbVehicleRegistrationEndDate { get; set; }
        public DateTime? VehiclePermitStartDate { get; set; }
        public SchoolNgbDateModel? ngbVehiclePermitStartDate { get; set; }
        public DateTime? VehiclePermitEndDate { get; set; }
        public SchoolNgbDateModel? ngbVehiclePermitEndDate { get; set; }
        public DateTime? VehicleInsuranceStartDate { get; set; } 
        public SchoolNgbDateModel? ngbVehicleInsuranceStartDate { get; set; }
        public DateTime? VehicleInsuranceEndDate { get; set; }
        public SchoolNgbDateModel? ngbVehicleInsuranceEndDate { get; set; }
        public DateTime? VehiclePollutionStartDate { get; set; }
        public SchoolNgbDateModel? ngbVehiclePollutionStartDate { get; set; }
        public DateTime? VehiclePollutionEndDate { get; set; }
        public SchoolNgbDateModel? ngbVehiclePollutionEndDate { get; set; }
        public DateTime? VehicleRoadTaxStartDate { get; set; }
        public SchoolNgbDateModel? ngbVehicleRoadTaxStartDate { get; set; }
        public DateTime? VehicleRoadTaxEndDate { get; set; } 
        public SchoolNgbDateModel? ngbVehicleRoadTaxEndDate { get; set; }
        public DateTime? VehicleFitnessStartDate { get; set; }
        public SchoolNgbDateModel? ngbVehicleFitnessStartDate { get; set; }
        public DateTime? VehicleFitnessEndDate { get; set; } 
        public SchoolNgbDateModel? ngbVehicleFitnessEndDate { get; set; }
        public string? Description { get; set; }
        public int UserId { get; set; }

        
    }

    public class CabDriverDropDownReasponseDto
    {
        public int CabDriverId { get; set; }
        public string CabDriverName { get; set; } = string.Empty;
    }
    public class AreaNameDropDownReasponseDto
    {
        public int AreaId { get; set; }
        public string AreaName { get; set; } = string.Empty;
    }

    public class VehicleDropDownReasponseDto
    {
        public int VehicleId { get; set; }
        public string VehicleNumber { get; set; } = string.Empty;
        public string RagistrationNumber { get; set; } = string.Empty;
    }
    public class DropdownResponseDto
    {
        public List<CabDriverDropDownReasponseDto> CabDriverDropdownList { get; set; } = new List<CabDriverDropDownReasponseDto>();
        public List<AreaNameDropDownReasponseDto> AreaNameDropdownList { get; set; } = new List<AreaNameDropDownReasponseDto>();
        public List<VehicleDropDownReasponseDto> VehicleDropdownList { get; set; } = new List<VehicleDropDownReasponseDto>();
    }
    public class ActiceInActiveVehicleDto
    {
        public int? VehicleId { get; set; }
        public bool IsActive { get; set; }

    }

    public class TransportStaffResponseDto
    {
        public List<TransportStaffDto> TransportStaffList { get; set; } = new List<TransportStaffDto>();
    }

    public class TransportStaffDto
    {
        public string StaffId { get; set; } = string.Empty;
        public string StaffName { get; set; } = string.Empty;
    }

    public class TransportConsumerDto
    {
        public int RoleId { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public int? ClassId { get; set; }

        public string ClassName { get; set; }= string.Empty;
        public bool IsFeeApplicableToStaff { get; set; } = false;
    }

    public class StoppageConsumerTreeviewRequestDto
    {
        public int StoppageId { get; set; }
        public short AcademicYearId { get; set; }
        public int RoleId { get; set; }
    }

    public class SchoolTreeviewItemResponseDto
    {
        public List<SchoolTreeviewItem> LstConsumerTreeviewItem { get; set; }
        = new List<SchoolTreeviewItem>();
    }

    public class SchoolTreeviewItem
    {
        public string Text { get; set; } = string.Empty;
        public int Value { get; set; }
        public bool Checked { get; set; } = false;
        public bool Collapsed { get; set; } = true;
        public bool IsFeeApplicableToStaff { get; set; }

        public List<SchoolTreeviewItem>? Children { get; set; }
    }
    public class ConsumerTransportMappingRequestDto
    {
        public int RoleId { get; set; }
        public short AcademicYearId { get; set; }
        public long StoppageId { get; set; }
        public List<int> LstSelectedConsumerId { get; set; } =new List<int>();
    }

    public class ConsumerTransportMappingUpsertDto
    {
        public int UserId { get; set; }
        public List<ConsumerTransportMappingDto> Consumers { get; set; } = new List<ConsumerTransportMappingDto>();
    }
    public class ConsumerTransportMappingDto
    {
        public int TransportConsumerStoppageMappingId { get; set; }
        public long StoppageId { get; set; } 
        public string StoppageName { get; set; }=string.Empty;
        public int RoleId { get; set; }
        public int ConsumerId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string RoleName { get; set; } = string.Empty;
        public SchoolNgbDateModel? NgbFromDate { get; set; }
        public DateTime? FromDate { get; set; }
        public SchoolNgbDateModel? NgbToDate { get; set; }
        public DateTime? ToDate { get; set; }
        public short AcademicYearId { get; set; }
        public short PickDropId { get; set; }
        public float PickDropPrice { get; set; }
        public bool IsFeePaymentAlreadyDone { get; set; }
    }

    public class CreateTransportConsumerResponse
    {
        public bool IsSuccess { get; set; } = true;
        public List<ConsumerTransportMappingDto> lstOverlapPeriod { get; set; } = new List<ConsumerTransportMappingDto>();
    }
    public class VehicleDeleteResposeDto
    {
        public int AffectedRows { get; set; }
        public int VehicleCount { get; set; }

    }
    public class ConsumerDeleteResposeDto
    {
        public int AffectedRows { get; set; }

    }

    public class ConsumerByStoppageIdInputDto
    {
        public int StoppageId { get; set; }

        public short AcademicYearId { get; set; }
        public string ConsumerName { get; set; } = string.Empty;
    }
}
