using Microsoft.AspNetCore.Mvc;

namespace SIMEPCI_Web.Controllers

{

    public class RecetasController : Controller

    {

        public IActionResult Index()

        {

            return View();

        }

        public IActionResult RegistrarReceta()

        {

            return View();

        }

        public IActionResult VisualizarRecetas()

        {


            var recetas = new List<Receta>

{

new Receta { Nombre="Clonazepam", FechaEmision=DateTime.Now, Dosis="25mg cada 4 horas", Duracion="Tres meses", Observaciones="Lorem ipsum..." },

new Receta { Nombre="Clonazepam", FechaEmision=DateTime.Now, Dosis="25mg cada 4 horas", Duracion="Tres meses", Observaciones="Lorem ipsum..." },

new Receta { Nombre="Clonazepam", FechaEmision=DateTime.Now, Dosis="25mg cada 4 horas", Duracion="Tres meses", Observaciones="Lorem ipsum..." }

};

            return View(recetas);

        }

    }

    public class Receta

    {

        public string Nombre { get; set; }

        public DateTime FechaEmision { get; set; }

        public string Dosis { get; set; }

        public string Duracion { get; set; }

        public string Observaciones { get; set; }

    }

}