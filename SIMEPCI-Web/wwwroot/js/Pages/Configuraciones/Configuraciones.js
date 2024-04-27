$(document).ready(function () {
    // Llamar al API para obtener los datos de configuración
    $.ajax({
        url: 'https://simepciapii.azurewebsites.net/api/Configuracion/GetAllConfiguraciones',
        method: 'GET',
        success: function (data) {
            
            data.forEach(function (config) {
                
                switch (config.nombre) {
                    case 'Impuesto':
                        $('#Impuesto').val(config.valor);
                        break;
                    case 'Recordatorios':
                        $('#Recordatorios').val(config.valor);
                        break;
                    case 'IVA':
                        $('#IVA').val(config.valor);
                        break;
                    default:
                        break;
                }
            });
        },
        error: function (error) {
            console.error('Error al obtener datos de configuración:', error);
        }
    });

     $('#updateRecordatorio').click(function () {
         
         var recordatorios = $('#Recordatorios').val();
         if (recordatorios < 0) {
             // Mostrar mensaje de error con SweetAlert
             Swal.fire({
                 icon: 'error',
                 title: 'Error',
                 text: 'El valor ingresado no puede ser negativo',
                 confirmButtonText: 'OK'
             });
             return;
         }
         
         $.ajax({
             url: 'https://simepciapii.azurewebsites.net/api/Configuracion/ActualizarRecordatorio?valorRecordatorio=' + recordatorios,
             method: 'POST',
             contentType: 'application/json',
             
             success: function (response) {
                 console.log('Configuración de notificación actualizada correctamente.');
                 mostrarMensaje();
             },
             error: function (error) {
                 console.error('Error al actualizar la configuración de notificación:', error);
             }
         });
     });
 
     $('#updateImpuesto').click(function () {
         
         var imp = $('#Impuesto').val();
 
         
         $.ajax({
             url: 'https://simepciapii.azurewebsites.net/api/Configuracion/ActualizarImpuesto?valorImpuesto=' + imp,
             method: 'POST',
             contentType: 'application/json',
             
             success: function (response) {
                 console.log('Configuración de notificación actualizada correctamente.');
                 mostrarMensaje();
             },
             error: function (error) {
                 console.error('Error al actualizar la configuración de notificación:', error);
             }
         });
     });
     $('#updateIva').click(function () {
         
         var iva = $('#IVA').val();
 
         
         $.ajax({
             url: 'https://simepciapii.azurewebsites.net/api/Configuracion/ActualizarIVA?valorRecordatorio=' + iva,
             method: 'POST',
             contentType: 'application/json',
            
             success: function (response) {
                 console.log('Configuración de notificación actualizada correctamente.');
                 mostrarMensaje();
             },
             error: function (error) {
                 console.error('Error al actualizar la configuración de notificación:', error);
             }
         });
     });

    function mostrarMensaje() {
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Parámetro actualizado',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                
                window.location.reload();
            }
        });
    }

    $('#llamarAPI').click(function () {
        $.ajax({
            url: 'https://simepciapii.azurewebsites.net/api/Cita/EnviarRecordatoriosCita', 
            method: 'POST',
            success: function (response) {
                console.log('Llamada al API exitosa.');
                mostrarMensaje2();
            },
            error: function (error) {
                console.error('Error al llamar al API:', error);
                // Puedes mostrar un mensaje de error o realizar otras acciones aquí
            }
        });
    });


    function mostrarMensaje2() {
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Notificaciones enviadas',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {

                window.location.reload();
            }
        });
    }
   
 });


 
