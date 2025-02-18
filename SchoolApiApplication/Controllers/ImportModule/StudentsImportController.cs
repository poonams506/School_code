using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.DTO.ImportModule;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using SchoolApiApplication.BusinessLayer.Interfaces.ImportModule;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using System.Net.Http.Headers;
using System.Globalization;
using System.Data;
using System.Text.RegularExpressions;
using SchoolApiApplication.Common;


namespace SchoolApiApplication.Controllers.ImportModule
{
    [ApiController]
    [Route("api/[controller]")]

    public class StudentsImportController : Controller
    {
        private readonly IConfiguration _config;
        private readonly IStudentImportService _studentImportService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private IWebHostEnvironment _hostingEnvironment;

        public StudentsImportController(IWebHostEnvironment hostingEnvironment, IConfiguration config,
            IHttpContextAccessor httpContextAccessor, IStudentImportService studentImportService)
        {
            _config = config;
            _httpContextAccessor = httpContextAccessor;
            _studentImportService = studentImportService;
            _hostingEnvironment = hostingEnvironment;
        }
        private string GetUploadFolderPath()
        {
            string folderName = "Uploads/studentImport";
            string webRootPath = _hostingEnvironment.WebRootPath;
            return Path.Combine(webRootPath, folderName);
        }
        public class UserTable
        {
            public Dictionary<string, string> ColumnNames { get; set; } = new Dictionary<string, string>();
        }
        [Authorize]
        [HttpPost]
        [Route("UploadStudentData")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<ResponseImportStudentDataDto>> UploadStudentData()
        {

            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            string schoolCode = Convert.ToString(User.Claims.First(x => x.Type == "SchoolCode").Value);
            ResponseImportStudentDataDto responseImportStudentDataDto = new ResponseImportStudentDataDto();
           
            IFormFileCollection files = Request.Form.Files;
            string newPath = GetUploadFolderPath();
            if (!Directory.Exists(newPath))
            {
                Directory.CreateDirectory(newPath);
            }
            foreach (var file in files)
            {
                string filePath = string.Empty;
                if (file.Length > 0)
                {
                    string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    string fullPath = Path.Combine(newPath);
                    filePath = Path.Combine(fullPath, fileName);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                }
               
                DataTable documentDT = GetDataTableFromExcelFile(filePath);
                    foreach (DataRow row in documentDT.Rows)
                    {
                        if (IsSampleData(row))
                            continue;
                        ImportStudentDataDto importStudentDataDto = new ImportStudentDataDto
                        {
                            
                            Gen_Reg_No = row.GetStringOrNullValue("Gen_Reg_No"),
                            Admission_No = row.GetStringOrNullValue("Admission_No"),
                            Roll_No = row.GetStringOrNullValue("Roll_No"),
                            Grade = row.GetStringOrNullValue("Grade"),
                            Division = row.GetStringOrNullValue("Division"),
                            Admission_Date =row.GetDateTimeValue("Admission_Date"),
                            CBSC_Student_Id = row.GetStringOrNullValue("CBSC_Student_Id"),
                            Student_First_Name = row.GetStringOrNullValue("Student_First_Name"),
                            Student_Middle_Name = row.GetStringOrNullValue("Student_Middle_Name"),
                            Student_Last_Name = row.GetStringOrNullValue("Student_Last_Name"),
                            Gender = row.GetStringOrNullValue("Gender"),
                            Adhaar_No = row.GetStringOrNullValue("Adhaar_No"),
                            Religion = row.GetStringOrNullValue("Religion"),
                            Category = row.GetStringOrNullValue("Category"),
                            Cast = row.GetStringOrNullValue("Caste"),
                            Sub_Caste = row.GetStringOrNullValue("Sub_Caste"),
                            Nationality = row.GetStringOrNullValue("Nationality"),
                            Mother_Tongue = row.GetStringOrNullValue("Mother_Tongue"),
                            Emergency_Contact_Person_Name = row.GetStringOrNullValue("Emergency_Contact_Person_Name"),
                            Emergency_Contact_No = row.GetStringOrNullValue("Emergency_Contact_No"),
                            Family_Doctor_Name = row.GetStringOrNullValue("Family_Doctor_Name"),
                            Family_Doctor_No = row.GetStringOrNullValue("Family_Doctor_No"),
                            Birth_Place = row.GetStringOrNullValue("Birth_Place"),
                            BirthDate =row.GetDateTimeValue("Birth_Date"),
                            Date_Of_Birth_In_Words = row.GetStringOrNullValue("Date_Of_Birth_In_Words"),
                            Birth_Country = row.GetStringOrNullValue("Birth_Country"),
                            Birth_State = row.GetStringOrNullValue("Birth_State"),
                            Birth_District = row.GetStringOrNullValue("Birth_District"),
                            Birth_Taluka = row.GetStringOrNullValue("Birth_Taluka"),
                            Current_Address_Line_1 = row.GetStringOrNullValue("Current_Address_Line_1"),
                            Current_Address_Line_2 = row.GetStringOrNullValue("Current_Address_Line_2"),
                            Current_Pincode = row.GetStringOrNullValue("Current_Pincode"),
                            Current_Country = row.GetStringOrNullValue("Current_Country"),
                            Current_State = row.GetStringOrNullValue("Current_State"),
                            Current_District = row.GetStringOrNullValue("Current_District"),
                            Current_Taluka = row.GetStringOrNullValue("Current_Taluka"),
                            Blood_Group = row.GetStringOrNullValue("Blood_Group"),
                            Height = row.GetDecimalValue("Height"),
                            Weight = row.GetDecimalValue("Weight"),
                            Medical_History_Notes = row.GetStringOrNullValue("Medical_History_Notes"),
                            Previous_School_Name = row.GetStringOrNullValue("Previous_School_Name"),
                            Previous_School_Standard = row.GetStringOrNullValue("Previous_School_Standard"),
                            Previous_School_Division = row.GetStringOrNullValue("Previous_School_Division"),
                            Progress_Note_From_Last_School = row.GetStringOrNullValue("Progress_Note_From_Last_School"),
                            Conduct_Note_From_Last_School = row.GetStringOrNullValue("Conduct_Note_From_Last_School"),
                            Reason_of_Leaving_School = row.GetStringOrNullValue("Reason_of_Leaving_School"),
                            Date_of_Leaving_of_Previous_School =row.GetDateTimeValue("Date_of_Leaving_of_Previous_School"),
                            Remark = row.GetStringOrNullValue("Remark"),
                            Is_New_Student = row.GetBooleanValue("Is_New_Student"),
                            Is_Deactive = row.GetBooleanValue("Is_Deactive"),
                            Is_RTE = row.GetBooleanValue("Is_RTE"),
                            Apply_Concession = row.GetBooleanValue( "Apply_Concession"),
                            Concession_Fee =row.GetDecimalValue("Concession_Fee"),
                            PreviousAcademicYearPendingFeeAmount = row.GetDecimalValue("PreviousAcademicYearPendingFeeAmount"),
                            Academic_Year = row.GetStringOrNullValue("Academic_Year"),
                            Do_you_required_parent_mobile_app_access = row.GetBooleanValue("Do_you_required_parent_mobile_app_access"),
                            Mobile_Number_for_Application_Access = row.GetStringOrNullValue("Mobile_Number_for_Application_Access"),

                            Father_First_Name = row.GetStringOrNullValue("Father_First_Name"),
                            Father_Middle_Name = row.GetStringOrNullValue("Father_Middle_Name"),
                            Father_Last_Name = row.GetStringOrNullValue("Father_Last_Name"),
                            Father_Gender = row.GetStringOrNullValue("Father_Gender"),
                            Father_Mobile_No = row.GetStringOrNullValue("Father_Mobile_No"),
                            Father_Alternate_Contact_No = row.GetStringOrNullValue("Father_Alternate_Contact_No"),
                            Father_Email_Id = row.GetStringOrNullValue("Father_Email_Id"),
                            Father_Address_Line_1 = row.GetStringOrNullValue("Father_Address_Line_1"),
                            Father_Address_Line_2 = row.GetStringOrNullValue("Father_Address_Line_2"),
                            Father_Country = row.GetStringOrNullValue("Father_Country"),
                            Father_State = row.GetStringOrNullValue("Father_State"),
                            Father_District = row.GetStringOrNullValue("Father_District"),
                            Father_Taluka= row.GetStringOrNullValue("Father_Taluka"),
                            Father_Pincode = row.GetStringOrNullValue("Father_Pincode"),
                            Father_Adhaar_No = row.GetStringOrNullValue("Father_Adhaar_No"),
                            Father_Education = row.GetStringOrNullValue("Father_Education"),
                            Father_Birth_Date = row.GetDateTimeValue("Father_Birth_Date"),
                            Father_Occupation = row.GetStringOrNullValue("Father_Occupation"),
                            Father_Annual_Income =row.GetDecimalValue("Father_Annual_Income"),
                            Father_Blood_Group = row.GetStringOrNullValue("Father_Blood_Group"),

                            Mother_First_Name = row.GetStringOrNullValue("Mother_First_Name"),
                            Mother_Middle_Name = row.GetStringOrNullValue("Mother_Middle_Name"),
                            Mother_Last_Name = row.GetStringOrNullValue("Mother_Last_Name"),
                            Mother_Gender = row.GetStringOrNullValue("Mother_Gender"),
                            Mother_Mobile_No = row.GetStringOrNullValue("Mother_Mobile_No"),
                            Mother_Alternate_Contact_No = row.GetStringOrNullValue("Mother_Alternate_Contact_No"),
                            Mother_Email_Id = row.GetStringOrNullValue("Mother_Email_Id"),
                            Mother_Address_Line_1 = row.GetStringOrNullValue("Mother_Address_Line_1"),
                            Mother_Address_Line_2 = row.GetStringOrNullValue("Mother_Address_Line_2"),
                            Mother_Country = row.GetStringOrNullValue("Mother_Country"),
                            Mother_State = row.GetStringOrNullValue("Mother_State"),
                            Mother_District = row.GetStringOrNullValue("Mother_District"),
                            Mother_Taluka = row.GetStringOrNullValue("Mother_Taluka"),
                            Mother_Pincode = row.GetStringOrNullValue("Mother_Pincode"),
                            Mother_Adhaar_No = row.GetStringOrNullValue("Mother_Adhaar_No"),
                            Mother_Education = row.GetStringOrNullValue("Mother_Education"),
                            Mother_Birth_Date = row.GetDateTimeValue("Mother_Birth_Date"),
                            Mother_Occupation = row.GetStringOrNullValue("Mother_Occupation"),
                            Mother_Annual_Income = row.GetDecimalValue("Mother_Annual_Income"),
                            Mother_Blood_Group = row.GetStringOrNullValue("Mother_Blood_Group"),

                            Guardian_First_Name = row.GetStringOrNullValue("Guardian_First_Name"),
                            Guardian_Middle_Name = row.GetStringOrNullValue("Guardian_Middle_Name"),
                            Guardian_Last_Name = row.GetStringOrNullValue("Guardian_Last_Name"),
                            Guardian_Gender = row.GetStringOrNullValue("Guardian_Gender"),
                            Guardian_Mobile_No = row.GetStringOrNullValue("Guardian_Mobile_No"),
                            Guardian_Alternate_Contact_No = row.GetStringOrNullValue("Guardian_Alternate_Contact_No"),
                            Guardian_Email_Id = row.GetStringOrNullValue("Guardian_Email_Id"),
                            Guardian_Address_Line_1 = row.GetStringOrNullValue("Guardian_Address_Line_1"),
                            Guardian_Address_Line_2 = row.GetStringOrNullValue("Guardian_Address_Line_2"),
                            Guardian_Country = row.GetStringOrNullValue("Guardian_Country"),
                            Guardian_State = row.GetStringOrNullValue("Guardian_State"),
                            Guardian_District = row.GetStringOrNullValue("Guardian_District"),
                            Guardian_Taluka = row.GetStringOrNullValue("Guardian_Taluka"),
                            Guardian_Pincode = row.GetStringOrNullValue("Guardian_Pincode"),
                            Guardian_Adhaar_No = row.GetStringOrNullValue("Guardian_Adhaar_No"),
                            Guardian_Education = row.GetStringOrNullValue("Guardian_Education"),
                            Guardian_Birth_Date = row.GetDateTimeValue("Guardian_Birth_Date"),
                            Guardian_Occupation = row.GetStringOrNullValue("Guardian_Occupation"),
                            Guardian_Annual_Income =row.GetDecimalValue("Guardian_Annual_Income"),
                            Guardian_Blood_Group = row.GetStringOrNullValue("Guardian_Blood_Group"),

                            Current_CountryId = row.GetIntValue("Current_CountryId"),
                            Current_StateId = row.GetIntValue("Current_StateId"),
                            Current_DistrictId = row.GetIntValue("Current_DistrictId"),
                            Current_TalukaId = row.GetIntValue("Current_TalukaId"),

                            Birth_CountryId = row.GetIntValue("Birth_CountryId"),
                            Birth_StateId = row.GetIntValue("Birth_StateId"),
                            Birth_DistrictId = row.GetIntValue("Birth_DistrictId"),
                            Birth_TalukaId = row.GetIntValue("Birth_TalukaId"),

                            Father_CountryId = row.GetIntValue("Father_CountryId"),
                            Father_StateId = row.GetIntValue("Father_StateId"),
                            Father_DistrictId = row.GetIntValue("Father_DistrictId"),
                            Father_TalukaId = row.GetIntValue("Father_TalukaId"),

                            Mother_CountryId = row.GetIntValue("Mother_CountryId"),
                            Mother_StateId = row.GetIntValue("Mother_StateId"),
                            Mother_DistrictId = row.GetIntValue("Mother_DistrictId"),
                            Mother_TalukaId = row.GetIntValue("Mother_TalukaId"),

                            Gaurdian_CountryId = row.GetIntValue("Gaurdian_CountryId"),
                            Gaurdian_StateId = row.GetIntValue("Gaurdian_StateId"),
                            Gaurdian_DistrictId = row.GetIntValue("Gaurdian_DistrictId"),
                            Gaurdian_TalukaId = row.GetIntValue("Gaurdian_TalukaId")

                            // Populate other properties as needed
                    };

                    responseImportStudentDataDto.Students.Add(importStudentDataDto);
                }


              
                    responseImportStudentDataDto = await _studentImportService.UploadStudentData(responseImportStudentDataDto.Students, userId,schoolCode);
              
            }
            return Ok(responseImportStudentDataDto);
        }

        public static DataTable GetDataTableFromExcelFile(string filePath)
        {
            DataTable dt = new DataTable();
            var sheetName = "Students";
            using (var document = SpreadsheetDocument.Open(filePath, false))
            {
                var workbookPart = document.WorkbookPart;
                Sheet sheet = workbookPart.Workbook.Descendants<Sheet>().FirstOrDefault(s => s.Name == sheetName);
                if (sheet != null)
                {
                    WorksheetPart worksheetPart= (WorksheetPart)workbookPart.GetPartById(sheet.Id);

                    var sheetData = worksheetPart.Worksheet.Elements<SheetData>().First();
                    var headerRow = sheetData.Elements<Row>().FirstOrDefault();
                    int totalHeaderCount = headerRow.Count();
                    for (int i = 1; i <= totalHeaderCount+1; i++)
                    {
                        dt.Columns.Add(GetCellValue(workbookPart, headerRow.Elements<Cell>().ToList(), i));
                    }
                    foreach (Row r in sheetData.Elements<Row>())
                    {
                        if (r.RowIndex > 1)
                        {
                            DataRow tempRow = dt.NewRow();

                            //Always get from the header count, because the index of the row changes where empty cell is not counted
                            for (int i = 1; i <= totalHeaderCount+1; i++)
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
                    { "Gen_Reg_No","required" },
                    { "Admission_No",""} , { "Roll_No"," " },{"Grade","required" }, { "Division" ,"required"},
                    {"Admission_Date","required" },{ "CBSC_Student_Id","" },
                    {"Student_First_Name","required" }, {"Student_Middle_Name","required" },
                    { "Student_Last_Name","required" }, {"Gender" ,"required"}, {"Adhaar_No","required" },
                    {"Religion","" }, {"Category","" }, {"Caste" ,""}, {"Sub_Caste","" }, {"Nationality","" },
                    { "Mother_Tongue","" }, {"Emergency_Contact_Person_Name","required" }, {"Emergency_Contact_No","required" }, {"Family_Doctor_Name","" }, {"Family_Doctor_No","" },
                    { "Birth_Place","" }, {"Birth_Date" ,"required"}, {"Date_Of_Birth_In_Words" ,""}, {"Birth_Country" ,"required"}, {"Birth_State","required" }, {"Birth_District","required" },
                    {"Birth_Taluka" ,"required"},{ "Current_Address_Line_1" ,"required"},{ "Current_Address_Line_2","" }, {"Current_Pincode","required" }, {"Current_Country","required" },
                    { "Current_State","required" }, {"Current_District","required" }, {"Current_Taluka","required" }, {"Blood_Group","" }, {"Height","" }, {"Weight" ,""},
                    { "Medical_History_Notes","" }, {"Previous_School_Name" ,""}, {"Previous_School_Standard","" }, {"Previous_School_Division","" },
                    { "Progress_Note_From_Last_School","" }, {"Conduct_Note_From_Last_School","" }, {"Reason_of_Leaving_School","" }, {"Date_of_Leaving_of_Previous_School","" },
                    { "Remark","" }, {"Is_New_Student","" }, {"Is_Deactive","" }, {"Is_RTE","" }, {"Apply_Concession" ,""}, {"Concession_Fee","" }, {"Academic_Year","required" },{"PreviousAcademicYearPendingFeeAmount",""},
                    { "Do_you_required_parent_mobile_app_access","" }, {"Mobile_Number_for_Application_Access","" },
                    { "Father_First_Name","required" },{ "Father_Middle_Name" ,"required"}, {"Father_Last_Name","required" }, {"Father_Gender","required" },
                    {"Father_Mobile_No" ,""}, {"Father_Alternate_Contact_No","" }, {"Father_Email_Id","" }, {"Father_Address_Line_1" ,""}, {"Father_Address_Line_2","" },
                    {"Father_Country","" }, {"Father_State","" }, {"Father_District","" }, {"Father_Taluka","" }, {"Father_Pincode" ,""}, {"Father_Adhaar_No",""},
                    { "Father_Education" ,""}, {"Father_Birth_Date","" }, {"Father_Occupation","" }, {"Father_Annual_Income","" }, {"Father_Blood_Group","" },
                    { "Mother_First_Name","required" },{ "Mother_Middle_Name","required" }, {"Mother_Last_Name" ,"required"}, {"Mother_Gender" ,"required"}, {"Mother_Mobile_No" ,""},
                    {"Mother_Alternate_Contact_No","" }, { "Mother_Email_Id","" }, {"Mother_Address_Line_1","" }, {"Mother_Address_Line_2","" }, {"Mother_Country" ,""},
                    {"Mother_State" ,""}, {"Mother_District","" }, {"Mother_Taluka" ,""},{ "Mother_Pincode","" }, {"Mother_Adhaar_No" ,""}, {"Mother_Education" ,""},
                    {"Mother_Birth_Date" ,""}, {"Mother_Occupation","" },{"Mother_Annual_Income","" }, {"Mother_Blood_Group" ,""},
                    {"Guardian_First_Name","required" },{ "Guardian_Middle_Name" ,"required"}, {"Guardian_Last_Name" ,"required"}, {"Guardian_Gender","required" },
                    { "Guardian_Mobile_No","" },{ "Guardian_Alternate_Contact_No","" },
                    { "Guardian_Email_Id",""}, {"Guardian_Address_Line_1"," "},{"Guardian_Address_Line_2",""},{"Guardian_Country",""},{"Guardian_State",""},
                    {"Guardian_District",""}, {"Guardian_Taluka","" }, {"Guardian_Pincode" ,""}, {"Guardian_Adhaar_No","" }, {"Guardian_Education","" },
                    {"Guardian_Birth_Date","" }, {"Guardian_Occupation" ,""}, {"Guardian_Annual_Income" ,""}, {"Guardian_Blood_Group","" } }
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
            string firstName = row.GetStringOrNullValue("Student_First_Name");
            string middleName = row.GetStringOrNullValue("Student_Middle_Name");
            string lastName = row.GetStringOrNullValue("Student_Last_Name");

            if (firstName != null && middleName != null && lastName != null &&
                firstName.ToLower() == "firstname" && lastName.ToLower() == "lastname" && middleName.ToLower() == "middlename")
            {
                return true; // Row contains sample data
            }

            return false; // Row does not contain sample data
        }
    }
}
