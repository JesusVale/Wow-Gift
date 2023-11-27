
export default class ConfirmModal extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        const shadow = this.attachShadow({mode: "open"});
        this.#render(shadow);
    }

    #render(shadow){
        const title = this.getAttribute("title") ?? "¿Estás seguro?";
        const text = this.getAttribute("text") ?? "Texto de confirmación";
        shadow.innerHTML = `
        <link rel="stylesheet" href="/components/confirm-modal/confirm.css">
        <aside class="modal-confirm">
            <div class="modal-confirm__modal">
                <header class="modal__header">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-alert-circle" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                        <path d="M12 8v4" />
                        <path d="M12 16h.01" />
                    </svg> ${title}
                </header>
                <div class="modal-confirm__content">
                    <p class="modal-confirm__warning">${text}</p>
                    <div class="modal-confirm__buttons">
                        <button class="modal-confirm__button modal-confirm__button--confirm">Si</button>
                        <button class="modal-confirm__button modal-confirm__button--discard">Cancelar</button>
                    </div>
                </div>
                
            </div>
        </aside>
        `
        this.modal = shadow.querySelector(".modal-confirm");
        this.buttonConfirm = shadow.querySelector(".modal-confirm__button--confirm");
        this.buttonDiscard = shadow.querySelector(".modal-confirm__button--discard");
    }

    async showConfirmDialog(){

        const handleConfirmButton = (resolve) =>{
            this.modal.classList.remove("show-modal");
            resolve(true);
            this.buttonConfirm.removeEventListener("click", () => { handleConfirmButton(resolve) });
        }

        const handleDiscardButton = (resolve) =>{
            this.modal.classList.remove("show-modal");
            resolve(false);
            this.buttonDiscard.removeEventListener("click", () => { handleDiscardButton(resolve) });
        }


        return new Promise((resolve, reject) =>{
            this.modal.classList.add("show-modal");
            this.buttonConfirm.addEventListener("click", () => { handleConfirmButton(resolve) });

            this.buttonDiscard.addEventListener("click", () => { handleDiscardButton(resolve) })
        })
    }
}