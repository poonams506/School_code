using SchoolApiApplication.BusinessLayer.Interfaces.HomeworkModule;
using SchoolApiApplication.DTO.HomeworkModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.ParentAppModule;
using SchoolApiApplication.Repository.Interfaces.HomeworkModule;

namespace SchoolApiApplication.BusinessLayer.Services.HomeworkModule
{
    public class HomeworkService : IHomeworkService
    {
        private readonly IHomeworkRepository _homeworkRepository;

        public HomeworkService(IHomeworkRepository homeworkRepository)
        {
            _homeworkRepository = homeworkRepository;
        }
        public async Task<DatatableResponseModel> GetHomeworkGridList(DatatableRequestWrapper requestObjectWrapper, int userId)
        {
            return await _homeworkRepository.GetHomeworkGridList(requestObjectWrapper, userId);
        }

        public async Task<HomeworkUpsertDto> HomeWorkSelect(long HomeworkId)
        {
            return await _homeworkRepository.HomeWorkSelect(HomeworkId);
        }

        public async Task<int> HomeWorkUpsert(HomeworkUpsertDto hwudObj, Int32 UserId)
        {
            return await _homeworkRepository.HomeWorkUpsert(hwudObj, UserId);
        }

        public async Task<int> HomeWorkDelete(long? HomeworkId, int UserId)
        {
            return await _homeworkRepository.HomeWorkDelete(HomeworkId, UserId);
        }

        public async Task<int> PublishUnpublishHomeworkParticular(PublishUnpublishHomeworkDto publishRequest, int UserId)
        {
            return await _homeworkRepository.PublishUnpublishHomeworkParticular(publishRequest, UserId);
        }

        public async Task<SubjectMappingDropdownResponseDto> GetSubjectMappingDropdown(short AcademicYearId, short GradeId, short DivisionId)
        {
            return await _homeworkRepository.GetSubjectMappingDropdown(AcademicYearId, GradeId, DivisionId);
        }

      public async  Task<ParentAppHomeworkResponseDto> GetAllHomeworkForStudent(ParentAppHomeworkRequestDto requestDto)
      {
            var lstHomework= await _homeworkRepository.GetAllHomeworkForStudent(requestDto);
            lstHomework.HomeworkList.ForEach(homework =>
            {
                if (homework.StartDate != null)
                {
                    homework.ngbStartDate = new DTO.CommonModule.SchoolNgbDateModel
                    {
                        day = homework.StartDate.Value.Day,
                        month = homework.StartDate.Value.Month,
                        year = homework.StartDate.Value.Year,

                    };
                }

                if (homework.EndDate != null)
                {
                    homework.ngbEndDate = new DTO.CommonModule.SchoolNgbDateModel
                    {
                        day = homework.EndDate.Value.Day,
                        month = homework.EndDate.Value.Month,
                        year = homework.EndDate.Value.Year,
                    };
                }
            });
            return lstHomework;
        }
    }
}
