import { obtenerCarrito, actualizarArticuloCarrito, eliminarArticuloCarrito} from "../../services/tienda-regalos.js";
import { getToken } from "../../services/sessionService.js";
export default class PurchaseDone extends HTMLElement{
    constructor(){
        super();
        const shadow = this.attachShadow({mode: "open"})
        this.#render(shadow);
    }
    async #render(shadow){
        try{
            const response = await fetch("/components/purchase-done/done.html");
            const html = await response.text();
            shadow.innerHTML = html;
            this.total = 0;
            console.log(html);
            this.#mostrarArticulos(shadow);
        } catch(error){
            console.log("error Loading html" + error)
        }
    }
    async #mostrarArticulos(shadow){
        const productosCarrito = await obtenerCarrito( getToken() );
        const contenedor = shadow.querySelector(".cart__products");
        const template = shadow.querySelector("#productcmp");
        const totalElement = shadow.querySelector(".cart-product__totalPrice");

        contenedor.innerHTML = ""

        productosCarrito.forEach(carrito => {
            
            this.#obtenerArticulo(template, contenedor, carrito, shadow);
        });

        totalElement.textContent = "$"+this.total;
    }

    //Obtener los artiulos.
    async #obtenerArticulo(template, contenedor, carrito, shadow){
        const {nombre, imagen, precio, _id} = carrito.articulo;
        let clone = template.content.cloneNode(true)
        const nombreElement = clone.querySelector(".cart-product__name");
        const precioElement = clone.querySelector(".cart-product__price");
        const imagenElement = clone.querySelector(".cart-product__img")
        const cantidadElement = clone.querySelector(".cart-product__input");
        this.total += carrito.cantidad * precio;
        
        nombreElement.textContent = nombre;
        precioElement.textContent = "$"+precio;
        imagenElement.src = imagen;
        cantidadElement.value = carrito.cantidad;
        contenedor.appendChild(clone);  
    }
}