export const headerSignInUser = `<link rel="stylesheet" href="./components/header-component/header.css">
<header class="header">
    <div class="header__logo">
        <img src="./components/header-component/img/logo.svg" width="100" height="64" alt="Logo Wow Gift">
    </div>

    <form action="/search" class="buscador">
        <input type="search" name="k" placeholder="Buscar Articulo" class="buscador__input">
        <button class="buscador__boton">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                <path d="M21 21l-6 -6"></path>
             </svg>
        </button>
    </form>

    <div class="header__enter">
        <nav class="menu-cuenta">
            <span class="menu-cuenta__trigger">
                <span class="menu-cuenta__username">Nombre Usuario</span> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" version="1.1" viewBox="0.00 0.00 30.00 30.00">
                    <path fill="currentColor" d="
                      M 15.54 17.30
                      L 25.49 9.13
                      A 0.81 0.81 0.0 0 1 26.79 9.58
                      L 27.27 11.69
                      A 0.81 0.81 0.0 0 1 26.99 12.50
                      L 15.53 21.87
                      A 0.81 0.81 0.0 0 1 14.51 21.87
                      L 3.23 12.64
                      A 0.81 0.81 0.0 0 1 2.93 11.97
                      L 3.04 9.59
                      A 0.81 0.81 0.0 0 1 4.37 9.00
                      L 14.52 17.30
                      A 0.81 0.81 0.0 0 0 15.54 17.30
                      Z"
                    />
                    </svg>
            </span>
            <ul class="menu-cuenta__list">
                <li class="menu-cuenta__item">
                    <a href="#" class="menu-cuenta__link">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                         </svg> Mi Cuenta
                    </a>
                </li>
                <li class="menu-cuenta__item">
                    <a href="#" class="menu-cuenta__link">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-bag" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z"></path>
                            <path d="M9 11v-5a3 3 0 0 1 6 0v5"></path>
                        </svg> Mis Compras
                    </a>
                </li>
                <li class="menu-cuenta__item">
                    <button class="menu-cuenta__link menu-cuenta__link--salir">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-logout-2" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2"></path>
                            <path d="M15 12h-12l3 -3"></path>
                            <path d="M6 15l-3 -3"></path>
                         </svg> Salir
                    </button>
                </li>
    
            </ul>
        </nav>
        <a href="/compras.html" class="header__link">Mis Compras</a>
        <cart-component></cart-component>
    </div>

</header>`