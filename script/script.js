import HeaderComponent from "../components/header-component/header-component.js";
import CategoryNav from "../components/category-nav/category-nav.js";
import InputSign from "../components/input-sign/input.js";
import LoginCard from "../components/login-card/login.js";
import SignupCard from "../components/signup-card/signup.js";
import ToastComponent  from "../components/toast/toast.js";
import ArticlesSample from "../components/articles-sample/articles-sample.js";
import StarsComponent from "../components/stars/stars.js";

customElements.define("header-component", HeaderComponent);
customElements.define("category-nav", CategoryNav);
customElements.define("toast-component", ToastComponent);
customElements.define("input-sign", InputSign);
customElements.define("stars-component", StarsComponent);
customElements.define("login-card", LoginCard);
customElements.define("signup-card", SignupCard);
customElements.define("articles-sample", ArticlesSample);