
let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];  // ssesionStorage guarda los datos solo mientras la pestaña está abierta. JSON.parse convierte el texto guardado en un arreglo de JavaScript y si no existe un carrito crea un arreglo vacío [].
//CARRITO DE COMPRA//
function agregarCarrito(nombre, precio) {
    let producto = {
        nombre: nombre,
        precio: precio
    }; //objeto con los datos del producto

    carrito.push(producto); //agrega el producto al arreglo
    sessionStorage.setItem("carrito", JSON.stringify(carrito)); // Guarda el carrito en el navegador. JSON.stringify convierte el arreglo en texto para poder almacenarlo.
    actualizarContador();
    mostrarToast();
}

function actualizarContador() {
    let contador = document.getElementById("contador"); // Busca el elemento HTML que tiene id="contador"

    if (contador) {

        contador.innerHTML = carrito.length;   // Cambia el número del carrito según la cantidad de productos
    }
}

function mostrarToast() {
    const toast = document.getElementById("toast");
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500); // Después de 2.5 segundos elimina la clase y oculta el mensaje
}

window.onload = function () {
    actualizarContador();

    if (document.getElementById("listaProductos")) {

        if (document.title === "Carrito") {
            mostrarTablaCarrito();
        }

        if (document.title === "Pago") {
            mostrarTablaPago();
        }
    }
};

//PARA EL BUSCADOR//
function abrirBusqueda() {
    document.getElementById("buscador").style.display = "flex"; //muestra el panel 
}

function cerrarBusqueda() {
    document.getElementById("buscador").style.display = "none"; //cierra el panel
}

function buscar() {

    let producto = document.getElementById("buscarProducto").value.toLowerCase(); // Obtiene lo escrito en el buscador y lo pasa a minúsculas

    switch (producto) {
        case "sacos":
            window.location.href = "ListaProductosH.html#Sacos"
        
        case "camisas":
            window.location.href = "ListaProductosH.html#Camisas";
            break;

        case "pantalones":
            window.location.href = "ListaProductosH.html#Pantalones";
            break;

        case "vestidos":
            window.location.href = "ListaProductosM.html#Vestidos";
            break;

        case "zapatos":
            window.location.href = "ListaProductosH.html#Zapatos";
            break;

        case "zapatillas":
            window.location.href = "ListaProductosH.html#Zapatillas";
            break;

        case "relojes":
            window.location.href = "ListaProductosH.html#Relojes";
            break;

        case "collares":
            window.location.href = "ListaProductosH.html#Collares";
            break;

        default:
            alert("Producto no encontrado");
            break;
    }
}
//PARA EL PAGO//
function mostrarTablaCarrito() {
    let lista = document.getElementById("listaProductos");
    lista.innerHTML = "";

    let subtotal = 0;

    for (let i = 0; i < carrito.length; i++) {
        let precio = Number(carrito[i].precio);
        lista.innerHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${carrito[i].nombre}</td>
            <td>${precio.toFixed(2)}</td>
            
            <td>
                <button onclick="eliminarProducto(${i})">Eliminar</button>
            </td>
        </tr>
        `;
        subtotal += precio;
    }
    document.getElementById("subtotal").innerHTML = "S/ " + subtotal.toFixed(2);
    document.getElementById("total").innerHTML = "S/ " + (subtotal + 15).toFixed(2);
}
function mostrarTablaPago() {
    let lista = document.getElementById("listaProductos");
    lista.innerHTML = "";

    let subtotal = 0;

    for (let i = 0; i < carrito.length; i++) {
        let precio = Number(carrito[i].precio);

        lista.innerHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${carrito[i].nombre}</td>
            <td>${precio.toFixed(2)}</td>
        </tr>
        `;

        subtotal += precio;
    }

    document.getElementById("subtotal").innerHTML = "S/ " + subtotal.toFixed(2);
    document.getElementById("total").innerHTML = "S/ " + (subtotal + 15).toFixed(2);
}
function eliminarProducto(indice) {

    carrito.splice(indice, 1);

    sessionStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarContador();

    mostrarTabla();

}