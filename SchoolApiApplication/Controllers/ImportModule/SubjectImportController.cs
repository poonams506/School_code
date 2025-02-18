using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.ImportModule;
using SchoolApiApplication.BusinessLayer.Services.ImportModule;
using SchoolApiApplication.Common;
using SchoolApiApplication.DTO.ImportModule;
using System.Data;
using System.Globalization;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text.RegularExpressions;

namespace SchoolApiApplication.Controllers.ImportModule
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubjectImportController: Controller
    {

        private readonly IConfiguration _config;
        private readonly ISubjectImportService _subjectImportService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private IWebHostEnvironment _hostingEnvironment;

        public SubjectImportController(IWebHostEnvironment hostingEnvironment, IConfiguration config,
            IHttpContextAccessor httpContextAccessor, ISubjectImportService subjectImportService)
        {
            _config = config;
            _httpContextAccessor = httpContextAccessor;
            _subjectImportService = subjectImportService;
            _hostingEnvironment = hostingEnvironment;
        }
        private string GetUploadFolderPath()
        {
            string folderName = "Uploads/subjectImport";
            string webRootPath = _hostingEnvironment.WebRootPath;
            return Path.Combine(webRootPath, folderName);
        }
        public class UserTable
        {
            public Dictionary<string, string> ColumnNames { get; set; } = new Dictionary<string, string>();
        }

        [Authorize]
        [HttpPost]
        [Route("UploadSubjectData")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<ResponseImportSubjectDataDto>> UploadSubjectData()
        {

            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            string schoolCode = Convert.ToString(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == "SchoolCode").Value);
            string filePath = "";
            ResponseImportSubjectDataDto responseImportSubjectDataDto = new ResponseImportSubjectDataDto();

            IFormFileCollection files = Request.Form.Files;
            string newPath = GetUploadFolderPath();
            if (!Directory.Exists(newPath))
            {
                Directory.CreateDirectory(newPath);
            }
            foreach (var file in files)
            {

                if (file.Length > 0)
                {
                    string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    FileInfo finfo = new FileInfo(fileName);
                    string fullPath = Path.Combine(newPath);
                    filePath = Path.Combine(fullPath, fileName);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                }
                Dictionary<string, string> expectedColumnNames = GetUserTableColumnNames();
                DataTable documentDT = new DataTable();
                documentDT = GetDataTableFromExcelFile(filePath);
                foreach (DataRow row in documentDT.Rows)
                {
                    if (IsSampleData(row))
                        continue;

                    ImportSubjectDataDto importSubjectDataDto = new ImportSubjectDataDto
                    {
                          Subject_Name = row.GetStringOrNullValue("Subject_Name"),
                    };
                    responseImportSubjectDataDto.Subjects.Add(importSubjectDataDto);
                }

                responseImportSubjectDataDto.Suceess = await _subjectImportService.UploadSubjectData(responseImportSubjectDataDto.Subjects, userId, schoolCode);
                return Ok(responseImportSubjectDataDto);
            }
            return Ok(await Task.FromResult(new ResponseImportSubjectDataDto())); ;

        }
        public static DataTable GetDataTableFromExcelFile(string filePath)
        {
            DataTable dt = new DataTable();
            var sheetName = "Subjects";
            using (var document = SpreadsheetDocument.Open(filePath, false))
            {
                var workbookPart = document.WorkbookPart;
                Sheet sheet = workbookPart.Workbook.Descendants<Sheet>().FirstOrDefault(s => s.Name == sheetName);
                if (sheet != null)
                {
                    WorksheetPart worksheetPart = (WorksheetPart)workbookPart.GetPartById(sheet.Id);

                    var sheetData = worksheetPart.Worksheet.Elements<SheetData>().First();
                    var headerRow = sheetData.Elements<Row>().FirstOrDefault();
                    int totalHeaderCount = headerRow.Count();
                    for (int i = 1; i <= totalHeaderCount + 1; i++)
                    {
                        dt.Columns.Add(GetCellValue(workbookPart, headerRow.Elements<Cell>().ToList(), i));
                    }
                    foreach (Row r in sheetData.Elements<Row>())
                    {
                        if (r.RowIndex > 1)
                        {
                            DataRow tempRow = dt.NewRow();

                            //Always get from the header count, because the index of the row changes where empty cell is not counted
                            for (int i = 1; i <= totalHeaderCount + 1; i++)
                            {
                                tempRow[i - 1] = GetCellValue(workbookPart, r.Elements<Cell>().ToList(), i);
                            }
                            dt.Rows.Add(tempRow);
                        }
                    }
                }

            }
            return dt;
        }

        static Dictionary<string, string> GetUserTableColumnNames()
        {
            // Replace this with logic to fetch column names from your user table
            UserTable userTable = new UserTable()
            {
                ColumnNames = new Dictionary<string, string> {
                    { "Subject_Name","required" } }
            };
            return userTable.ColumnNames;
        }

        static string GetColumnName(int columnIndex)
        {
            int dividend = columnIndex + 1;
            string columnName = String.Empty;
            int modulo;

            while (dividend > 0)
            {
                modulo = (dividend - 1) % 26;
                columnName = Convert.ToChar(65 + modulo).ToString() + columnName;
                dividend = (dividend - modulo) / 26;
            }

            return columnName;
        }
        private static string GetCellValue(WorkbookPart workbookPart, List<Cell> theCells, string cellColumnReference)
        {
            string value = string.Empty;

            Cell cell = theCells.FirstOrDefault(c => GetColumnName(GetCellIndex(c)) == cellColumnReference);

            if (cell != null)
            {
                if (cell.DataType != null && cell.DataType == CellValues.SharedString)
                {
                    int ssid = int.Parse(cell.InnerText);
                    SharedStringTablePart sharedStringTablePart = workbookPart.SharedStringTablePart;
                    value = sharedStringTablePart.SharedStringTable.Elements<SharedStringItem>().ElementAt(ssid).InnerText;
                }
                else
                {
                    value = cell.InnerText;
                    if (value == "Y")
                    {
                        value = true.ToString();
                    }
                    else if (value == "N")
                    {
                        value = false.ToString();
                    }

                    else if (DateTime.TryParseExact(value, "dd_MM_yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime result))
                    {
                        // Use a different variable name to avoid conflicts with the DateTime class
                        DateTime parsedDateTime = result;
                        value = parsedDateTime.ToString("dd-MM-yyyy", CultureInfo.InvariantCulture);
                    }
                    else if (IsYearRangeFormat(value))
                    {
                        value = value.Replace("_", "-");
                    }
                }
            }

            return value;
        }
        private static bool IsYearRangeFormat(string input)
        {
            Regex yearRangePattern = new Regex(@"^\d{4}_\d{4}$");
            return yearRangePattern.IsMatch(input);
        }
        private static int GetCellIndex(Cell cell)
        {
            string cellReference = cell.CellReference.ToString().ToUpper();
            string columnPart = new String(cellReference.Where(Char.IsLetter).ToArray());
            int index = 0;
            int mul = 1;

            for (int i = columnPart.Length - 1; i >= 0; i--)
            {
                index += mul * (columnPart[i] - 'A' + 1);
                mul *= 26;
            }

            return index;
        }


        private static string GetCellValue(WorkbookPart wbPart, List<Cell> theCells, int index)
        {
            return GetCellValue(wbPart, theCells, GetColumnName(index - 1));
        }


        private bool IsSampleData(DataRow row)
        {
            // Check if the row contains sample data
            string subjectName = row.GetStringOrNullValue("Subject_Name");
           

            if (subjectName != null && subjectName.ToLower() == "testsubject")
            {
                return true; // Row contains sample data
            }

            return false; // Row does not contain sample data
        }



    }
}
