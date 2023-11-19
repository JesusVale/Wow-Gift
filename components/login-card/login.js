import { login } from "../../services/tienda-regalos.js";

export default class LoginCard extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        const shadow = this.attachShadow({mode: "open"})
        this.#render(shadow)
    }

    async #render(shadow){
        try{
            const response = await fetch("./components/login-card/login.html");
            const html = await response.text();
            shadow.innerHTML = html;
            this.#eventLogin(shadow);
        } catch(error){
            console.log("error Loading html" + error)
        }
    }

    async #eventLogin(shadow){
        const form = shadow.querySelector(".login__form");
        form.addEventListener("submit", async (e) =>{
            e.preventDefault();
            const toast = shadow.querySelector("toast-component");
            const email = shadow.querySelector('[name="email"]').getValue();
            const password = shadow.querySelector('[name="password"]').getValue();
            const info = await login(email, password);
            if(info.msg){
                toast.showToast(info.msg)
                return;
            }
            sessionStorage.setItem("token", info.token);
            localStorage.setItem("user", info.usuario.nombre);
            localStorage.setItem("type", info.usuario.tipo);
            page.redirect("/")
            form.dispatch("sessionChange");
        })
    }
}

