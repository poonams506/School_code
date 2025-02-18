using SchoolApiApplication.DTO.CommonModule;
using System.Collections.Generic;

public class Columns
{
    public string? data { get; set; }
    public string? name { get; set; }
    public bool searchable { get; set; }
    public bool orderable { get; set; }
    public Search? search { get; set; }

}
public class Order
{
    public int column { get; set; }
    public string? dir { get; set; }

}
public class Search
{
    public string? value { get; set; }
    public bool regex { get; set; }

}
public class DatatableRequestModel
{
    public int draw { get; set; }
    public List<Columns>? columns { get; set; }
    public List<Order>? order { get; set; }
    public int start { get; set; }
    public int length { get; set; }
    public Search? search { get; set; }
 

}
public class DatatableRequestWrapper
{
    public DatatableRequestModel? getListModel { get; set; }
    public int? academicYearId { get; set; }
    public int? noticeTypeTo { get; set; }
    public int? surveyTypeTo { get; set; }

    public int? galleryTypeTo { get; set; }

    public int? refId { get; set; }
    public int? roleId { get; set; }
    public int? gradeId { get; set; }
    public int? divisionId { get; set; }
    public int? subjectMasterId { get; set; }
    public int? examMasterId { get; set; }
    public List<int>? classIds { get; set; }
    public long? studentId { get; set; }
    public long? StudentEnquiryId { get; set; }
    public long? consumerId { get; set; }
    public int? transportConsumerStoppageMappingId { get; set; }
    public DateTime? fromDate { get; set; }
    public SchoolNgbDateModel? ngbfromDate { get; set; }
    public DateTime? tillDate { get; set; }
    public SchoolNgbDateModel? ngbtillDate { get; set; }
    public DateTime? takenOn { get; set; }
    public SchoolNgbDateModel? ngbtakenOn { get; set; }


}
