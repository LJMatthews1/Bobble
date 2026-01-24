let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const slideText = document.getElementById('slide-text');
const actionBtn = document.getElementById('action-btn');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${(i - index) * 100}%)`;
    });
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    const activeSlide = slides[index];
    slideText.textContent = activeSlide.dataset.text;
    document.getElementById('about-header').textContent = activeSlide.dataset.header;

    // Update button based on slide
    actionBtn.textContent = activeSlide.dataset.buttonText;
    actionBtn.href = activeSlide.dataset.buttonHref;
    if (index === slides.length - 1) {
        actionBtn.className = 'btn btn-final';
    } else {
        actionBtn.className = 'btn btn-primary';
    }

    // Disable nav buttons appropriately
    document.querySelector('.prev-btn').disabled = index === 0;
    document.querySelector('.next-btn').disabled = index === slides.length - 1;
    
    // Align arrows based on slide position
    const navRow = document.querySelector('.nav-row');
    navRow.classList.remove('nav-row-last', 'nav-row-middle', 'nav-row-first');
    
    if (index === 0) {
        navRow.classList.add('nav-row-first');
    } else if (index === slides.length - 1) {
        navRow.classList.add('nav-row-last');
    } else {
        navRow.classList.add('nav-row-middle');
    }
    
    // Hide signup link on last slide
    const signupLink = document.querySelector('.signup-link');
    if (index === slides.length - 1) {
        signupLink.classList.add('hidden');
    } else {
        signupLink.classList.remove('hidden');
    }
}

function changeSlide(n) {
    slideIndex += n;
    if (slideIndex >= slides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;
    showSlide(slideIndex);
}

function currentSlide(n) {
    slideIndex = n;
    showSlide(slideIndex);
}

showSlide(slideIndex);