import { getToken } from "../../services/sessionService.js";
import { obtenerEnvioPorId, crearResena, obtenerResenaPorId/*, actualizarResena*/ } from "../../services/tienda-regalos.js";

export default class ArticleFeedback extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        this.#render(shadow);
    }

    async #render(shadow){
        try {
            const response = await fetch("./components/article-feedback/feedback.html");
            const html = await response.text();
            shadow.innerHTML = html;
            this.#mostrarEnvio(shadow);
            this.#setFeedbackForm(shadow);
            //aquí yo pegué el modo editar del archivo article-form.js y lo adapté pero no sé si se puede hacer eso porque requiere qu ecada reseña tenga un id
            if (this.getAttribute("article") && this.getAttribute("id")) {
                const resena = await obtenerResenaPorId(this.getAttribute("article"), this.getAttribute("id"));
                this.#setDataFeedbackForm(shadow, resena);
                console.log("modo editar");
            }
        }
        catch (error) {
            console.log("error Loading html" + error);
        }
    }

    async function setRadio(stars){
        // Select all elements with the "i" tag and store them in a NodeList called "stars"
        //const stars = shadow.querySelectorAll(".stars i");

        const countStars = 0;
        // Loop through the "stars" NodeList
        stars.forEach((star, index1) => {
            // Add an event listener that runs a function when the "click" event is triggered
            star.addEventListener("click", () => {
                // Loop through the "stars" NodeList Again
                stars.forEach((star, index2) => {
                    // Add the "active" class to the clicked star and any stars with a lower index
                    // and remove the "active" class from any stars with a higher index
                    index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
                });
            });
        });

        stars.forEach((star) => {
            if (star.classList.contains("active") == true) { countStars += 1; }
        });

        return countStars;
    }

    async #setSubmitFeedbackForm(shadow){
        //Mi idea era: 1. yo escucho a la pagina create-article
        //              2. yo guardo la descripcion y el valor de las estrellas (en algun lugar en la base de datos a lo mejor)
        //              3. y listop!
        const form = shadow.querySelector(".article-feedback");
        
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const descripcionElement = form.querySelector(".article-feedback__input--descripcion");
            const starsElement = form.querySelectorAll(".stars i");

            const descripcion = JSON.stringify(descripcionElement);
            const stars = setRadio(starsElement);

            const feedbackForm = { descripcion, stars };

            try {
                this.#guardar(shadow, feedbackForm);
            } catch (error) {
                console.log(error);
            }
        });
    }

    async #setDataFeedbackForm(shadow, resena){
        const { descripcion, stars } = resena;

        this.#mostrarImagen(imagen, shadow);

        const descripcionElement = shadow.querySelector(".article-feedback__input--descripcion");
        descripcionElement.value = descripcion;

        const starsElement = shadow.querySelectorAll(".stars i");
        starsElement.value = stars;

    }

    async #mostrarEnvio(shadow){
        const id = this.getAttribute("id"); //Tomamos el id del atributo
        const envio = await obtenerEnvioPorId(id, getToken());
        const { nombre, descripcion, imagen } = envio.articulo;
        console.log(envio);

        const nombreProductoElement = shadow.querySelector(".article-detail-name");
        nombreProductoElement.textContent = nombre;

        const descripcionProductoElement = shadow.querySelector(".article-detail__description");
        descripcionProductoElement.textContent = descripcion;

        const imagenProductoElement = shadow.querySelector(".article-detail__img");
        imagenProductoElement.src = imagen;
    }

    async #guardar(shadow, formData){
        const token = getToken();
        const toast = shadow.querySelector("toast-component");
        const form = shadow.querySelector(".article-feedback");
        if (this.getAttribute("article")){

            const resena = await crearResena(token, form, this.getAttribute("article"));
            if (resena.msg) {
                toast.showToast(info.msg);
                return;
            }
            toast.showToast("Se agragó la reseña correctamente", "success", () => {
                page.redirect("/");
            }, 2000);
        } 
    }

}