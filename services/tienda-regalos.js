
const URL = "http://localhost:8080"

async function obtenerCarrito(token){
    const reponse = await fetch(`${URL}/carrito`, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
    const carrito = await reponse.json();
    return carrito;    
}

async function agregarArticuloCarrito(token, articulo){
    const reponse = await fetch(`${URL}/carrito`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({articulo, cantidad: 1})
    })
    const carrito = await reponse.json();
    return carrito;   
}

async function actualizarArticuloCarrito(token, cantidad, articulo){
    const reponse = await fetch(`${URL}/carrito/${articulo}`, {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({ cantidad })
    })
    const carrito = await reponse.json();
    return carrito;   
}

async function eliminarArticuloCarrito(token, carrito){
    const reponse = await fetch(`${URL}/carrito/${carrito}`, {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
    const carritoEliminar = await reponse.json();
    return carritoEliminar; 
}

async function login(email, password){
    const reponse = await fetch(`${URL}/auth/login`, {
        method: `POST`,
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({email, password})
    })
    const loginInfo = await reponse.json();
    return loginInfo;
}

async function registrarUsuario({nombre, tipo, email, password, telefono}){
    const response = await fetch(`${URL}/usuarios`, {
        method: `POST`,
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({nombre, tipo, email, password, telefono})
    })

    const usuario = await response.json();

    return usuario;
}

async function obtenerArticuloPorId(id){
    const reponse = await fetch(`${URL}/articulos/${id}`)
    const articulo = await reponse.json();
    return articulo;    
}

async function obtenerArticulosPorCategoria(categoria){
    const reponse = await fetch(`${URL}/articulos/search/categoria/${categoria}`)
    const articulos = await reponse.json();
    return articulos;    
}

async function obtenerArticulosPorBusqueda(search){
    const reponse = await fetch(`${URL}/articulos/search/nombre/?s=${search}`)
    const articulos = await reponse.json();
    return articulos;    
}

async function obtenerArticulosPorRating(rating){
    const reponse = await fetch(`${URL}/articulos/search/rating/${rating}`)
    const articulos = await reponse.json();
    return articulos; 
}

async function obtenerArticulosPorPrecio(min, max){
    const reponse = await fetch(`${URL}/articulos/search/precio?min=${min}&max=${max}`)
    const articulos = await reponse.json();
    return articulos; 
}

async function obtenerArticulos(token) {
    const reponse = await fetch(`${URL}/articulos/search/administrador`, {
        method: `GET`,
        headers: {
            'Authorization': token
        }
    })
    const articulos = await reponse.json();
    return articulos; 
}

async function obtenerComentariosPorArticulo(articulo){
    const reponse = await fetch(`${URL}/comentarios/${articulo}`)
    const comentarios = await reponse.json();
    return comentarios; 
}

async function crearArticulo(formData, token){
    const reponse = await fetch(`${URL}/articulos`, {
        method: `POST`,
        headers: {
            'Authorization': token 
        },
        body: formData
    })
    const articulo = await reponse.json();
    return articulo; 
}

async function eliminarArticulo(id, token){
    const reponse = await fetch(`${URL}/articulos/${id}`, {
        method: `DELETE`,
        headers: {
            'Authorization': token 
        }
    })
    const articulo = await reponse.json();
    return articulo; 
}

async function actualizarArticulo(formData, id, token){
    const reponse = await fetch(`${URL}/articulos/${id}`, {
        method: `PUT`,
        headers: {
            'Authorization': token 
        },
        body: formData
    })
    const articulo = await reponse.json();
    return articulo; 
}


async function obtenerEnvioPorId(id, token){
    const reponse = await fetch(`${URL}/envios/${id}`, {
        method: 'GET',
        headers:{
            'Authorization': token
        }
    })
    const envio = await reponse.json();
    return envio; 
}

async function crearComentario(token, feedbackForm) {
    const reponse = await fetch(`${URL}/comentarios`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(feedbackForm)
    })
    const resena = await reponse.json();
    return resena; 
}

export {
    obtenerCarrito,
    login,
    registrarUsuario,
    obtenerArticulosPorCategoria,
    obtenerArticulosPorBusqueda,
    obtenerArticulosPorRating,
    obtenerArticulosPorPrecio, 
    obtenerArticuloPorId,
    agregarArticuloCarrito,
    actualizarArticuloCarrito,
    eliminarArticuloCarrito,
    obtenerComentariosPorArticulo,
    crearArticulo,
    obtenerArticulos,
    eliminarArticulo,
    actualizarArticulo,
    obtenerEnvioPorId,
    crearComentario,
}