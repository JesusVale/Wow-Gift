const pageArticles = `
<link rel="stylesheet" href="/components/articles-section/articles.css">
<section class="articles">
    <header class="articles__header">
        <h2 class="articles__heading">Mis Artículos</h2>
        <a href="/article-form" class="articles__button">Crear Artículo</a>
    </header>
    <div class="article__articles">
        
    </div>
    <div class="page-control">
        <button class="page-control__button page-control__button--prev">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" class="icon icon-tabler icon-tabler-chevron-left" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="8.25 5.25 7.5 13.5">                         
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>                         
                <path d="M15 6l-6 6l6 6"></path>                     
            </svg>
        </button>
        <p class="page-control__text">
            <span class="page-control__selected">1</span> de <span class="page-control__total">5</span>
        </p>

        <button class="page-control__button page-control__button--next">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" class="icon icon-tabler icon-tabler-chevron-right" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="8.25 5.25 7.5 13.5">   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>   <path d="M9 6l6 6l-6 6"></path> </svg>
        </button>
    </div>
    
</section>
<confirm-modal text="Si elimina este artículo no podrá recuperarlo en un futuro" title="¿Está seguro?"></confirm-modal>

<template id="articlesample">
    <article class="article">
        <div class="article__image">
            <img src="https://resources.claroshop.com/medios-plazavip/s2/11073/1286627/5dfa635611e50-7501011131125-1600x1600.jpg" alt="" class="article__img">
        </div>
        <div class="article__flex">
            <h3 class="article__heading">Nombre Artículo</h3>
            <div class="article__controls">
                <a href="#" class="article__button article__button--edit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="icon icon-tabler icon-tabler-edit" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="3.25 2.25 18.5 18.5">                                   
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>                                     
                        <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>                                     
                        <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>                                     
                        <path d="M16 5l3 3"></path>                                 
                    </svg>
                </a>
                <button class="article__button article__button--delete">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="icon icon-tabler icon-tabler-trash" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="3.25 2.25 17.5 19.5">                                     
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>                                     
                        <path d="M4 7l16 0"></path>                                     
                        <path d="M10 11l0 6"></path>                                     
                        <path d="M14 11l0 6"></path>                                     
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>                                     
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>                                 
                    </svg>
                </button>
            </div>
        </div>
        <ul class="article__info">
            <li class="article__property">
                <span class="article__title">Precio</span>
                <span class="article__value article__value--precio">$234</span>
            </li>
            <li class="article__property">
                <span class="article__title">Categoria</span>
                <span class="article__value article__value--categoria">Aniversarios</span>
            </li>
            <li class="article__property">
                <span class="article__title">Descripción</span>
                <span class="article__value article__value--descripcion">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quis ut repudiandae quidem, veritatis quas, neque assumenda itaque sunt ducimus vero hic corporis! Veritatis dolorem rerum labore similique, vero ipsum?</span>
            </li>
            <li class="article__property">
                <span class="article__title">Dirección</span>
                <div class="article__subproperty">
                    <span class="article__subtitle">Calle:</span>
                    <span class="article__subvalue article__subvalue--calle">Nombre Calle</span>
                </div>
                <div class="article__subproperty">
                    <span class="article__subtitle">Colonia:</span>
                    <span class="article__subvalue article__subvalue--colonia">Nombre Colonia</span>
                </div>
            </li>
            <li class="article__property">
                <span class="article__title">Stock</span>
                <span class="article__value article__value--stock">234</span>
            </li>
        </ul>
    </article>
</template>
`

export default pageArticles;