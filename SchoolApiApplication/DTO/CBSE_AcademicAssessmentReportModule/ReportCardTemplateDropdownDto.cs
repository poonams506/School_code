using SchoolApiApplication.DTO.TransportModule;

namespace SchoolApiApplication.DTO.CBSE_AcademicAssessmentReportModule
{
    public class ReportCardTemplateDropdownDto
    {
        public long ExamReportCardNameId { get; set; } = 0;
        public string ReportCardName { get; set; } = string.Empty;
    }

    public class ReportCardTempleteDropdownResponceDto
    {
        public List<ReportCardTemplateDropdownDto> ReportCardTemplateDropdownList { get; set; } = new List<ReportCardTemplateDropdownDto>();
    }
}