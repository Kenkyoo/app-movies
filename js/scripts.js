// Navbar animation when scrolled

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const hero = document.getElementById('hero');

    window.addEventListener('scroll', function() {
        if (window.scrollY > hero.offsetHeight) {
            navbar.classList.add('bg-navbar');
        } else {
            navbar.classList.remove('bg-navbar');
        }
    });


// Lazy loading

    const imgs = document.querySelectorAll("img");
    imgs.forEach(img => {
      // Cambia el atributo src a data-src
      img.setAttribute('data-src', img.src);
      img.removeAttribute('src');
      // Añade la clase lazyload
      img.classList.add('lazyload');
    });

    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
});
