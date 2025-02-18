using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using NLog;
using NLog.Web;
using SchoolApiApplication.BusinessLayer.Interfaces.AccessModule;
using SchoolApiApplication.BusinessLayer.Interfaces.AdminModule;
using SchoolApiApplication.BusinessLayer.Interfaces.CabDriverModule;
using SchoolApiApplication.BusinessLayer.Interfaces.ClassTimeTableModule;
using SchoolApiApplication.BusinessLayer.Interfaces.ClerkModule;
using SchoolApiApplication.BusinessLayer.Interfaces.DivisionModule;
using SchoolApiApplication.BusinessLayer.Interfaces.FeeParticularModule;
using SchoolApiApplication.BusinessLayer.Interfaces.FeePaymentModule;
using SchoolApiApplication.BusinessLayer.Interfaces.FeeWavierTypeModule;
using SchoolApiApplication.BusinessLayer.Interfaces.GradeDivisionMatrixModule;
using SchoolApiApplication.BusinessLayer.Interfaces.GradeModule;
using SchoolApiApplication.BusinessLayer.Interfaces.HomeworkModule;
using SchoolApiApplication.BusinessLayer.Interfaces.MasterModule;
using SchoolApiApplication.BusinessLayer.Interfaces.ParentModule;
using SchoolApiApplication.BusinessLayer.Interfaces.SchoolModule;
using SchoolApiApplication.BusinessLayer.Interfaces.StudentAttendanceModule;
using SchoolApiApplication.BusinessLayer.Interfaces.StudentDocumentModule;
using SchoolApiApplication.BusinessLayer.Interfaces.StudentModule;
using SchoolApiApplication.BusinessLayer.Interfaces.TeacherModule;
using SchoolApiApplication.BusinessLayer.Interfaces.UserModule;
using SchoolApiApplication.BusinessLayer.Services.AccessModule;
using SchoolApiApplication.BusinessLayer.Services.AdminModule;
using SchoolApiApplication.BusinessLayer.Services.CabDriverModule;
using SchoolApiApplication.BusinessLayer.Services.ClassTimeTableModule;
using SchoolApiApplication.BusinessLayer.Services.ClerkModule;
using SchoolApiApplication.BusinessLayer.Services.DivisionModule;
using SchoolApiApplication.BusinessLayer.Services.FeeParticularModule;
using SchoolApiApplication.BusinessLayer.Services.FeePaymentModule;
using SchoolApiApplication.BusinessLayer.Services.FeeWaiverTypeModule;
using SchoolApiApplication.BusinessLayer.Services.GradeDivisionMatrixModule;
using SchoolApiApplication.BusinessLayer.Services.GradeModule;
using SchoolApiApplication.BusinessLayer.Services.HomeworkModule;
using SchoolApiApplication.BusinessLayer.Services.MasterModule;
using SchoolApiApplication.BusinessLayer.Services.ParentModule;
using SchoolApiApplication.BusinessLayer.Services.SchoolModule;
using SchoolApiApplication.BusinessLayer.Services.StudentAttendanceModule;
using SchoolApiApplication.BusinessLayer.Services.StudentDocumentModule;
using SchoolApiApplication.BusinessLayer.Services.StudentModule;
using SchoolApiApplication.BusinessLayer.Services.TeacherModule;
using SchoolApiApplication.BusinessLayer.Services.UserModule;
using SchoolApiApplication.DTO.Options;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Helper.Implementations;
using SchoolApiApplication.Helper.Interfaces;
using SchoolApiApplication.Middleware;
using SchoolApiApplication.Repository.Interfaces.AccessModule;
using SchoolApiApplication.Repository.Interfaces.AdminModule;
using SchoolApiApplication.Repository.Interfaces.CabDriverModule;
using SchoolApiApplication.Repository.Interfaces.ClassTimeTableModule;
using SchoolApiApplication.Repository.Interfaces.ClerkModule;
using SchoolApiApplication.Repository.Interfaces.DivisionModule;
using SchoolApiApplication.Repository.Interfaces.FeeparticularModule;
using SchoolApiApplication.Repository.Interfaces.FeePaymentModule;
using SchoolApiApplication.Repository.Interfaces.FeeWavierTypeModule;
using SchoolApiApplication.Repository.Interfaces.GradeDivisionMatrixModule;
using SchoolApiApplication.Repository.Interfaces.GradeModule;
using SchoolApiApplication.Repository.Interfaces.HomeworkModule;
using SchoolApiApplication.Repository.Interfaces.MasterModule;
using SchoolApiApplication.Repository.Interfaces.ParentModule;
using SchoolApiApplication.Repository.Interfaces.SchoolModule;
using SchoolApiApplication.Repository.Interfaces.StudentAttendanceModule;
using SchoolApiApplication.Repository.Interfaces.StudentDocumentModule;
using SchoolApiApplication.Repository.Interfaces.StudentModule;
using SchoolApiApplication.Repository.Interfaces.TeacherModule;
using SchoolApiApplication.Repository.Interfaces.UserModule;
using SchoolApiApplication.Repository.Services.AccessModule;
using SchoolApiApplication.Repository.Services.AdminModule;
using SchoolApiApplication.Repository.Services.CabDriverModule;
using SchoolApiApplication.Repository.Services.ClassTimeTableModule;
using SchoolApiApplication.Repository.Services.ClerkModule;
using SchoolApiApplication.Repository.Services.DivisionModule;
using SchoolApiApplication.Repository.Services.FeeparticularModule;
using SchoolApiApplication.Repository.Services.FeePaymentModule;
using SchoolApiApplication.Repository.Services.FeeWavierTypeModule;
using SchoolApiApplication.Repository.Services.GradeModule;
using SchoolApiApplication.Repository.Services.HomeworkModule;
using SchoolApiApplication.Repository.Services.MasterModule;
using SchoolApiApplication.Repository.Services.ParentModule;
using SchoolApiApplication.Repository.Services.SchoolModule;
using SchoolApiApplication.Repository.Services.StudentAttendanceModuleModule;
using SchoolApiApplication.Repository.Services.StudentDocumentModule;
using SchoolApiApplication.Repository.Services.StudentModule;
using SchoolApiApplication.Repository.Services.TeacherModule;
using SchoolApiApplication.Repository.Services.UserModule;
using SchoolApiApplication.Repository.Services.DashBoardModule;
using System.Text;
using SchoolApiApplication.BusinessLayer.Interfaces.DashBoardModule;
using SchoolApiApplication.BusinessLayer.Services.DashBoardModule;
using SchoolApiApplication.Repository.Interfaces.DashBoardModule;
using SchoolApiApplication.BusinessLayer.Interfaces.CertificateModule;
using SchoolApiApplication.BusinessLayer.Services.CertificateModule;
using SchoolApiApplication.Repository.Interfaces.CertificateModule;
using SchoolApiApplication.Repository.Services.CertificateModule;
using SchoolApiApplication.BusinessLayer.Services.NoticeModule;
using SchoolApiApplication.BusinessLayer.Interfaces.NoticeModule;
using SchoolApiApplication.Repository.Interfaces.NoticeModule;
using SchoolApiApplication.Repository.Services.NoticeModule;
using SchoolApiApplication.BusinessLayer.Interfaces.ParentAppModule;
using SchoolApiApplication.Repository.Interfaces.ParentAppModule;
using SchoolApiApplication.BusinessLayer.Services.ParentAppModule;
using SchoolApiApplication.Repository.Services.ParentAppModule;
using SchoolApiApplication.Repository.Interfaces.TeacherAppModule;
using SchoolApiApplication.BusinessLayer.Interfaces.TeacherAppModule;
using SchoolApiApplication.BusinessLayer.Services.TeacherAppModule;
using SchoolApiApplication.Repository.Services.TeacherAppModule;
using SchoolApiApplication.BusinessLayer.Interfaces.PaymentAnalyticsModule;
using SchoolApiApplication.BusinessLayer.Services.PaymentAnalyticsModule;
using SchoolApiApplication.Repository.Interfaces.PaymentAnalytics;
using SchoolApiApplication.Repository.Services.PaymentAnalyticsModule;
using SchoolApiApplication.Repository.Services.StudentAttendanceModule;
using SchoolApiApplication.BusinessLayer.Interfaces.PromoteModule;
using SchoolApiApplication.BusinessLayer.Services.PromoteModule;
using SchoolApiApplication.Repository.Interfaces.PromoteModule;
using SchoolApiApplication.Repository.Services.PromoteModule;
using SchoolApiApplication.BusinessLayer.Interfaces.ImportModule;
using SchoolApiApplication.BusinessLayer.Services.ImportModule;
using SchoolApiApplication.Repository.Interfaces.ImportModule;
using SchoolApiApplication.Repository.Services.ImportModule;
using SchoolApiApplication.BusinessLayer.Interfaces.MobileAppModule;
using SchoolApiApplication.BusinessLayer.Services.MobileAppModule;
using SchoolApiApplication.Repository.Services.MobileAppModule;
using SchoolApiApplication.Repository.Interfaces.MobileAppModule;
using SchoolApiApplication.BusinessLayer.Interfaces.TeacherGradeDivisionMappingModule;
using SchoolApiApplication.BusinessLayer.Services.TeacherGradeDivisionMappingModule;
using SchoolApiApplication.Repository.Interfaces.TeacherGradeDivisionMappingModule;
using SchoolApiApplication.Repository.Services.TeacherGradeDivisionMappingModule;
using SchoolApiApplication.BusinessLayer.Interfaces.SchoolEventModule;
using SchoolApiApplication.Repository.Interfaces.SchoolEventModule;
using SchoolApiApplication.Repository.Services.SchoolEventModule;
using SchoolApiApplication.BusinessLayer.Services.SchoolEventModule;
using SchoolApiApplication.BusinessLayer.Interfaces.SchoolHolidayModule;
using SchoolApiApplication.Repository.Interfaces.SchoolHolidayModule;
using SchoolApiApplication.Repository.Services.SchoolHolidayModule;
using SchoolApiApplication.BusinessLayer.Services.SchoolHolidayModule;
using SchoolApiApplication.BusinessLayer.Interfaces.WeeklyDayOffModule;
using SchoolApiApplication.BusinessLayer.Services.WeeklyDayOffModule;
using SchoolApiApplication.Repository.Interfaces.WeeklyDayOffModule;
using SchoolApiApplication.Repository.Services.WeeklyDayOffModule;
using SchoolApiApplication.BusinessLayer.Interfaces.ExportModule;
using SchoolApiApplication.BusinessLayer.Services.ExportModule;
using SchoolApiApplication.Repository.Interfaces.ExportModule;
using SchoolApiApplication.Repository.Services.ExportModule;
using SchoolApiApplication.BusinessLayer.Interfaces.SubjectMasterModule;
using SchoolApiApplication.BusinessLayer.Services.SubjectMasterModule;
using SchoolApiApplication.Repository.Interfaces.SubjectMasterModule;
using SchoolApiApplication.Repository.Services.SubjectMasterModule;
using SchoolApiApplication.BusinessLayer.Interfaces.SchoolCalendarModule;
using SchoolApiApplication.Repository.Interfaces.StudentCalendarModule;
using SchoolApiApplication.Repository.Services.SchoolCalendarModule;
using SchoolApiApplication.BusinessLayer.Services.SchoolCalendarModule;
using SchoolApiApplication.BusinessLayer.Interfaces.SubjectMappingModule;
using SchoolApiApplication.BusinessLayer.Services.SubjectMappingModule;
using SchoolApiApplication.Repository.Interfaces.SubjectMappingModule;
using SchoolApiApplication.Repository.Services.SubjectMappingModule;
using SchoolApiApplication.BusinessLayer.Interfaces.SchoolMonthEventModule;
using SchoolApiApplication.BusinessLayer.Services.SchoolMonthEventModule;
using SchoolApiApplication.Repository.Interfaces.SchoolMonthEventModule;
using SchoolApiApplication.Repository.Services.SchoolMonthEventModule;
using SchoolApiApplication.BusinessLayer.Interfaces.TeacherSubjectMappingModule;
using SchoolApiApplication.BusinessLayer.Services.TeacherSubjectMappingModule;
using SchoolApiApplication.Repository.Interfaces.TeacherSubjectMappingModule;
using SchoolApiApplication.Repository.Services.TeacherSubjectMappingModule;
using SchoolApiApplication.BusinessLayer.Interfaces.ClassTeacherAttendanceModule;
using SchoolApiApplication.BusinessLayer.Services.ClassTeacherAttendanceModule;
using SchoolApiApplication.Repository.Interfaces.ClassTeacherAttendanceModule;
using SchoolApiApplication.Repository.Services.ClassTeacherAttendanceModule;
using SchoolApiApplication.BusinessLayer.Interfaces.SchoolVacationModule;
using SchoolApiApplication.BusinessLayer.Services.SchoolVacationModule;
using SchoolApiApplication.Repository.Interfaces.SchoolVacationModule;
using SchoolApiApplication.Repository.Services.SchoolVacationModule;
using SchoolApiApplication.BusinessLayer.Interfaces.TeacherCountPerSubjectAnalyzerModule;
using SchoolApiApplication.BusinessLayer.Services.TeacherCountPerSubjectAnalyzerModule;
using SchoolApiApplication.Repository.Interfaces.TeacherCountPerSubjectAnalyzerModule;
using SchoolApiApplication.Repository.Services.TeacherCountPerSubjectAnalyzerModule;
using Microsoft.AspNetCore.HttpOverrides;
using SchoolApiApplication.BusinessLayer.Interfaces.StorageModule;
using SchoolApiApplication.BusinessLayer.Services.StorageModule;
using SchoolApiApplication.BusinessLayer.Interfaces.TeacherOneDayLectureModule;
using SchoolApiApplication.BusinessLayer.Services.TeacherOneDayLectureModule;
using SchoolApiApplication.Repository.Interfaces.TeacherOneDayLectureModule;
using SchoolApiApplication.Repository.Services.TeacherOneDayLectureModule;
using SchoolApiApplication.BusinessLayer.Interfaces.TeachingLoadAnalysisModule;
using SchoolApiApplication.BusinessLayer.Services.TeachingLoadAnalysisModule;
using SchoolApiApplication.Repository.Interfaces.TeachingLoadAnalysisModule;
using SchoolApiApplication.Repository.Services.TeachingLoadAnalysisModule;
using SchoolApiApplication.BusinessLayer.Interfaces.AdhocFeePaymentModule;
using SchoolApiApplication.BusinessLayer.Services.AdhocFeePaymentModule;
using SchoolApiApplication.Repository.Interfaces.AdhocFeePaymentModule;
using SchoolApiApplication.Repository.Services.AdhocFeePaymentModule;
using SchoolApiApplication.BusinessLayer.Interfaces.AdhocParticularMasterModule;
using SchoolApiApplication.BusinessLayer.Services.AdhocParticularMasterModule;
using SchoolApiApplication.Repository.Interfaces.AdhocParticularMasterModule;
using SchoolApiApplication.Repository.Services.AdhocParticularMasterModule;
using SchoolApiApplication.BusinessLayer.Interfaces.SurveyModule;
using SchoolApiApplication.Repository.Interfaces.SurveyModule;
using SchoolApiApplication.Repository.Services.SurveyModule;
using SchoolApiApplication.BusinessLayer.Services.SurveyModule;
using SchoolApiApplication.BusinessLayer.Interfaces.ClassWiseTeacherAndStudentModule;
using SchoolApiApplication.BusinessLayer.Services.ClassWiseTeacherAndStudentModule;
using SchoolApiApplication.Repository.Interfaces.ClassWiseTeacherAndStudentModule;
using SchoolApiApplication.Repository.Services.ClassWiseTeacherAndStudentModule;
using SchoolApiApplication.BusinessLayer.Interfaces.TransportModule;
using SchoolApiApplication.BusinessLayer.Services.TransportModule;
using SchoolApiApplication.Repository.Interfaces.TransportModule;
using SchoolApiApplication.Repository.Services.TransportModule;
using SchoolApiApplication.BusinessLayer.Interfaces.TransportFeePaymentModule;
using SchoolApiApplication.BusinessLayer.Services.TransportFeePaymentModule;
using SchoolApiApplication.Repository.Interfaces.TransportFeePaymentModule;
using SchoolApiApplication.Repository.Services.TransportFeePaymentModule;
using SchoolApiApplication.BusinessLayer.Interfaces.TransportPaymentAnalyticsModule;
using SchoolApiApplication.BusinessLayer.Services.TransportPaymnetAnalyticsModule;
using SchoolApiApplication.Repository.Interfaces.TransportPaymentAnalyticsModule;
using SchoolApiApplication.Repository.Services.TransportPaymentAnalyticsModule;
using SchoolApiApplication.BusinessLayer.Interfaces.StudentKitFeePaymentModule;
using SchoolApiApplication.Repository.Interfaces.StudentKitFeePaymentModule;
using SchoolApiApplication.Repository.Services.StudentKitFeePaymentModule;
using SchoolApiApplication.BusinessLayer.Services.StudentKitFeePaymentModule;
using SchoolApiApplication.Repository.Interfaces.StudentKitPaymentAnalyticsModule;
using SchoolApiApplication.Repository.Services.StudentKitPaymentAnalyticsModule;
using SchoolApiApplication.BusinessLayer.Interfaces.StudentKitPaymentAnalyticsModule;
using SchoolApiApplication.BusinessLayer.Services.StudentKitPaymentAnalyticsModule;
using SchoolApiApplication.BusinessLayer.Interfaces.CadDriverAppModule;
using SchoolApiApplication.BusinessLayer.Services.CadDriverAppModule;
using SchoolApiApplication.Repository.Interfaces.CadDriverAppModule;
using SchoolApiApplication.Repository.Services.CadDriverAppModule;
using SchoolApiApplication.Repository.Services.StudentReportModule;
using SchoolApiApplication.Repository.Interfaces.StudentReportModule;
using SchoolApiApplication.BusinessLayer.Interfaces.StudentReportModule;
using SchoolApiApplication.BusinessLayer.Services.StudentReportModule;
using SchoolApiApplication.Helper;
using DinkToPdf.Contracts;
using DinkToPdf;
using DocumentFormat.OpenXml.Office2016.Drawing.ChartDrawing;
using System.Runtime.InteropServices;
using SchoolApiApplication;
using SchoolApiApplication.Repository.Interfaces.GalleryModule;
using SchoolApiApplication.Repository.Services.GalleryModule;
using SchoolApiApplication.BusinessLayer.Interfaces.GalleryModule;
using SchoolApiApplication.BusinessLayer.Services.GalleryModule;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using SchoolApiApplication.BusinessLayer.Services.BackgroundJob;
using SchoolApiApplication.BusinessLayer.Interfaces.SchedularNotificationModule;
using SchoolApiApplication.BusinessLayer.Services.SchedularNotificationModule;
using SchoolApiApplication.Repository.Interfaces.SchedularNotificationModule;
using SchoolApiApplication.Repository.Services.SchedularNotificationModule;
using SchoolApiApplication.BusinessLayer.Interfaces.CBSE_ExamModule;
using SchoolApiApplication.BusinessLayer.Services.CBSE_ExamModule;
using SchoolApiApplication.Repository.Interfaces.CBSE_ExamModule;
using SchoolApiApplication.Repository.Services.CBSE_ExamModule;
using SchoolApiApplication.BusinessLayer.Interfaces.CBSE_ExamResult;
using SchoolApiApplication.BusinessLayer.Services.CBSE_ExamResult;
using SchoolApiApplication.Repository.Interfaces.CBSE_ExamResultModule;
using SchoolApiApplication.Repository.Services.CBSE_ExamResultModule;
using SchoolApiApplication.BusinessLayer.Interfaces.CBSE_ExamReportCard;
using SchoolApiApplication.BusinessLayer.Services.CBSE_ExamReportCard;
using SchoolApiApplication.Repository.Interfaces.CBSE_ExamReportCard;
using SchoolApiApplication.Repository.Services.CBSE_ExamReportCard;
using SchoolApiApplication.BusinessLayer.Interfaces.StudentEnquiryModule;
using SchoolApiApplication.BusinessLayer.Services.StudentEnquiryModule;
using SchoolApiApplication.Repository.Interfaces.StudentEnquiryModule;
using SchoolApiApplication.Repository.Services.StudentEnquiryModule;
using SchoolApiApplication.BusinessLayer.Interfaces.BulkAttendanceUpdateModule;
using SchoolApiApplication.BusinessLayer.Services.BulkAttendanceUpdateModule;
using SchoolApiApplication.Repository.Interfaces.BulkAttendanceUpdateModule;
using SchoolApiApplication.Repository.Services.BulkAttendanceUpdateModule;
using SchoolApiApplication.BusinessLayer.Interfaces.RegistrationFeePaymentModule;
using SchoolApiApplication.BusinessLayer.Services.RegistrationFeePaymentModule;
using SchoolApiApplication.Repository.Interfaces.RegistrationFeePaymentModule;
using SchoolApiApplication.Repository.Services.RegistrationFeePaymentModule;
using SchoolApiApplication.Repository.Interfaces.CBSE_AcademicAssessmentReportModule;
using SchoolApiApplication.BusinessLayer.Interfaces.CBSE_AcademicAssessmentReportModule;
using SchoolApiApplication.BusinessLayer.Services.CBSE_AcademicAssessmentReportModule;
using SchoolApiApplication.Repository.Services.CBSE_AcademicAssessmentReportModule;

