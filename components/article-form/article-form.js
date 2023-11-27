import { crearArticulo, obtenerArticuloPorId, actualizarArticulo } from "../../services/tienda-regalos.js";
import { getToken } from "../../services/sessionService.js";

export default class ArticleForm extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        const shadow = this.attachShadow({mode: "open"});
        this.#render(shadow);
    }

    async #render(shadow){
        try{   
            const response = await fetch("/components/article-form/article-form.html");
            const html = await response.text();
            shadow.innerHTML = html;
            this.#setSubmitForm(shadow);
            this.#setMostrarImagenEventListener(shadow);
            if(this.getAttribute("article")){
                const articulo = await obtenerArticuloPorId(this.getAttribute("article"));
                this.#setDataForm(shadow, articulo);
                console.log("modo editar")
            }
        } catch(error){
            console.log("error Loading html" + error)
        }
    }

    #setMostrarImagenEventListener(shadow){
        const inputFile = shadow.querySelector(".create-article__inputFile");
        const mostrarImagenSeleccionada = () =>{
            const file = inputFile.files[0];
            console.log(file);
            const container = shadow.querySelector(".image-sample");
            container.innerHTML = "";
            if(file){
                const lector = new FileReader();
                lector.onload = (e) =>{
                    this.#mostrarImagen(e.target.result, shadow)
                }
                lector.readAsDataURL(file);
            }
        }
        inputFile.addEventListener("change", mostrarImagenSeleccionada);
    }

    #mostrarImagen(src, shadow){
        const image = shadow.querySelector("create-article__image");
        if(image){
            image.src = src;
            return;
        }
        const container = shadow.querySelector(".image-sample");
        const imageElement = document.createElement("img");
        imageElement.classList.add("create-article__image");
        imageElement.src = src;
        imageElement.alt = "Imagen Seleccionada"
        container.appendChild(imageElement);
    }

    #setSubmitForm(shadow){
        const form = shadow.querySelector(".create-article");
        
        form.addEventListener("submit", async (e) =>{
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const {calle, colonia, numero_exterior, ciudad, codigo_postal}  = Object.fromEntries(formData.entries());
            const select = shadow.querySelector("select-component");
            const categoria = select.getValue();
            formData.delete("calle");
            formData.delete("colonia");
            formData.delete("numero_exterior");
            formData.delete("ciudad");
            formData.delete("codigo_postal");
            formData.append("direccion", JSON.stringify({calle, colonia, numero_exterior, ciudad, codigo_postal}));
            formData.append("categoria", categoria);
            
            try{
                this.#guardar(shadow, formData)
            } catch(error){
                console.log(error);
            }

            
        })
    }

    #setDataForm(shadow, article){
        const {imagen, direccion, nombre, descripcion, precio, categoria, stock} = article;

        this.#mostrarImagen(imagen, shadow);

        //Setear Dirección
        const calleElement = shadow.querySelector(".create-article__input--calle");
        const coloniaElement = shadow.querySelector(".create-article__input--colonia");
        const ciudadElement = shadow.querySelector(".create-article__input--ciudad");
        const codigoElement = shadow.querySelector(".create-article__input--codigo");
        const numElement = shadow.querySelector(".create-article__input--num");
        calleElement.value = direccion.calle;
        coloniaElement.value = direccion.colonia;
        ciudadElement.value = direccion.ciudad;
        codigoElement.value = direccion.codigo_postal;
        numElement.value = direccion.numero_exterior;

        const nombreElement = shadow.querySelector(".create-article__input--nombre");
        nombreElement.value = nombre;

        const descripcionElement = shadow.querySelector(".create-article__input--descripcion");
        descripcionElement.value = descripcion;

        const priceElement = shadow.querySelector(".create-article__input--price");
        priceElement.value = precio;

        const categoriaElement = shadow.querySelector("select-component");
        categoriaElement.setValue(categoria);

        const stockElement = shadow.querySelector(".create-article__input--stock");
        stockElement.value = stock;

    }

    async #guardar(shadow, formData){
        const token = getToken();
        const toast = shadow.querySelector("toast-component");
        const inputFile = shadow.querySelector(".create-article__inputFile");
        const form = shadow.querySelector(".create-article");
        if(this.getAttribute("article")){

            if (inputFile.files.length === 0) {
                console.log("????")
                formData.delete("imagen");
            }
            const articulo = await actualizarArticulo(formData, this.getAttribute("article"), token);
            if(articulo.msg){
                toast.showToast(info.msg)
                return;
            }
            toast.showToast("Se realizaron los cambios correctamente", "success", () =>{
                page.redirect("/");
            }, 2000)  
        } else{
            
            const articulo = await crearArticulo(formData, token);
            if(articulo.msg){
                toast.showToast(info.msg)
                return;
            }
            
            toast.showToast("Se creó el articulo correctamente", "success")   
            const container = shadow.querySelector(".image-sample");
            container.innerHTML = "";
            form.reset();
            select.reset();
            inputFile.value = "";

        }
    }

}
