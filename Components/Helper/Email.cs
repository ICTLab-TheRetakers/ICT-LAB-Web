using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace ICT_LAB_Web.Components.Helper
{
    public class Email
    {
        private string Host;
        private int Port;
        private bool EnableSSL;
        private string EmailAddress;
        private string Password;
        private NetworkCredential Credentials;

        public Email()
        {
            this.EmailAddress = "";
            this.Password = "";
            this.Host = "smtp.gmail.com";
            this.Port = 587;
            this.EnableSSL = true;
            this.Credentials = new NetworkCredential(this.EmailAddress, this.Password);
        }

        public async Task SendPasswordResetEmail(string toEmail, string password)
        {
            var smtpClient = new SmtpClient
            {
                Host = this.Host,
                Port = this.Port,
                EnableSsl = this.EnableSSL,
                Credentials = this.Credentials
            };

            using (var message = new MailMessage(this.EmailAddress, toEmail)
            {

                Subject = "HINT Reservation System - Password Reset",
                Body = "Beneath you will find your temporary password. When signed in, please change. \n\nPassword: " + password
            })
            {
                await smtpClient.SendMailAsync(message);
            }
        }
    }
}
