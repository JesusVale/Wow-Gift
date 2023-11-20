import { obtenerArticulosPorCategoria } from "../../services/tienda-regalos.js";


export default class ArticlesSample extends HTMLElement{
    constructor(){
        super();
        const shadow = this.attachShadow({mode: "open"})
        this.#render(shadow);
    }

    async #render(shadow){
        try{
            const response = await fetch("./components/articles-sample/articles-sample.html");
            const html = await response.text();
            shadow.innerHTML = html;
            this.#cargarValores(shadow);
            this.#cargarArticulos(shadow);
        } catch(error){
            console.log("error Loading html" + error)
        }
    }


    async #cargarValores(shadow){
        const title = this.getAttribute("title") ?? "Sample Title"
        const categoria = this.getAttribute("categoria") ?? "aniversarios";
        const link = shadow.querySelector(".articles-sample__link");
        const heading = shadow.querySelector(".articles-sample__heading")
        heading.textContent = title;
        link.href = `/search?category=${categoria}`
    }

    async #cargarArticulos(shadow){
        const template = shadow.querySelector("#sample")
        const contenedor = shadow.querySelector(".articles-sample__container")
        const categoria = this.getAttribute("categoria") ?? "aniversarios";
        const articulos = await obtenerArticulosPorCategoria(categoria);
        articulos.slice(0, 5).forEach(({nombre, imagen, precio, rating, _id}) => {
            let clone = template.content.cloneNode(true);
            const nombreElement = clone.querySelector(".article-sample__name");
            const ratingElement = clone.querySelector("stars-component");
            const priceElement = clone.querySelector(".article-sample__price");
            const imageElement = clone.querySelector(".article-sample__img");
            const linkElement = clone.querySelector(".article-sample__link");
            nombreElement.textContent = nombre;
            ratingElement.setAttribute("rating", rating);
            priceElement.textContent = `$${precio}`;
            imageElement.src = imagen;
            linkElement.href = `/article/${_id}` 
            contenedor.appendChild(clone);
        });
    }

}