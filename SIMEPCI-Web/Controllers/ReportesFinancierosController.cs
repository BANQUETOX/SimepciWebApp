using Microsoft.AspNetCore.Mvc;

namespace SIMEPCI_Web.Controllers
{
    public class ReportesFinancierosController : Controller
    {
        public IActionResult ReportesFinancieros()
        {
            var reportes = new List<Reporte>
            {
                new Reporte
                {
                    Fecha = new DateTime(2024, 3, 14),
                    Descripcion = "Lorem Ipsum",
                    Sede = "San José",
                    CedulaCliente = "123456789",
                    Doctor = "Dr. Juan Pérez",
                    CostoCita = 50000
                },
                new Reporte
                {
                    Fecha = new DateTime(2023, 3, 22),
                    Descripcion = "Lorem Ipsum",
                    Sede = "San José",
                    CedulaCliente = "987654321",
                    Doctor = "Dra. María Rodríguez",
                    CostoCita = 45000
                },
                new Reporte
                {
                    Fecha = new DateTime(2023, 3, 1),
                    Descripcion = "Lorem Ipsum",
                    Sede = "San José",
                    CedulaCliente = "456789123",
                    Doctor = "Dr. Carlos Ramírez",
                    CostoCita = 55000
                },
                new Reporte
                {
                    Fecha = new DateTime(2022, 11, 11),
                    Descripcion = "Lorem Ipsum",
                    Sede = "San José",
                    CedulaCliente = "789123456",
                    Doctor = "Dra. Laura Gómez",
                    CostoCita = 60000
                },
            };

            return View(reportes);
        }

        public IActionResult GananciasTotales()
        {
            return View();
        }
    }

    public class Reporte
    {
        public DateTime Fecha { get; set; }
        public string Descripcion { get; set; }
        public string Sede { get; set; }
        public string CedulaCliente { get; set; }
        public string Doctor { get; set; }
        public decimal CostoCita { get; set; }
    }
}