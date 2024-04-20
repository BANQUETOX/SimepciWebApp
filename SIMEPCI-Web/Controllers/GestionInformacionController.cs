using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace SIMEPCI_Web.Controllers
{
    public class GestionInformacionController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GestionFuncionarios()
        {
            ViewData["JsFile"] = "GestionFuncionarios.js";
            return View();
        }

        public IActionResult GestionSedes()
        {
            return View();
        }

        public IActionResult RegistroSede()
        {
            return View();
        }

        public IActionResult Menu()
        {
            return View();
        }
    }
}