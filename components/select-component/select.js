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



export default class SelectCategorias extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        const shadow = this.attachShadow({mode: "open"})
        this.shadow = shadow;
        this.#render();
    }

    async #render(){
        try{   
            const response = await fetch("/components/select-component/select.html");
            const html = await response.text();
            this.shadow.innerHTML = html;
            this.#setValues();
            //this.#setOnChange();
        } catch(error){
            console.log("error Loading html" + error)
        }
    }

    #setValues(){
        const template = this.shadow.querySelector("#select-option");
        const container = this.shadow.querySelector(".select__control");
        Object.entries(categorias).map(([key, value]) =>{
            let clone = template.content.cloneNode(true);
            const option = clone.querySelector(".select__option");
            option.value = key;
            option.textContent = value;
            container.appendChild(clone);
        })
    }

    getValue(){
        const select = this.shadow.querySelector(".select__control");
        return select.value;
    }

    setValue(categoria){
        const option = this.shadow.querySelector(`option[value="${categoria}"]`);
        option.selected = true
    }

    reset(){
        const select = this.shadow.querySelector(".select__control");
        select.selectedIndex = 0;
    }

    setOnChange(onchange){
        const checkAndSetOnChange = () => {
            const select = this.shadow.querySelector(".select__control");
            if (select) {
                select.addEventListener("change", onchange);
            } else {
                setTimeout(checkAndSetOnChange, 100); // Espera 100 milisegundos y vuelve a verificar
            }
        };

        checkAndSetOnChange();
    }

}