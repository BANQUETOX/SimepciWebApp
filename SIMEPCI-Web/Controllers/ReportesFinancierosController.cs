using Microsoft.AspNetCore.Mvc;

namespace SIMEPCI_Web.Controllers
{
    public class ReportesFinancierosController : Controller
    {
        public IActionResult ReportesFinancieros()
        {
            return View();
        }

        public IActionResult GananciasTotales()
        {
            return View();
        }
    }
}