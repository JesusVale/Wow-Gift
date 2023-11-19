const categorias = {
    "birthday": "Cumpleaños",
    "aniversarios": "Aniversarios",
    "bodas": "Bodas",
    "san-valentin": "San Valentin",
    "dia-de-la-madre": "Día de la Madre",
    "graduaciones": "Graduaciones",
    "para-hombre": "Para Hombre",
    "para-mujer": "Para Mujer",
    "comida": "Comida"
}


export default class FiltersSection extends HTMLElement{
    constructor(){
        super();
        const shadow = this.attachShadow({mode: "open"})
        this.#render(shadow);
    }

    async #render(shadow){
        try{
            const response = await fetch("./components/filters-section/filters.html");
            const html = await response.text();
            shadow.innerHTML = html;
            this.#setFormPrecio(shadow);
        } catch(error){
            console.log("error Loading html" + error)
        }
    }

    #setFormPrecio(shadow){
        const formPrecio = shadow.querySelector(".price-form");
        formPrecio.addEventListener("submit", e =>{
            e.preventDefault();
            const formData = new FormData(formPrecio);
            const min = formData.get("min");
            const max = formData.get("max");
            page.redirect(`/search?min=${min}&max=${max}`);
        });

    }
}