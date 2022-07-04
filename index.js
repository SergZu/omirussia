import Swiper, { Navigation, Pagination, Autoplay, Keyboard } from "swiper";
import { CustomSelect } from "./scripts/CustomSelect";

const emailRegexp = /\w+@\w+\.\w+/g;
const textRegexp = /\w+/g;
const passRegexp = /\w{3,}/g;

const cookieAcceptLCkey = "_app_cookies";
const initValue = "432524"; // Init number for counter
const counterAnimationDuration = 4750;

const swiperSettings = {
  modules: [Navigation, Pagination, Autoplay, Keyboard],
  speed: 500,
  centeredSlides: true,
  pagination: {
    el: ".slider__pagination",
    bulletActiveClass: "slider__bullet-active",

    clickable: true,
    slideToClickedSlide: true,
    bulletClass: "slider__bullet",
    renderBullet: function (index, className) {
      return `<span class="${className} bullet-${
        index + 1
      }"><svg class="progressBarContainer"><circle class="progressBar-circular" cx="30" cy="30" r="27"></circle></svg></span>`;
    },
  },
  keyboard: {
    enabled: true,
  },

  autoplay: {
    delay: 10000,
    disableOnInteraction: false,
  },
  loop: true,
};

document.addEventListener("DOMContentLoaded", () => {
  const cookies = localStorage.getItem(cookieAcceptLCkey);
  if (cookies === "true") {
    const cookiePopup = document.querySelector(".js-cookies");
    cookiePopup.classList.add("cookies-hide");
  }

  const swiper = new Swiper(".slider", swiperSettings);
});

const select = new CustomSelect(".customSelect", {
  name: "Country",
  targetValue: "USA",
  options: [
    ["USA", '<span class="flagIcon flagIcon-USA"></span>USA', "USA"],
    [
      "Canada",
      '<span class="flagIcon flagIcon-Canada"></span>Canada',
      "Canada",
    ],
    [
      "Australia",
      '<span class="flagIcon flagIcon-Australia"></span>Australia',
      "Australia",
    ],
  ],
});

select.selectedIndex = 0;

const dropDown = document.querySelector(".select__toggle");

let value = initValue;
for (let i = 1; i < initValue.length + 1; i++) {
  const target = document.querySelector(`.js-digits-${i}`);
  target.style.marginTop = `-${initValue[i - 1]}em`; // Init counter animation
}
setInterval(() => {
  const newValue = `${Number(value) + Math.round(Math.random() * 3 + 2)}`;
  value = newValue;
  for (let i = 1; i < newValue.length + 1; i++) {
    const target = document.querySelector(`.js-digits-${i}`);
    target.style.marginTop = `-${newValue[i - 1]}em`; // Counter constant animation
  }
}, counterAnimationDuration);

window.addEventListener("focus", () => {
  const activeButton = document.querySelector(
    ".slider__bullet-active .progressBar-circular"
  );
  activeButton.style.animation = "none";
  setTimeout(() => {
    activeButton.style.animation = "";
  }, 150);
});

const cookieBtn = document.querySelector(".js-cookies__btn");
cookieBtn?.addEventListener(
  "click",
  () => {
    localStorage.setItem(cookieAcceptLCkey, true);
    const popup = document.querySelector(".js-cookies");
    popup.classList.add("cookies-hide");
  },
  { once: true }
);

const modal = document.querySelector(".modal");
modal?.addEventListener("click", () => {
  modal.classList.remove("modal-opened");
  const modalForms = document.querySelectorAll(".modal__form-show");
  modalForms?.forEach((form) => {
    form.classList.remove("modal__form-show");
  });
});

const modalForms = document.querySelectorAll(".modal__form");
modalForms?.forEach((form) => {
  form.addEventListener("click", (evt) => {
    evt.stopPropagation();
  });
});

const passBtn = document.querySelectorAll(".js-passVisibleBtn");
passBtn?.forEach((button) => {
  button.addEventListener("click", (evt) => {
    evt.preventDefault();
    const inputWrapper = evt.target.closest(".js-passwordWrapper");
    const input = inputWrapper?.querySelector(".js-passwordInput");
    if (input === null) return false;
    if (input.getAttribute("type") === "password") {
      input.setAttribute("type", "text");
      button.classList.remove("password-show");
      button.classList.add("password");
    } else {
      input.setAttribute("type", "password");
      button.classList.remove("password");
      button.classList.add("password-show");
    }
  });
});

const passInputs = document.querySelectorAll(".js-passwordInput");
passInputs?.forEach((input) => {
  input.addEventListener("change", (evt) => {
    const value = evt.target.value;
    const inputWrapper = evt.target.closest(".js-passwordWrapper");
    if (!passRegexp.test(value) && value.length < 3) {
      inputWrapper.dataset.validated = "false";
      return false;
    }
    inputWrapper.dataset.validated = "true";
  });
});

const forgotPass = document.querySelector(".js-forgotPassword");
forgotPass?.addEventListener("click", () => {
  const loginForm = document.querySelector(".js-loginForm");
  const recoveryModal = document.querySelector(".js-recoveryForm");
  loginForm?.classList.remove("modal__form-show");
  recoveryModal?.classList.add("modal__form-show");
});

