/**
 * BMW Hub Video Background Handler
 * Manages responsive video backgrounds and fallbacks
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize video backgrounds
    initVideoBackgrounds();
});

/**
 * Video Background Initialization
 */
function initVideoBackgrounds() {
    const videoElements = document.querySelectorAll('.video-background video');
    
    if (!videoElements.length) return;
    
    videoElements.forEach(videoElement => {
        const heroSection = videoElement.closest('.hero');
        
        if (!heroSection) return;
        
        // Check if browser supports video
        const isVideoSupported = !!document.createElement('video').canPlayType;
        
        if (!isVideoSupported) {
            applyFallbackImage(heroSection, videoElement);
            return;
        }
        
        // Handle video loading error
        videoElement.addEventListener('error', function() {
            console.log('Video failed to load, falling back to image');
            applyFallbackImage(heroSection, videoElement);
        });
        
        // Check for mobile devices (they often block autoplay)
        const isMobile = isMobileDevice();
        
        if (isMobile) {
            handleMobileVideo(heroSection, videoElement);
        } else {
            handleDesktopVideo(heroSection, videoElement);
        }
        
        // Optimize performance by pausing video when not in viewport
        setupIntersectionObserver(heroSection, videoElement);
    });
}

/**
 * Apply fallback background image
 */
function applyFallbackImage(heroSection, videoElement) {
    heroSection.classList.add('video-fallback');
    heroSection.style.backgroundImage = "url('../static/images/hero-bg.jpg')";
    heroSection.style.backgroundPosition = "center";
    heroSection.style.backgroundSize = "cover";
    
    const videoBackground = videoElement.closest('.video-background');
    if (videoBackground) {
        videoBackground.style.display = 'none';
    }
}

/**
 * Handle video playback on mobile devices
 */
function handleMobileVideo(heroSection, videoElement) {
    // Create a play button for mobile
    const playButton = document.createElement('button');
    playButton.className = 'video-play-button';
    playButton.innerHTML = '<i class="fas fa-play"></i>';
    playButton.setAttribute('aria-label', 'Play video');
    heroSection.appendChild(playButton);
    
    // Add poster image as fallback before play
    const posterImage = '../static/images/hero-bg.jpg';
    videoElement.setAttribute('poster', posterImage);
    
    // Start video when button is clicked
    playButton.addEventListener('click', function() {
        videoElement.play()
            .then(function() {
                playButton.style.opacity = '0';
                setTimeout(() => {
                    playButton.style.display = 'none';
                }, 300);
            })
            .catch(function(error) {
                console.log('Video play failed:', error);
                applyFallbackImage(heroSection, videoElement);
            });
    });
}

/**
 * Handle video playback on desktop devices
 */
function handleDesktopVideo(heroSection, videoElement) {
    // Try to autoplay on desktop
    videoElement.play()
        .catch(function(error) {
            console.log('Autoplay prevented:', error);
            
            // Create play button if autoplay fails
            const playButton = document.createElement('button');
            playButton.className = 'video-play-button';
            playButton.innerHTML = '<i class="fas fa-play"></i>';
            playButton.setAttribute('aria-label', 'Play video');
            heroSection.appendChild(playButton);
            
            playButton.addEventListener('click', function() {
                videoElement.play()
                    .then(function() {
                        playButton.style.opacity = '0';
                        setTimeout(() => {
                            playButton.style.display = 'none';
                        }, 300);
                    })
                    .catch(function() {
                        applyFallbackImage(heroSection, videoElement);
                    });
            });
        });
}

/**
 * Setup Intersection Observer to optimize video performance
 */
function setupIntersectionObserver(heroSection, videoElement) {
    if (!('IntersectionObserver' in window)) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (videoElement.paused) {
                    videoElement.play().catch(() => {});
                }
            } else {
                if (!videoElement.paused) {
                    videoElement.pause();
                }
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(heroSection);
}

/**
 * Check if current device is mobile
 */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
}

/**
 * Load video dynamically based on screen size
 */
function loadResponsiveVideo() {
    const videoElements = document.querySelectorAll('.video-background video');
    
    if (!videoElements.length) return;
    
    videoElements.forEach(videoElement => {
        const sources = videoElement.querySelectorAll('source');
        const currentSrc = videoElement.currentSrc;
        
        // Check screen size
        const isMobile = window.innerWidth < 768;
        
        sources.forEach(source => {
            if (isMobile && source.dataset.mobile) {
                source.src = source.dataset.mobile;
            } else if (!isMobile && source.dataset.desktop) {
                source.src = source.dataset.desktop;
            }
        });
        
        // Only reload if source changed
        if (currentSrc !== videoElement.currentSrc) {
            videoElement.load();
        }
    });
}

// Handle window resize for responsive videos
window.addEventListener('resize', function() {
    loadResponsiveVideo();
});