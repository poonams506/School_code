namespace SchoolApiApplication.DTO.GradeDivisionMatrixModule
{
    public class GradeDivisionMatrixDto
    {
        public int GradeId { get; set; }    
        public string GradeName { get; set; }=string.Empty;
        public List<int> DivisionId { get; set; }=new List<int>();
        public string GradeDivisions { get; set; } = string.Empty;
    }

    public class GradeDivisionMatrixDBDto
    {
        public int GradeId { get; set; }
        public int DivisionId { get; set; }
        public string GradeName { get; set; } =string.Empty;
    }
    public class GradeDivisionMatrixDeleteRespose
    {
        public int AffectedRows { get; set; }
    }

}
