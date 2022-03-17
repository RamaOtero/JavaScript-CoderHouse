const marcas = [
    { id: "0", marca: 'Adidas', precio: 22000, color: "Negro", img:"./Assets/adidasFoto2.jpg"},
    { id: "1", marca: 'Nike', precio: 21000, color: "Blanco", img:"./Assets/nikeFoto.jpg"},
    { id: "2", marca: 'Puma', precio: 19000, color: "Rosa", img:"./Assets/pumaFoto2.jpg"},
    { id: "3", marca: 'New Balance', precio: 19500, color: "Amarillo", img:"./Assets/newbalanceFoto.jpg"},
    { id: "4", marca: 'Fila', precio: 18500, color: "Verde", img:"./Assets/filaFoto.jpg"},]

const container = document.getElementById("container")
const contenedorCarrito = document.getElementById("contenedorCarrito")
const carrito = []

for (const marca of marcas) {
    const cartaUno = document.createElement("div");
    const botonComprar = document.createElement("button");
    cartaUno.className = "productosCartas__Uno";
    const precio = `<h3>$${marca.precio}</h3>`;
    const img = `<img src=${marca.img}>`;
    botonComprar.className = "btn btn-primary";
    botonComprar.append("Comprar");
    botonComprar.id = `${marca.id}`;
    cartaUno.innerHTML = img;
    cartaUno.innerHTML += `<h2> ${ marca.marca } </h2>`;
    cartaUno.innerHTML += precio;

    botonComprar.onclick = ()=> {
        const productoComprado = marcas.find(marca => marca.id === botonComprar.id);
        carrito.push({nombre:productoComprado.marca, precio:productoComprado.precio})
    }

    container.append(cartaUno)
    cartaUno.append(botonComprar)
}

const mostrarCarrito = ()=> {
    for (const marca of carrito) {
        const nombreMarca = `<h4>Producto: ${marca.nombre}</h4>`
        const precioMarca = `<h4>Precio: ${marca.precio}</h4>`
        contenedorCarrito.innerHTML += nombreMarca
        contenedorCarrito.innerHTML += precioMarca
    }
    const total = carrito.reduce ((accumulador,marca) => accumulador + marca.precio,0);
    contenedorCarrito.append(`Total Compra : ${total}`)
}

let botonCarrito = document.getElementById("btnCarrito")
botonCarrito.onclick = mostrarCarrito;