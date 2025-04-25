/**
 * Modernized JavaScript for BMW Hub
 * Mercedes-Benz/Sprinter City Style
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initStickyHeader();
    initVideoBackground();
    initSmoothScroll();
    initAnimations();
    
    // Initialize form validation if on contact page
    if (document.querySelector('.contact-form')) {
        initFormValidation();
    }
    
    // Initialize FAQ toggles if on contact page
    if (document.querySelector('.faq-container')) {
        initFaqToggles();
    }
    
    // Initialize service process animation if on service detail page
    if (document.querySelector('.process-steps')) {
        initProcessAnimation();
    }
});

/**
 * Sticky Header on Scroll
 */
function initStickyHeader() {
    const header = document.querySelector('header');
    const topBar = document.querySelector('.top-bar');
    
    if (!header || !topBar) return;
    
    const headerHeight = header.offsetHeight;
    const topBarHeight = topBar.offsetHeight;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > topBarHeight) {
            header.classList.add('sticky');
            document.body.style.paddingTop = headerHeight + 'px';
        } else {
            header.classList.remove('sticky');
            document.body.style.paddingTop = '0';
        }
    });
}

/**
 * Initialize video background for hero section
 */
function initVideoBackground() {
    const videoElement = document.querySelector('.video-background video');
    if (!videoElement) return;
    
    // Check if browser supports video
    const isVideoSupported = !!document.createElement('video').canPlayType;
    
    if (!isVideoSupported) {
        // If video is not supported, use the image background
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.classList.add('video-fallback');
        }
        return;
    }
    
    // Try to autoplay the video
    videoElement.play().catch(function(error) {
        console.log('Autoplay prevented:', error);
        
        // Create a play button for devices that don't allow autoplay
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const playButton = document.createElement('button');
            playButton.innerHTML = '<i class="fas fa-play"></i>';
            playButton.className = 'video-play-button';
            heroSection.appendChild(playButton);
            
            playButton.addEventListener('click', function() {
                videoElement.play().then(function() {
                    playButton.style.display = 'none';
                }).catch(function(error) {
                    console.log('Video play failed:', error);
                    heroSection.classList.add('video-fallback');
                });
            });
        }
    });
    
    // Pause video when not in viewport to save resources
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    videoElement.play().catch(() => {});
                } else {
                    videoElement.pause();
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(document.querySelector('.hero'));
    }
}

/**
 * Smooth scroll for internal links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get the sticky header height if it exists
                const header = document.querySelector('header.sticky');
                const offset = header ? header.offsetHeight : 0;
                
                // Calculate the position to scroll to
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
                
                // Scroll smoothly
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Form validation for contact form
 */
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    form.addEventListener('submit', function(event) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(function(field) {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                
                // Create error message
                let errorMsgElement = field.parentElement.querySelector('.error-message');
                
                if (!errorMsgElement) {
                    errorMsgElement = document.createElement('div');
                    errorMsgElement.className = 'error-message';
                    field.parentElement.appendChild(errorMsgElement);
                }
                
                errorMsgElement.textContent = `${field.getAttribute('placeholder') || 'This field'} is required`;
            } else {
                field.classList.remove('error');
                
                const errorMsgElement = field.parentElement.querySelector('.error-message');
                if (errorMsgElement) {
                    errorMsgElement.remove();
                }
            }
        });
        
        // Validate email format if there's an email field
        const emailField = form.querySelector('input[type="email"]');
        if (emailField && emailField.value.trim()) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailField.value)) {
                isValid = false;
                emailField.classList.add('error');
                
                let errorMsgElement = emailField.parentElement.querySelector('.error-message');
                
                if (!errorMsgElement) {
                    errorMsgElement = document.createElement('div');
                    errorMsgElement.className = 'error-message';
                    emailField.parentElement.appendChild(errorMsgElement);
                }
                
                errorMsgElement.textContent = 'Please enter a valid email address';
            }
        }
        
        if (!isValid) {
            event.preventDefault();
        }
    });
    
    // Real-time validation on input
    const formFields = form.querySelectorAll('input, textarea, select');
    formFields.forEach(function(field) {
        field.addEventListener('input', function() {
            if (field.hasAttribute('required') && field.value.trim()) {
                field.classList.remove('error');
                
                const errorMsgElement = field.parentElement.querySelector('.error-message');
                if (errorMsgElement) {
                    errorMsgElement.remove();
                }
            }
            
            // Real-time email validation
            if (field.type === 'email' && field.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailPattern.test(field.value)) {
                    field.classList.remove('error');
                    
                    const errorMsgElement = field.parentElement.querySelector('.error-message');
                    if (errorMsgElement) {
                        errorMsgElement.remove();
                    }
                }
            }
        });
    });
}

/**
 * Initialize FAQ accordions
 */
function initFaqToggles() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Determine if this FAQ is currently active
            const isActive = item.classList.contains('active');
            
            // Close all FAQs
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const toggle = otherItem.querySelector('.faq-toggle i');
                toggle.className = 'fas fa-plus';
            });
            
            // Toggle current FAQ
            if (!isActive) {
                item.classList.add('active');
                const toggle = item.querySelector('.faq-toggle i');
                toggle.className = 'fas fa-minus';
            }
        });
    });
}

/**
 * Animate elements when they come into view
 */
function initAnimations() {
    // Only proceed if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) return;
    
    // Elements to animate
    const elements = document.querySelectorAll(
        '.service-item, .feature, .tip-item, .team-member, ' +
        '.about-image, .value-item, .process-step, .model-category'
    );
    
    if (!elements.length) return;
    
    // Add initial styles
    elements.forEach(element => {
        element.classList.add('animate-on-scroll');
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe each element
    elements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Animate the service process steps sequentially
 */
function initProcessAnimation() {
    const steps = document.querySelectorAll('.process-step');
    if (!steps.length) return;
    
    // Only proceed if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) return;
    
    // Add initial styles
    steps.forEach((step, index) => {
        step.classList.add('animate-process-step');
        step.style.opacity = '0';
        step.style.transform = 'translateX(-20px)';
        step.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`;
    });
    
    // Create observer
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            steps.forEach(step => {
                step.style.opacity = '1';
                step.style.transform = 'translateX(0)';
            });
            // Stop observing after animation
            observer.unobserve(entries[0].target);
        }
    }, { threshold: 0.1 });
    
    // Observe the process steps container
    observer.observe(document.querySelector('.process-steps'));
}