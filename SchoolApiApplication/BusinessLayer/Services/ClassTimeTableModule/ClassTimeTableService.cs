using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.ClassTimeTableModule;
using SchoolApiApplication.DTO.ClassTimeTableModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.Repository.Interfaces.ClassTimeTableModule;

namespace SchoolApiApplication.BusinessLayer.Services.ClassTimeTableModule
{
    public class ClassTimeTableService : IClassTimeTableService
    {
        private readonly IClassTimeTableRepository _classTimeTableRepository;
        public ClassTimeTableService(IClassTimeTableRepository ClassTimeTableRepository)
        {
            _classTimeTableRepository = ClassTimeTableRepository;
        }


        public async Task<ClassTimeTableSelectResponseDto> GetClassTimeTable(int ClassId)
        {
            return await _classTimeTableRepository.GetClassTimeTable(ClassId);
        }

        public async Task<int> ClassTimeTableUpsert(ClassTimeTableDto classTimeTable)
        {
            return await _classTimeTableRepository.ClassTimeTableUpsert(classTimeTable);
        }

        public async Task<DatatableResponseModel> GetClassTimeTableList(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _classTimeTableRepository.GetClassTimeTableList(requestObjectWrapper);
        }

        public async Task<int> ClassTimeTableDelete(int ClassTimeTableId, int UserId)
        {
            return await _classTimeTableRepository.ClassTimeTableDelete(ClassTimeTableId, UserId);
        }

        public async Task<ClassTimeTableSelectResponseDto> GetTeacherClassTimeTable(TeacherClassTimeTableRequestDto RequestDto)
        {
            return await _classTimeTableRepository.GetTeacherClassTimeTable(RequestDto);
        }

        public async Task<ClassTimeTableSelectResponseDto> GetStudentClassTimeTable(StudentClassTimeTableRequestDto RequestDto)
        {
            return await _classTimeTableRepository.GetStudentClassTimeTable(RequestDto);
        }

       

        public async Task<int> MarkTimeTableActiveUpsert(MarkTimeTableActiveRequestModel requestModel)
        {
            return await _classTimeTableRepository.MarkTimeTableActiveUpsert(requestModel);
        }

        public async Task<ClassTimeTableDto> GetClassTimeTableById(int ClassTimeTableId)
        {
            return await _classTimeTableRepository.GetClassTimeTableById(ClassTimeTableId);

        }

    }
}