const loginPass = document.querySelectorAll(".js-backToLogin");
loginPass.forEach((loginLink) => {
  loginLink.addEventListener("click", () => {
    const modalForms = document.querySelectorAll(".modal__form-show");
    modalForms?.forEach((form) => {
      form.classList.remove("modal__form-show");
    });
    const loginForm = document.querySelector(".js-loginForm");
    loginForm?.classList.add("modal__form-show");
  });
});

const registrationPass = document.querySelector(".js-createAccount");
registrationPass?.addEventListener("click", () => {
  const loginForm = document.querySelector(".js-loginForm");
  const registrationForm = document.querySelector(".js-registrationForm");
  loginForm?.classList.remove("modal__form-show");
  registrationForm?.classList.add("modal__form-show");
});

const recoveryBtn = document.querySelector(".js-recoveryFormBtn");
recoveryBtn?.addEventListener("click", () => {
  const modal = document.querySelector(".js-modalContainer");
  const recoveryForm = document.querySelector(".js-recoveryForm");
  const input = document.querySelector(".js-recoveryEmailInput");
  if (!emailRegexp.test(input.value)) return false;
  recoveryForm?.classList.remove("modal__form-show");
  modal?.classList.remove("modal-opened");
});

const loginBtn = document.querySelectorAll(".js-loginBtn");
loginBtn?.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(".js-modalContainer");
    const loginForm = document.querySelector(".js-loginForm");
    modal?.classList.add("modal-opened");
    loginForm?.classList.add("modal__form-show");
  });
});

const footerBtn = document.querySelector(".js-footerContactBtn");
footerBtn?.addEventListener("click", () => {
  const modal = document.querySelector(".js-modalContainer");
  const contactForm = document.querySelector(".js-contactForm");
  modal?.classList.add("modal-opened");
  contactForm?.classList.add("modal__form-show");
});

const registrationBtn = document.querySelectorAll(".js-registrationBtn");
registrationBtn?.forEach((button) => {
  button.addEventListener("click", () => {
    console.log("click");
    const modal = document.querySelector(".js-modalContainer");
    const registrationForm = document.querySelector(".js-registrationForm");
    modal?.classList.add("modal-opened");
    registrationForm?.classList.add("modal__form-show");
  });
});

const contactFormBtn = document.querySelector(".js-contactFormBtn");
contactFormBtn?.addEventListener("click", () => {
  const emailInput = document.querySelector(".js-contactEmailInput");
  const textInput = document.querySelector(".js-contactTextInput");
  const isValid =
    emailRegexp.test(emailInput?.value) && textRegexp.test(textInput?.value);
  if (!isValid) return false;
  const contactAnswer = document.querySelector(".js-contactAnswerModal");
  const contactForm = document.querySelector(".js-contactForm");
  contactForm?.classList.remove("modal__form-show");
  contactAnswer?.classList.add("modal__form-show");
});

const contactAnswerBtn = document.querySelector(".js-contactAnswerBtn");
contactAnswerBtn?.addEventListener("click", () => {
  const modal = document.querySelector(".js-modalContainer");
  const contactAnswer = document.querySelector(".js-contactAnswerModal");
  contactAnswer?.classList.remove("modal__form-show");
  modal?.classList.remove("modal-opened");
});

const loginEnterBtn = document.querySelector(".js-loginFormBtn");
loginEnterBtn.addEventListener("click", () => {
  const inputValue = document.querySelector(".js-loginEmailInput");
  const form = document.querySelector(".js-loginForm");
  const passWrapper = form.querySelector(".js-passwordWrapper");
  const isValid =
    emailRegexp.test(inputValue?.value) &&
    passWrapper.dataset.validated === "true";
  if (!isValid) return false;
  const modal = document.querySelector(".js-modalContainer");
  modal?.classList.remove("modal-opened");
  form?.classList.remove("modal__form-show");
});

const registrationEnterBtn = document.querySelector(".js-registrationFormBtn");
registrationEnterBtn.addEventListener("click", () => {
  const inputValue = document.querySelector(".js-registrationEmailInput");
  const form = document.querySelector(".js-registrationForm");
  const passWrapper = form.querySelector(".js-passwordWrapper");
  const isValid =
    emailRegexp.test(inputValue?.value) &&
    passWrapper.dataset.validated === "true";
  if (!isValid) return false;
  const modal = document.querySelector(".js-modalContainer");
  modal?.classList.remove("modal-opened");
  form?.classList.remove("modal__form-show");
});

const mobileMenuBtn = document.querySelector(".js-menu__mobile");
mobileMenuBtn?.addEventListener("click", () => {
  const navigation = document.querySelector(".js-navigation");
  if (mobileMenuBtn.classList.contains("menu__mobile-opened")) {
    console.log("++");
    mobileMenuBtn.classList.remove("menu__mobile-opened");
    console.log(navigation);
    navigation.classList.add("header__navlist-closed");
    navigation.classList.remove("header__navlist-opened");
    return false;
  }
  console.log("--");
  mobileMenuBtn.classList.add("menu__mobile-opened");
  navigation.classList.toggle("header__navlist-closed", false);
  navigation.classList.add("header__navlist-opened");
  console.log(navigation);
});
