import { getToken } from "../../services/sessionService.js"
import { obtenerArticulos, eliminarArticulo } from "../../services/tienda-regalos.js";
import pageArticles from "./articles.js";

export default class ArticleSection extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        const shadow = this.attachShadow({mode: "open"});
        this.#render(shadow);
        this.currentPage = 0;
    }

    async #render(shadow){
        try{
            shadow.innerHTML = pageArticles;
            this.articulos = await obtenerArticulos(getToken());
            this.#renderArticles(shadow);
            this.#setPaginate(shadow);
        } catch(error){
            console.log("error Loading html" + error)
        }
    }

    async #setPaginate(shadow){
        const prevButton = shadow.querySelector(".page-control__button--prev");
        const nextButton = shadow.querySelector(".page-control__button--next");
        const selectedPage = shadow.querySelector(".page-control__selected");
        const totalPages = shadow.querySelector(".page-control__total");

        selectedPage.textContent = this.currentPage+1;
        totalPages.textContent = Math.ceil(this.articulos.length/3);

        prevButton.addEventListener("click", () =>{
            if(this.currentPage === 0){
                return;
            }
            this.currentPage -= 3;
            selectedPage.textContent = this.currentPage+1;
            this.#renderArticles(shadow);
        })

        nextButton.addEventListener("click", () =>{
            if(this.currentPage >= this.articulos.length - 3){
                return;
            }
            this.currentPage += 3;
            selectedPage.textContent = this.currentPage-1;
            this.#renderArticles(shadow);
        })

    }

    #resetPages(shadow){
        this.currentPage = 0;
        const selectedPage = shadow.querySelector(".page-control__selected");
        const totalPages = shadow.querySelector(".page-control__total");

        selectedPage.textContent = this.currentPage+1;
        totalPages.textContent = Math.ceil(this.articulos.length/3);
    }

    async #renderArticles(shadow){
        const container = shadow.querySelector(".article__articles");
        const template = shadow.querySelector("#articlesample");
        const confirmModal = shadow.querySelector("confirm-modal");
        container.innerHTML = "";
        this.articulos.slice(this.currentPage, this.currentPage+3).forEach(articulo => {
            let clone = template.content.cloneNode(true);
            const { _id, nombre, descripcion, imagen, precio, categoria, stock, direccion } = articulo;
            const editButton = clone.querySelector(".article__button--edit");
            const deleteButton = clone.querySelector(".article__button--delete");
            const nombreElement = clone.querySelector(".article__heading");
            const descripcionElement = clone.querySelector(".article__value--descripcion");
            const imagenElement = clone.querySelector(".article__img");
            const precioElement = clone.querySelector(".article__value--precio");
            const categoriaElement = clone.querySelector(".article__value--categoria");
            const stockElement = clone.querySelector(".article__value--stock");
            const calleElement = clone.querySelector(".article__subvalue--calle");
            const coloniaElement = clone.querySelector(".article__subvalue--colonia");

            nombreElement.textContent = nombre;
            descripcionElement.textContent = descripcion;
            imagenElement.src = imagen;
            imagenElement.alt = nombre;
            precioElement.textContent = precio;
            categoriaElement.textContent = categoria;
            stockElement.textContent = stock;
            calleElement.textContent = direccion.calle;
            coloniaElement.textContent = direccion.colonia;
            editButton.href = `/article-form/${_id}`;
            deleteButton.addEventListener("click", async () =>{
                const confirm = await confirmModal.showConfirmDialog();
                if(confirm){
                    try{
                        await eliminarArticulo(_id, getToken());
                        this.articulos = await obtenerArticulos(getToken());
                        this.#resetPages(shadow);
                        this.#renderArticles(shadow);
                    } catch(error){
                        console.log(error);
                    }
                }
            })  

            container.appendChild(clone);
        });

    }
}