document.addEventListener("DOMContentLoaded", () => {
    const menuIcon = document.getElementById("menuIcon");
    const navbar = document.getElementById("navbar");

    menuIcon.addEventListener("click", () => {
        navbar.classList.toggle("active");
    });

    // Close the menu when clicking outside of it
    document.addEventListener("click", (event) => {
        if (!navbar.contains(event.target) && !menuIcon.contains(event.target)) {
            navbar.classList.remove("active");
        }
    });
});
