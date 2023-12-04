import { obtenerCarrito, actualizarArticuloCarrito, eliminarArticuloCarrito} from "../../services/tienda-regalos.js";
import { getToken } from "../../services/sessionService.js";

export default class PurchaseSection extends HTMLElement{
    constructor(){
        super();
        const shadow = this.attachShadow({mode: "open"})
        this.#render(shadow);
    }

    async #render(shadow){
        try{
            const response = await fetch("/components/create-purchase/purchase.html");
            const html = await response.text();
            shadow.innerHTML = html;
            this.total = 0;
            console.log(html);
            this.#mostrarArticulos(shadow);
        } catch(error){
            console.log("error Loading html" + error)
        }
    }

    //mostrar articulos del carrito
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
        const totalElement = shadow.querySelector(".cart-product__totalPrice");
        const {nombre, imagen, precio, _id} = carrito.articulo;
        let clone = template.content.cloneNode(true)
        const nombreElement = clone.querySelector(".cart-product__name");
        const precioElement = clone.querySelector(".cart-product__price");
        const imagenElement = clone.querySelector(".cart-product__img")
        const cantidadElement = clone.querySelector(".cart-product__input");
        const deleteCartBtn = clone.querySelector(".cart-product__remove");

        const addBtn = clone.querySelector(".cart-product__qbutton--add");
        const removeBtn = clone.querySelector(".cart-product__qbutton--remove");

        this.total += carrito.cantidad * precio;

        deleteCartBtn.addEventListener("click", async () =>{
            await eliminarArticuloCarrito(getToken(), _id);
            this.#mostrarArticulos(shadow);
        })

        addBtn.addEventListener("click", async (e) =>{
            e.preventDefault();
            const newValue = Number(cantidadElement.value)+1;
            await actualizarArticuloCarrito(getToken(), newValue, _id)
            cantidadElement.value = newValue;
            this.total += precio;
            totalElement.textContent = "$"+this.total;
        })

        removeBtn.addEventListener("click", async (e) =>{
            e.preventDefault();
            const newValue = Number(cantidadElement.value)-1;
            if(newValue === 0){
                return;
            }
            await actualizarArticuloCarrito(getToken(), newValue, _id)
            cantidadElement.value = newValue;
            this.total -= precio;
            totalElement.textContent = "$"+this.total;
        })

        nombreElement.textContent = nombre;
        precioElement.textContent = "$"+precio;
        imagenElement.src = imagen;
        cantidadElement.value = carrito.cantidad;
        contenedor.appendChild(clone);
    }
}