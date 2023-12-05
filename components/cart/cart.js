import { obtenerCarrito, actualizarArticuloCarrito, eliminarArticuloCarrito } from "../../services/tienda-regalos.js"
import { getToken } from "../../services/sessionService.js";

export default class CartComponent extends HTMLElement{

    constructor(){
        super();
    }

    connectedCallback(){
        const shadow = this.attachShadow({mode: "open"})
        this.#render(shadow);
        this.total = 0;
        window.addEventListener("addToCart", () =>{
            this.total = 0;
            this.#mostrarArticulos(shadow);
        })
    }

    async #render(shadow){
        try{
            const [responseHtml, responseTemplate] = await Promise.all([fetch("/components/cart/cart.html"), fetch("/components/cart/template-product.html")]);
            const [html, template] = await Promise.all([responseHtml.text(), responseTemplate.text()]);
            shadow.innerHTML = html + template;
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

    async #obtenerArticulo(template, contenedor, carrito, shadow){
        const totalElement = shadow.querySelector(".cart-product__totalPrice");
        const {nombre, imagen, precio, _id} = carrito.articulo;
        let clone = template.content.cloneNode(true)
        const liElemento = clone.querySelector(".cart-product");
        liElemento.dataset.product = _id;
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
            const productCart = shadow.querySelector(`li[data-product="${_id}"]`);
            productCart.remove();
            const cantidad = Number(productCart.querySelector(`.cart-product__input`).value);
            this.total -= precio*cantidad;
            totalElement.textContent = "$"+this.total;
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