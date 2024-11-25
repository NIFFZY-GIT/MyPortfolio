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

// Smooth scrolling for navigation links
document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth',
      });
    });
  });
  

  // Apply fade-in effect on scroll
const sectionsToAnimate = document.querySelectorAll('section');

const observerOptions = {
  threshold: 0.1,
};

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('section-visible');
      entry.target.classList.remove('section-hidden');
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

sectionsToAnimate.forEach(section => {
  section.classList.add('section-hidden');
  observer.observe(section);
});


