using System.Data;
using System.Globalization;

namespace SchoolApiApplication.Common
{
    public static class ExcelHelper
    {
        public static int GetIntValue(this DataRow row, string columnName)
        {
            int value = 0;
            if (row.Table.Columns.Contains(columnName) && row[columnName] != DBNull.Value)
            {
                int.TryParse(row[columnName].ToString(), out value);
            }
            return value;
        }

        public static string GetStringOrNullValue(this DataRow row, string columnName)
        {
            return row.Table.Columns.Contains(columnName) && row[columnName] != DBNull.Value && !string.IsNullOrEmpty(Convert.ToString(row[columnName]))
                && !string.IsNullOrWhiteSpace(Convert.ToString(row[columnName]))
                ? row[columnName].ToString().Trim() : null;
        }

        public static DateTime? GetDateTimeValue(this DataRow row, string columnName)
        {
            string format = "dd-MM-yyyy";
            return row.Table.Columns.Contains(columnName) && row[columnName] != DBNull.Value && !string.IsNullOrEmpty(Convert.ToString(row[columnName]))
                && !string.IsNullOrWhiteSpace(Convert.ToString(row[columnName]))
                ? DateTime.ParseExact(Convert.ToString(row[columnName]), format, CultureInfo.InvariantCulture)
                : null;
        }

        public static bool GetBooleanValue(this DataRow row, string columnName)
        {
            return row.Table.Columns.Contains(columnName) && row[columnName] != DBNull.Value && !string.IsNullOrEmpty(Convert.ToString(row[columnName]))
                && !string.IsNullOrWhiteSpace(Convert.ToString(row[columnName]))
                && Convert.ToBoolean(row[columnName]); // Set to false for boolean
        }

        public static decimal? GetDecimalValue(this DataRow row, string columnName)
        {
            return row.Table.Columns.Contains(columnName) && row[columnName] != DBNull.Value && !string.IsNullOrEmpty(Convert.ToString(row[columnName]))
                && !string.IsNullOrWhiteSpace(Convert.ToString(row[columnName]))
                ? Convert.ToDecimal(row[columnName])
                : null;
        }

    }
}
