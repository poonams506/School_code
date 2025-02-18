using DocumentFormat.OpenXml.Spreadsheet;
using SchoolApiApplication.BusinessLayer.Interfaces.CBSE_ExamModule;
using SchoolApiApplication.DTO.CBSE_ExamModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.Repository.Interfaces.CBSE_ExamModule;
using SchoolApiApplication.Repository.Interfaces.GalleryModule;
using SchoolApiApplication.Repository.Services.GalleryModule;


namespace SchoolApiApplication.BusinessLayer.Services.CBSE_ExamModule
{ 
    public class CBSE_ExamObjectService : ICBSE_ExamObjectService
    {
        private readonly ICBSE_ExamObjectRepository _examObjectRepository;

        public CBSE_ExamObjectService(ICBSE_ExamObjectRepository examObjectRepository)
        {
            _examObjectRepository = examObjectRepository;
        }

        public async Task<ExamObjectDeleteRespose> CBSE_ExamObjectDelete(long? ExamMasterId, long SubjectMasterId, int AcademicYearId, int UserId)
        {
            return await _examObjectRepository.CBSE_ExamObjectDelete(ExamMasterId, SubjectMasterId, AcademicYearId, UserId);
        }

        public async Task<DatatableResponseModel> CBSE_ExamObjectGridSelect(DatatableRequestWrapper requestObjectWrapper, int userId)
        {
            return await _examObjectRepository.CBSE_ExamObjectGridSelect(requestObjectWrapper, userId);
        }


        public async Task<ExamMasterDeleteResponceDto> CBSE_ExamMasterDelete(long? ExamMasterId, int UserId)
        {
            return await _examObjectRepository.CBSE_ExamMasterDelete(ExamMasterId, UserId);
        }

        public async Task<DatatableResponseModel> CBSE_ExamMasterGridSelect(DatatableRequestWrapper requestObjectWrapper, int userId)
        {
            return await _examObjectRepository.CBSE_ExamMasterGridSelect(requestObjectWrapper, userId);
        }

        public async Task<CBSE_ExamMasterDto> CBSE_ExamMasterSelect(int ExamMasterId)
        {
            return await _examObjectRepository.CBSE_ExamMasterSelect(ExamMasterId);
        }

        public async Task<int> CBSE_ExamMasterUpsert(CBSE_ExamMasterDto obj, int UserId, int AcademicYearId)
        {
            return await _examObjectRepository.CBSE_ExamMasterUpsert(obj, UserId, AcademicYearId);
        }


        public async Task<int> CBSE_ClassExamMappingDelete(long? examMasterId, int academicYearId, int gradeId, int divisionId)
        {
            return await _examObjectRepository.CBSE_ClassExamMappingDelete(examMasterId, academicYearId, gradeId, divisionId);
        }

        public async Task<DatatableResponseModel> CBSE_ClassExamMappingGridSelect(DatatableRequestWrapper requestObjectWrapper, int userId)
        {
            return await _examObjectRepository.CBSE_ClassExamMappingGridSelect(requestObjectWrapper, userId);
        }

        public async Task<CBSE_ClassExamMappingDto> CBSE_ClassExamMappingSelect(int ClassExamMappingId)
        {
            return await _examObjectRepository.CBSE_ClassExamMappingSelect(ClassExamMappingId);

        }

        public async Task<int> CBSE_ClassExamMappingUpsert(CBSE_ClassExamMappingDto obj, int UserId, int academicYearId, int examMasterId)
        {
            return await _examObjectRepository.CBSE_ClassExamMappingUpsert(obj, UserId, academicYearId, examMasterId);
        }

        public async Task<CBSE_ExamNameResponseDto> CBSE_ExamNameSelect(int AcademicYearId)
        {
            return await _examObjectRepository.CBSE_ExamNameSelect(AcademicYearId);
        }

        public async Task<CBSE_ExamObjectDto> CBSE_ExamObjectSelect(long ExamMasterId, int SubjectMasterId, int AcademicYearId)
        {
            return await _examObjectRepository.CBSE_ExamObjectSelect(ExamMasterId, SubjectMasterId, AcademicYearId);
        }

        public async Task<ExamObjectExistResponseDto> CBSE_ExamObjectUpsert(CBSE_ExamObjectDto obj, int UserId)
        {
            return await _examObjectRepository.CBSE_ExamObjectUpsert(obj, UserId);
        }

        public async Task<CBSE_ResponseDto> CBSE_ExamTypeNameSelect()
        {
            return await _examObjectRepository.CBSE_ExamTypeNameSelect();
        }

        public async Task<CBSE_ResponseDto> CBSE_TermNameSelect()
        {
            return await _examObjectRepository.CBSE_TermNameSelect();
        }

        public async Task<MarksGradeRelationDeleteRespose> CBSE_MarksGradeRelationDelete(long MarksGradeRelationId, int userId)
        {
            return await _examObjectRepository.CBSE_MarksGradeRelationDelete(MarksGradeRelationId, userId);
        }

        public async Task<DatatableResponseModel> CBSE_MarksGradeRelationGridSelect(DatatableRequestWrapper requestObjectWrapper, int userId)
        {
            return await _examObjectRepository.CBSE_MarksGradeRelationGridSelect(requestObjectWrapper, userId);
        }

        public async Task<CBSE_MarksGradeRelationDto> CBSE_MarksGradeRelationSelect(long MarksGradeRelationId)
        {
            return await _examObjectRepository.CBSE_MarksGradeRelationSelect(MarksGradeRelationId);
        }

        public async Task<int> CBSE_MarksGradeRelationUpsert(CBSE_MarksGradeRelationDto obj, int UserId, int AcademicYearId)
        {
            return await _examObjectRepository.CBSE_MarksGradeRelationUpsert(obj, UserId , AcademicYearId);
        }

        public async Task<int> PublishUnpublishExamObjectParticular(PublishUnpublishExamObjectDto publishRequest, int UserId)
        {
            return await _examObjectRepository.PublishUnpublishExamObjectParticular(publishRequest, UserId);
        }

        public async Task<ExamObjectDeleteResponseDto> CBSE_ObjectDelete(ExamObjectDeleteRequestDto obj, int UserId)
        {
            return await _examObjectRepository.CBSE_ObjectDelete(obj, UserId);
        }
    }
}
