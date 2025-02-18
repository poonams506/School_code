using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.DTO.ClassTimeTableModule;

namespace SchoolApiApplication.Repository.Interfaces.ClassTimeTableModule
{
    public interface IClassTimeTableRepository
    {
        Task<ClassTimeTableSelectResponseDto> GetClassTimeTable(int ClassId);
        Task<int> ClassTimeTableUpsert(ClassTimeTableDto classTimeTable);
        Task<DatatableResponseModel> GetClassTimeTableList(DatatableRequestWrapper requestObjectWrapper);
        Task<int> ClassTimeTableDelete(int ClassTimeTableId, int UserId);
        Task<ClassTimeTableSelectResponseDto> GetTeacherClassTimeTable(TeacherClassTimeTableRequestDto RequestDto);
        Task<ClassTimeTableSelectResponseDto> GetStudentClassTimeTable(StudentClassTimeTableRequestDto RequestDto);
       
        Task<int> MarkTimeTableActiveUpsert(MarkTimeTableActiveRequestModel requestModel);
        Task<ClassTimeTableDto> GetClassTimeTableById(int ClassTimeTableId);
    }
}
