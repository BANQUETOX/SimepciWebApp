﻿using Microsoft.AspNetCore.Mvc;

namespace SIMEPCI_Web.Controllers
{
    public class ConfiguracionesController : Controller
    {
        public IActionResult Configuraciones()
        {
            return View();
        }

        public IActionResult GestionEspecialidades()
        {
            return View();
        }

        public IActionResult GestionCupos()
        {
            return View();
        }
    }
}
