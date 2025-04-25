/**
 * Main JavaScript for BMW Hub
 * A BMW repair website designed similar to Sprinter City
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    initMobileMenu();
    
    // Form validation
    initFormValidation();
    
    // Smooth scroll for anchor links
    initSmoothScroll();
});

/**
 * Initialize mobile menu toggle functionality
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    
    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            mainMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.main-menu') && !event.target.closest('.mobile-menu-toggle')) {
                menuToggle.classList.remove('active');
                mainMenu.classList.remove('active');
            }
        });
        
        // Close menu when a menu item is clicked
        const menuItems = mainMenu.querySelectorAll('a');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                mainMenu.classList.remove('active');
            });
        });
    }
}

/**
 * Initialize form validation
 */
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    highlightField(field);
                } else {
                    removeHighlight(field);
                }
            });
            
            // Email validation
            const emailField = form.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    highlightField(emailField);
                }
            }
            
            if (!isValid) {
                event.preventDefault();
                showFormError(form, 'Please fill in all required fields correctly.');
            }
        });
    });
    
    // Highlight field with error
    function highlightField(field) {
        field.classList.add('field-error');
        field.addEventListener('input', function() {
            removeHighlight(field);
        }, { once: true });
    }
    
    // Remove highlight from field
    function removeHighlight(field) {
        field.classList.remove('field-error');
    }
    
    // Show form error message
    function showFormError(form, message) {
        let errorDiv = form.querySelector('.form-error');
        
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'form-error';
            form.prepend(errorDiv);
        }
        
        errorDiv.textContent = message;
        errorDiv.style.color = '#dc3545';
        errorDiv.style.marginBottom = '20px';
        errorDiv.style.fontWeight = 'bold';
        
        // Scroll to error message
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

/**
 * Initialize smooth scroll for anchor links
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                event.preventDefault();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Add sticky header functionality on scroll
 */
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    
    if (window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

/**
 * Add class to style elements when they are visible in viewport
 */
window.addEventListener('load', function() {
    const animElements = document.querySelectorAll('.service-card, .tip-card, .team-member, .feature, .highlight-item');
    
    function checkVisibility() {
        animElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }
    
    // Check on page load
    checkVisibility();
    
    // Check on scroll
    window.addEventListener('scroll', checkVisibility);
});