import * as axios from "axios";
import * as iziToast from "izitoast";
import * as Swiper from "swiper";
import * as basicLightbox from "basiclightbox";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "basiclightbox/dist/basicLightbox.min.css";

//!  Form submit  (Header)
const formHeader = document.querySelector(".header-modal-form");
const formContainerHeader = document.querySelector(".header-modal");
const buttonHeader = document.querySelector(".header-btn");

formHeader.addEventListener("submit", SubmitFormHeader);

async function SubmitFormHeader(e) {
  e.preventDefault();
  const data = {
    name: formHeader.elements["name"].value.trim(),
    email: formHeader.elements["email-login"].value.trim(),
    password: formHeader.elements["password"].value.trim(),
  };
  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    iziToast.success({
      title: `Hello, ${data.name}`,
      position: "topCenter",
    });
  } catch (error) {
    console.log(error);
    iziToast.error({
      title: "Error",
      message: "Illegal operation",
    });
  } finally {
    formHeader.reset();
    formContainerHeader.classList.remove("is-open");
    buttonHeader.textContent = `Welcome, ${data.name}`;
    buttonHeader.style.color = "#f17228";
  }
}

// !Scroll default (Popular items)
const list = document.querySelector(".popular-items-list");
const prevBtn = document.querySelector(".popular-prev-btn");
const nextBtn = document.querySelector(".popular-next-btn");

const scrollAmount = 300;

list.addEventListener("scroll", updateButtons);

// updateButtons();

function updateButtons() {
  const scrollLeft = list.scrollLeft;
  const maxScrollLeft = list.scrollWidth - list.clientWidth;
  // console.log(list.clientWidth);

  prevBtn.hidden = scrollLeft <= 0;
  nextBtn.hidden = scrollLeft >= maxScrollLeft;
}

prevBtn.addEventListener("click", () => {
  list.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});

nextBtn.addEventListener("click", () => {
  list.scrollBy({ left: scrollAmount, behavior: "smooth" });
});

//! Show-all content  (Featured Restaurants)
const buttonFeatured = document.querySelector(".featured_btn_js");
const hiddenItems = document.querySelectorAll(".featured-item");

let isOpen = false;

buttonFeatured.addEventListener("click", () => {
  isOpen = !isOpen;

  hiddenItems.forEach((item) => {
    item.classList.toggle("show-all");
  });

  buttonFeatured.textContent = isOpen ? "Hide" : "View All";
});

//! Scroll Swiper (Search by Food)
const swiper = new Swiper(".swiper", {
  modules: [Autoplay, Navigation],
  //   loop: true,
  slidesPerView: "auto",
  // centeredSlides: true,
  spaceBetween: 10,
  freeMode: true,
  freeModeMomentum: false,
  speed: 1000,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".search-next-btn",
    prevEl: ".search-prev-btn",
  },
  direction: "horizontal",
});

//! Input localStorage (Are you starving. Hero)
const formHero = document.querySelector(".hero-form");
const inputHero = document.querySelector(".hero-form-input");
const locationName = document.querySelector(".header-location-text");
const storageKey = "hero-address-query";

formHero.addEventListener("input", handleInput);
formHero.addEventListener("submit", formSubmit);

loadFromLocalStorage();

function handleInput(e) {
  const value = e.target.value.trim();
  localStorage.setItem(storageKey, value);
}

function loadFromLocalStorage() {
  const savedValue = localStorage.getItem(storageKey);
  if (savedValue) {
    inputHero.value = savedValue;
  }
}

function formSubmit(e) {
  e.preventDefault();
  const value = inputHero.value.trim();
  if (!value) {
    iziToast.error({
      title: "Error!",
      message: "Enter your address",
      position: "bottomLeft",
    });
    return;
  }
  document.querySelectorAll(".header-location-text").forEach((item) => {
    item.textContent = value;
  });
  // locationName.textContent = value;
  localStorage.removeItem(storageKey);
  inputHero.value = "";
}

//!Email submit with fetch (Footer)
const formFooter = document.querySelector(".footer-form");
const inputFooter = document.querySelector(".footer-form-input");

formFooter.addEventListener("submit", formSubmitFooter);

async function formSubmitFooter(e) {
  e.preventDefault();

  const value = inputFooter.value.trim();
  if (!value) {
    iziToast.error({
      title: "Error!",
      message: "Enter your email",
      position: "bottomLeft",
    });
    return;
  }

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: value }),
    });

    if (!response.ok) {
      throw new Error("Server error");
    }

    const data = await response.json();
    console.log("Response:", data);
    iziToast.success({
      title: "Hmm...",
      message:
        "The server request went through without any issues, but I'm still on the job hunt.",
    });
    inputFooter.value = "";
  } catch (error) {
    console.log("Ошибка:", error.message);
  } finally {
    formFooter.reset();
    console.log("Form reset");
  }
}

// ! Modal with basicLightbox (Search by Food)
const listSearch = document.querySelector(".search-list");

listSearch.addEventListener("click", (e) => {
  if (e.target.classList.contains("search-item-img")) {
    const name = e.target.dataset.name;
    const desc = e.target.dataset.description;
    const imgSrc = e.target.src;

    const instance = basicLightbox.create(
      `
      <div class="search-item-modal-container">
        <img src="${imgSrc}" class="search-item-modal-img">
        <h2 class="search-item-modal-title">${name}</h2>
        <p class="search-item-modal-description">${desc}</p>
      </div>
    `,
      {
        className: "custom-modal",
        closable: true,
      }
    );
    instance.show();
  }
});

// !Open modal registration (Header)
const openBtnHeader = document.querySelector(".header-btn");
const modalHeader = document.querySelector(".header-modal");
const closeBtnHeader = document.querySelector(".header-modal-close-btn");

openBtnHeader.addEventListener("click", () => {
  modalHeader.classList.add("is-open");
});

closeBtnHeader.addEventListener("click", () => {
  modalHeader.classList.remove("is-open");
  // console.log("ok");
});

window.addEventListener("click", (e) => {
  if (e.target === modalHeader) {
    modalHeader.classList.remove("is-open");
  }
});

// !scroll-to-top
const scrollBtn = document.querySelector(".scroll-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 800) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

//! order Popular items
const buttonOrder = document.querySelectorAll(".popular-item-btn");

buttonOrder.forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".popular-items-item");
    const title = item.querySelector(".popular-item-title").textContent;
    iziToast.info({
      title: "👌",
      message:
        "I could add the order to the cart, but I need a job offer to make it happen.",
    });
  });
});

// ! Scroll from header to popular-top (Header)
const searchInput = document.querySelector(".search-input");
const targetSection = document.querySelector("#popular-top");

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    targetSection.scrollIntoView({
      behavior: "smooth",
    });
  }
});

//! preventDefault footer link (footer)
const footerLink = document.querySelectorAll(".footer-item-link");

footerLink.forEach((item) =>
  item.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Click success.");
  })
);
