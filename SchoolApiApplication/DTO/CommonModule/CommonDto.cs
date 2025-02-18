using SchoolApiApplication.DTO.MasterModule;

namespace SchoolApiApplication.DTO.CommonModule
{
    public class SchoolNgbDateModel
    {
        public int year { get; set; }
        public int month { get; set; }
        public int day { get; set; }

    }

    public class SchoolNgbTimeModel
    {
        public int hour { get; set; }
        public int minute { get; set; }
        public int second { get; set; }

    }


    public class CommonDivisionWithDisabled
    {
        public int? DivisionId { get; set; }
        public string? DivisionName { get; set; }
        public bool Disabled { get; set; }
    }

    public class SchoolGradeDivisionMatrixWithDisabledDto
    {
        public int? SchoolGradeDivisionMatrixId { get; set; }
        public string ClassName { get; set; } = string.Empty;

        public int? GradeId { get; set; }
        public int? DivisionId { get; set; }
        public bool? IsAlreadyExist { get; set; }
    }

    public class GradeDivisionWithDisabledCommonMasterDto
    {
        public List<SchoolGradeDivisionMatrixWithDisabledDto>? SchoolGradeDivisionMatrixCascadeList { get; set; }
        public List<Grade>? Grades { get; set; }
        public List<CommonDivisionWithDisabled>? Divisions { get; set; }

    }

    public class CommonImageFileDto
    {
        public string? LogoImageContentType { get; set; }
        public byte[]? ImageBytes { get; set; }

        public string? Base64LogoImage { get; set; }
        public bool IsSuccess { get; set; } = true;
    }
}
