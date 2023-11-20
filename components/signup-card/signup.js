import { registrarUsuario } from "../../services/tienda-regalos.js";

export default class SignupCard extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        const shadow = this.attachShadow({mode: "open"})
        this.#render(shadow)
    }

    async #render(shadow){
        try{
            const response = await fetch("./components/signup-card/signup-card.html");
            const html = await response.text();
            shadow.innerHTML = html;
            this.#eventSignup(shadow)
        } catch(error){
            console.log("error Loading html" + error)
        }
    }

    async #eventSignup(shadow){
        const form = shadow.querySelector(".signup__form");
        form.addEventListener("submit", async (e) =>{
            e.preventDefault();
            const toast = shadow.querySelector("toast-component");
            const nombre = shadow.querySelector('[name="nombre"]').getValue();
            const email = shadow.querySelector('[name="email"]').getValue();
            const password = shadow.querySelector('[name="password"]').getValue();
            const confirm = shadow.querySelector('[name="confirm"]').getValue();
            const telefono = shadow.querySelector('[name="telefono"]').getValue();

            if(password != confirm){
                //TODO Mostrar mensaje - Las contraseñas no coinciden
                toast.showToast("Las contraseñas no coinciden")
                console.log("ea")
                return;
            }

            const info = await registrarUsuario({nombre, tipo:"Usuario", email, password, telefono});
            if(info.msg){
                //TODO Mostrar mensaje de error
                toast.showToast(info.msg)
                console.log(info.msg)
                return;
            }
            //Mostrar Mensaje - Registrado con éxito
            toast.showToast("Usuario Registrado Correctamente", "success")
            page.redirect("/");
            

        })
    }
}
