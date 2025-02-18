using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace SchoolApiApplication.Common
{
    public static class CryptoJS
    {
        public static string EncryptAES(string plainText, string key)
        {
            using (Aes aesAlg = Aes.Create())
            {
                aesAlg.Padding = PaddingMode.PKCS7;
                aesAlg.Key = Encoding.UTF8.GetBytes(key);

                // Generate a random IV
                aesAlg.GenerateIV();

                ICryptoTransform encryptor = aesAlg.CreateEncryptor(aesAlg.Key, aesAlg.IV);

                using (MemoryStream msEncrypt = new MemoryStream())
                {
                    using (CryptoStream csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                    {
                        using (StreamWriter swEncrypt = new StreamWriter(csEncrypt))
                        {
                            swEncrypt.Write(plainText);
                        }
                    }

                    // Prepend the IV to the ciphertext
                    byte[] ivBytes = aesAlg.IV;
                    byte[] encryptedBytes = msEncrypt.ToArray();
                    byte[] combinedBytes = new byte[ivBytes.Length + encryptedBytes.Length];
                    Buffer.BlockCopy(ivBytes, 0, combinedBytes, 0, ivBytes.Length);
                    Buffer.BlockCopy(encryptedBytes, 0, combinedBytes, ivBytes.Length, encryptedBytes.Length);

                    return Convert.ToBase64String(combinedBytes);
                }
            }
        }

        public static string DecryptAES(string cipherText, string key)
        {
            byte[] combinedBytes = Convert.FromBase64String(cipherText);

            using (Aes aesAlg = Aes.Create())
            {
                aesAlg.Key = Encoding.UTF8.GetBytes(key);
                aesAlg.BlockSize = aesAlg.LegalBlockSizes[0].MaxSize;
                aesAlg.KeySize = aesAlg.LegalKeySizes[0].MaxSize;

                // Extract the IV from the combined bytes
                byte[] ivBytes = new byte[aesAlg.BlockSize / 8];
                byte[] encryptedBytes = new byte[combinedBytes.Length - ivBytes.Length];
                Buffer.BlockCopy(combinedBytes, 0, ivBytes, 0, ivBytes.Length);
                Buffer.BlockCopy(combinedBytes, ivBytes.Length, encryptedBytes, 0, encryptedBytes.Length);
                aesAlg.IV = ivBytes;

                ICryptoTransform decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV);

                using (MemoryStream msDecrypt = new MemoryStream(encryptedBytes))
                {
                    using (CryptoStream csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                    {
                        using (StreamReader srDecrypt = new StreamReader(csDecrypt))
                        {
                            return srDecrypt.ReadToEnd();
                        }
                    }
                }
            }
        }

    }
}
