import { obtenerArticuloPorId, agregarArticuloCarrito } from "../../services/tienda-regalos.js";
import { getToken } from "../../services/sessionService.js";

export default class ArticleDetail extends HTMLElement{
    constructor(){
        super();
        
    }

    connectedCallback(){
        const shadow = this.attachShadow({mode: "open"})
        this.#render(shadow);
    }

    async #render(shadow){
        try{
            const response = await fetch("/components/article-detail/article.html"); 
            const html = await response.text();
            shadow.innerHTML = html;
            this.#setArticleData(shadow);
            this.#setEventListeners(shadow);
        } catch(error){
            console.log("error Loading html" + error)
        }
    }

    async #setArticleData(shadow){
        const id = this.getAttribute("id");
        const {imagen, precio, rating, descripcion, nombre}= await obtenerArticuloPorId(id);
        const imageElement = shadow.querySelector(".article__img");
        const nameElement = shadow.querySelector(".article__name");
        const priceElement = shadow.querySelector(".article__price");
        const ratingElement = shadow.querySelector("stars-component");
        const descriptionElement = shadow.querySelector(".article__description");

        imageElement.src = imagen;
        imageElement.alt = nombre;

        nameElement.textContent = nombre;

        priceElement.textContent = precio;

        ratingElement.setAttribute("rating", rating)

        descriptionElement.textContent = descripcion;

    }

    async #setEventListeners(shadow) {
        const addToCartButton = shadow.querySelector(".article__addToCart");
        const articulo = this.getAttribute("id");
        const token = getToken();
        const addToCartEvent = new CustomEvent("addToCart", {
            bubbles: true
        }) 
        addToCartButton.addEventListener("click", async (e) =>{
            await agregarArticuloCarrito(token, articulo);
            window.dispatchEvent(addToCartEvent);
        })
    }

}