using BinaryKits.Zpl.Label;
using SchoolApiApplication.DTO.StudentModule;

namespace SchoolApiApplication.Helper
{
    public interface IZplHelper
    {
        string GenerateZplForStudents(List<StudentQRSelectResponse> students, string SchoolCode);
        string GenerateZplByStudentCount(List<(int,Guid)> students, string SchoolCode);

        Task<string> GetZPLImagePath(string zplCommand);
        Task<string> GeneratePdfFromImages(List<string> imagePaths);
       
    }
}
