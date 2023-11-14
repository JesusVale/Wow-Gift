
export default class InputSign extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        const shadow = this.attachShadow({mode: "open"})
        this.#render(shadow);
        
    }

    async #render(shadow){
        try{
            const response = await fetch("./components/input-sign/input.html");
            const html = await response.text();
            shadow.innerHTML = html;
            this.#assignAttributes(shadow);
            this.input = shadow.querySelector(".sign-input__input");
        } catch(error){
            console.log("error Loading html" + error)
        }
    }

    #assignAttributes(shadow){
        const image = shadow.querySelector(".sign-input__icon")
        const input = shadow.querySelector(".sign-input__input")

        // Utiliza el operador de fusión nula (??) para proporcionar valores predeterminados
        image.src = this.getAttribute("icon") ?? "./img/email.svg";
        image.alt = this.getAttribute("alt-icon") ?? "Icon Input";
        input.name = this.getAttribute("name");
        input.placeholder = this.getAttribute("placeholder") ?? "";
        input.type = this.getAttribute("type") ?? "text";
    }

    getValue(){
        return this.input.value;
    }
}