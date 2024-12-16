

// Datos base para crear productos dinámicamente
const productosDatos = [
    { id: 1, nombre: "Dragon Ball Z: Budokai", year: 2002, description: "Un juego de lucha basado en la popular serie.", precio: 100, stock: 100 },
    { id: 2, nombre: "Dragon Ball Z: Budokai 2", year: 2003, description: "Secuela del primer juego, con nuevas mecánicas y personajes.", precio: 100, stock: 100 },
    { id: 3, nombre: "Dragon Ball Z: 2V", year: 2004, description: "Gráficos mejorados y más personajes.", precio: 100, stock: 100 },
    { id: 4, nombre: "Dragon Ball Z: Budokai 3", year: 2006, description: "Un spin-off para PSP con combates rápidos y emocionantes.", precio: 100, stock: 100 },
    { id: 5, nombre: "Dragon Ball Z: Shin Budokai", year: 2008, description: "El último juego de Dragon Ball Z en la PS2.", precio: 100, stock: 100 },
    { id: 6, nombre: "Dragon Ball Z: Shin Budokai 2", year: 2008, description: "Un juego que marca el regreso de Dragon Ball en la nueva generación.", precio: 100, stock: 100 },
    { id: 7, nombre: "Dragon Ball Z: Burst Limit", year: 2009, description: "Introducción de gráficos HD y combates dinámicos.", precio: 100, stock: 100 },
    { id: 8, nombre: "Dragon Ball Z: Infinite World", year: 2010, description: "Un juego enfocado en combates en equipo para PSP.", precio: 100, stock: 100 },
    { id: 9, nombre: "Dragon Ball: Evolution", year: 2015, description: "juego de lucha basado en la pelicula", precio: 100, stock: 100 },
    { id: 10, nombre: "Dragon Ball Z: Budokai HD Collection", year: 2018, description: " El juego incluye Budokai y Budokai 3, adaptados y remasterizados ", precio: 100, stock: 100 }
];

// Crear productos dinámicamente con map
const productos = productosDatos.map(product => ({
    id: product.id,
    nombre: product.nombre,
    year: product.year,
    description: `${product.nombre}, lanzado en ${product.year}, ${product.description}`,
    precio: product.precio,
    stock: product.stock,
    descuento: 0
}));

const imagenesFondo = {
    1:{frente:"../img/budokai cover.webp" },
    2:{frente:"../img/budokai 2.webp" },
    3:{frente:"../img/DBZ2V_Cover.webp"  },
    4:{frente:"../img/budokai 3.webp"  },
    5:{frente:"../img/shin budokai.webp"  },
    6:{frente:"../img/shin budokai 2.webp" },
    7:{frente:"../img/burst limit.webp" },
    8:{frente:"../img/infinite world.webp" },
    9:{frente:"../img/Dragonball_Evolution_PSP_box_art.webp" },
    10 :{frente:"../img/hd collection.webp" }
}

const urlInfo=[
    "https://dragonball.fandom.com/wiki/Dragon_Ball_Z:_Budokai",
    "https://dragonball.fandom.com/wiki/Dragon_Ball_Z:_Budokai_2",
    "https://dragonball.fandom.com/wiki/Dragon_Ball_Z_2_V",
    "https://dragonball.fandom.com/wiki/Dragon_Ball_Z:_Budokai_3",
    "https://dragonball.fandom.com/wiki/Dragon_Ball_Z:_Shin_Budokai",
    "https://dragonball.fandom.com/wiki/Dragon_Ball_Z:_Shin_Budokai_-_Another_Road",
    "https://dragonball.fandom.com/wiki/Dragon_Ball_Z:_Burst_Limit",
    "https://dragonball.fandom.com/wiki/Dragon_Ball_Z:_Infinite_World",
    "https://dragonball.fandom.com/wiki/Dragonball_Evolution:_The_Game",
    "https://dragonball.fandom.com/wiki/Dragon_Ball_Z:_Budokai_HD_Collection"
];

console.log(JSON.stringify(productos));

// Constante para el IVA
const IVA = 0.21;  // 21% de IVA

