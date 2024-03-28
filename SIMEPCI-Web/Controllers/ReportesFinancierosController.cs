using Microsoft.AspNetCore.Mvc;

namespace SIMEPCI_Web.Controllers
{
    public class ReportesFinancierosController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult ReportesFinancieros()
        {
            var reportes = new List<Reporte>
            {
                new Reporte { Fecha = new DateTime(2024, 3, 14), Descripcion = "Lorem Ipsum", Sede = "Sede San José" },
                new Reporte { Fecha = new DateTime(2023, 3, 22), Descripcion = "Lorem Ipsum", Sede = "Sede San José" },
                new Reporte { Fecha = new DateTime(2023, 3, 1), Descripcion = "Lorem Ipsum", Sede = "Sede San José" },
                new Reporte { Fecha = new DateTime(2022, 11, 11), Descripcion = "Lorem Ipsum", Sede = "Sede San José" },
            };

            return View(reportes);
        }
    }

    public class Reporte
    {
        public DateTime Fecha { get; set; }
        public string Descripcion { get; set; }
        public string Sede { get; set; }
    }
}