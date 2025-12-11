document.addEventListener('DOMContentLoaded', function() {
    // --- Existing Menu/Tab Logic (Keep this) ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }

    const tabButtons = document.querySelectorAll('.tab-btn');
    const projectGrids = document.querySelectorAll('.projects-grid');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            projectGrids.forEach(grid => grid.classList.remove('active'));
            button.classList.add('active');
            const targetId = button.getAttribute('data-target');
            const targetGrid = document.getElementById(targetId);
            if (targetGrid) {
                targetGrid.classList.add('active');
            }
        });
    });
    const academicGrid = document.getElementById('academic-projects');
    if (academicGrid && !academicGrid.classList.contains('active')) {
        academicGrid.classList.add('active');
    }
    // ---------------------------------------------

    // 🚀 NEW: Profile Slider Logic encapsulated for reusability
    function initializeSlider(sliderId, interval = 5000) {
        const slider = document.getElementById(sliderId);
        if (!slider) return;

        const slides = slider.querySelectorAll('.profile-slide');
        // Indicators are next sibling of the slider container
        const indicatorsContainer = slider.nextElementSibling; 
        const indicators = indicatorsContainer ? indicatorsContainer.querySelectorAll('.profile-slider-indicator') : [];
        const prevButton = slider.querySelector('.profile-slider-nav.prev');
        const nextButton = slider.querySelector('.profile-slider-nav.next');
        let currentSlide = 0;
        let slideInterval;

        function showSlide(index, direction) {
            if (slides.length === 0) return;

            // Update current slide index (handles wrap-around)
            if (index >= slides.length) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = slides.length - 1;
            } else {
                currentSlide = index;
            }

            // Reset all classes
            slides.forEach(slide => {
                slide.classList.remove('active');
                slide.removeAttribute('data-direction');
            });
            indicators.forEach(indicator => indicator.classList.remove('active'));

            // Activate the new slide and indicator
            slides[currentSlide].classList.add('active');
            slides[currentSlide].setAttribute('data-direction', direction);
            if (indicators.length > 0) {
                indicators[currentSlide].classList.add('active');
            }
        }

        function nextSlide() {
            showSlide(currentSlide + 1, 'next');
        }

        function startSlider() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, interval);
        }

        // Attach event listeners
        if (prevButton) {
            prevButton.addEventListener('click', () => { showSlide(currentSlide - 1, 'prev'); startSlider(); });
        }
        if (nextButton) {
            nextButton.addEventListener('click', () => { nextSlide(); startSlider(); });
        }
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                const direction = index > currentSlide ? 'next' : 'prev';
                showSlide(index, direction); 
                startSlider();
            });
        });

        // Initialize the slider and start auto-rotation
        showSlide(currentSlide, 'next'); 
        startSlider();
    }

    // Initialize the main profile slider
    initializeSlider('main-profile-slider', 5000); 
});