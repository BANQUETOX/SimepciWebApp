using System;
using System.Net;
using System.Net.Mail;
using Microsoft.AspNetCore.Mvc;

public class RecuperarContrasennaController : Controller
{
    private readonly string smtpServer = "smtp.gmail.com";
    private readonly int smtpPort = 587;
    private readonly string smtpUsername = "fito03fumero@gmail.com";
    private readonly string smtpPassword = "lhio meav xzwn juzx";

    public IActionResult Index()
    {
        return View();
    }

    [HttpPost]
    public IActionResult EnviarOTP([FromBody] EnviarOTPViewModel model)
    {
        try
        {
            string otp = GenerarOTP();

            EnviarCorreoElectronico(model.Email, otp);


            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Ocurrió un error al enviar el OTP: " + ex.Message);
        }
    }

    public IActionResult Confirmacion()
    {
        return View();
    }

    private string GenerarOTP()
    {
        Random random = new Random();
        return random.Next(100000, 999999).ToString();
    }

    private void EnviarCorreoElectronico(string email, string otp)
    {
        try
        {
            using (var smtpClient = new SmtpClient(smtpServer, smtpPort))
            {
                smtpClient.EnableSsl = true;
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new NetworkCredential(smtpUsername, smtpPassword);

                using (var message = new MailMessage(smtpUsername, email))
                {
                    message.Subject = "Código OTP para restablecer tu contraseña";
                    message.Body = $"Su código OTP es: {otp}";

                    smtpClient.Send(message);
                }
            }
        }
        catch (Exception ex)
        {
            throw new Exception("Ocurrió un error al enviar el correo electrónico: " + ex.Message);
        }
    }
}

public class EnviarOTPViewModel
{
    public string Email { get; set; }
}