// Inicializar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', cargarCarrito);

 const footerHtml=`
<p>&copy; 2024 De Brito, Ariel. All rights reserved.</p>
		<nav>
			<ul>
				<li><i class="fa-brands fa-facebook"></i></li>
				<li><i class="fa-brands fa-github"></i></li>
				<li><i class="fa-brands fa-instagram"></i></li>
			</ul>
		</nav>
`
document.getElementById("pie").insertAdjacentHTML('beforeend', footerHtml); 
/* document.addEventListener("DOMContentLoaded", function() {
    const footerHtml = `
        <p>&copy; 2024 De Brito, Ariel. All rights reserved.</p>
        <nav>
            <ul>
                <li><i class="fa-brands fa-facebook"></i></li>
                <li><i class="fa-brands fa-github"></i></li>
                <li><i class="fa-brands fa-instagram"></i></li>
            </ul>
        </nav>
    `;
    const pieElement = document.getElementById("pie");
    if (pieElement) {
        pieElement.insertAdjacentHTML('beforeend', footerHtml);
    }
}); */

if(document.getElementById(`productos`)){

for(let i=0;i<10;i++){
    const tarjetaHTML = `
    <div class="tarjeta">
        <div class="tarjeta-interior">
            <div class="frente" style="background-image: url('${imagenesFondo[i + 1].frente}');"></div>
            <div class="dorso" id="dorso${i}" style="background-image: url('../img/dragon-ball-png-dragon-balls-png-2700.png');">
                <button class="boton" onclick="agregarParrafo(${i}, event)">
                    Descripción
                </button>
                <a href="${urlInfo[i]}" target="_blank">
                    <div class="boton">
                        Mas Info
                    </div>
                </a>
                <button onclick="agregarAlCarrito('${productos[i].nombre}', ${productos[i].precio}, ${i})">Agregar</button>
                <span>Stock: <span id="stock-${i}">${productos[i].stock}</span></span>
            </div>
        </div>
    </div>
    `;
    document.getElementById("cartas").insertAdjacentHTML('beforeend', tarjetaHTML);
}

const carritoHTML=`
        <div id="carrito">
			<h2>Carrito de Compras</h2>
			<ul id="lista-carrito"></ul>
			<p>Subtotal: $<span id="subtotal-carrito">0</span></p>
			<p>Descuento: $<span id="descuento-carrito">0</span></p>
			<p>IVA (21%): $<span id="iva-carrito">0</span></p>
			<p><strong>Total: $<span id="total-carrito">0</span></strong></p>
			<button onclick="vaciarCarrito()">Vaciar Carrito</button>
			<button onclick="mostrarCheckout()">Checkout</button>
		</div>
	
		<!-- Modal de Checkout -->
		<div id="checkout-modal">
			<div class="checkout-content">
				<h2>Finalizar Compra</h2>
				<p>Subtotal: $<span id="modal-subtotal">0</span></p>
				<p>Descuento: $<span id="modal-descuento">0</span></p>
				<p>IVA: $<span id="modal-iva">0</span></p>
				<p><strong>Total a Pagar: $<span id="modal-total">0</span></strong></p>
				<button onclick="realizarCompra()">Confirmar Compra</button>
				<button onclick="cerrarCheckout()">Cancelar</button>
			</div>
		</div>
`
document.getElementById("productos").insertAdjacentHTML('beforeend', carritoHTML);


function agregarAlCarrito(nombre, precio, productoKey) {
    // Obtener el producto específico
    const producto = productos[productoKey];

    // Validar stock
    if (producto.stock <= 0) {
        alert('¡Producto agotado!');
        return;
    }

    // Obtener el carrito actual del localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Agregar nuevo producto
    carrito.push({
        nombre: producto.nombre,
        precio: producto.precio,
        productoKey: productoKey
    });

    // Reducir stock
    producto.stock--;
    document.getElementById(`stock-${productoKey}`).textContent = producto.stock;

    // Guardar en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Actualizar vista del carrito
    renderizarCarrito();
}

function renderizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const subtotalCarrito = document.getElementById('subtotal-carrito');
    const descuentoCarrito = document.getElementById('descuento-carrito');
    const ivaCarrito = document.getElementById('iva-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Limpiar lista anterior
    listaCarrito.innerHTML = '';

    // Totales iniciales
    let subtotal = 0;
    let descuentoTotal = 0;

    // Renderizar cada producto
    carrito.forEach((producto, index) => {
        const productoInfo = productos[producto.productoKey];
        const li = document.createElement('li');

        // Calcular descuento individual
        const descuentoProducto = productoInfo.descuento * producto.precio;
        const precioConDescuento = producto.precio - descuentoProducto;

        li.innerHTML = `
            ${producto.nombre} - $${producto.precio} 
            ${productoInfo.descuento > 0 ?
                `<span class="descuento">(Desc. ${(productoInfo.descuento * 100).toFixed(0)}%: 
                -$${descuentoProducto.toFixed(2)})</span>`
                : ''}
        `;

        // Botón para eliminar producto
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.onclick = () => eliminarDelCarrito(index);

        li.appendChild(botonEliminar);
        listaCarrito.appendChild(li);

        // Sumar al subtotal y descuentos
        subtotal += producto.precio;
        descuentoTotal += descuentoProducto;
    });

    // Calcular IVA
    const ivaTotal = (subtotal - descuentoTotal) * IVA;
    const total = subtotal - descuentoTotal + ivaTotal;

    // Actualizar totales
    subtotalCarrito.textContent = subtotal.toFixed(2);
    descuentoCarrito.textContent = descuentoTotal.toFixed(2);
    ivaCarrito.textContent = ivaTotal.toFixed(2);
    totalCarrito.textContent = total.toFixed(2);

}

function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Recuperar el producto para devolver stock
    const producto = productos[carrito[index].productoKey];
    producto.stock++;
    document.getElementById(`stock-${carrito[index].productoKey}`).textContent = producto.stock;

    // Eliminar producto por índice
    carrito.splice(index, 1);

    // Actualizar localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Renderizar de nuevo
    renderizarCarrito();
}

