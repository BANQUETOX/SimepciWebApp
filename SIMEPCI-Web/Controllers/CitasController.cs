using Microsoft.AspNetCore.Mvc;

namespace SIMEPCI_Web.Controllers
{
    public class CitasController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult CitasProgramadas()
        {
            return View();
        }
    }
    
}
