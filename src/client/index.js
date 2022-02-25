import "./style/resets.scss";
import "./style/base.scss";
import "./style/main.scss";
import "./style/footer.scss";
import { formHandler, formValidate, hideResult } from "./js/formHandler";

const btn = document.querySelector('.main__btn');
const form = document.querySelector('.main__form');

hideResult();
form.addEventListener('submit', formHandler);