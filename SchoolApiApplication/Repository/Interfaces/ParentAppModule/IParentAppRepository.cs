using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.ParentAppModule;
using SchoolApiApplication.DTO.ParentAppModule.FeePayment;
using SchoolApiApplication.DTO.ParentModule;
using SchoolApiApplication.DTO.StudentAttendanceModule;

namespace SchoolApiApplication.Repository.Interfaces.ParentAppModule
{
    public interface IParentAppRepository
    {
        public Task<FeePaymentTopSectionDto> GetParentFeePaymentDetails(long studentId, int academicYearId);

        public Task<TransportFeePaymentTopSectionDto> GetParentTransportFeePaymentDetails(long studentId, int academicYearId);

        public Task<OneMonthEventParentAppResponseDto> OneMonthEventDetails(int academicYearId, int classId);

        public Task<TeacherOneDayLecturesParentAppResponseDto> TeacherOneDayLecturesParentDetails(int academicYearId, int classId, int dayNo);
     
        public Task<MissingAttendanceParentAppDto> AttendanceMissingParentDetails(int academicYearId, int StudentId);
   
        public Task<StudentGradeDivisionParentAppDto> StudentGradeDivisionSelect(int academicYearId, int parentId);

        public Task<SchoolParentCalendarResponseDto> GetParentAppListSelect(int academicYearId, int classId);

       public Task<StudentAttendanceMobileResponseDto> GetAttendanceDetailByStudentId(long StudentId, int AcademicYearId);

        public Task<VehicleTrackResponseDto> GetVehicleTrackListSelect(long StudentId, int AcademicYearId);

        public Task<StoppageTrackResponseDto> GetStoppageTrackListSelect(long StudentId, int AcademicYearId);
    }
}
