export const headerSignOut = `<link rel="stylesheet" href="./components/header-component/header.css">
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

    <nav class="header__sign">
        <a href="/login.html" class="header__login">Iniciar Sesión</a>
        <a href="/signup.html" class="header__signup">Crear Cuenta</a>
    </nav>
</header>`