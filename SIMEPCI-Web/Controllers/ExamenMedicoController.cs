using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;

namespace SIMEPCI_Web.Controllers
{
    public class ExamenMedicoController : Controller
    {
        private static List<ExamenMedico> _examenes = new List<ExamenMedico>();
        private readonly IWebHostEnvironment _hostingEnvironment;

        public ExamenMedicoController(IWebHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        public IActionResult RegistroExamenes()
        {
            return View(_examenes);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult RegistroExamenes(ExamenMedico examen)
        {
            if (ModelState.IsValid)
            {
                _examenes.Add(examen);
                return RedirectToAction(nameof(Index));
            }
            return View(_examenes);
        }

        public IActionResult SubirImagen()
        {
            return View();
        }

        [HttpPost]
        public IActionResult SubirImagen(IFormFile imagen)
        {
            if (imagen != null && imagen.Length > 0)
            {
                var fileName = Path.GetFileName(imagen.FileName);
                var extension = Path.GetExtension(fileName).ToLower();

                if (extension == ".png")
                {
                    var filePath = Path.Combine(_hostingEnvironment.WebRootPath, "uploads", fileName);
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        imagen.CopyTo(fileStream);
                    }

                    // Guardar la URL de la imagen subida en una variable de vista
                    ViewBag.ImagenUrl = "/uploads/" + fileName;

                    // Devolver la vista parcial con la imagen subida
                    return PartialView("_ImagenSubida", ViewBag.ImagenUrl);
                }
            }
            return PartialView("_ImagenSubida", "");
        }
    }

    public class ExamenMedico
    {
        public int Id { get; set; }
        public string Especialidad { get; set; }
        public string Procedimiento { get; set; }
        public DateTime Fecha { get; set; }
        public TimeSpan Hora { get; set; }
        public string Seccion { get; set; }
        public string Observaciones { get; set; }
    }
}