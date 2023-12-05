import { getToken } from "../../services/sessionService.js";
import { commentHtml } from "./commentFormHtml.js";
import { crearComentario, obtenerArticuloPorId } from "../../services/tienda-regalos.js";

export default class CommentForm extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        this.starsSelected = 1;
        this.#render(shadow);
    }

    async #render(shadow){
        try {
            shadow.innerHTML = commentHtml;
            this.#mostrarArticulo(shadow);
            this.setRadio(shadow);
            this.#setSubmitFeedbackForm(shadow);
        }
        catch (error) {
            console.log("error Loading html" + error);
        }
    }

    async setRadio(shadow){
        const stars = shadow.querySelectorAll(".a-star");
        
        stars.forEach((star, index1) => {
            star.addEventListener("click", () => {
                let countStars = 0;

                stars.forEach((starElement, index2) => {
                    if(index1>=index2){
                        starElement.classList.add("active")
                        countStars+=1
                    } else{
                        starElement.classList.remove("active")
                    }
                });

                this.starsSelected = countStars;

            });
        });
    }

    async #setSubmitFeedbackForm(shadow){
        const form = shadow.querySelector(".article-feedback");
        const articulo = this.getAttribute("article");

        form.addEventListener("submit", async (e) =>{
            e.preventDefault();
            const toast = shadow.querySelector("toast-component");
            const descripcion = shadow.querySelector(".article-feedback__input--descripcion").value;
            const comentario = await crearComentario(getToken(), {
                descripcion,
                articulo,
                rating: this.starsSelected
            })

            if(comentario?.msg){
                toast.showToast("Error al crear comentario")
                console.log(comentario.msg);
            } else{
                toast.showToast("Comentario Registrado Correctamente", "success", () =>{
                    page.redirect("/")
                }, 2000);
                
            }

        })

    }

    async #mostrarArticulo(shadow){
        const id = this.getAttribute("article"); //Tomamos el id del atributo
        const articulo = await obtenerArticuloPorId(id);
        const { nombre, descripcion, imagen } = articulo;

        const nombreProductoElement = shadow.querySelector(".article-detail-name");
        nombreProductoElement.textContent = nombre;

        const descripcionProductoElement = shadow.querySelector(".article-detail__description");
        descripcionProductoElement.textContent = descripcion;

        const imagenProductoElement = shadow.querySelector(".article-detail__img");
        imagenProductoElement.src = imagen;
    }

}