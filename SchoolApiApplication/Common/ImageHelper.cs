namespace SchoolApiApplication.Common
{
    public class ImageHelper
    {
       public static string GetMimeType(string filePath)
        {
            // Create a dictionary to map file extensions to MIME types
            Dictionary<string, string> mimeTypes = new Dictionary<string, string>
        {
            { ".jpg", "image/jpeg" },
            { ".jpeg", "image/jpeg" },
            { ".png", "image/png" },
            { ".gif", "image/gif" },
            // Add more extensions and corresponding MIME types as needed
        };

            // Get the file extension from the file path
            string extension = Path.GetExtension(filePath)?.ToLowerInvariant();

            if (extension != null && mimeTypes.TryGetValue(extension, out var mimeType))
            {
                return mimeType;
            }

            // Default MIME type if extension is not recognized
            return "application/octet-stream";
        }
    }
}
