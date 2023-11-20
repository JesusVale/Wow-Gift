import HeaderComponent from "../components/header-component/header-component.js";
import CategoryNav from "../components/category-nav/category-nav.js";
import InputSign from "../components/input-sign/input.js";
import LoginCard from "../components/login-card/login.js";
import SignupCard from "../components/signup-card/signup.js";
import ToastComponent  from "../components/toast/toast.js";
import ArticlesSample from "../components/articles-sample/articles-sample.js";
import StarsComponent from "../components/stars/stars.js";
import CarouselComponent from "../components/carousel/carousel.js";
import SelectComponent from "../components/select-component/select.js";
import FiltersSection from "../components/filters-section/filters.js";
import SearchComponent from "../components/search-section/search.js";
import ArticleDetail from "../components/article-detail/article.js";

customElements.define("header-component", HeaderComponent);
customElements.define("category-nav", CategoryNav);
customElements.define("select-component", SelectComponent);
customElements.define("toast-component", ToastComponent);
customElements.define("input-sign", InputSign);
customElements.define("filters-section", FiltersSection);
customElements.define("stars-component", StarsComponent);
customElements.define("login-card", LoginCard);
customElements.define("signup-card", SignupCard);
customElements.define("articles-sample", ArticlesSample);
customElements.define("carousel-component", CarouselComponent);
customElements.define("search-component", SearchComponent);
customElements.define("article-detail", ArticleDetail);