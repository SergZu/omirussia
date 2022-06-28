import Swiper, { Navigation, Pagination, Autoplay, Keyboard } from "swiper";
import { CustomSelect } from "./scripts/CustomSelect";

const initValue = "432524"; // Init number for counter

document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".slider", {
    modules: [Navigation, Pagination, Autoplay, Keyboard],
    speed: 500,
    centeredSlides: true,
    // navigation: {
    //   nextEl: ".swiper-button-next",
    //   prevEl: ".swiper-button-prev",
    // },
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
  });
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
}, 4000);
