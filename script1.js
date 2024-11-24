document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.getElementById('navbar');

    if (!menuIcon || !navbar) {
        console.error('Menu icon or navbar not found.');
        return;
    }

    // Toggle navbar visibility
    menuIcon.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });
});
