// Hero Slider
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.hero-slider');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.slide');
    const dotsContainer = slider.querySelector('.slider-dots');
    let currentSlide = 0;
    let slideInterval;
    
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = dotsContainer.querySelectorAll('.dot');
    
    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = (index + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        resetInterval();
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000); 
    }
    
    resetInterval();
    
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', resetInterval);
});
