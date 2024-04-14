using Microsoft.AspNetCore.Mvc;

namespace SIMEPCI_Web.Controllers
{
    public class PagosController : Controller
    {
        public IActionResult HistorialDePagos()
        {

            return View();
        }


        public IActionResult Paypal()
        {

            return View();
        }

        public IActionResult Encuesta()
        {

            return View();
        }

        public static List<HistorialPagos> _historialPagos = new List<HistorialPagos>
        {
            new HistorialPagos { Id = 1, Fecha = new DateTime(2024, 3, 14, 9, 0, 0), Procedimiento = "Consulta medicina general - Sede San José", Monto = "₡30,000.00" },
            new HistorialPagos { Id = 2, Fecha = new DateTime(2023, 2, 10, 11, 0, 0), Procedimiento = "Exámenes Rayos X - Sede San José", Monto = "₡70,000.00" },
        };

        public IActionResult PagosHistorial(int pagina = 1)
        {
            int cantidadRegistrosPorPagina = 10;
            int totalRegistros = _historialPagos.Count;
            int totalPaginas = (int)Math.Ceiling((double)totalRegistros / cantidadRegistrosPorPagina);

            List<HistorialPagos> pagosPaginados = _historialPagos
                .Skip((pagina - 1) * cantidadRegistrosPorPagina)
                .Take(cantidadRegistrosPorPagina)
                .ToList();

            ViewBag.PaginaActual = pagina;
            ViewBag.TotalPaginas = totalPaginas;

            return View(pagosPaginados);
        }

    
    }

    public class HistorialPagos
    {
        public int Id { get; set; }
        public DateTime Fecha { get; set; }
        public string? Procedimiento { get; set; }
        public string? Monto { get; set; }
    }
}
