    //DATOS
const marcas = [
    { id: "0", marca: 'Adidas Boost', precio: 22000, color: "Negro", img:"./Assets/adidasFoto.jpg"},
    { id: "1", marca: 'Nike Air', precio: 21000, color: "Blanco", img:"./Assets/nikeFoto.jpg"},
    { id: "2", marca: 'Puma RS', precio: 19000, color: "Rosa", img:"./Assets/pumaFoto.jpg"},
    { id: "3", marca: 'New Balance 550', precio: 19500, color: "Amarillo", img:"./Assets/newbalanceFoto.jpg"},
    { id: "4", marca: 'Fila Tracker', precio: 18500, color: "Verde", img:"./Assets/filaFoto.jpg"},
    { id: "5", marca: 'Converse Chuck Taylor', precio: 17000, color: "Negro", img:"./Assets/converseFoto.jpg"},
    { id: "6", marca: 'Nike Air Force 1 High', precio: 23000, color: "Blanco", img:"./Assets/nikeFoto2.jpg"},]
    
const usuarios = [
        {nombre:"Ramiro", clave:"12345",status:"admin"},
        {nombre:"Agos", clave:"12345",status:"comun"},
    ]

    // NODOS
    const container = document.getElementById("container")
    const contenedorCarrito = document.getElementById("contenedorCarrito")
    const botonCarrito = document.getElementById("btnCarrito")
    const contenedorLogin = document.getElementById('login');
    const inputUsuario = document.getElementById('usuario');
    const inputClave = document.getElementById('clave');
    const btnLogin = document.getElementById('btnLogin');
    const errorLogin = document.getElementById('errorLogin');
    const carrito = []

    // Logica
    !localStorage.getItem('marcas') && localStorage.setItem('marcas', JSON.stringify(marcas));

    const renderizarTienda = (objetosMarcas) => {

        container.innerHTML = '';

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
    
        botonComprar.onclick = () => {
            const productoComprado = marcas.find(marca => marca.id === botonComprar.id);
            carrito.push({ nombre: productoComprado.marca, precio: productoComprado.precio })
            localStorage.setItem("carrito", JSON.stringify(carrito))
          }
     

        container.append(cartaUno)
        cartaUno.append(botonComprar)
    }
}

const errorLoginClave = () => {
  errorLogin.innerHTML = ""
  errorLogin.append('La clave ingresada es incorrecta');
}

const login = () => {

    const usuarioLogueado = usuarios.find(usuario => usuario.nombre === inputUsuario.value)
  
    !usuarioLogueado ? errorLogin.append('El usuario ingresado no existe') : usuarioLogueado.clave === inputClave.value ? loginCorrecto(usuarioLogueado) : errorLoginClave();
  
  }

  const loginAdmin = () => {
    container.classList.remove("hidden");
      botonCarrito.classList.remove('hidden');
  }
  const loginUser = () => {
      container.classList.remove("hidden");
      botonCarrito.classList.remove('hidden');
  }

  const loginCorrecto = (usuario) => {
    
    errorLogin.classList.add('hidden')
    renderizarTienda(JSON.parse(localStorage.getItem('marcas')))
    contenedorCarrito.classList.remove("hidden");
    contenedorLogin.classList.add('hidden');
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
  
    usuario.tipo === 'admin' ? loginAdmin() : loginUser();
  
  }

btnLogin.onclick = login;

localStorage.getItem('usuarioLogueado') && loginCorrecto(JSON.parse(localStorage.getItem('usuarioLogueado')))

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

botonCarrito.onclick = mostrarCarrito;