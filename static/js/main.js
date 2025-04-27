/**
 * BMW Hub Main JavaScript
 * Handles core website functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize dropdown menus
    initDropdowns();
    
    // Initialize flash message close buttons
    initFlashMessages();
    
    // Add active class to current navigation
    highlightCurrentNavItem();
});

/**
 * Mobile Menu Initialization
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const body = document.body;
    
    if (!menuToggle || !mobileNav) return;
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileNav.classList.contains('active') && 
            !mobileNav.contains(event.target) && 
            !menuToggle.contains(event.target)) {
            mobileNav.classList.remove('active');
            menuToggle.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
    
    // Mobile dropdown toggles
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
    
    mobileDropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('.mobile-link');
        
        dropdownLink.addEventListener('click', function(e) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });
    });
}

/**
 * Back to Top Button
 */
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (!backToTop) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    // Scroll to top when clicked
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Desktop Dropdown Menus
 */
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    if (window.innerWidth < 992) return;
    
    dropdowns.forEach(dropdown => {
        // Close dropdowns when clicking outside
        document.addEventListener('click', function(event) {
            if (!dropdown.contains(event.target)) {
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    dropdownMenu.style.opacity = '0';
                    dropdownMenu.style.visibility = 'hidden';
                    dropdownMenu.style.transform = 'translateY(10px)';
                    
                    setTimeout(() => {
                        dropdownMenu.removeAttribute('style');
                    }, 300);
                }
            }
        });
    });
}

/**
 * Flash Messages
 */
function initFlashMessages() {
    const closeButtons = document.querySelectorAll('.close-flash');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const flashMessage = this.closest('.flash-message');
            
            if (flashMessage) {
                flashMessage.style.opacity = '0';
                flashMessage.style.transform = 'translateX(100%)';
                
                setTimeout(() => {
                    flashMessage.remove();
                }, 300);
            }
        });
    });
    
    // Auto-hide flash messages after 5 seconds
    const flashMessages = document.querySelectorAll('.flash-message');
    
    flashMessages.forEach(message => {
        setTimeout(() => {
            message.style.opacity = '0';
            message.style.transform = 'translateX(100%)';
            
            setTimeout(() => {
                message.remove();
            }, 300);
        }, 5000);
    });
}

/**
 * Navigation Highlighting
 */
function highlightCurrentNavItem() {
    const currentPath = window.location.pathname;
    
    // Desktop navigation
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        if (href === currentPath || 
            (currentPath.includes('/service/') && href.includes('/services'))) {
            link.classList.add('active');
        }
    });
    
    // Mobile navigation
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    mobileLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        if (href === currentPath || 
            (currentPath.includes('/service/') && href.includes('/services'))) {
            link.classList.add('active');
        }
    });
}

/**
 * Service List Items
 */
function initServiceList() {
    const serviceList = document.querySelector('.service-list');
    
    if (!serviceList) return;
    
    const currentPath = window.location.pathname;
    const serviceLinks = serviceList.querySelectorAll('a');
    
    serviceLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        if (href === currentPath) {
            link.classList.add('active');
        }
    });
}

// Utility function to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Smooth scroll functionality
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}