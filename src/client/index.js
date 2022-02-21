import "./style/main.scss";
import "./style/footer.scss";
import { formHandler, formValidate } from "./js/formHandler";

const btn = document.querySelector('.main__btn');
const form = document.querySelector('.main__form');
// console.log(form);
console.log(formValidate('https//translate.yandex.ru/?lang=en-ru&text=User%20input%20is%20a%20link'));
form.addEventListener('submit', formHandler);