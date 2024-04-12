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

        [HttpPost]
        public IActionResult SubirReceta(IFormFile receta)
        {
            if (receta != null && receta.Length > 0)
            {
                var fileName = Path.GetFileName(receta.FileName);
                var extension = Path.GetExtension(fileName).ToLower();
                if (extension == ".png")
                {
                    var filePath = Path.Combine(_hostingEnvironment.WebRootPath, "uploads", fileName);
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        receta.CopyTo(fileStream);
                    }
                    ViewBag.RecetaUrl = "/uploads/" + fileName;
                    return PartialView("_RecetaSubida", ViewBag.RecetaUrl);
                }
            }
            return PartialView("_RecetaSubida", "");
        }
    }

    public class Receta
    {
        public string Nombre { get; set; }
        public DateTime FechaEmision { get; set; }
        public string Dosis { get; set; }
        public string Duracion { get; set; }
        public string Observaciones { get; set; }
    }
}