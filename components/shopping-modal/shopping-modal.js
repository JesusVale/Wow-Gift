
import { crearCompra, obtenerCarrito } from "../../services/tienda-regalos.js";
import { getToken } from "../../services/sessionService.js";

export default class ShoppingModal extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.attachShadow({mode: "open"})
        this.#render();
        const observer = new MutationObserver(() => {
            this.#setTotalShopping();
        })

        observer.observe(this, { attributes: true, attributeFilter: ["total"] });
    }

    async #render() {
        try{
            const response = await fetch("/components/shopping-modal/shopping-modal.html");
            const html = await response.text();
            this.shadowRoot.innerHTML = html;
            this.#setTotalShopping();
            this.#setEventListeners();
        } catch(error){
            console.log("error Loading html" + error)
        }
    }

    #setTotalShopping(){
        const total = this.getAttribute("total");
        const totalElement = this.shadowRoot.querySelector(".shopping-modal__total");
        totalElement.textContent = `Total: $${total}`;
    }

    mostrarModal() {
        const modalSeleccionada = this.shadowRoot.querySelector(".shopping-modal");
        modalSeleccionada.classList.add("show")
    }


    cerrarModal() {
        const modalSeleccionada = this.shadowRoot.querySelector(".shopping-modal");
        modalSeleccionada.classList.remove("show");
    }

    #setEventListeners(){
        const cancelarButton = this.shadowRoot.querySelector(".shopping-modal__button--cancel");
        const formCompra = this.shadowRoot.querySelector(".shopping-modal__form");
        formCompra.addEventListener("submit", async (e)=>{
            e.preventDefault();
            const formData = new FormData(e.target);

            const { calle, colonia, ciudad, codigo_postal, numero_exterior, metodo } = Object.fromEntries(formData.entries());

            const carritoUsuario = await obtenerCarrito(getToken());

            const articulos = carritoUsuario.map(({articulo, cantidad}) => {
                return {
                    articulo,
                    cantidad
                }
            })
            const compraData = {
                direccion: {
                    calle,
                    ciudad,
                    colonia, codigo_postal,
                    numero_exterior
                },
                articulos,
                metodo_pago: metodo,
                total: Number(this.getAttribute("total"))
            }

            const toast = this.shadowRoot.querySelector("toast-component");

            try{
                const compra = await crearCompra(compraData, getToken());
                this.cerrarModal();
                if(compra.msg){
                    toast.showToast(compra.msg)
                    return;  
                } 
                toast.showToast("Se realizó la compra correctamente", "success", () =>{
                    window.location.href = "/"
                }, 2000)
    
            } catch(error){
                console.log(error);
                toast.showToast("No se pudó realizar la compra")
            }

        })

        cancelarButton.addEventListener("click", () =>{
            this.cerrarModal();
        });


    }

}