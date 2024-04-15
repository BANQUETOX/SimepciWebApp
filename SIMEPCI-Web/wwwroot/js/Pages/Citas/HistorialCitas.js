function AppointmentList() {
    this.InitView = function () {
        this.GetAppointments();
        this.LoadContextInformation();
    }
    this.GetAppointments = function () {
        url_base = "https://localhost:7003/api/Cita/GetCitasPaciente"; //Cambiar
        $.ajax({
            url: url_base + "?Id=" + sessionStorage["Id"],
            method: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json"
        }).done(function (result) {
            if (result)
                citaGridOptions.api.setRowData(result);
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de Ejecucion',
                    text: 'Hubo un error! ' + result.message
                })
            }
        }).fail(function (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong! ' + error
            })
        });
    }

    this.LoadContextInformation = function () {
        $('#txtCitaData').val(sessionStorage["citaData"]);
    }

}
$(document).ready(function () {
    var view = new AppointmentList();
    view.InitView();
});