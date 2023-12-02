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
            const response = await fetch("/components/shipping-detail/shipping.html");
            const html = await response.text();
            shadow.innerHTML = html;
            this.#mostrarEnvio(shadow);
        } catch(error){
            console.log("error Loading html" + error)
        }
    }

    async #mostrarEnvio(shadow){
        const id = this.getAttribute("shipping"); //Tomamos el id del atributo
        const stateColor = {
            "En proceso": "in-process",
            "En camino": "on-the-way",
            "Entregado": "delivered"
        }

        const {articulo, partida, destino, fechaLlegadaEstimada, costo, estado} = await obtenerEnvioPorId(id, getToken());
        const { nombre, descripcion, imagen } = articulo;

        const nombreProductoElement = shadow.querySelector(".article-detail-name");
        nombreProductoElement.textContent = nombre;

        const descripcionProductoElement = shadow.querySelector(".article-detail__description");
        descripcionProductoElement.textContent = descripcion;

        const imagenProductoElement = shadow.querySelector(".article-detail__img");
        imagenProductoElement.src = imagen;

        const destinoElement = shadow.querySelector(".shipping-detail__destino");
        destinoElement.textContent = `${destino.calle}/${destino.colonia}`;

        const calleOrigenElement = shadow.querySelector(".shipping-detail__calleOrigen");
        const coloniaOrigenElement = shadow.querySelector(".shipping-detail__coloniaOrigen");
        calleOrigenElement.textContent = `Calle: ${partida.calle}`;
        coloniaOrigenElement.textContent = `Colonia: ${partida.colonia}`;

        const date = new Date(fechaLlegadaEstimada);

        // Extraer el día, el mes y el año del objeto Date.
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const fechaAproximadaElement = shadow.querySelector(".shipping-detail__desc--fecha");
        fechaAproximadaElement.textContent = `${day}/${month}/${year}`;

        const estadoElement = shadow.querySelector(".shipping-detail__desc--estado");
        estadoElement.textContent = estado;
        estadoElement.classList.add( stateColor[estado] );

        const totalElement = shadow.querySelector(".shipping-detail__desc--total");
        totalElement.textContent = `$${costo}`

    }
}