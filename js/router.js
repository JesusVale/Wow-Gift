import { getToken } from "../services/sessionService.js";

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
	},
	{
		path: "/article-form",
		title: "Wow Gift | Crear Artículo",
		name: "article-form",
		type: "sesion"
	},
	{
		path: "/articles",
		title: "Wow Gift | Mis Artículos",
		name: "articles",
		type: "sesion"
	}
]

document.addEventListener("DOMContentLoaded", () =>{

	page("/search", cargarPaginaSearch);
	page("/article/:id", cargarPaginaArticle);
	page("/article-form/:id", cargarPaginaArticleForm);
	page("/comment-form/:article", cargarCommentForm);
	page("/shipping/:shipping", cargarShipping);
	PATHS.forEach(({path, title, name, type}) =>{
		page(path, async (ctx, next) => {
			if(type === "sesion" && !getToken()) {
				page.redirect("/")
				return;
			}
			cargarPagina(name, title)
		});
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

function cargarPaginaArticleForm(ctx){

	if(!getToken()) {
		page.redirect("/")
		return;
	}

	const container = document.querySelector(".content");
	const {id} = ctx.params;
	container.innerHTML = `<article-form article=${id}></article-form>`
}

function cargarCommentForm(ctx){
	if(!getToken()) {
		page.redirect("/")
		return;
	}

	const container = document.querySelector(".content");
	const { article } = ctx.params;
	container.innerHTML = `<comment-form article=${article}></comment-form>`
}

function cargarShipping(ctx){
	if(!getToken()) {
		page.redirect("/")
		return;
	}

	const container = document.querySelector(".content");
	const { shipping } = ctx.params;
	container.innerHTML = `<shipping-detail shipping=${shipping}></shipping-detail>`
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
