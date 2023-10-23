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

