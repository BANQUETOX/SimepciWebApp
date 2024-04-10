using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

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

        public IActionResult VisualizarRecetas()
        {
            var recetas = new List<Receta>
            {
                new Receta { Nombre="Clonazepam", FechaEmision=DateTime.Now, Dosis="25mg cada 4 horas", Duracion="Tres meses", Observaciones="Lorem ipsum..." },
                new Receta { Nombre="Clonazepam", FechaEmision=DateTime.Now, Dosis="25mg cada 4 horas", Duracion="Tres meses", Observaciones="Lorem ipsum..." },
                new Receta { Nombre="Clonazepam", FechaEmision=DateTime.Now, Dosis="25mg cada 4 horas", Duracion="Tres meses", Observaciones="Lorem ipsum..." }
            };
            return View(recetas);
        }

        public IActionResult SubirReceta()
        {
            return View();
        }



    public class Receta
    {
        public string Nombre { get; set; }
        public DateTime FechaEmision { get; set; }
        public string Dosis { get; set; }
        public string Duracion { get; set; }
        public string Observaciones { get; set; }
    }
}}