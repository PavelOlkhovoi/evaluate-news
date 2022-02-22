import "./style/main.scss";
import "./style/footer.scss";
import { formHandler, formValidate } from "./js/formHandler";

const btn = document.querySelector('.main__btn');
const form = document.querySelector('.main__form');
// console.log(form);
console.log(formValidate('https//jestjs.io/docs/expect'));
form.addEventListener('submit', formHandler);