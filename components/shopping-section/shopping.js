import { getToken } from "../../services/sessionService.js"
import { obtenerEnviosPorFecha } from "../../services/tienda-regalos.js";

export default class ShoppingSection extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback(){
        const shadow = this.attachShadow({mode: "open"})
        this.#render(shadow);
    }

    async #render(shadow){
        try{
            const response = await fetch("/components/shopping-section/shopping.html");
            const html = await response.text();
            shadow.innerHTML = html;
            this.mostrarEnvios(new Date(), shadow);
            this.#setEventListeners(shadow);
        } catch(error){
            console.log("error Loading html" + error)
        }
    }


    #setEventListeners(shadow){
        const fechaInput = shadow.querySelector(".shopping__inputDate");

        fechaInput.value = new Date().toISOString().substring(0, 10);

        fechaInput.addEventListener("change", () => {
            const fechaSeleccionada = fechaInput.value;
            const fechaDate = new Date(fechaSeleccionada);
            fechaDate.setDate(fechaDate.getDate()+1)
            fechaDate.setHours(0, 0, 0, 0);
            this.mostrarEnvios(fechaDate, shadow)
        })

    }

    async mostrarEnvios(fecha, shadow){
        const shoppingDate = shadow.querySelector(".shopping__date");
        const contenedor = shadow.querySelector(".shopping__articles");
        const template = shadow.querySelector("#shipping-template");
        const enviosPorFecha = await obtenerEnviosPorFecha(this.formatearFechaYYYMMDD(fecha), getToken());
        
        shoppingDate.textContent = this.formatearFecha(fecha)

        contenedor.innerHTML = "";

        enviosPorFecha.forEach(envio => {
            this.#mostrarEnvio(template, contenedor, envio);
        } )


    }

    #mostrarEnvio(template, contenedor, envio){
        let clone = template.content.cloneNode(true);
        const stateColor = {
            "En proceso": "in-process",
            "En camino": "on-the-way",
            "Entregado": "delivered"
        }

        const { _id, articulo, estado, fechaLlegadaEstimada, cantidad } = envio;
        const { _id: idArticulo, nombre, precio, imagen } = articulo;

        const nombreElement = clone.querySelector(".shopping__name");
        nombreElement.textContent = nombre;

        const imagenElement = clone.querySelector(".shopping__img");
        imagenElement.src = imagen;

        const cantidadElement = clone.querySelector(".shopping__cantidad");
        cantidadElement.textContent = cantidad;

        const estadoElement = clone.querySelector(".shopping__state");
        estadoElement.textContent = estado;
        estadoElement.classList.add( stateColor[estado] );

        const shippingDetalButton = clone.querySelector(".shopping__detail");
        shippingDetalButton.href = `/shipping/${_id}`

        const botonAgregarReseña = clone.querySelector(".shopping__comment");

        if(estado != "Entregado"){
            botonAgregarReseña.remove();
        } else{
            botonAgregarReseña.href = `/comment-form/${idArticulo}`
        }

        const precioElement = clone.querySelector(".shopping__price");
        precioElement.textContent = `$${precio}`;

        const fechaElement = clone.querySelector(".shopping__aproxDate");
        fechaElement.textContent = this.formatearFecha(new Date(fechaLlegadaEstimada));

        contenedor.appendChild(clone)

    }

    formatearFecha(fecha){
        const meses = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
          ];

          console.log(fecha);
        
          const dia = fecha.getDate();
          const mes = meses[fecha.getMonth()];
          const año = fecha.getFullYear();
        
          return `${dia} de ${mes} ${año}`;
    }

    formatearFechaYYYMMDD(date){
        const year = date.getFullYear();
        const month = date.getMonth() + 1; 
        const day = date.getDate();

        return `${year}-${month}-${day}`;
    }

}