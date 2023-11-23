
export default class ProgressBar extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback(){
        const shadow = this.attachShadow({mode: "open"});
        this.#render(shadow);
    }

    #render(shadow){
        shadow.innerHTML = `
        <link rel="stylesheet" href="/components/progress-bar/progress.css">

        <style>

            .comentarios-rating__progress{
                width: ${this.getAttribute("percentage") ?? 100}%;
            }

        </style>

        <div class="comentarios-rating__bar">
            <div class="comentarios-rating__progress"></div>
        </div>
        `
    }
}