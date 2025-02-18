namespace SchoolApiApplication.DTO.ClassTimeTableModule
{
   
    public class ClassTimeTableListDto
    {
        public int ClassId { get; set; }
        public string ClassName { get; set; }=string.Empty;
        public bool SelectAllClass { get; set; }
        public List<int> LstActiveTimeTable { get; set; }=new List<int>();


        public List<TimeTableIsActiveSelectListItem> TimeTableIsActiveSelectList { get; set; }=new List<TimeTableIsActiveSelectListItem>(); 

        
        
    }
    public class TimeTableIsActiveSelectListItem
    {
        public int ClassId { get; set; }    
        public int ClassTimeTableId { get; set; }

        public string ClassTimeTableName { get; set; } = string.Empty;
        public bool IsActive { get; set; }
    }
}
