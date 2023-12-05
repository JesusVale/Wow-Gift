
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
        } catch(error){
            console.log("error Loading html" + error)
        }
    }

}