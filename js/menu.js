function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// Toggle dropdown submenu on small screens when parent button is clicked
document.querySelectorAll('.dropdown > .dropbtn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const hamburger = document.querySelector('.hamburger');
        const isMobile = window.getComputedStyle(hamburger).display !== 'none';
        if (isMobile) {
            e.preventDefault();
            btn.parentElement.classList.toggle('open');
        }
    });
});
