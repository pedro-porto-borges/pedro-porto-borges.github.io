/**
 * Global JavaScript
 * Centralizes all reusable functionality:
 * - Mobile hamburger menu
 * - About page carousel
 * - Project page sidebars (Mova, Eventbrite, Wise Young Explorer)
 */

document.addEventListener('DOMContentLoaded', () => {
    const SIDEBAR_SHELL_SELECTOR = '.young-shell, .mova-shell, .eventbrite-shell, .case-sidebar-shell';
    const SIDEBAR_HIDDEN_CLASS = 'sidebar-hidden';
    const SCROLLED_CLASS = 'is-scrolled';

    // ============================================
    // Mobile hamburger menu toggle
    // ============================================
    const initMobileMenu = () => {
        const mobileMenuButton = document.querySelector('.react-mobile-menu-button');
        const mobileMenu = document.querySelector('#react-mobile-menu');

        if (!mobileMenuButton || !mobileMenu) return;

        mobileMenuButton.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('is-open');

            mobileMenuButton.setAttribute('aria-expanded', String(isOpen));
            mobileMenuButton.setAttribute(
                'aria-label',
                isOpen ? 'Close menu' : 'Open menu'
            );
        });
    };

    // ============================================
    // About page carousel
    // ============================================
    const initAboutCarousel = () => {
        const carousel = document.querySelector('.about-page .carousel');
        if (!carousel) return;

        const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
        const indicators = Array.from(carousel.querySelectorAll('.indicator'));
        const prev = carousel.querySelector('.carousel-prev');
        const next = carousel.querySelector('.carousel-next');

        if (!prev || !next || slides.length === 0 || indicators.length === 0) return;

        let activeIndex = 0;
        let touchStartX = 0;
        let touchEndX = 0;

        const showSlide = (index) => {
            activeIndex = (index + slides.length) % slides.length;

            slides.forEach((slide, slideIndex) => {
                slide.classList.toggle('active', slideIndex === activeIndex);
            });

            indicators.forEach((indicator, indicatorIndex) => {
                indicator.classList.toggle('active', indicatorIndex === activeIndex);
            });
        };

        // Click navigation
        prev.addEventListener('click', () => showSlide(activeIndex - 1));
        next.addEventListener('click', () => showSlide(activeIndex + 1));

        // Touch swipe navigation
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);

        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            // Swipe left (diff > 0) - next slide
            if (diff > swipeThreshold) {
                showSlide(activeIndex + 1);
            }
            // Swipe right (diff < 0) - previous slide
            else if (diff < -swipeThreshold) {
                showSlide(activeIndex - 1);
            }
        };
    };

    // ============================================
    // Project sidebars
    // ============================================
    const initSidebarToggles = (buttons) => {
        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const shell = button.closest(SIDEBAR_SHELL_SELECTOR);
                if (!shell) return;

                shell.classList.toggle(SIDEBAR_HIDDEN_CLASS);

                const isHidden = shell.classList.contains(SIDEBAR_HIDDEN_CLASS);
                button.setAttribute("aria-expanded", String(!isHidden));
                button.setAttribute("title", isHidden ? "Open sidebar" : "Close sidebar");
            });
        });
    };

    const initMobileSidebarScrollState = () => {
        const updateScrollState = () => {
            document.body.classList.toggle(SCROLLED_CLASS, window.scrollY > 8);
        };

        updateScrollState();
        window.addEventListener("scroll", updateScrollState, { passive: true });
    };


    // ============================================
    // Initialize all features
    // ============================================
    const sidebarButtons = document.querySelectorAll(".sidebar-toggle");

    initMobileMenu();
    initAboutCarousel();
    initSidebarToggles(sidebarButtons);
    initMobileSidebarScrollState();
});
