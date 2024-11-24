let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("bx-x"); // Toggle the 'bx-x' class on menuIcon
  navbar.classList.toggle("active"); // Toggle the 'active' class on the navbar
});
