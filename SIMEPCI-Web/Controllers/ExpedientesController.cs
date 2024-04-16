using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace SIMEPCI_Web.Controllers
{
    public class ExpedientesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult InfoPacientes()
        {
            var pacientes = new List<InformacionPaciente>
            {
                new InformacionPaciente
                {
                    Nombre = "Alonso Rojas Araya",
                    FechaNacimiento = new DateTime(1995, 01, 29),
                    Direccion = "Urbanización El Roble, Casa #4, Mercedes Norte, Heredia",
                    Diagnostico = "Covid 19, virus no especificado - 04/12/2022"
                }
            };
            return View(pacientes);
        }

        public IActionResult NotasMedicasEnfermeria()
        {
            var notas = new List<Anotaciones>
            {
                new Anotaciones
                {
                    NotasMedicas = "Quisque a ultrices lectus. Nulla ultrices enim tempor tincidunt iaculis. Nunc sed nisi non sem varius congue. Aliquam ut leo eu odio luctus accumsan a consectetur tortor. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
                    NotasEnfermeria = "Quisque a ultrices lectus. Nulla ultrices enim tempor tincidunt iaculis. Nunc sed nisi non sem varius congue. Aliquam ut leo eu odio luctus accumsan a consectetur tortor. Interdum et malesuada fames ac ante ipsum primis in faucibus."
                }
            };
            return View(notas);
        }

        public IActionResult RegistrarExpediente()
        {
            return View();
        }

        [HttpPost]
        public IActionResult RegistrarExpediente(Expediente expediente)
        {
            if (ModelState.IsValid)
            {
                return RedirectToAction("Index");
            }
            return View(expediente);
        }

        public IActionResult MostrarExpediente(int id)
        {
            var expediente = new Expediente
            {
                Id = id,
                Nombre = "Alonso Rojas Araya",
                FechaNacimiento = new DateTime(1995, 01, 29),
                Direccion = "Urbanización El Roble, Casa #4, Mercedes Norte, Heredia",
                Diagnostico = "Covid 19, virus no especificado - 04/12/2022",
                NotasMedicas = "Quisque a ultrices lectus. Nulla ultrices enim tempor tincidunt iaculis.",
                NotasEnfermeria = "Nunc sed nisi non sem varius congue. Aliquam ut leo eu odio luctus accumsan a consectetur tortor.",
                Antecedentes = "Interdum et malesuada fames ac ante ipsum primis in faucibus."
            };
            return View(expediente);
        }
    }

    public class InformacionPaciente
    {
        public string Nombre { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public string Direccion { get; set; }
        public string Diagnostico { get; set; }
    }

    public class Anotaciones
    {
        public string NotasMedicas { get; set; }
        public string NotasEnfermeria { get; set; }
    }

    public class Expediente
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public string Direccion { get; set; }
        public string Diagnostico { get; set; }
        public string NotasMedicas { get; set; }
        public string NotasEnfermeria { get; set; }
        public string Antecedentes { get; set; }
    }
}


