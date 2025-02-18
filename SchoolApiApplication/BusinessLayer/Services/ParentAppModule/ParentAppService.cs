using DocumentFormat.OpenXml.Bibliography;
using DocumentFormat.OpenXml.VariantTypes;
using SchoolApiApplication.BusinessLayer.Interfaces.ParentAppModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.ParentAppModule;
using SchoolApiApplication.DTO.ParentAppModule.FeePayment;
using SchoolApiApplication.DTO.StudentAttendanceModule;
using SchoolApiApplication.Repository.Interfaces.ParentAppModule;

namespace SchoolApiApplication.BusinessLayer.Services.ParentAppModule
{
    public class ParentAppService : IParentAppService
    {
        private readonly IParentAppRepository _parentAppRepository;
        public ParentAppService(IParentAppRepository parentAppRepository)
        {
            _parentAppRepository = parentAppRepository;
        }

        public async Task<MissingAttendanceParentAppDto> AttendanceMissingParentDetails(int academicYearId, int StudentId)
        {
            return await _parentAppRepository.AttendanceMissingParentDetails(academicYearId, StudentId);

        }

        public async Task<FeePaymentTopSectionDto> GetParentFeePaymentDetails(long studentId, int academicYearId)
        {
            return await _parentAppRepository.GetParentFeePaymentDetails(studentId,academicYearId);
        }

        public async Task<TransportFeePaymentTopSectionDto> GetParentTransportFeePaymentDetails(long studentId, int academicYearId)
        {
            return await _parentAppRepository.GetParentTransportFeePaymentDetails(studentId, academicYearId);
        }

        public async Task<OneMonthEventParentAppResponseDto> OneMonthEventDetails(int academicYearId, int classId)
        {
            return await _parentAppRepository.OneMonthEventDetails(academicYearId,classId);
        }

        public async Task<TeacherOneDayLecturesParentAppResponseDto> TeacherOneDayLecturesParentDetails(int academicYearId, int classId, int dayNo)
        {
            return await _parentAppRepository.TeacherOneDayLecturesParentDetails(academicYearId, classId, dayNo);
        }
        public async Task<StudentGradeDivisionParentAppDto> StudentGradeDivisionSelect(int academicYearId, int parentId)
        {
            return await _parentAppRepository.StudentGradeDivisionSelect(academicYearId, parentId);
        }

        public async Task<SchoolParentCalendarResponseDto> GetParentAppListSelect(int academicYearId, int classId)
        {
            return await _parentAppRepository.GetParentAppListSelect(academicYearId, classId);
        }
        public async Task<StudentAttendanceMobileResponseDto> GetAttendanceDetailByStudentId(long StudentId, int AcademicYearId)
        {
            return await _parentAppRepository.GetAttendanceDetailByStudentId(StudentId, AcademicYearId);

        }

        public async Task<VehicleTrackResponseDto> GetVehicleTrackListSelect(long StudentId, int AcademicYearId)
        {
            return await _parentAppRepository.GetVehicleTrackListSelect(StudentId, AcademicYearId);
        }

        public async Task<StoppageTrackResponseDto> GetStoppageTrackListSelect(long StudentId, int AcademicYearId)
        {
            return await _parentAppRepository.GetStoppageTrackListSelect(StudentId, AcademicYearId);

        }
    }
}
