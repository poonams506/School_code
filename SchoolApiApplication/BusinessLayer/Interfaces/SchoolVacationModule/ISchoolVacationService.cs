using SchoolApiApplication.DTO.SchoolVacationModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.SchoolVacationModule
{
    public interface ISchoolVacationService
    {
        public Task<DatatableResponseModel> SchoolVacationDetails(DatatableRequestWrapper requestObjectWrapper);
        public Task<int> UpdateSchoolVacation(SchoolVacationDto Obj, int UserId);
        public Task<SchoolVacationDto> GetSchoolVacationSelect(long? SchoolVacationId);
        public Task<int> SchoolVacationDelete(long? SchoolVacationId, int UserId);
    }
}
