import CartComponent from "../cart/cart.js";
import { headerSignIn } from "./header-signin.js";
import { headerSignOut } from "./header-signout.js";
import { headerSignInUser } from "./header-signin-user.js";

export default class HeaderComponent extends HTMLElement{
    constructor(){
        super();
        this.login = sessionStorage.getItem("token");
    }

    connectedCallback(){
        const shadow = this.attachShadow({mode: "open"});
        this.#render(shadow)
    }

    async #render(shadow){
        try{
            const token = sessionStorage.getItem("token");
            if(token){
                if(localStorage.getItem("type") === "Usuario"){
                    shadow.innerHTML = headerSignInUser
                } else{
                    shadow.innerHTML = headerSignIn;
                }
                
                this.#setUsername(shadow);
                this.#setEventListeners(shadow);
                return;
            }
            shadow.innerHTML = headerSignOut;
        } catch(error){
            console.log("error Loading html" + error)
        }
    }

    async #setUsername(shadow){
        const usernameContainer = shadow.querySelector(".menu-cuenta__username");
        usernameContainer.textContent = localStorage.getItem("user");
    }

    async #setEventListeners(shadow){
        const exitBtn = shadow.querySelector(".menu-cuenta__link--salir");
        exitBtn.addEventListener("click", () =>{

            sessionStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("type");

            this.#render(shadow);

        })
    }

}

customElements.define("cart-component", CartComponent)