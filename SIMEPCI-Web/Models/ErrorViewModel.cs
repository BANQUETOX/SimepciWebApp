namespace SIMEPCI_Web.Models
{
    public class UserService
    {
        public string? RequestId { get; set; }

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}
