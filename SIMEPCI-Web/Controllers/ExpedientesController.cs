﻿using Microsoft.AspNetCore.Mvc;

namespace SIMEPCI_Web.Controllers
{
    public class ExpedientesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult RegistrarExpediente()
        {
            return View();
        }

        public IActionResult VerificarRegistro()
        {
            return View();
        }

        public IActionResult InfoPacientes()
        {
            return View();
        }

        public IActionResult MostrarExpediente(int id)
        {
            ViewBag.IdExpediente = id;
            return View();
        }

        public IActionResult RegistrarNotaMedica()
        {
            return View();
        }

        public IActionResult RegistrarNotaEnfermeria()
        {
            return View();
        }

        public IActionResult RegistrarHistorialMedico()
        {
            return View();
        }

        public IActionResult RegistrarDiagnostico()
        {
            return View();
        }
    }

    public class Expediente
    {
        public int IdPaciente { get; set; }
        public string NotasEnfermeria { get; set; }
        public string NotasMedicas { get; set; }
        public string AntecedentesMedicos { get; set; }
        public string Diagnostico { get; set; }
    }
}