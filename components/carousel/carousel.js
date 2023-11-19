
export default class CarouselComponent extends HTMLElement {
    constructor(){
        super();
        const shadow = this.attachShadow({mode: "open"})
        this.currentPosition = 0;
        this.#render(shadow);
    }

    async #render(shadow){
        try{
            const response = await fetch("./components/carousel/carousel.html");
            const html = await response.text();
            shadow.innerHTML = html;
            const items = [...shadow.querySelectorAll(".carousel__item")];
            this.#setEventListeners(shadow, items);
        } catch(error){
            console.log("error Loading html" + error)
        }
    }

    #setEventListeners(shadow, items) {
        const nextButton = shadow.querySelector(".carousel__control--next");
        const previousButton = shadow.querySelector(".carousel__control--previous");
        nextButton.addEventListener("click", () => this.nextSlide(items));
        previousButton.addEventListener("click", () => this.previousSlide(items));

        setInterval(() =>{
            this.nextSlide(items);
        }, 5000)

    }

    nextSlide(items){
        const actualSlide = items[this.currentPosition];
        const nextPosition = this.currentPosition === items.length-1 ? 0 : this.currentPosition+1;
        const nextSlide = items[nextPosition];


        actualSlide.classList.remove("reverse-direction")
        nextSlide.classList.remove("reverse-direction")

        nextSlide.classList.add("show-item");
        nextSlide.classList.remove("hide-next")



        actualSlide.classList.add("hide-next");
        actualSlide.classList.remove("show-item")

        this.currentPosition = nextPosition;
    }

    previousSlide(items){
        const actualSlide = items[this.currentPosition];
        const previousPosition = this.currentPosition-1 < 0 ? items.length-1 : this.currentPosition-1;
        const previousSlide = items[previousPosition];

        previousSlide.classList.add("show-item");
        previousSlide.classList.remove("hide-next")


        actualSlide.classList.add("hide-next");
        actualSlide.classList.remove("show-item")

        this.currentPosition = previousPosition;
    }

}