using DocumentFormat.OpenXml.Office2010.Drawing;
using SchoolApiApplication.BusinessLayer.Interfaces.PromoteModule;
using SchoolApiApplication.DTO.PromoteModule;
using SchoolApiApplication.DTO.StudentAttendanceModule;
using SchoolApiApplication.Repository.Interfaces.PromoteModule;
using SchoolApiApplication.Repository.Interfaces.StudentAttendanceModule;
using SchoolApiApplication.Repository.Services.StudentAttendanceModuleModule;
using System;

namespace SchoolApiApplication.BusinessLayer.Services.PromoteModule
{
    public class PromoteService : IPromoteService
    {
        private readonly IPromoteRepository _promoteRepository ;

        public PromoteService(IPromoteRepository promoteRepository)
        {
            _promoteRepository = promoteRepository;
        }

        public async Task<List<PromoteGridDto>> GetPromoteGridList(PromoteGridRequestDto requestDto)
        {
            return await _promoteRepository.GetPromoteGridList(requestDto);
        }

        public async Task<bool> StudentPassOrFailUpdate(List<PromoteGridDto> lstPromoteList, int academicYearId, string action, int UserId)
        {
            return await _promoteRepository.StudentPassOrFailUpdate(lstPromoteList, academicYearId, action,UserId);
        }

        public async Task<bool> PromoteStudentToNextYear(List<PromoteGridDto> lstPromoteList, int nextAcademicYearId, int academicYearId, int gradeId, int divisionId, int UserId)
        {
            return await _promoteRepository.PromoteStudentToNextYear(lstPromoteList, nextAcademicYearId, academicYearId, gradeId, divisionId,UserId);
        }



    }
}
