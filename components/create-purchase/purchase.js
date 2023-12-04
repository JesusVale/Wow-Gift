import { obtenerArticulos } from "../../services/tienda-regalos";

export default class PurchaseSection extends HTMLElement{
    constructor(){
        super();
        const shadow = this.attachShadow({mode: "open"})
        this.#render(shadow);
    }
    async #render(shadow){
        try{
            const response = await fetch("./components/create-purchase/purchase.html");
            const html = await response.text();
            shadow.innerHTML = html;
            
        } catch(error){
            console.log("error Loading html" + error)
        }
    }
}