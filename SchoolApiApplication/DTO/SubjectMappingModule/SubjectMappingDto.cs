using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.MasterModule;

namespace SchoolApiApplication.DTO.SubjectMappingModule
{
    public class SubjectMappingDto
    {
        public int ClassId { get; set; }

        public int SubjectMappingId { get; set; } = 0;
        public int AcademicYearId { get; set; } = 0;
        public int GradeId { get; set; } = 0;
        public int DivisionId { get; set; } = 0;
        public bool Status { get; set; } 
        public string ClassName { get; set; } = string.Empty;
        public string SubjectMasterIds { get; set; } = string.Empty;
        public int UserId { get; set; } = 0;
        public List<int> SubjectList { get; set; } = new List<int>();
        public List<SubjectMasterDropdownDto> SubjectDropdownList { get; set; } = new List<SubjectMasterDropdownDto>();

    }
    public class SubjectMappingTypeDto
    {
        public int SubjectMasterId { get; set; } = 0;
    }
    public class SubjectMasterDropdownDto
    {
        public int SubjectMasterId { get; set; } = 0;
        public string SubjectName { get; set; } = string.Empty;

    }

    public class SubjectExistResposeDto
    {
        public string SubjectName { get; set; } = string.Empty;
        public int? ExistsInHomeWork { get; set; }
        public int? ExistsInClassTimeTable { get; set; }
        public int Success { get; set; } = 0;
    }

    public class SubjectMappingUpsertDto
    {
        public List<SubjectExistResposeDto> SubjectExistResposeList { get; set; } = new List<SubjectExistResposeDto>();
    }


    public class SubjectIndexNumberDetailsDto
    {
        public int AcademicYearId { get; set; } = 0;

        public int GradeId { get; set; } = 0;
        public string GradeName { get; set; } = string.Empty;
        public int DivisionId { get; set; } = 0;
        public string DivisionName { get; set; } = string.Empty;
      //  public int SubjectMappingId { get; set; } = 0;

        public int? UserId { get; set; } = 0;
        public List<SubjectMasterIndexTypeDto> SubjectMasterIndexList { get; set; } = new List<SubjectMasterIndexTypeDto>();
    }
    public class SubjectMasterIndexTypeDto
    {
        public int SubjectMasterId { get; set; } = 0;

        public int IndexNumber { get; set; } = 0;

        public string SubjectName { get; set; } = string.Empty;


    }

    public class UpsertSubjectIndexNumberDetailsDto
    {
         public long SubjectMappingId { get; set; }
        public int GradeId { get; set; } = 0;
        public int DivisionId { get; set; } = 0;

        public short AcademicYearId { get; set; }
        public int UserId { get; set; }
        public List<SubjectMasterIndexTypeDto> SubjectIndexNumbersListUpsert { get; set; } = new List<SubjectMasterIndexTypeDto>();

    }

    public class DuplicateCheckResultResponswDto
    {
        public long SubjectMasterId { get; set; }
        public int IndexNumber { get; set; }
        public string SubjectName { get; set; } = string.Empty;

        public int IsDuplicate { get; set; }
    }

    public class SubjectMappingCloneDto
    {
        public int FromClassId { get; set; }
        public string FromClassName { get; set; } = string.Empty;

        public List<int> ToClassId { get; set; } = new List<int>();
        public int AcademicYearId { get; set; } = 0;


    }

    







}
