using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.TeachingLoadAnalysisModule;

namespace SchoolApiApplication.DTO.Certificate_Module
{
    public class ViewLeavingCertificateDto
    {
       // public int? SerialNumber { get; set; }

        public string StudentName { get; set; } = string.Empty;
        public string GeneralRegistrationNo { get; set; } = string.Empty;
        public string Class { get; set; } = string.Empty;

        //public int GradeId { get; set; }
        //public int DivisionId { get; set; }

       // public int? LeavingCertificateAuditsId { get; set; }
        public int? StatusId { get; set; }

        public DateTime? DateOfLeavingTheSchool { get; set; }

      //  public SchoolNgbDateModel? ngbDateOfLeavingTheSchooll { get; set; }

        public DateTime? DateSignCurrent { get; set; }


       // public SchoolNgbDateModel? ngbDateSignCurrent { get; set; }


        public DateTime? CreatedDate { get; set; }
       // public SchoolNgbDateModel? ngbCreatedDate { get; set; }



    }


}
