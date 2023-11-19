
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

export default class CategoryNav extends HTMLElement{
    constructor() {
        super();
        const shadow = this.attachShadow({mode: "open"})
        this.#render(shadow);
    }

    async #render(shadow){
        try{
            const response = await fetch("./components/category-nav/category-nav.html");
            const html = await response.text();
            shadow.innerHTML = html;
            this.#cargarCategoriasSamples(shadow);
            this.#cargarCategoriasList(shadow)
        } catch(error){
            console.log("error Loading html" + error)
        }
    }

    #cargarCategoriasSamples(shadow){
        const template = shadow.querySelector("#category-sample")
        const contenedor = shadow.querySelector(".bottom-nav__samples")
        Object.entries(categorias).slice(0, 5).forEach(([key, categoria]) =>{
            let clone = template.content.cloneNode(true)
            const link = clone.querySelector(".bottom-nav__link")
            link.textContent = categoria;
            link.href= `/search?category=${key}`
            contenedor.appendChild(clone);
        })
    }

    #cargarCategoriasList(shadow){
        const template = shadow.querySelector("#category-item")
        const contenedor = shadow.querySelector(".categories-menu__list")
        Object.entries(categorias).forEach(([key, categoria]) =>{
            let clone = template.content.cloneNode(true)
            const link = clone.querySelector(".categories-menu__link")
            link.href= `/search?category=${key}`
            link.textContent = categoria;
            contenedor.appendChild(clone);
        })
    }
}