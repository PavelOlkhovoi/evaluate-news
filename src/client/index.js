import "./style/main.scss";
import "./style/footer.scss";
import { formHandler } from "./js/formHandler";

const btn = document.querySelector('.main__btn');
const form = document.querySelector('.main__form');
console.log(form);

form.addEventListener('submit', formHandler);