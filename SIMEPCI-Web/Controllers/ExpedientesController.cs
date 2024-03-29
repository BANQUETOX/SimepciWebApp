using Microsoft.AspNetCore.Mvc;

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
            new InformacionPaciente { Nombre="Alonso Rojas Araya", FechaNacimiento = new DateTime(1995, 01, 29), Direccion="Urbanización El Roble, Casa #4, Mercedes Norte, Heredia", Diagnostico="Covid 19, virus no especificado - 04/12/2022"},
            };

            return View(pacientes);
        }
    }

    public class InformacionPaciente 
    { 
        public string Nombre { get; set; }  

        public DateTime FechaNacimiento { get; set; }   

        public string Direccion {  get; set; }  

        public string Diagnostico { get; set; }
    }
}
