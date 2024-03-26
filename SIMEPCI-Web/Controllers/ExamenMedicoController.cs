using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace SIMEPCI_Web.Controllers
{
    public class ExamenMedicoController : Controller
    {
        private static List<ExamenMedico> _examenes = new List<ExamenMedico>();

        public IActionResult Index()
        {
            return View(_examenes);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Index(ExamenMedico examen)
        {
            if (ModelState.IsValid)
            {
                _examenes.Add(examen);
                return RedirectToAction(nameof(Index));
            }
            return View(_examenes);
        }
    }

    public class ExamenMedico
    {
        public int Id { get; set; }
        public string Especialidad { get; set; }
        public string Procedimiento { get; set; }
        public DateTime Fecha { get; set; }
        public TimeSpan Hora { get; set; }
        public string Seccion { get; set; }
        public string Observaciones { get; set; }
    }
}