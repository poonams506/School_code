using Microsoft.Extensions.Diagnostics.HealthChecks;
using SchoolApiApplication.DTO.MasterModule;

namespace SchoolApiApplication.DTO.FeeParticularModule
{
    public class FeeStructureDto
    {
        
        public long? AcademicYearId { get; set; } = 0;
        public int? GradeId { get; set; } = 0;
        public List<int> ClassId { get; set; } = new List<int>();

        public bool IsPublish { get; set; } = false;

        public string ClassName { get; set; } = string.Empty;

        public List<FeeParticularsDto>? FeeParticulars { get; set; }

        public List<int>? DivisionId { get; set; }

        public List<FeeWaiverDto>? FeeParticularWaiverMappings { get; set; }
        public string GradeName { get; set; }=string.Empty;
        public string DivisionName { get; set;} = string.Empty;
        public List<FeeWaiverDto>? InstallmentDetails { get; set; } = new List<FeeWaiverDto>();
    }

    public class FeeStructureGradeDivisionDBDto
    {
        public int? ClassId { get; set; }
        public int GradeId { get; set; }
        public int DivisionId { get; set; }
        public string GradeName { get; set; }=string.Empty;
        public string DivisionName { get; set; } = string.Empty;
        public string ClassName { get; set;} = string.Empty;
    }

    public class PublishUnpublishParticularDto
    {
        public int GradeId { get; set; }
        public int DivisionId { get; set; }

        public int AcademicYearId { get; set; }
        public bool IsPublish { get; set; }

    }

    public class FeeParticularCloneDto
    {
        public int FromClassId { get; set; }
        public string FromClassName { get; set; } = string.Empty;

        public List<int> ToClassId { get; set; }=new List<int>();
        public int AcademicYearId { get; set; } =0;


    }

    public class StudentKitFeeStructureDto
    {

        public long? AcademicYearId { get; set; } = 0;
        public int? GradeId { get; set; } = 0;
        public List<int> ClassId { get; set; } = new List<int>();

        public bool IsPublish { get; set; } = false;

        public string ClassName { get; set; } = string.Empty;

        public List<StudentKitFeeParticularsDto>? FeeParticulars { get; set; }

        public List<int>? DivisionId { get; set; }

        public string GradeName { get; set; } = string.Empty;
        public string DivisionName { get; set; } = string.Empty;
    }
}
