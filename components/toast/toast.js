import { successIcon, errorIcon } from "./icons.js";

export default class ToastComponent extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.attachShadow({mode: "open"})
        this.#render();
        
    }

    async #render(){
        try{
            const response = await fetch("./components/toast/toast.html");
            const html = await response.text();
            this.shadowRoot.innerHTML = html;
        } catch(error){
            console.log("error Loading html" + error)
        }
    }

    showToast(message,  type, callback=()=>{}) {
        const template = this.shadowRoot.querySelector("#toast-template");
        let clone = template.content.cloneNode(true);
        const icon = type === "success"? successIcon : errorIcon;
        
        const toast = clone.querySelector(".toast");

        if(type === "success"){
            toast.classList.add("toast--success")
        }
        toast.innerHTML = `${icon} ${message}`;
        this.shadowRoot.appendChild(clone);
       

        setTimeout(() =>{
            toast.remove();
            callback();
        }, 5000)
    }
}