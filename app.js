// Definición de los productos disponibles
const productos = [
    { nombre: "Buzo", precio: 5500 },
    { nombre: "Remera", precio: 1200 },
    { nombre: "Camisa", precio: 2500 },
    { nombre: "Pantalón", precio: 3200 }
];

let carrito = [];

const calculoTotal = () => {
    return carrito.reduce((total, producto) => {
        return total + producto.precio * producto.cantidad;
    }, 0);
};

const mostrarDetalleCompra = () => {
    const detalleContainer = document.getElementById('detalleCompra');
    detalleContainer.textContent = '';

    const detalle = carrito.map((producto) => {
        const subtotal = producto.precio * producto.cantidad;
        const productoDiv = document.createElement('div');
        productoDiv.textContent = `Producto: ${producto.nombre}\n` +
            `Cantidad: ${producto.cantidad}\n` +
            `Precio unitario: $${producto.precio}\n` +
            `Subtotal: $${subtotal}`;
        return productoDiv;
    });

    const total = calculoTotal();
    const detalleCompra = document.createElement('div');
    detalleCompra.innerHTML = `<h2>Detalle de la compra:</h2>`;
    detalle.forEach((productoDiv) => {
        detalleCompra.appendChild(productoDiv);
    });
    detalleCompra.innerHTML += `<h2>Total a pagar: $${total}</h2>`;

    detalleContainer.appendChild(detalleCompra);
};

const guardarCarritoEnLocalStorage = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

// Función para cargar el carrito desde el Local Storage al cargar la página
const cargarCarritoDesdeLocalStorage = () => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        mostrarDetalleCompra();
    }
};

// Función para agregar productos al carrito
const agregarAlCarrito = (indice) => {
    const cantidadInput = document.getElementById(`cantidad${indice}`);
    const cantidad = parseInt(cantidadInput.value);

    if (cantidad > 0) {
        const producto = productos[indice];
        const productoEnCarrito = carrito.find((p) => p.nombre === producto.nombre);

        if (productoEnCarrito) {
            productoEnCarrito.cantidad += cantidad;
        } else {
            carrito.push({
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: cantidad
            });
        }

        mostrarDetalleCompra();
        guardarCarritoEnLocalStorage();
        cantidadInput.value = '';
    }
};

// Eventos "Agregar al Carrito"
const agregarBotones = document.querySelectorAll('.agregar-btn');
agregarBotones.forEach((boton, indice) => {
    boton.addEventListener('click', () => {
        agregarAlCarrito(indice);
    });
});

const borrarCarrito = () => {
    carrito = [];
    localStorage.removeItem('carrito');
    mostrarDetalleCompra();
};

// Evento "Borrar Carrito"
const botonBorrarCarrito = document.getElementById('borrarCarrito');
botonBorrarCarrito.addEventListener('click', borrarCarrito);

// Cargar carrito desde el Local Storage al cargar la página
window.onload = () => {
    mostrarDetalleCompra();
    cargarCarritoDesdeLocalStorage();
};

