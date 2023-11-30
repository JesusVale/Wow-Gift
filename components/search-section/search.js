import { obtenerArticulosPorBusqueda, obtenerArticulosPorCategoria, obtenerArticulosPorRating, obtenerArticulosPorPrecio } from "../../services/tienda-regalos.js";

export default class SearchComponent extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.attachShadow({mode: "open"});
        this.#render();
        window.addEventListener("newSearch", async (e) =>{
            await this.#setProductos(e.detail);
        })
    
        
    }

    async #render(){
        try{
            const response = await fetch("./components/search-section/search.html");
            const html = await response.text();
            this.shadowRoot.innerHTML = html;
        } catch(error){
            console.log("error Loading html" + error)
        }
    }

    async #setProductos({category, min, max, rating, k}){
        let productos = [];
        if(category){
            productos = await obtenerArticulosPorCategoria(category);
        } else if(k){
            productos = await obtenerArticulosPorBusqueda(k);
        } else if(rating){
            productos = await obtenerArticulosPorRating(rating);
        } else if(min || max){
            productos = await obtenerArticulosPorPrecio(Number(min), Number(max));
        }

        const setProductsOnChange = () =>{
            const template = this.shadowRoot.querySelector("#product");
            
            if(template){
                const container = this.shadowRoot.querySelector(".products");
                container.innerHTML = ""

                productos.forEach(({_id, nombre, rating, precio, imagen}) =>{
                    let clone = template.content.cloneNode(true);
                    const linkElement = clone.querySelector(".product-link");
                    const nameElement = clone.querySelector(".product__name");
                    const priceElement = clone.querySelector(".product__price");
                    const imagenElement = clone.querySelector(".product__img");
                    const ratingElement = clone.querySelector("stars-component");

                    linkElement.href = `/article/${_id}`;
                    nameElement.textContent = nombre;
                    priceElement.textContent = `$${precio}`;
                    imagenElement.src = imagen;
                    imagenElement.alt = nombre;
                    ratingElement.setAttribute("rating", rating);
                    container.appendChild(clone);

                })
            } else {
                setTimeout(setProductsOnChange, 100)
            }
        }

        setProductsOnChange();
    }

}