using Dapper;
using DocumentFormat.OpenXml.Bibliography;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using SchoolApiApplication.DTO.GalleryModule;
using SchoolApiApplication.DTO.HomeworkModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.NoticeModule;
using SchoolApiApplication.DTO.ParentAppModule;
using SchoolApiApplication.DTO.SchoolMonthEventModule;
using SchoolApiApplication.DTO.StudentAttendanceModule;
using SchoolApiApplication.DTO.TeacherAppModule;
using SchoolApiApplication.DTO.TeacherModule;
using SchoolApiApplication.DTO.TeacherOneDayLectureModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.TeacherAppModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.TeacherAppModule
{
    public class TeacherProfileRepository: ITeacherProfileRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public TeacherProfileRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<int> TeacherProfileUpdate(TeacherProfileDto TeacherProfileDtoObj, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@TeacherId", TeacherProfileDtoObj.TeacherId);
            parameters.Add("@MobileNumber", TeacherProfileDtoObj.MobileNumber);
            parameters.Add("@EmailId", TeacherProfileDtoObj.EmailId);
            parameters.Add("@AddressLine1", TeacherProfileDtoObj.AddressLine1);
            parameters.Add("@AddressLine2", TeacherProfileDtoObj.AddressLine2);
            parameters.Add("@TalukaId", TeacherProfileDtoObj.TalukaId);
            parameters.Add("@DistrictId", TeacherProfileDtoObj.DistrictId);
            parameters.Add("@StateId", TeacherProfileDtoObj.StateId);
            parameters.Add("@CountryId", TeacherProfileDtoObj.CountryId);
            parameters.Add("@ZipCode", TeacherProfileDtoObj.ZipCode);
            parameters.Add("@TalukaName", TeacherProfileDtoObj.TalukaName);
            parameters.Add("@DistrictName", TeacherProfileDtoObj.DistrictName);
            parameters.Add("@StateName", TeacherProfileDtoObj.StateName);
            parameters.Add("@CountryName", TeacherProfileDtoObj.CountryName);
            parameters.Add("@Education", TeacherProfileDtoObj.Education);
            parameters.Add("@BloodGroup", TeacherProfileDtoObj.BloodGroup);
            parameters.Add("@ProfileImageUrl", TeacherProfileDtoObj.ProfileImageURL);
            parameters.Add("@UserId", UserId);

            return await db.QueryFirstOrDefaultAsync<int>("uspTeacherProfileUpdate", parameters, commandType: CommandType.StoredProcedure);

        }

        public async Task<TeacherDto> GetTeacherProfile(long? TeacherId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@TeacherId", TeacherId);
            return await db.QueryFirstOrDefaultAsync<TeacherDto>("uspTeacherSelect", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<List<StudentAttendanceGridDto>> GetStudentAttendanceGridList(StudentAttendanceRequestDto requestDto)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", requestDto.AcademicYearId);
            parameters.Add("@GradeId", requestDto.GradeId);
            parameters.Add("@DivisionId", requestDto.DivisionId);
            parameters.Add("@AttendanceDate", requestDto.AttendanceDate);
            var studentAttendanceGridDto = new List<StudentAttendanceGridDto>();
            using (var multiResultSet = await db.QueryMultipleAsync("uspStudentAttendanceGridSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var result = multiResultSet.Read<StudentAttendanceGridDto>()?.ToList();
                studentAttendanceGridDto = result == null ? new List<StudentAttendanceGridDto>() : result;
            }
            return studentAttendanceGridDto;
        }

        public async Task<int> GetStudentAttendanceUpsert(StudentAttendanceUpsertDto saudObj, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            DataTable projectsDT = new();
            projectsDT.Columns.Add(nameof(StudentAttendanceUpsertListDto.StudentId), typeof(Int64));
            projectsDT.Columns.Add(nameof(StudentAttendanceUpsertListDto.StatusId), typeof(Byte));
            projectsDT.Columns.Add(nameof(StudentAttendanceUpsertListDto.Reason), typeof(string));
            saudObj.StudentAttendanceUpsertLists.ForEach(permission =>
            {
                var row = projectsDT.NewRow();
                row[nameof(StudentAttendanceUpsertListDto.StudentId)] = permission.StudentId;
                row[nameof(StudentAttendanceUpsertListDto.StatusId)] = permission.StatusId;
                row[nameof(StudentAttendanceUpsertListDto.Reason)] = permission.Reason;

                projectsDT.Rows.Add(row);
            });
            var parameters = new
            {
                saudObj.AcademicYearId,
                saudObj.GradeId,
                saudObj.DivisionId,
                saudObj.AttendanceDate,
                UserId,
                StudentIds = projectsDT.AsTableValuedParameter("[dbo].[StudentAttendanceType]")
            };
            return await db.ExecuteAsync("uspStudentAttendanceUpsert", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<ClassTeacherGradeDivisionListDto> ClassTeacherGradeDivisionList(int teacherId, int academicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", academicYearId);
            parameters.Add("@TeacherId", teacherId);
            var response = new ClassTeacherGradeDivisionListDto();
            using (var multiResultSet = await db.QueryMultipleAsync("uspClassTeacherGradeDivisionSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var result = multiResultSet.Read<SchoolGradeDivisionMatrixDto>()?.ToList();
                response.ClassTeacherGradeDivisionList = result ?? new List<SchoolGradeDivisionMatrixDto>();
            }
            return response;
        }

       


        public async Task<HomeworkListDto> GetHomeworkList(int month, int year, int academicYearId, int userId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", academicYearId);
            parameters.Add("@Month", month);
            parameters.Add("@Year", year);
            parameters.Add("@UserId", userId);
            var response = new HomeworkListDto();
            using (var multiResultSet = await db.QueryMultipleAsync("uspTeacherHomeworkSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var result = multiResultSet.Read<HomeworkDto>()?.ToList();
                response.HomeworkList = result == null ? new List<HomeworkDto>() : result;
            }
            return response;
        }

        public async Task<int> PublishUnpublishHomeworkParticular(PublishUnpublishHomeworkDto publishRequest, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            var parameters = new DynamicParameters();
            parameters.Add("@HomeworkId", publishRequest.HomeworkId);
            parameters.Add("@IsPublished", publishRequest.IsPublished);
            parameters.Add("@UserId", UserId);


            return await db.ExecuteAsync("uspHomeworkPublishUpdate", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<HomeworkUpsertDto> HomeWorkSelect(long HomeworkId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@HomeWorkId", HomeworkId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspHomeWorkSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var HomeworkDto = multiResultSet.Read<HomeworkUpsertDto>().First();
                HomeworkDto.HomeworkTextFileArray = multiResultSet.Read<HomeworkFileDto>()?.ToList()??new List<HomeworkFileDto>();
                //HomeworkDto.HomeworkMediaFileArray = multiResultSet.Read<HomeworkFileDto>()?.ToList() ?? new List<HomeworkFileDto>();
                HomeworkDto.MediaVideoText = multiResultSet.Read<HomeworkMediaContentDto>()?.ToList() ?? new List<HomeworkMediaContentDto>();
                return HomeworkDto;
            }

        }
        public async Task<int> HomeWorkDelete(long? HomeworkId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@HomeworkId", HomeworkId);

            return await db.QueryFirstOrDefaultAsync<int>("uspHomeWorkDelete", parameters, commandType: CommandType.StoredProcedure);

        }

        public async Task<int> HomeWorkUpsert(HomeworkUpsertDto hwudObj, int UserId)
        {

            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            DataTable fileDT = new();
            fileDT.Columns.Add(nameof(HomeworkFileDto.FileName), typeof(string));
            fileDT.Columns.Add(nameof(HomeworkFileDto.FileType), typeof(string));

            hwudObj.HomeworkTextFileArray.ForEach(fileDetail =>
            {
                var row = fileDT.NewRow();
                row[nameof(HomeworkFileDto.FileName)] = fileDetail.FileName;
                row[nameof(HomeworkFileDto.FileType)] = fileDetail.FileType;
                fileDT.Rows.Add(row);
            });

            //hwudObj.HomeworkMediaFileArray.ForEach(fileDetail =>
            //{
            //    var row = fileDT.NewRow();
            //    row[nameof(HomeworkFileDto.FileName)] = fileDetail.FileName;
            //    row[nameof(HomeworkFileDto.FileType)] = fileDetail.FileType;
            //    fileDT.Rows.Add(row);
            //});

            DataTable mediaContentDT = new();
            mediaContentDT.Columns.Add(nameof(ProjectMediaContentDto.ContentUrl), typeof(string));
            //mediaContentDT.Columns.Add(nameof(ProjectMediaContentDto.Base64Image), typeof(string));
            // mediaContentDT.Columns.Add(nameof(ProjectMediaContentDto.ImageContentType), typeof(string));
            // mediaContentDT.Columns.Add(nameof(ProjectMediaContentDto.FileType), typeof(string));
            // mediaContentDT.Columns.Add(nameof(ProjectMediaContentDto.FullPath), typeof(string));

            hwudObj.MediaVideoText.ForEach(mediaContent =>
            {
                var row = mediaContentDT.NewRow();
                row[nameof(ProjectMediaContentDto.ContentUrl)] = mediaContent.ContentUrl;
                // row[nameof(ProjectMediaContentDto.Base64Image)] = mediaContent.Base64Image;
                // row[nameof(ProjectMediaContentDto.ImageContentType)] = mediaContent.ImageContentType;
                // row[nameof(ProjectMediaContentDto.FileType)] = mediaContent.FileType;
                // row[nameof(ProjectMediaContentDto.FullPath)] = mediaContent.FullPath;
                mediaContentDT.Rows.Add(row);
            });

            var parameters = new
            {
                hwudObj.HomeworkId,
                hwudObj.AcademicYearId,
                hwudObj.ClassId,
                hwudObj.SubjectId,
                hwudObj.HomeworkTitle,
                hwudObj.HomeworkDescription,
                hwudObj.StartDate,
                hwudObj.EndDate,
                hwudObj.IsPublished,
                UserId,
                HomeWorkFileDetails = fileDT.AsTableValuedParameter("[dbo].[HomeWorkFileDetailType]"),
                Mediadetails = mediaContentDT.AsTableValuedParameter("[dbo].[MediaType]")

            };
            return await db.ExecuteAsync("uspHomeWorkUpsert", parameters, commandType: CommandType.StoredProcedure);

        }

        public async Task<NoticeUpsertDto> NoticeSelect(long NoticeId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@NoticeId", NoticeId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspNoticeSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var NoticeDto = multiResultSet.Read<NoticeUpsertDto>().First();
                NoticeDto.NoticeTextFileArray = multiResultSet.Read<NoticeFileDto>()?.ToList()??new List<NoticeFileDto>();
                NoticeDto.VideoText = multiResultSet.Read<ProjectMediaContentDto>()?.ToList() ?? new List<ProjectMediaContentDto>();
                // NoticeDto.NoticeMediaFileArray = multiResultSet.Read<NoticeFileDto>()?.ToList() ?? new List<NoticeFileDto>();
                var noticeMappings = multiResultSet.Read<NoticeMappingDto>()?.ToList() ?? new List<NoticeMappingDto>();

                NoticeDto.studentId = noticeMappings.Where(m => m.StudentId != null).Select(m => m.StudentId).ToList();
                NoticeDto.ClassId = noticeMappings.Where(m => m.ClassId != null).Select(m => m.ClassId).ToList();
                return NoticeDto;
            }

        }

        public async  Task<int> PublishUnpublishNoticeParticular(PublishUnpublishNoticeDto publishRequest, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            var parameters = new DynamicParameters();
            parameters.Add("@NoticeId", publishRequest.NoticeId);
            parameters.Add("@IsPublished", publishRequest.IsPublished);
            parameters.Add("@UserId", UserId);


            return await db.ExecuteAsync("uspNoticePublishUpdate", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<int> NoticeDelete(long? NoticeId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@NoticeId", NoticeId);

            return await db.QueryFirstOrDefaultAsync<int>("uspNoticeDelete", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<NoticeListDto> GetNoticeList(int AcademicYearId, byte NoticeTypeId, int RefId, int month, int year)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@NoticeTypeId", NoticeTypeId);
            parameters.Add("@RefId", RefId);
            parameters.Add("@month", month);
            parameters.Add("@year", year);
            var response = new NoticeListDto();
            using (var multiResultSet = await db.QueryMultipleAsync("uspNoticesTeacherAppSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var result = multiResultSet.Read<NoticeDto>()?.ToList();
                response.NoticeList = result == null ? new List<NoticeDto>() : result;
            }
            return response;
        }

        public async Task<int> NoticeUpsert(NoticeUpsertDto notice, int UserId)
        {

            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            DataTable fileDT = new();
            fileDT.Columns.Add(nameof(NoticeFileDto.FileName), typeof(string));
            fileDT.Columns.Add(nameof(NoticeFileDto.FileType), typeof(string));

            notice.NoticeTextFileArray.ForEach(fileDetail =>
            {
                var row = fileDT.NewRow();
                row[nameof(NoticeFileDto.FileName)] = fileDetail.FileName;
                row[nameof(NoticeFileDto.FileType)] = fileDetail.FileType;
                fileDT.Rows.Add(row);
            });

            DataTable mediaContentDT = new();
            mediaContentDT.Columns.Add(nameof(ProjectMediaContentDto.ContentUrl), typeof(string));
            notice.VideoText.ForEach(mediaContent =>
            {
                var row = mediaContentDT.NewRow();
                row[nameof(ProjectMediaContentDto.ContentUrl)] = mediaContent.ContentUrl;
                mediaContentDT.Rows.Add(row);
            });

            DataTable studentIdDT = new();
            studentIdDT.Columns.Add("Id", typeof(string));

            notice.studentId.ForEach(Id =>
            {
                var row = studentIdDT.NewRow();
                row["Id"] = Id;
                studentIdDT.Rows.Add(row);
            });

            DataTable classIdDT = new();
            classIdDT.Columns.Add("Id", typeof(string));

            notice.ClassId.ForEach(Id =>
            {
                var row = classIdDT.NewRow();
                row["Id"] = Id;
                classIdDT.Rows.Add(row);
            });

            DataTable teacherIdDT = new();
            teacherIdDT.Columns.Add("Id", typeof(string));

            notice.teacherId.ForEach(Id =>
            {
                var row = teacherIdDT.NewRow();
                row["Id"] = Id;
                teacherIdDT.Rows.Add(row);
            });

            DataTable clerkIdDT = new();
            clerkIdDT.Columns.Add("Id", typeof(string));

            notice.clerkId.ForEach(Id =>
            {
                var row = clerkIdDT.NewRow();
                row["Id"] = Id;
                clerkIdDT.Rows.Add(row);
            });

            DataTable cabDriverIdDT = new();
            cabDriverIdDT.Columns.Add("Id", typeof(string));

            notice.cabDriverId.ForEach(Id =>
            {
                var row = cabDriverIdDT.NewRow();
                row["Id"] = Id;
                cabDriverIdDT.Rows.Add(row);
            });

            var parameters = new
            {
                notice.NoticeId,
                notice.IsImportant,
                notice.AcademicYearId,
                notice.NoticeToType,
                notice.NoticeTitle,
                notice.NoticeDescription,
                notice.StartDate,
                notice.EndDate,
                notice.IsPublished,
                UserId,
                NoticeFileDetails = fileDT.AsTableValuedParameter("[dbo].[NoticeFileDetailType]"),
                NoticeStudentId = studentIdDT.AsTableValuedParameter("[dbo].[SingleIdType]"),
                NoticeClassId = classIdDT.AsTableValuedParameter("[dbo].[SingleIdType]"),
                NoticeTeacherId = teacherIdDT.AsTableValuedParameter("[dbo].[SingleIdType]"),
                NoticeClerkId = clerkIdDT.AsTableValuedParameter("[dbo].[SingleIdType]"),
                NoticeCabDriverId = cabDriverIdDT.AsTableValuedParameter("[dbo].[SingleIdType]"),
                Mediadetails = mediaContentDT.AsTableValuedParameter("[dbo].[MediaType]")

            };
            return await db.ExecuteAsync("uspNoticeUpsert", parameters, commandType: CommandType.StoredProcedure);

        }

        public async Task<StudentTeacherAppResponseDto> StudentTeacherAppSelect(int AcademicYearId, int GradeId, int DivisionId)
        {

            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@GradeId", GradeId);
            parameters.Add("@DivisionId", DivisionId);


            using (var multiResultSet = await db.QueryMultipleAsync("uspStudentTeacherAppSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var studentTeacherAppResponseDto = new StudentTeacherAppResponseDto();
                var result = multiResultSet.Read<StudentTeacherAppDto>()?.ToList();
                studentTeacherAppResponseDto.StudentTeacherAppList = result == null ? new List<StudentTeacherAppDto>() : result;
                return studentTeacherAppResponseDto;
            }
        }

        public async Task<ClassAttendanceMissingReportResponseDto> ClassAttendanceMissingReport(int AcademicYearId, int TeacherId, int Month, int Year)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@TeacherId", TeacherId);
            parameters.Add("@Month", Month);
            parameters.Add("@Year", Year);
            using (var multiResultSet = await db.QueryMultipleAsync("uspClassAttendanceMissingReportAppSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var classAttendanceMissingReportResponseDto = new ClassAttendanceMissingReportResponseDto();
                var result = multiResultSet.Read<ClassAttendanceMissingReportDto>().ToList();
                classAttendanceMissingReportResponseDto.ClassAttendanceMissingList = result == null ? new List<ClassAttendanceMissingReportDto>() : result;
                return classAttendanceMissingReportResponseDto;
            }
        }

        public async Task<TeacherOneDayLectureResponseDto> TeacherOneDayLectureSelect(int AcademicYearId, int TeacherId, int DayNo)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@TeacherId", TeacherId);
            parameters.Add("@DayNo", DayNo);


            using (var multiResultSet = await db.QueryMultipleAsync("uspTeacherOneDayLectureSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var teacherOneDayLectureResponseDto = new TeacherOneDayLectureResponseDto();
                teacherOneDayLectureResponseDto.TeacherOneDayLectureList = multiResultSet.Read<TeacherOneDayLectureDto>().ToList();
                return teacherOneDayLectureResponseDto;
            }
        }

        public async Task<SchoolMonthEventResponseDto> SchoolMonthEventStaffSelect(int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);

            using (var multiResultSet = await db.QueryMultipleAsync("uspSchoolEventMonthlyStaffSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var schoolMonthEventResponseDto = new SchoolMonthEventResponseDto();
                schoolMonthEventResponseDto.SchoolMonthEventList = multiResultSet.Read<SchoolMonthEventDto>().ToList();
                var lstEventDetail = multiResultSet.Read<OneMonthEventFileDetailsTeacherAppDto>().ToList();
                var lstEventDate = multiResultSet.Read<OneMonthEventDateTeacherAppDto>().ToList();
                if (lstEventDetail.Count > 0)
                {
                    schoolMonthEventResponseDto.SchoolMonthEventList.ForEach(schoolEvent =>
                    {
                        schoolEvent.LstEventDetail = lstEventDetail.Where(x => x.SchoolEventId == schoolEvent.SchoolEventId).ToList();
                    });
                }
                if (lstEventDate.Count > 0)
                {
                    schoolMonthEventResponseDto.SchoolMonthEventList.ForEach(schoolEventDate =>
                    {
                        schoolEventDate.LstEventDate = lstEventDate.Where(x => x.SchoolEventId == schoolEventDate.SchoolEventId).ToList();
                    });
                }
                return schoolMonthEventResponseDto;
            }
        }

        public async Task<SchoolMonthEventResponseDto> SchoolMonthEventParentSelect(int AcademicYearId, int GradeId, int DivisionId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@GradeId", GradeId);
            parameters.Add("@DivisionId", DivisionId);


            using (var multiResultSet = await db.QueryMultipleAsync("uspSchoolEventMonthlyParentsSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var schoolMonthEventResponseDto = new SchoolMonthEventResponseDto();
                var result = multiResultSet.Read<SchoolMonthEventDto>()?.ToList();
                schoolMonthEventResponseDto.SchoolMonthEventList = result == null ? new List<SchoolMonthEventDto>() : result;
                return schoolMonthEventResponseDto;
            }
        }
        public async Task<TeacherClassSubjectResponseDto> GetSubjectDropdownByClassTeacher(TeacherClassSubjectRequestDto RequestDto)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            TeacherClassSubjectResponseDto responseDto = new TeacherClassSubjectResponseDto();
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", RequestDto.AcademicYearId);
            parameters.Add("@TeacherId", RequestDto.TeacherId);
            parameters.Add("@ClassId", RequestDto.ClassId);
            var lstSubject = await db.QueryAsync<TeacherClassSubjectDto>("uspClassTeacherClassSubjectSelect", parameters, commandType: CommandType.StoredProcedure);
            if (lstSubject?.Count() > 0)
            {
                responseDto.LstSubject = lstSubject.ToList();
            }
            return responseDto;
        }

        public async Task<TeacherAttendanceHolidayResponseDto> GetTeacherAttendanceHoliday(int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);


            using (var multiResultSet = await db.QueryMultipleAsync("uspHolidayTeacherAttendanceSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var holidayResponseDto = new TeacherAttendanceHolidayResponseDto();
                holidayResponseDto.LstWeeklyOff = multiResultSet.Read<TeacherAttendanceWeeklyOffDto>().ToList();
                holidayResponseDto.LstHoliday = multiResultSet.Read<TeacherAttendanceHolidayDto>().ToList();
                holidayResponseDto.LstVacation = multiResultSet.Read<TeacherAttendanceVacationDto>().ToList();
               return holidayResponseDto;
            }
        }

        public async Task<GalleryListDto> GetGalleryGridList(int AcademicYearId, byte GalleryTypeId, int RefId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@GalleryTypeId", GalleryTypeId);
            parameters.Add("@RefId", RefId);
            var response = new GalleryListDto();
            using (var multiResultSet = await db.QueryMultipleAsync("uspGalleryTeacherAppSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var result = multiResultSet.Read<GalleryDto>()?.ToList();
                response.GalleryList = result == null ? new List<GalleryDto>() : result;
            }
            return response;

        }

        public async Task<GalleryUpsertDto> GallerySelect(long GalleryId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@GalleryId", GalleryId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspGallerySelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var GalleryDto = multiResultSet.Read<GalleryUpsertDto>().First();
                GalleryDto.GalleryTextFileArray = multiResultSet.Read<GalleryFileDto>()?.ToList() ?? new List<GalleryFileDto>();
                GalleryDto.GalleryVideoText = multiResultSet.Read<GalleryMediaContentDto>()?.ToList() ?? new List<GalleryMediaContentDto>();

                var galleryMappings = multiResultSet.Read<GalleryMappingDto>()?.ToList() ?? new List<GalleryMappingDto>();
                GalleryDto.StudentId = galleryMappings.Where(m => m.StudentId != null).Select(m => m.StudentId).ToList();
                GalleryDto.ClassId = galleryMappings.Where(m => m.ClassId != null).Select(m => m.ClassId).ToList();
                return GalleryDto;
            }
        }
       
        public async Task<int> GalleryUpsert(GalleryUpsertDto gallery, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            DataTable fileDT = new();
            fileDT.Columns.Add(nameof(GalleryFileDto.FileName), typeof(string));
            fileDT.Columns.Add(nameof(GalleryFileDto.FileType), typeof(string));

            gallery.GalleryTextFileArray.ForEach(fileDetail =>
            {
                var row = fileDT.NewRow();
                row[nameof(GalleryFileDto.FileName)] = fileDetail.FileName;
                row[nameof(GalleryFileDto.FileType)] = fileDetail.FileType;
                fileDT.Rows.Add(row);
            });

            DataTable mediaContentDT = new();
            mediaContentDT.Columns.Add(nameof(GalleryMediaContentDto.ContentUrl), typeof(string));

            gallery.GalleryVideoText.ForEach(mediaContent =>
            {
                var row = mediaContentDT.NewRow();
                row[nameof(GalleryMediaContentDto.ContentUrl)] = mediaContent.ContentUrl;
                mediaContentDT.Rows.Add(row);
            });

            DataTable studentIdDT = new();
            studentIdDT.Columns.Add("Id", typeof(string));

            gallery.StudentId.ForEach(Id =>
            {
                var row = studentIdDT.NewRow();
                row["Id"] = Id;
                studentIdDT.Rows.Add(row);
            });

            DataTable classIdDT = new();
            classIdDT.Columns.Add("Id", typeof(string));

            gallery.ClassId.ForEach(Id =>
            {
                var row = classIdDT.NewRow();
                row["Id"] = Id;
                classIdDT.Rows.Add(row);
            });

            DataTable teacherIdDT = new();
            teacherIdDT.Columns.Add("Id", typeof(string));

            gallery.TeacherId.ForEach(Id =>
            {
                var row = teacherIdDT.NewRow();
                row["Id"] = Id;
                teacherIdDT.Rows.Add(row);
            });

            DataTable clerkIdDT = new();
            clerkIdDT.Columns.Add("Id", typeof(string));

            gallery.ClerkId.ForEach(Id =>
            {
                var row = clerkIdDT.NewRow();
                row["Id"] = Id;
                clerkIdDT.Rows.Add(row);
            });

            DataTable cabDriverIdDT = new();
            cabDriverIdDT.Columns.Add("Id", typeof(string));

            gallery.CabDriverId.ForEach(Id =>
            {
                var row = cabDriverIdDT.NewRow();
                row["Id"] = Id;
                cabDriverIdDT.Rows.Add(row);
            });

            var parameters = new
            {
                gallery.GalleryId,
                gallery.AcademicYearId,
                gallery.GalleryToType,
                gallery.GalleryTitle,
                gallery.Description,
                gallery.StartDate,
                gallery.IsPublished,
                UserId,
                GalleryFileDetails = fileDT.AsTableValuedParameter("[dbo].[GalleryFileDetailType]"),
                GalleryStudentId = studentIdDT.AsTableValuedParameter("[dbo].[SingleIdType]"),
                GalleryClassId = classIdDT.AsTableValuedParameter("[dbo].[SingleIdType]"),
                GalleryTeacherId = teacherIdDT.AsTableValuedParameter("[dbo].[SingleIdType]"),
                GalleryClerkId = clerkIdDT.AsTableValuedParameter("[dbo].[SingleIdType]"),
                GalleryCabDriverId = cabDriverIdDT.AsTableValuedParameter("[dbo].[SingleIdType]"),
                GalleryMedias = mediaContentDT.AsTableValuedParameter("[dbo].[GalleryMediaType]")
            };

            return await db.ExecuteAsync("uspGalleryUpsert", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<int> GalleryDelete(long? GalleryId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@GalleryId", GalleryId);
            return await db.QueryFirstOrDefaultAsync<int>("uspGalleryDelete", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<int> PublishUnpublishGalleryParticular(PublishUnpublishGalleryDto publishRequest, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            var parameters = new DynamicParameters();
            parameters.Add("@GalleryId", publishRequest.GalleryId);
            parameters.Add("@IsPublished", publishRequest.IsPublished);
            parameters.Add("@UserId", UserId);

            return await db.ExecuteAsync("uspGalleryPublishUpdate", parameters, commandType: CommandType.StoredProcedure);
        }
    }
}
