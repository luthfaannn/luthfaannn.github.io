var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.querySelector(".menu").classList.remove("hide");
  } else {
    document.querySelector(".menu").classList.add("hide");
  }
  prevScrollpos = currentScrollPos;
};

document.querySelector(".menu-icon").addEventListener("click", function () {
  var menu = document.querySelector(".menu");
  menu.classList.toggle("active");
});

// Kode JavaScript untuk slider kartu
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
}

let currentSlide = 0;

function moveToSlide(slideNumber) {
    // Periksa apakah slideNumber kurang dari 0 atau lebih dari panjang slider
    if (slideNumber < 0) {
        slideNumber = carouselChildrens.length - 1;
    } else if (slideNumber >= carouselChildrens.length) {
        slideNumber = 0;
    }
    
    const targetScroll = slideNumber * firstCardWidth;
    
    currentSlide = slideNumber; // Update currentSlide
    carousel.scrollLeft = targetScroll;
}

// Modifikasi event listener pada tombol panah kiri dan kanan
arrowBtns[0].addEventListener("click", () => {
    moveToSlide(currentSlide - 1); // Geser ke slide sebelumnya
});

arrowBtns[1].addEventListener("click", () => {
    moveToSlide(currentSlide + 1); // Geser ke slide berikutnya
});

// Panggil moveToSlide() setelah menginisialisasi slider untuk memulai slider di slide pertama
moveToSlide(0);


carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));

// Temukan semua elemen dengan class "card"
const cards = document.querySelectorAll(".card");

// Tambahkan event listener untuk setiap elemen card
cards.forEach(card => {
  card.addEventListener("click", () => {
    // Dapatkan URL dari atribut data-url
    const url = card.getAttribute("data-url");
    
    // Buka URL di jendela baru saat elemen card diklik
    window.open(url, "_blank");
  });
});
