using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;

namespace SIMEPCI_Web.Controllers
{
    public class RecetasController : Controller
    {
        private readonly IWebHostEnvironment _hostingEnvironment;

        public RecetasController(IWebHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult RegistrarReceta()
        {
            return View();
        }


        public IActionResult VistaRecetas()
        {
            return View();
        }


    }

   
}