function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
        document.querySelector('.hamburger').classList.remove('active');
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

// Desktop dropdown hover behavior
document.querySelectorAll('.nav-links li.dropdown').forEach(dropdown => {
    let hideTimeout;
    
    dropdown.addEventListener('mouseenter', () => {
        clearTimeout(hideTimeout);
        const menu = dropdown.querySelector('.dropdown-menu');
        menu.style.display = 'block';
    });
    
    dropdown.addEventListener('mouseleave', () => {
        hideTimeout = setTimeout(() => {
            const menu = dropdown.querySelector('.dropdown-menu');
            menu.style.display = 'none';
        }, 150); // 150ms delay before hiding so it makes it easier to press
    });
});
