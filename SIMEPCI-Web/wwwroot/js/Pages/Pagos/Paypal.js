var productos = [
    { nombre: "Producto 1", precio: 10 },
    { nombre: "Producto 2", precio: 20 }
    
]; //objeto de ejemplo- llenar con la informacion del API factura 


//calcular el total de la factura
function calcularTotal() {
    var total = 0;
    productos.forEach(function (producto) {
        total += producto.precio;
    });
    var impuesto = total * 0.13;
    total += impuesto;
    document.getElementById("impuesto").textContent = impuesto.toFixed(2);
    return total.toFixed(2);
}

// Popular datos
function poblarDesglose() {
    var tbody = document.getElementById("desgloseProductos");
    productos.forEach(function (producto) {
        var fila = "<tr><td>" + producto.nombre + "</td><td>$" + producto.precio.toFixed(2) + "</td></tr>";
        tbody.innerHTML += fila;
    });
    document.getElementById("total").textContent = calcularTotal();
}

// Modificar de acuerdo al sesion storage** 
document.getElementById("fecha").textContent = "13 de abril de 2024";
document.getElementById("numeroFactura").textContent = "123456";
document.getElementById("cliente").textContent = "Nombre del Cliente";

// Llamar a la función para poblar el desglose
poblarDesglose();
 




paypal.Buttons({
    createOrder: function (data, actions) {
       
        var total = calcularTotal();

        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: total
                }
            }]
        });
    },
    onApprove: function (data, actions) {
       
        return actions.order.capture().then(function (details) {
           
            alert('Transacción completada');
           
            window.location.href = '../Pagos/Encuesta';
        });
    }
}).render('#paypal-button-container');
