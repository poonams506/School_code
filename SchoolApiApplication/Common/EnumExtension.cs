using System;
using System.ComponentModel;
using System.Reflection;
namespace SchoolApiApplication.Common
{
    public static class EnumExtension
    {
        public static string Description<T>(this T source)
        {
            if(source == null)
            {
                return string.Empty;
            }
            FieldInfo? fi = source.GetType().GetField(Convert.ToString(source)??string.Empty);
            if(fi == null)
            {
                return string.Empty;
            }
            DescriptionAttribute[] attributes = (DescriptionAttribute[])fi.GetCustomAttributes(
                typeof(DescriptionAttribute), false);

            if (attributes != null && attributes.Length > 0)
            {
                return attributes[0].Description;
            }
            else
            {
                return source.ToString() ?? string.Empty;
            }

        }
    }
}
