/**
 * BMW Hub Testimonials Slider
 * Handles testimonial carousel functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    initTestimonialsSlider();
});

/**
 * Initialize Testimonials Slider
 */
function initTestimonialsSlider() {
    const sliderContainer = document.querySelector('.testimonials-slider');
    
    if (!sliderContainer) return;
    
    const testimonials = sliderContainer.querySelectorAll('.testimonial-item');
    
    if (testimonials.length <= 1) return;
    
    // Add navigation buttons
    const prevButton = document.createElement('button');
    prevButton.className = 'slider-nav prev';
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevButton.setAttribute('aria-label', 'Previous testimonial');
    
    const nextButton = document.createElement('button');
    nextButton.className = 'slider-nav next';
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextButton.setAttribute('aria-label', 'Next testimonial');
    
    // Add pagination indicators
    const pagination = document.createElement('div');
    pagination.className = 'slider-pagination';
    
    for (let i = 0; i < testimonials.length; i++) {
        const dot = document.createElement('span');
        dot.className = 'pagination-dot';
        if (i === 0) dot.classList.add('active');
        dot.dataset.index = i;
        pagination.appendChild(dot);
    }
    
    // Add elements to slider
    sliderContainer.appendChild(prevButton);
    sliderContainer.appendChild(nextButton);
    sliderContainer.appendChild(pagination);
    
    // Initialize slider state
    let currentIndex = 0;
    let isAnimating = false;
    let autoplayTimer = null;
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Set initial state
    updateSlider();
    
    // Start autoplay
    startAutoplay();
    
    // Event Listeners
    prevButton.addEventListener('click', showPrevSlide);
    nextButton.addEventListener('click', showNextSlide);
    
    // Pagination click
    const paginationDots = pagination.querySelectorAll('.pagination-dot');
    paginationDots.forEach(dot => {
        dot.addEventListener('click', function() {
            if (isAnimating) return;
            
            const index = parseInt(dot.dataset.index);
            goToSlide(index);
        });
    });
    
    // Pause autoplay on hover
    sliderContainer.addEventListener('mouseenter', function() {
        stopAutoplay();
    });
    
    sliderContainer.addEventListener('mouseleave', function() {
        startAutoplay();
    });
    
    // Touch events for mobile
    sliderContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoplay();
    }, { passive: true });
    
    sliderContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoplay();
    }, { passive: true });
    
    // Functions
    function showPrevSlide() {
        if (isAnimating) return;
        
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        updateSlider();
    }
    
    function showNextSlide() {
        if (isAnimating) return;
        
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateSlider();
    }
    
    function goToSlide(index) {
        if (currentIndex === index || isAnimating) return;
        
        currentIndex = index;
        updateSlider();
    }
    
    function updateSlider() {
        isAnimating = true;
        
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.style.opacity = '0';
            testimonial.style.transform = 'translateX(20px)';
            setTimeout(() => {
                testimonial.style.display = 'none';
            }, 300);
        });
        
        // Update pagination
        paginationDots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Show current testimonial
        setTimeout(() => {
            const currentTestimonial = testimonials[currentIndex];
            currentTestimonial.style.display = 'block';
            
            setTimeout(() => {
                currentTestimonial.style.opacity = '1';
                currentTestimonial.style.transform = 'translateX(0)';
                
                setTimeout(() => {
                    isAnimating = false;
                }, 300);
            }, 50);
        }, 300);
    }
    
    function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(showNextSlide, 5000);
    }
    
    function stopAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    }
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - next slide
            showNextSlide();
        } else if (touchEndX > touchStartX + 50) {
            // Swipe right - previous slide
            showPrevSlide();
        }
    }
    
    // Add slider styles
    addSliderStyles();
}

/**
 * Add necessary styles for the slider
 */
function addSliderStyles() {
    // Check if styles already exist
    if (document.getElementById('testimonials-slider-styles')) return;
    
    const styleElement = document.createElement('style');
    styleElement.id = 'testimonials-slider-styles';
    
    const styles = `
        .testimonials-slider {
            position: relative;
            padding: 0 50px;
        }
        
        .testimonial-item {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .slider-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 40px;
            height: 40px;
            background-color: var(--primary-color);
            color: var(--white);
            border: none;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            z-index: 10;
            transition: background-color 0.3s ease;
        }
        
        .slider-nav:hover {
            background-color: var(--secondary-color);
        }
        
        .slider-nav.prev {
            left: 0;
        }
        
        .slider-nav.next {
            right: 0;
        }
        
        .slider-pagination {
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }
        
        .pagination-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: var(--medium-gray);
            margin: 0 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        
        .pagination-dot.active {
            background-color: var(--primary-color);
        }
        
        @media (max-width: 767px) {
            .testimonials-slider {
                padding: 0 40px;
            }
            
            .slider-nav {
                width: 30px;
                height: 30px;
            }
        }
    `;
    
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
}