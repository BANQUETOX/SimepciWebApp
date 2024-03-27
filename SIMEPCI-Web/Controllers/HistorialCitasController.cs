using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SIMEPCI_Web.Controllers
{
    public class HistorialCitasController : Controller
    {
        private static List<HistorialCita> _historialCitas = new List<HistorialCita>
        {
            new HistorialCita { Id = 1, Fecha = new DateTime(2024, 3, 14, 9, 0, 0), Procedimiento = "Consulta medicina general - Sede San José", Doctor = "Dr. Juan Vargas" },
            new HistorialCita { Id = 2, Fecha = new DateTime(2023, 2, 10, 11, 0, 0), Procedimiento = "Exámenes Rayos X - Sede San José", Doctor = "Dra. Ana Mora" },
        };

        public IActionResult Index(int pagina = 1)
        {
            int cantidadRegistrosPorPagina = 10;
            int totalRegistros = _historialCitas.Count;
            int totalPaginas = (int)Math.Ceiling((double)totalRegistros / cantidadRegistrosPorPagina);

            List<HistorialCita> citasPaginadas = _historialCitas
                .Skip((pagina - 1) * cantidadRegistrosPorPagina)
                .Take(cantidadRegistrosPorPagina)
                .ToList();

            ViewBag.PaginaActual = pagina;
            ViewBag.TotalPaginas = totalPaginas;

            return View(citasPaginadas);
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

    public class HistorialCita
    {
        public int Id { get; set; }
        public DateTime Fecha { get; set; }
        public string Procedimiento { get; set; }
        public string Doctor { get; set; }
    }
}
