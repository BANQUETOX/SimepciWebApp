﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SIMEPCI_Web.Controllers
{
    public class ExamenMedico: Controller
    {
        // GET: /<controller>/
        public IActionResult RegistroExamenes()
        {
            return View();
        }

        public IActionResult ResultadosPaciente()
        {
            return View();
        }

        public IActionResult ResultadosEnfermera()
        {
            return View();
        }
    }
}

