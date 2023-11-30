import { obtenerComentariosPorArticulo, obtenerArticuloPorId } from "../../services/tienda-regalos.js";

export default class CommentSection extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        const shadow = this.attachShadow({mode: "open"})

        this.#render(shadow);
        
    }

    async #render(shadow){

        const id = this.getAttribute("id");
        const comments = await obtenerComentariosPorArticulo(id);
        if(comments.length === 0){
            return;
        }
        try{
            const response = await fetch("/components/comment-section/comment.html"); 
            const html = await response.text();
            shadow.innerHTML = html;
            this.#renderComments(shadow, comments);
            this.#renderRatingBars(shadow, comments);
            this.#setRatingInfo(shadow);    

        } catch(error){
            console.log("error Loading html" + error)
        }
    }

    async #renderComments(shadow, comments){
        
        
        const template = shadow.querySelector("#comment-article")
        const container = shadow.querySelector(".comentarios__main")

        const totalComentarios = shadow.querySelector(".comentarios__total");
        totalComentarios.textContent = `${comments.length} Calificaciones`;

        comments.forEach(({rating, createdAt, descripcion}) => {
            let clone = template.content.cloneNode(true);
            const ratingElement = clone.querySelector("stars-component");
            const fechaElement = clone.querySelector(".comentario__fecha ")
            const descripcionElement = clone.querySelector(".comentario__text")
            const fecha = new Date(createdAt);
            var dia = fecha.getDate();
            var mes = fecha.toLocaleString('es-ES', { month: 'long' });
            var anio = fecha.getFullYear();
            var fechaFormateada = `${dia} de ${mes} ${anio}`;
            ratingElement.setAttribute("rating", rating);
            fechaElement.textContent = fechaFormateada;
            descripcionElement.textContent = descripcion;
            container.appendChild(clone);
        });
    }

    async #renderRatingBars(shadow, comments){
        const container = shadow.querySelector(".comentarios-rating__averages");
        const template = shadow.querySelector("#star-bar");
        let percentages = [];

        const ratingCounts = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
        for (let index = 0; index < comments.length; index++) {
            let {rating} = comments[index];
            rating = Math.floor(rating)
            ratingCounts[rating] += 1;
        }

        Object.entries(ratingCounts).forEach(([key, total]) =>{
            percentages[key] = (total*100) / comments.length
        })

        percentages.forEach((percentage, index) => {
            let clone = template.content.cloneNode(true);
            const progressBar = clone.querySelector("progress-bar");
            if(percentage){
                progressBar.setAttribute("percentage", percentage);
            }
            const number = clone.querySelector(".comentarios-rating__number");
            number.textContent = index;
            container.appendChild(clone);
        })
        
    }

    async  #setRatingInfo(shadow){
        const { rating } = await obtenerArticuloPorId(this.getAttribute("id"));

        const ratingArticleText = shadow.querySelector(".comentarios-rating__average");
        const ratingElement = shadow.querySelector("stars-component");

        ratingArticleText.textContent = rating;
        ratingElement.setAttribute("rating", rating);

    }

}