function vaciarCarrito() {
    // Restaurar stock de todos los productos
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.forEach(item => {
        const producto = productos[item.productoKey];
        producto.stock++;
        document.getElementById(`stock-${item.productoKey}`).textContent = producto.stock;
    });

    // Limpiar localStorage
    localStorage.removeItem('carrito');

    // Renderizar
    renderizarCarrito();
}

function cargarCarrito() {
    // Cargar carrito al iniciar la página
    renderizarCarrito();
}

// Funciones de Checkout
function mostrarCheckout() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Validar que hay productos en el carrito
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }

    // Mostrar modal de checkout
    const modal = document.getElementById('checkout-modal');
    modal.style.display = 'flex';

    // Actualizar totales en el modal
    const subtotal = parseFloat(document.getElementById('subtotal-carrito').textContent);
    const descuento = parseFloat(document.getElementById('descuento-carrito').textContent);
    const iva = parseFloat(document.getElementById('iva-carrito').textContent);
    const total = parseFloat(document.getElementById('total-carrito').textContent);

    document.getElementById('modal-subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('modal-descuento').textContent = descuento.toFixed(2);
    document.getElementById('modal-iva').textContent = iva.toFixed(2);
    document.getElementById('modal-total').textContent = total.toFixed(2);
}

function realizarCompra() {
    // Simular compra
    alert('¡Compra realizada con éxito!');

    // Vaciar carrito
    localStorage.removeItem('carrito');

    // Cerrar modal
    cerrarCheckout();

    // Renderizar carrito vacío
    renderizarCarrito();
}

function cerrarCheckout() {
    const modal = document.getElementById('checkout-modal');
    modal.style.display = 'none';
    console.clear();
    console.log(JSON.stringify(productos));
}


function agregarParrafo(productoKey,event) {

    if (!(document.getElementById(`parrafo${productoKey}`))) {
        document.getElementById(`dorso${productoKey}`).insertAdjacentHTML(
            "afterbegin", 
            `
            <button class="boton" id="boton${productoKey}" onclick="agregarParrafo(${productoKey})">Ocultar</button>
            <p id="parrafo${productoKey}"> 
            ${productos[productoKey].description}
            </p>`);
            
            event.target.remove();
    }
    else {
        document.getElementById(`parrafo${productoKey}`).remove();
        document.getElementById(`boton${productoKey}`).remove();
        document.getElementById(`dorso${productoKey}`).insertAdjacentHTML(
            "afterbegin", 
            `<button class="boton"  onclick="agregarParrafo(${productoKey},event)">Descripción</button>`);
    }

}
}

//Validacion de formulario

/* document.getElementById("contacto-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita el envío inicial del formulario

    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const mensaje = document.getElementById("mensaje");
    const errorMsg = document.getElementById("error-msg");

    let errors = [];

    // Validar nombre
    if (nombre.value.trim() === "") {
      errors.push("El nombre es obligatorio.");
    }

    // Validar email con regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      errors.push("El correo electrónico no es válido.");
    }

    // Validar mensaje
    if (mensaje.value.trim() === "") {
      errors.push("El mensaje no puede estar vacío.");
    }

    // Mostrar errores o enviar formulario
    if (errors.length > 0) {
      errorMsg.textContent = errors.join(" ");
      errorMsg.style.display = "block";
    } else {
      errorMsg.style.display = "none";
      // Envía el formulario manualmente
      event.target.submit();
    }
  });

 */