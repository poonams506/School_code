public class DatatableResponseModel
{
    public Object? data { get; set; }
    public int draw { get; set; }
    public int recordsFiltered { get; set; } 
    public int recordsTotal { get; set; }

}