document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var email = document.getElementById('email').value;

        fetch('/RecuperarContrasenna/EnviarOTP', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        })
            .then(function (response) {
                if (response.ok) {
                    alert('Se ha enviado un OTP a su correo electrónico. Por favor, revise su bandeja de entrada.');
                    window.location.href = '/RecuperarContrasenna/Confirmacion';
                } else {
                    response.text().then(function (errorMessage) {
                        alert('Ocurrió un error al enviar el OTP: ' + errorMessage);
                    });
                }
            })
            .catch(function (error) {
                console.error('Error:', error);
                alert('Ocurrió un error al enviar el OTP. Por favor, intente nuevamente.');
            });
    });
});