var logger = LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();
logger.Debug("init main");
try
{
    var builder = WebApplication.CreateBuilder(args);

	builder.Services.AddTransient<IEmailSender, EmailSender>();
	builder.Services.Configure<EmailSenderOptions>(builder.Configuration.GetSection("EmailSender"));

	builder.Services.AddTransient<IUserService,UserService>();
    builder.Services.AddTransient<ISchoolService, SchoolService>();
    builder.Services.AddTransient<IPromoteService, PromoteService>();
    builder.Services.AddTransient<IMasterService, MasterService>();
    builder.Services.AddTransient<IStudentService, StudentService>();
    builder.Services.AddTransient<IParentService, ParentService>();
    builder.Services.AddTransient<IGradeService, GradeService>();
    builder.Services.AddTransient<IDivisionService, DivisionService>();
    builder.Services.AddTransient<IClerkService, ClerkService>();
    builder.Services.AddTransient<IAdminService, AdminService>();
    builder.Services.AddTransient<ITeacherService, TeacherService>();
    builder.Services.AddTransient<ICabDriverService, CabDriverService>();
    builder.Services.AddTransient<IAccessService, AccessService>();
    builder.Services.AddTransient<IGradeDivisionMatrixService, GradeDivisionMatrixService>();
    builder.Services.AddTransient<IFeePaymentService, FeePaymentService>();
    builder.Services.AddTransient<IAdhocFeePaymentService, AdhocFeePaymentService>();
    builder.Services.AddTransient<IFeeParticularService, FeeParticularService>();
    builder.Services.AddTransient<IFeeWavierTypeService, FeeWavierTypeService>();
    builder.Services.AddTransient<IStudentAttendanceService, StudentAttendanceService>();
    builder.Services.AddTransient<IHomeworkService, HomeworkService>();
    builder.Services.AddTransient<IClassTimeTableService, ClassTimeTableService>();
    builder.Services.AddTransient<IDashBoardService, DashBoardService>();
    builder.Services.AddTransient<ICertificateService, CertificateService>();
    builder.Services.AddTransient<INoticeService, NoticeService>();
    builder.Services.AddTransient<IStudentDocumentService,StudentDocumentService>();
    builder.Services.AddTransient<IStudentProfileService, StudentProfileService>();
    builder.Services.AddTransient<ITeacherProfileService, TeacherProfileService>();
    builder.Services.AddTransient<IPaymentAnalyticsService, PaymentAnalyticsService>();
    builder.Services.AddTransient<IStudentAttendanceReportService, StudentAttendanceReportService>();
    builder.Services.AddTransient<IStudentAttendanceDateWiseReportService, StudentAttendanceDatewiseReportService>();
    builder.Services.AddTransient<IStudentImportService,StudentImportService>();
    builder.Services.AddTransient<ICommonAppService, CommonAppService>();
    builder.Services.AddTransient<ITeacherGradeDivisionMappingService, TeacherGradeDivisionMappingService>();
    builder.Services.AddTransient<ISchoolEventService, SchoolEventService>();
    builder.Services.AddTransient<ISchoolHolidayService, SchoolHolidayService>();
    builder.Services.AddTransient<IWeeklyDayOffService, WeeklyDayOffService>();
    builder.Services.AddTransient<IStudentExportService, StudentExportService>();

    builder.Services.AddTransient<ITeacherImportService, TeacherImportService>();
    builder.Services.AddTransient<ITeacherExportService, TeacherExportService>();

    builder.Services.AddTransient<ISubjectMasterService, SubjectMasterService>();
    builder.Services.AddTransient<ISchoolCalendarService, SchoolCalendarService>();
    builder.Services.AddTransient<IPaymentAnalyticsExportService, PaymentAnalyticsExportService>();
    builder.Services.AddTransient<ISubjectMappingService, SubjectMappingService>();
    builder.Services.AddTransient<ISchoolMonthEventService, SchoolMonthEventService>();
    builder.Services.AddTransient<ITeacherSubjectMappingService, TeacherSubjectMappingService>();
    builder.Services.AddTransient<IClassTeacherDataService, ClassTeacherAttendanceService>();
    builder.Services.AddTransient<ISchoolVacationService, SchoolVactionService>();
    builder.Services.AddTransient<ITeacherCountPerSubjectAnalyzerService, TeacherCountPerSubjectAnalyzerService>();
    builder.Services.AddTransient<ISubjectImportService, SubjectImportService>();
    builder.Services.AddTransient<ITeacherOneDayLectureService, TeacherOneDayLectureService>();
    builder.Services.AddTransient<IClassAttendanceMissingReportService, ClassAttendanceMissingReportService>();
    builder.Services.AddTransient<ITeachingLoadAnalysisService, TeachingLoadAnalysisService>();
    builder.Services.AddTransient<IAdhocParticularMasterService, AdhocParticularMasterService>();
    builder.Services.AddTransient<ISurveyService, SurveyService>();
    builder.Services.AddTransient<IClassWiseTeacherAndStudentService, ClassWiseTeacherAndStudentService>();
    builder.Services.AddTransient<ITransportService, TransportService>();
    builder.Services.AddTransient<IParentAppService, ParentAppService>();
    builder.Services.AddTransient<ITransportFeePaymentService, TransportFeePaymentService>();
    builder.Services.AddTransient<ITransportPaymentAnalyticsService, TransportPaymentAnalyticsService>();
    builder.Services.AddTransient<ITransportPaymentAnalyticsExportService, TransportPaymentAnalyticsExportService>();
    builder.Services.AddTransient<IStudentKitFeePaymentService, StudentKitFeePaymentService>();
    builder.Services.AddTransient<IStudentKitPaymentAnalyticsService, StudentKitPaymentAnalyticsService>();
    builder.Services.AddTransient<IStudentKitPaymentAnalyticsExportService, StudentKitPaymentAnalyticsExportService>();
    builder.Services.AddTransient<ICabDriverProfileService, CabDriverProfileService>();
    builder.Services.AddTransient<IStudentReportService, StudentReportService>();
    builder.Services.AddTransient<IGalleryService, GalleryService>();
    builder.Services.AddTransient<ISchedularNotificationService, SchedularNotificationService>();
    builder.Services.AddTransient<IBulkAttendanceUpdateService, BulkAttendanceUpdateService>();

    builder.Services.AddTransient<ICBSE_ExamObjectService, CBSE_ExamObjectService>();
    builder.Services.AddTransient<ICBSE_ExamResultService, CBSE_ExamResultService>();
    builder.Services.AddTransient<ICBSE_ExamReportCardService, CBSE_ExamReportCardService>();
    builder.Services.AddTransient<IStudentEnquiryService, StudentEnquiryService>();
    builder.Services.AddTransient<IRegistrationFeePaymentService, RegistrationFeePaymentService>();
    builder.Services.AddTransient<ICBSE_AcademicAssessmentReportService, CBSE_AcademicAssessmentReportService>();
    builder.Services.AddTransient<ISubjectMappingService, SubjectMappingService>();

    builder.Services.AddTransient<IUserRepository, UserRepository>();
    builder.Services.AddTransient<ISchoolRepository, SchoolRepository>();
    builder.Services.AddTransient<IMasterRepository, MasterRepository>();
    builder.Services.AddTransient<IStudentRepository, StudentRepository>();
    builder.Services.AddTransient<IParentRepository, ParentRepository>();
    builder.Services.AddTransient<IGradeRepository, GradeRepository>();
    builder.Services.AddTransient<IDivisionRepository, DivisionRepository>();
    builder.Services.AddTransient<IClerkRepository, ClerkRepository>();
    builder.Services.AddTransient<IAdminRepository, AdminRepository>();
    builder.Services.AddTransient<ITeacherRepository, TeacherRepository>();
    builder.Services.AddTransient<ICabDriverRepository, CabDriverRepository>();
    builder.Services.AddTransient<IAccessRepository, AccessRepository>();
    builder.Services.AddTransient<IGradeDivisionMatrixRepository, GradeDivisionMatrixRepository>();
    builder.Services.AddTransient<IFeePaymentRepository, FeePaymentRepository>();
    builder.Services.AddTransient<IAdhocFeePaymentRepository, AdhocFeePaymentRepository>();
    builder.Services.AddTransient<IFeeParticularRepository, FeeParticularRepository>();
    builder.Services.AddTransient<IFeeWavierTypeRepository, FeeWavierTypeRepository>();
    builder.Services.AddTransient<IStudentAttendanceRepository, StudentAttendanceRepository>();
    builder.Services.AddTransient<IHomeworkRepository, HomeworkRepository>();
    builder.Services.AddTransient<IPromoteRepository, PromoteRepository>();
    builder.Services.AddTransient<IClassTimeTableRepository, ClassTimeTableRepository>();
    builder.Services.AddTransient<IDashBoardRepository, DashBoardRepository>();
    builder.Services.AddTransient<ICertificateRepository, CertificateRepository>();
    builder.Services.AddTransient<INoticeRepository, NoticeRepository>();
    builder.Services.AddTransient<IStudentDocumentRepository,StudentDocumentRepository>();
    builder.Services.AddTransient<IStudentProfileRepository, StudentProfileRepository>();
    builder.Services.AddTransient<ITeacherProfileRepository, TeacherProfileRepository>();
    builder.Services.AddTransient<IStudentImportRepository, StudentImportRepository>();
    builder.Services.AddTransient<IPaymentAnalyticsRepository, PaymentAnalyticsRepository>();
    builder.Services.AddTransient<IStudentAttendanceReportRepository , StudentAttendanceReportRepository>();
    builder.Services.AddTransient<IStudentAttendanceDateWiseReportRepository, StudentAttendanceDatewiseReportRepository>();
    builder.Services.AddTransient<ICommonAppRepository, CommonAppRepository>();
    builder.Services.AddTransient<ITeacherGradeDivisionMappingRepository, TeacherGradeDivisionMappingRepository>();
    builder.Services.AddTransient<ISchoolEventRepository, SchoolEventRepository>();
    builder.Services.AddTransient<ISchoolHolidayRepository, SchoolHolidayRepository>();
    builder.Services.AddTransient<IWeeklyDayOffRepository, WeeklyDayOffRepository>();
    builder.Services.AddTransient<IStudentExportRepository, StudentExportRepository>();

    builder.Services.AddTransient<ITeacherImportRepository, TeacherImportRepository>();
    builder.Services.AddTransient<ITeacherExportRepository, TeacherExportRepository>();

    builder.Services.AddTransient<ISubjectMasterRepository, SubjectMasterRepository>();
    builder.Services.AddTransient<ISchoolCalendarRepository, SchoolCalendarRepository>();
    builder.Services.AddTransient<IPaymentAnalyticsExportRepository, PaymentAnalyticsExportRepository>();
    builder.Services.AddTransient<ISubjectMappingRepository, SubjectMappingRepository>();
    builder.Services.AddTransient<ISchoolMonthEventRepository, SchoolMonthEventRepository>();
    builder.Services.AddTransient<ITeacherSubjectMappingRepository, TeacherSubjectMappingRepository>();
    builder.Services.AddTransient<ITeacherSubjectMappingRepository, TeacherSubjectMappingRepository>();
    builder.Services.AddTransient<IClassTeacherDataRepository, ClassTeacherDataRepository>();
    builder.Services.AddTransient<ISchoolVacationRepository, SchoolVacationRepository>();
    builder.Services.AddTransient<ITeacherOneDayLectureRepository, TeacherOneDayLectureRepository>();
    builder.Services.AddTransient<ITeacherCountPerSubjectAnalyzerRepository, TeacherCountPerSubjectAnalyzerRepository>();
    builder.Services.AddTransient<IClassAttendanceMissingReportRepository, ClassAttendanceMissingReportRepository>();
    builder.Services.AddTransient<ITeachingLoadAnalysisRepository, TeachingLoadAnalysisRepository>();
    builder.Services.AddTransient<IAdhocParticularMasterRepository, AdhocParticularMasterRepository>();
    builder.Services.AddTransient<ISurveyRepository, SurveyRepository>();
    builder.Services.AddTransient<IClassWiseTeacherAndStudentRepository, ClassWiseTeacherAndStudentRepository>();
    builder.Services.AddTransient<ITransportPaymentAnalyticsExportRepository, TransportPaymentAnalyticsExportRepository>();
    builder.Services.AddTransient<ITransportPaymentAnalyticsRepository, TransportPaymentAnalyticsRepository>();
    builder.Services.AddTransient<IStudentKitPaymentAnalyticsRepository,StudentKitPaymentAnalyticsRepository>();
    builder.Services.AddTransient<IStudentKitPaymentAnalyticExportsRepository, StudentKitPaymentAnalyticsExportRepository>();
    builder.Services.AddTransient<IGalleryRepository, GalleryRepository>();
    builder.Services.AddTransient<ISchedularNotificationRepository, SchedularNotificationRepository>();
    builder.Services.AddTransient<ICBSE_ExamObjectRepository, CBSE_ExamObjectRepository>();
    builder.Services.AddTransient<ICBSE_ExamResultRepository, CBSE_ExamResultRepository>();
    builder.Services.AddTransient<ICBSE_ExamReportCardRepository, CBSE_ExamReportCardRepository>();
    builder.Services.AddTransient<IStudentEnquiryRepository, StudentEnquiryRepository>();
    builder.Services.AddTransient<IBulkAttendanceUpdateRepository, BulkAttendanceUpdateRepository>();
    builder.Services.AddTransient<IRegistrationFeePaymentRepository, RegistrationFeePaymentRepository>();
    builder.Services.AddTransient<ISubjectMappingRepository, SubjectMappingRepository>();



    builder.Services.AddTransient<ISubjectImportRepository, SubjectImportRepository>();
    builder.Services.AddTransient<ITransportRepository, TransportRepository>();
    builder.Services.AddTransient<IParentAppRepository, ParentAppRepository>();
    builder.Services.AddTransient<ITransportFeePaymentRepository, TransportFeePaymentRepository>();
    builder.Services.AddTransient<IStudentKitFeePaymentRepository, StudentKitFeePaymentRepository>();
    builder.Services.AddTransient<ICabDriverProfileRepository, CabDriverProfileRepository>();
   
    
    builder.Services.AddTransient<IStudentReportRepository, StudentReportRepository>();
    builder.Services.AddTransient<ICBSE_AcademicAssessmentReportRepository, CBSE_AcademicAssessmentReportRepository>();

    builder.Services.AddTransient<IZplHelper, ZplHelper>();


    builder.Services.AddTransient<IFirebaseNotificationSender, FirebaseNotificationSender>();

   // builder.Services.AddHostedService<TimedHostedService>();

    var architectureFolder = (IntPtr.Size == 8) ? "x_64" : "x_86";
    var wkHtmlToPdfFileName = "libwkhtmltox";
    if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
    {
        wkHtmlToPdfFileName += ".so";
    }
    else if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX))
    {
        wkHtmlToPdfFileName += ".dylib";
    }

    var wkHtmlToPdfPath = Path.Combine(
                     builder.Environment.ContentRootPath,
                    "wkhtmltox",
                    "v0.12.4",
                    architectureFolder,
                    wkHtmlToPdfFileName
        );

    CustomAssemblyLoadContext context = new CustomAssemblyLoadContext();
    context.LoadUnmanagedLibrary(wkHtmlToPdfPath);
    builder.Services.AddSingleton(typeof(IConverter), new SynchronizedConverter(new PdfTools()));

    // Initialize Firebase
    FirebaseApp.Create(new AppOptions()
    {
        Credential = GoogleCredential.FromFile(Path.Combine(builder.Environment.ContentRootPath, "serviceAccountKey.json"))
    });


    if (builder.Configuration["UploadService"] == "LocalUpload")
    {
        builder.Services.AddTransient<IStorageService, LocalStorageService>();
    }
    if(builder.Configuration["UploadService"] == "AzureBlobUpload")
    {
        builder.Services.AddTransient<IStorageService, AzureStorageService>();
    }

    builder.Services.AddSingleton<CacheHelper>();
    builder.Services.AddOpenApiDocument();
    builder.Logging.ClearProviders();
    builder.Logging.SetMinimumLevel(Microsoft.Extensions.Logging.LogLevel.Warning);
    builder.Host.UseNLog();
    
    // Add services to the container.
    byte[] jwtSecretBytes = Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:Secret"]);
    SymmetricSecurityKey signingKey = new SymmetricSecurityKey(jwtSecretBytes);

    builder.Services.AddCors(options =>
    {
        options.AddDefaultPolicy(builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
    });

    builder.Services.AddHttpContextAccessor();

    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.RequireHttpsMetadata = false;
            options.SaveToken = true;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = signingKey,
                ValidateIssuer = false,
                ValidateAudience = false
            };
        });
    
    builder.Services.AddControllersWithViews().AddSessionStateTempDataProvider();
    builder.Services.AddSession();
    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    
    builder.Services.AddSwaggerGen();
    
    var app = builder.Build();

    app.UseForwardedHeaders(new ForwardedHeadersOptions
    {
        ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
    });

    // Configure the HTTP request pipeline.
    
    app.UseOpenApi();
    app.UseSwaggerUi3();
    

    app.UseExceptionHandlingMiddleware();


    app.UseStaticFiles();

    app.UseCors();


    app.UseAuthentication();
    
    app.UseAuthorization();

    app.UseRequestLoggerMiddleware();

    app.UseTenantConfigurationMiddleware();
    
    app.MapControllers();

    app.MapFallbackToFile("index.html");

    app.Run();
}
catch (Exception exception)
{
    // NLog: catch setup errors
    logger.Error(exception, "Stopped program because of exception");
    throw;
}
finally
{
    // Ensure to flush and stop internal timers/threads before application-exit (Avoid segmentation fault on Linux)
    NLog.LogManager.Shutdown();
}