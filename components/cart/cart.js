import { obtenerCarrito } from "../../services/tienda-regalos.js"

export default class CartComponent extends HTMLElement{

    constructor(){
        super();
    }

    connectedCallback(){
        const shadow = this.attachShadow({mode: "open"})
        this.#render(shadow);
        

    }

    async #render(shadow){
        try{
            const response = await fetch("./components/cart/cart.html");
            const html = await response.text();
            shadow.innerHTML = html;
            this.#toogleCart(shadow);
            this.#mostrarArticulos(shadow);
        } catch(error){
            console.log("error Loading html" + error)
        }
    }

    async #toogleCart(shadow){
        const cartCard = shadow.querySelector(".cart__card");
        const openCartButton = shadow.querySelector(".cart__button");
        const closeCartButton = shadow.querySelector(".cart__exit")

        openCartButton.addEventListener("click", () =>{
            cartCard.classList.add("cart__card--show")
        })

        closeCartButton.addEventListener("click", () =>{
            cartCard.classList.remove("cart__card--show")
        })
    }

    async #mostrarArticulos(shadow){
        const productosCarrito = await obtenerCarrito(sessionStorage.getItem("token"));
        const contenedor = shadow.querySelector(".cart__products");
        const template = shadow.querySelector("#productcmp")
        productosCarrito.forEach(carrito => {
            this.#obtenerArticulo(template, contenedor, carrito);
        });
    }

    async #obtenerArticulo(template, contenedor, carrito){
        const {nombre, imagen, precio} = carrito.articulo;
        let clone = template.content.cloneNode(true)
        const nombreElement = clone.querySelector(".cart-product__name");
        const precioElement = clone.querySelector(".cart-product__price");
        const imagenElement = clone.querySelector(".cart-product__img")
        const cantidadElement = clone.querySelector(".cart-product__input");
        nombreElement.textContent = nombre;
        precioElement.textContent = precio;
        imagenElement.src = imagen;
        cantidadElement.value = carrito.cantidad;
        contenedor.appendChild(clone);
    }

}