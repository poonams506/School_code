using BinaryKits.Zpl.Label;
using BinaryKits.Zpl.Label.Elements;
using BinaryKits.Zpl.Labelary;
using BinaryKits.Zpl.Viewer;
using DinkToPdf;
using DinkToPdf.Contracts;
using SchoolApiApplication.DTO.StudentModule;
using System.IO;
using System.Text;
using System.Web;

namespace SchoolApiApplication.Helper.Implementations
{
    public class ZplHelper: IZplHelper
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IConverter _converter;
        public ZplHelper(IWebHostEnvironment hostingEnvironment, 
            IConverter converter)
        {
            _hostingEnvironment=hostingEnvironment;
            _converter = converter;
        }
        private string GetQRCodeFolderPath()
        {
            string webRootPath = _hostingEnvironment.WebRootPath;
            string fullPath = Path.Combine(webRootPath, "QRCode");
            if (!Directory.Exists(fullPath))
            {
                Directory.CreateDirectory(fullPath);
            }
            return Path.Combine(webRootPath, "QRCode");
        }

        public  string GenerateZplForStudents(List<StudentQRSelectResponse> students,string SchoolCode)
        {
            List<ZplElementBase> zplElements = new List<ZplElementBase>();

            int qrCodeWidth = 200;
            int qrCodeHeight = 200;
            int textHeight = 30;
            int margin = 100;

            int itemsPerRow = 6;
            ZplFont font = new ZplFont();
            for (int i = 0; i < students.Count; i++)
            {
                var student = students[i];

                int row = i / itemsPerRow;
                int col = i % itemsPerRow;

                int x = col * (qrCodeWidth + margin) + 50;
                int y = row * (qrCodeHeight + 4 * textHeight + margin);

                zplElements.Add(new ZplQrCode(string.Format("{0}_{1}",SchoolCode,student.StudentId.ToString()), x, y, qrCodeWidth, qrCodeHeight));
                zplElements.Add(new ZplTextField($"Name: {student.StudentFullName}", x, y + qrCodeHeight + margin + textHeight, font));
                zplElements.Add(new ZplTextField($"Class: {student.Class}", x, y + qrCodeHeight + margin + 2 * textHeight, font));
                zplElements.Add(new ZplTextField($"Roll No: {student.RollNumber}", x, y + qrCodeHeight + margin + 3 * textHeight, font));
            }
            var renderEngine = new ZplEngine(zplElements);

            string zplCommand = renderEngine.ToZplString(new ZplRenderOptions
            {
                //AddEmptyLineBeforeElementStart = true,
                SourcePrintDpi = 203,
                TargetPrintDpi = 203
            });

            return zplCommand;
        }
        public string GenerateZplByStudentCount(List<(int,Guid)> students, string SchoolCode)
        {
            List<ZplElementBase> zplElements = new List<ZplElementBase>();

            int qrCodeWidth = 150;
            int qrCodeHeight = 150;
            int textHeight = 50;
            int margin = 250;

            int itemsPerRow = 4;
            ZplFont font = new ZplFont();
            for (int i = 0; i < students.Count; i++)
            {
                var student = students[i];

                int row = i / itemsPerRow;
                int col = i % itemsPerRow;

                int x = col * (qrCodeWidth + margin) + 50;
                int y = row * (qrCodeHeight + 4 * textHeight + margin);

                zplElements.Add(new ZplQrCode(string.Format("{0}_{1}", SchoolCode, student.Item2.ToString()), x, y, qrCodeWidth, qrCodeHeight));
                zplElements.Add(new ZplTextField($"Sr. No. : {student.Item1}", x, y + qrCodeHeight + margin + textHeight, font));
            }
            var renderEngine = new ZplEngine(zplElements);

            string zplCommand = renderEngine.ToZplString(new ZplRenderOptions
            {
                //AddEmptyLineBeforeElementStart = true,
                SourcePrintDpi = 203,
                TargetPrintDpi = 203
            });

            return zplCommand;
        }

        public async Task<string> GetZPLImagePath(string zplCommand)
        {
            var client = new LabelaryClient();
            var previewData = await client.GetPreviewAsync(zplCommand, PrintDensity.PD12dpmm, new LabelSize(6, 8, Measure.Inch));
            var fileName = Guid.NewGuid().ToString() + ".png";
            string filePath=Path.Combine(GetQRCodeFolderPath(),fileName);
            await File.WriteAllBytesAsync(filePath, previewData);
            return Path.Combine(GetQRCodeFolderPath(), fileName);
        }

        

        public async Task<string> GeneratePdfFromImages(List<string> imagePaths)
        {
            string fileName= Guid.NewGuid().ToString() + ".pdf";
            string outputPdfPath =Path.Combine( GetQRCodeFolderPath() , fileName);
          

            var htmlContent = new StringBuilder().Append( "<html><body>");
            foreach (var imagePath in imagePaths)
            {

                htmlContent.Append($"<img src='{ imagePath}' style='height:1000px;' />");

            }
            htmlContent.Append("</body></html>");



            var glb = new GlobalSettings
            {
                ColorMode = ColorMode.Color,
                Orientation = Orientation.Portrait,
                PaperSize = PaperKind.A4,
                Margins = new MarginSettings()
                {
                    Bottom = 5,
                    Top = 5,
                    Left = 5,
                    Right = 5
                },
                DPI = 320
            };
           var objectSettings = new ObjectSettings
            {
                PagesCount = true,
                HtmlContent = HttpUtility.HtmlDecode(htmlContent.ToString()),
                WebSettings = { DefaultEncoding = "utf-8", UserStyleSheet = null }
            };
            var pdf = new HtmlToPdfDocument
            {
                GlobalSettings = glb,
                Objects = { objectSettings }
            };
            var file = _converter.Convert(pdf);
            using (MemoryStream ms = new MemoryStream(file))
            {
                using (FileStream fileStream = new FileStream(outputPdfPath, FileMode.Create, FileAccess.Write))
                {
                   await ms.CopyToAsync(fileStream);
                }
            }
                return outputPdfPath;
        }
    }
}
