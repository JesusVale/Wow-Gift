
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

async function obtenerArticulosPorCategoria(categoria){
    const reponse = await fetch(`${URL}/articulos/search/categoria/${categoria}`)
    const articulos = await reponse.json();
    return articulos;    
}

export {
    obtenerCarrito,
    login,
    registrarUsuario,
    obtenerArticulosPorCategoria
}