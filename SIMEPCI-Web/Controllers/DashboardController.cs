using Microsoft.AspNetCore.Mvc;

namespace SIMEPCI_Web.Controllers
{
    public class DashBoardController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult DashBoard()
        {
            return View();
        }
    }
}
