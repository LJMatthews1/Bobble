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