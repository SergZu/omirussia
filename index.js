import Swiper, { Navigation, Pagination, Autoplay, Keyboard } from "swiper";
import { CustomSelect } from "./scripts/CustomSelect";

const emailRegexp = /\w+@\w+\.\w+/g;
const textRegexp = /\w+/g;
const passRegexp = /\w{3,}/g;

const cookieAcceptLCkey = "_app_cookies";
const initValue = "9612130"; // Init number for counter
const counterAnimationDuration = 4750;

const openModal = function () {
  const modal = document.querySelector(".js-modalContainer");
  modal?.classList.add("modal-opened");
};

const openScrollableModal = function () {
  const modal = document.querySelector(".js-modalScrollContainer");
  modal?.classList.add("modal-opened");
};

const closeModal = function () {
  const modal = document.querySelector(".js-modalContainer");
  modal?.classList.remove("modal-opened");
};

const closeScrollableModal = function () {
  const modal = document.querySelector(".js-modalScrollContainer");
  modal?.classList.remove("modal-opened");
};

const closeAllModals = function () {
  const modalForms = document.querySelectorAll(".modal__form-show");
  modalForms?.forEach((form) => {
    form.classList.remove("modal__form-show");
  });
};

const openModalWindow = function (targetClass) {
  const recoveryModal = document.querySelector(targetClass);
  recoveryModal?.classList.add("modal__form-show");
};

const closeModalWindow = function (targetClass) {
  const recoveryModal = document.querySelector(targetClass);
  recoveryModal?.classList.remove("modal__form-show");
};

const scrollModalToTop = function () {
  if (Number(document.documentElement.scrollWidth) < 1024)
    window.scrollTo(0, 0);
};

const swiperSettings = {
  modules: [Navigation, Pagination, Autoplay, Keyboard],
  speed: 500,
  slidesPerView: 1,
  spaceBetween: 40,
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
  // Animation reset after tab leave
  const activeButton = document.querySelector(
    ".slider__bullet-active .progressBar-circular"
  );
  activeButton.style.animation = "none";
  setTimeout(() => {
    activeButton.style.animation = "";
  }, 150);
});

const cookieBtn = document.querySelector(".js-cookies__btn"); // Cookies window handler
cookieBtn?.addEventListener(
  "click",
  () => {
    localStorage.setItem(cookieAcceptLCkey, true);
    const popup = document.querySelector(".js-cookies");
    popup.classList.add("cookies-hide");
  },
  { once: true }
);

const modal = document.querySelector(".modal"); // Modal offscreen handler
modal?.addEventListener("click", () => {
  closeAllModals();
  closeModal();
});

const modalScrollable = document.querySelector(".modal-scrollable");
modalScrollable.addEventListener("click", () => {
  closeAllModals();
  closeScrollableModal();
});

const modalForms = document.querySelectorAll(".modal__form"); // Prevent closing window when click forms
modalForms?.forEach((form) => {
  form.addEventListener("click", (evt) => {
    evt.stopPropagation();
  });
});

const passBtn = document.querySelectorAll(".js-passVisibleBtn"); // Password show/hide handler
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

const passInputs = document.querySelectorAll(".js-passwordInput"); // Password validation
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

const forgotPass = document.querySelector(".js-forgotPassword"); // Forgot password handler
forgotPass?.addEventListener("click", () => {
  closeModalWindow(".js-loginForm");
  closeScrollableModal();
  openModal();
  openModalWindow(".js-recoveryForm");
});

const loginPass = document.querySelectorAll(".js-backToLogin"); // Back to login handler
loginPass.forEach((loginLink) => {
  loginLink.addEventListener("click", () => {
    closeAllModals();
    closeModal();
    openScrollableModal();
    scrollModalToTop();
    openModalWindow(".js-loginForm");
  });
});

const registrationPass = document.querySelector(".js-createAccount"); // From login to registration handler
registrationPass?.addEventListener("click", () => {
  closeModalWindow(".js-loginForm");
  scrollModalToTop();
  openModalWindow(".js-registrationForm");
});

const recoveryBtn = document.querySelector(".js-recoveryFormBtn"); // Recovery password handler
recoveryBtn?.addEventListener("click", () => {
  const input = document.querySelector(".js-recoveryEmailInput");
  if (!emailRegexp.test(input.value)) return false;
  closeModalWindow(".js-recoveryForm");
  closeModal();
});

const loginBtn = document.querySelectorAll(".js-loginBtn"); // Login buttons handler
loginBtn?.forEach((button) => {
  button.addEventListener("click", () => {
    openScrollableModal();
    scrollModalToTop();
    openModalWindow(".js-loginForm");
  });
});

const footerBtn = document.querySelector(".js-footerContactBtn"); // Contact us button handler
footerBtn?.addEventListener("click", () => {
  openModal();
  openModalWindow(".js-contactForm");
});

const registrationBtn = document.querySelectorAll(".js-registrationBtn"); // Registration button handler
registrationBtn?.forEach((button) => {
  button.addEventListener("click", () => {
    openScrollableModal();
    scrollModalToTop();
    openModalWindow(".js-registrationForm");
  });
});

const contactFormBtn = document.querySelector(".js-contactFormBtn"); // Contact form handler
contactFormBtn?.addEventListener("click", () => {
  const emailInput = document.querySelector(".js-contactEmailInput");
  const textInput = document.querySelector(".js-contactTextInput");
  const isValid =
    emailRegexp.test(emailInput?.value) && textRegexp.test(textInput?.value);
  if (!isValid) return false;

  closeModalWindow(".js-contactForm");
  openModalWindow(".js-contactAnswerModal");
});

const contactAnswerBtn = document.querySelector(".js-contactAnswerBtn"); // Contact response button handler
contactAnswerBtn?.addEventListener("click", () => {
  closeModal();
  closeModalWindow(".js-contactAnswerModal");
});

const loginEnterBtn = document.querySelector(".js-loginFormBtn"); // Login form handler
loginEnterBtn.addEventListener("click", () => {
  const inputValue = document.querySelector(".js-loginEmailInput");
  const form = document.querySelector(".js-loginForm");
  const passWrapper = form.querySelector(".js-passwordWrapper");
  const isValid =
    emailRegexp.test(inputValue?.value) &&
    passWrapper.dataset.validated === "true";
  if (!isValid) return false;

  closeScrollableModal();
  closeModalWindow(".js-loginForm");
});

const registrationEnterBtn = document.querySelector(".js-registrationFormBtn"); // Registration handler
registrationEnterBtn.addEventListener("click", () => {
  const inputValue = document.querySelector(".js-registrationEmailInput");
  const form = document.querySelector(".js-registrationForm");
  const passWrapper = form.querySelector(".js-passwordWrapper");
  const isValid =
    emailRegexp.test(inputValue?.value) &&
    passWrapper.dataset.validated === "true";
  if (!isValid) return false;

  closeScrollableModal();
  closeModalWindow(".js-registrationForm");
});

const mobileMenuBtn = document.querySelector(".js-menu__mobile"); // Mobile menu handler
mobileMenuBtn?.addEventListener("click", () => {
  const navigation = document.querySelector(".js-navigation");
  if (mobileMenuBtn.classList.contains("menu__mobile-opened")) {
    mobileMenuBtn.classList.remove("menu__mobile-opened");
    navigation.classList.add("header__navlist-closed");
    navigation.classList.remove("header__navlist-opened");
    return false;
  }
  mobileMenuBtn.classList.add("menu__mobile-opened");
  navigation.classList.toggle("header__navlist-closed", false);
  navigation.classList.add("header__navlist-opened");
});
