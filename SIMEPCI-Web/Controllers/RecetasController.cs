using Microsoft.AspNetCore.Mvc;

namespace SIMEPCI_Web.Controllers
{
    public class RecetasController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult RegistrarReceta()
        {
            return View();
        }
    }
}
