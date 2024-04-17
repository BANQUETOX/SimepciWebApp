namespace SIMEPCI_Web.Models
{
    public class Cita
    {
        public int Id { get; set; }
        public DateTime Fecha { get; set; }
        public string Procedimiento { get; set; }
        public bool Confirmada { get; set; }
    }
}