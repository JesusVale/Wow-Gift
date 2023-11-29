import { getToken } from "../../services/sessionService.js";
import { obtenerEnvioPorId } from "../../services/tienda-regalos.js"

export default class ShippingDetail extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        const shadow = this.attachShadow({mode: "open"})
        this.#render(shadow);
    }

    async #render(shadow){
        try{
            const response = await fetch("./components/shipping-detail/shipping.html");
            const html = await response.text();
            shadow.innerHTML = html;
            this.#mostrarEnvio(shadow);
        } catch(error){
            console.log("error Loading html" + error)
        }
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
}