
const PATHS = [
	{
		path: "/",
		title: "Wow Gift | Inicio",
		name: "home"
	},
	{
		path: "/login",
		title: "Wow Gift | Iniciar Sesión",
		name: "login"
	},
	{
		path: "/signup",
		title: "Wow Gift | Registrarse",
		name: "signup",
	}

]

document.addEventListener("DOMContentLoaded", () =>{

	page("/search", cargarPaginaSearch);
	page("/article/:id", cargarPaginaArticle);
	PATHS.forEach(({path, title, name}) =>{
		page(path, async (ctx, next) => cargarPagina(name, title));
	})
	page.start();
})

async function cargarPagina(name, title) {

	const container = document.querySelector(".content");
	
	document.title = title;
	const res = await fetch(`/pages/${name}.html`);
	const html = await res.text();

	container.innerHTML = html

}


async function cargarPaginaSearch(ctx, next){
	const container = document.querySelector(".content");
	let searchComponent = document.querySelector("search-component");
	const queryParams = getSearchParams(ctx.querystring)

	if(!searchComponent){
		document.title = "Wow Gift | Buscar";
		const res = await fetch(`/pages/search.html`);
		const html = await res.text();

		container.innerHTML = html
		searchComponent = document.querySelector("search-component");
	}
	
	customElements.whenDefined("search-component").then(() => {
		searchComponent = document.querySelector("search-component");
		const newSearchEvent = new CustomEvent("newSearch", {
			bubbles: true,
			detail: queryParams,
		});

		window.dispatchEvent(newSearchEvent);
	});
	
}

async function cargarPaginaArticle(ctx, next){
	const container = document.querySelector(".content");
	const {id} = ctx.params;
	const wrapper = document.createElement("div")
	const res = await fetch(`/pages/article.html`);
	const html = await res.text();
	wrapper.innerHTML = html;
	const article = wrapper.querySelector("article-detail");
	const comment = wrapper.querySelector("comment-section");
	article.id = id;
	comment.id = id;
	
	container.innerHTML = wrapper.innerHTML;

	next();
	
}

function getSearchParams(queryString){
	let params = {}
	const paramsArray = queryString.split("&");
	paramsArray.forEach(param =>{
		const [key, value] = param.split("=");
		params[key] = value;
	})
	return params;
}