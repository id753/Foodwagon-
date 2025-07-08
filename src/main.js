import axios from "axios";
//! Form submit (Header)
const formHeader = document.querySelector(".header-modal-form");
const formContainerHeader = document.querySelector(".header-modal");
const buttonHeader = document.querySelector(".header-btn");

formHeader.addEventListener("submit", SubmitFormHeader);

async function SubmitFormHeader(e) {
  e.preventDefault();
  const data = {
    name: formHeader.elements["name"].value.trim(),
    email: formHeader.elements["email"].value.trim(),
    password: formHeader.elements["password"].value.trim(),
  };
  try {
    const response = await axios.post("https://example.com/api", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
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

//!3 Scroll Swiper (Search by Food)
import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

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

//! Input localStorage (Are you starving)
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
    alert("no");
    return;
  }
  locationName.textContent = value;
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
    alert("Please enter your email.");
    return;
  }

  try {
    const response = await fetch("https://example.com/api", {
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
    alert("Successfully submitted!");
    inputFooter.value = "";
  } catch (error) {
    console.log("Ошибка:", error.message);
    alert("Something went wrong.");
  } finally {
    formFooter.reset();
    console.log("Form reset");
  }
}

// ! Modal with basicLightbox (Search by Food)
import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";

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

// !6 Open modal registration (Header)
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

// !кнопка топ
const scrollBtn = document.querySelector(".scroll-to-top");

// Показать кнопку при прокрутке вниз
window.addEventListener("scroll", () => {
  if (window.scrollY > 800) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});

// Прокрутка вверх при клике
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
    console.log("Заказано:", title);
  });
});
