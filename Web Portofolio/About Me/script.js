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