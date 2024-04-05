using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SIMEPCI_Web.Controllers
{
    public class CitasController : Controller
    {
        private static List<HistorialCita> _historialCitas = new List<HistorialCita>
        {
            new HistorialCita { Id = 1, Fecha = new DateTime(2024, 3, 14, 9, 0, 0), Procedimiento = "Consulta medicina general - Sede San José", Doctor = "Dr. Juan Vargas" },
            new HistorialCita { Id = 2, Fecha = new DateTime(2023, 2, 10, 11, 0, 0), Procedimiento = "Exámenes Rayos X - Sede San José", Doctor = "Dra. Ana Mora" },
        };

        public IActionResult CitasProgramadas()
        {
             return View();
        }

        public IActionResult CitasHistorial(int pagina = 1)
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

        public IActionResult CitasEspecialidad()
        {
            var especialidades = new List<string> { "Medicina General", "Pediatría", "Cardiología", "Dermatología" };
            ViewBag.Especialidades = especialidades;

            var sedes = new List<string> { "Sede San José", "Sede Alajuela", "Sede Cartago", "Sede Heredia" };
            ViewBag.Sedes = sedes;

            return View();
        }

        [HttpPost]
        public IActionResult CitasEspecialidad(string especialidad, string sede, int mes, int dia, int hora)
        {
            return RedirectToAction("Calendario", new { especialidad, sede, mes, dia, hora });
        }

        public IActionResult Calendario(string especialidad, string sede, int mes, int dia, int hora)
        {
            var citasDisponibles = new List<CitaDisponible>
            {
                new CitaDisponible { Id = 1, Fecha = new DateTime(2023, mes, dia, hora, 0, 0), Especialidad = especialidad, Sede = sede, Doctor = "Dr. Pedro Ramírez" },
                new CitaDisponible { Id = 2, Fecha = new DateTime(2023, mes, dia, hora + 1, 0, 0), Especialidad = especialidad, Sede = sede, Doctor = "Dra. María Gómez" },
                new CitaDisponible { Id = 3, Fecha = new DateTime(2023, mes, dia, hora + 2, 0, 0), Especialidad = especialidad, Sede = sede, Doctor = "Dr. Luis Fernández" },
            };

            ViewBag.CitasDisponibles = citasDisponibles;
            ViewBag.Especialidad = especialidad;
            ViewBag.Sede = sede;
            ViewBag.Mes = mes;
            ViewBag.Dia = dia;
            ViewBag.Hora = hora;

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

    public class CitaDisponible
    {
        public int Id { get; set; }
        public DateTime Fecha { get; set; }
        public string Especialidad { get; set; }
        public string Sede { get; set; }
        public string Doctor { get; set; }
    }
}