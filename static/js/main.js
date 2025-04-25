/**
 * Video Background Handler
 * Manages the background video for the hero section
 */
function initVideoBackground() {
    const videoElement = document.querySelector('.video-background video');
    const heroSection = document.querySelector('.hero');
    
    if (!videoElement || !heroSection) return;
    
    // Check if browser supports video
    const isVideoSupported = !!document.createElement('video').canPlayType;
    
    if (!isVideoSupported) {
        // Fallback to background image if video is not supported
        heroSection.classList.add('video-fallback');
        if (videoElement.parentNode) {
            videoElement.parentNode.remove();
        }
        return;
    }
    
    // Handle video loading error
    videoElement.addEventListener('error', function() {
        console.log('Video failed to load, falling back to image');
        heroSection.classList.add('video-fallback');
        if (videoElement.parentNode) {
            videoElement.parentNode.remove();
        }
    });
    
    // Check for mobile devices (they often block autoplay)
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Create a play button for mobile
        const playButton = document.createElement('button');
        playButton.className = 'video-play-button';
        playButton.innerHTML = '▶';
        heroSection.appendChild(playButton);
        
        // Start video when button is clicked
        playButton.addEventListener('click', function() {
            videoElement.play()
                .then(function() {
                    playButton.style.display = 'none';
                })
                .catch(function(error) {
                    console.log('Video play failed:', error);
                    // If play fails, fallback to image
                    heroSection.classList.add('video-fallback');
                });
        });
    } else {
        // Try to autoplay on desktop
        videoElement.play()
            .catch(function(error) {
                console.log('Autoplay prevented:', error);
                // Create play button if autoplay fails
                const playButton = document.createElement('button');
                playButton.className = 'video-play-button';
                playButton.innerHTML = '▶';
                heroSection.appendChild(playButton);
                
                playButton.addEventListener('click', function() {
                    videoElement.play()
                        .then(function() {
                            playButton.style.display = 'none';
                        })
                        .catch(function() {
                            // If play fails, fallback to image
                            heroSection.classList.add('video-fallback');
                        });
                });
            });
    }
    
    // Pause video when not in viewport to save resources
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                videoElement.play().catch(() => {});
            } else {
                videoElement.pause();
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(heroSection);
}

// Call all initialization functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    initMobileMenu();
    
    // Form validation
    initFormValidation();
    
    // Smooth scroll for anchor links
    initSmoothScroll();
    
    // Initialize video background
    initVideoBackground();
});