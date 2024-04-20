using Microsoft.AspNetCore.Mvc;

namespace SIMEPCI_Web.Controllers
{
    public class ExpedientesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult RegistrarExpediente()
        {
            return View();
        }

        public IActionResult VerificarRegistro()
        {
            return View();
        }

        public IActionResult MostrarExpediente(int id)
        {
            ViewBag.IdExpediente = id;
            return View();
        }
    }

    public class Expediente
    {
        public int IdPaciente { get; set; }
        public string NotasEnfermeria { get; set; }
        public string NotasMedicas { get; set; }
        public string HistorialMedico { get; set; }
    }
}
