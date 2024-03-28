﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SIMEPCI_Web.Controllers
{
    public class AgendaController : Controller
    {
        private static List<Cita> _citas = new List<Cita>
        {
            new Cita { Id = 1, Fecha = new DateTime(2024, 3, 24, 7, 30, 0), Procedimiento = "Sede Cartago", Confirmada = true },
            new Cita { Id = 2, Fecha = new DateTime(2024, 3, 24, 11, 0, 0), Procedimiento = "Sede Cartago", Confirmada = false },
            new Cita { Id = 3, Fecha = new DateTime(2024, 3, 24, 14, 0, 0), Procedimiento = "Sede San José", Confirmada = false },
            new Cita { Id = 4, Fecha = new DateTime(2024, 3, 24, 16, 0, 0), Procedimiento = "San José", Confirmada = false }
        };

        public IActionResult Agenda()
        {
            return View(_citas);
        }

        public IActionResult RegistroCitas()
        {
            // Por el momento, solo devuelve la vista de registro de citas
            return View();
        }

        public IActionResult Pagos()
        {
            // Por el momento, solo devuelve la vista de pagos
            return View();
        }

        public IActionResult DashboardDoctor()
        {
            // Por el momento, solo devuelve la vista del dashboard del doctor
            return View();
        }
    }

    public class Cita
    {
        public int Id { get; set; }
        public DateTime Fecha { get; set; }
        public string Procedimiento { get; set; }
        public bool Confirmada { get; set; }
    }
}