
export default class StarsComponent extends HTMLElement{
    constructor(){
        super();
        
    }

    connectedCallback(){
        const shadow = this.attachShadow({mode: "open"})
        this.#render(shadow);
         // Observador de atributos
         const observer = new MutationObserver(() => {
            this.#render(shadow);
        });

        observer.observe(this, { attributes: true, attributeFilter: ["rating"] });
    }

    async #render(shadow){
        try{
            shadow.innerHTML = `
                <style>
                    .stars__star{
                        width: ${this.getAttribute("size") ?? "20px"};
                        height: ${this.getAttribute("size") ?? "20px"};
                    }
                </style>
            `
            const response = await fetch("/components/stars/stars.html");
            const html = await response.text();
            shadow.innerHTML += html;
            this.#renderStars(shadow);
        } catch(error){
            console.log("error Loading html" + error)
        }
    }

    #renderStars(shadow){
        const template = shadow.querySelector("#star-icon");
        const contenedor = shadow.querySelector(".stars");
        let rating = 5;
        if(this.getAttribute("rating") && !isNaN(this.getAttribute("rating"))){
            rating = Number(this.getAttribute("rating"));
        }
        for(let i=1; i <= 5 ; i++){
            let clone = template.content.cloneNode(true);
            const icon = clone.querySelector(".stars__star");
            if(rating >= i){
                icon.classList.add("stars__star--fill");
            }
            contenedor.appendChild(icon);
        }

    }  

}