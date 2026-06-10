/**
 * Global JavaScript
 * Centralizes all reusable functionality:
 * - Mobile hamburger menu
 * - About page carousel
 * - Project page sidebars (Mova, Eventbrite, Wise Young Explorer)
 */

document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // Mobile hamburger menu toggle
    // ============================================
    const initMobileMenu = () => {
        const mobileMenuButton = document.querySelector('.react-mobile-menu-button');
        const mobileMenu = document.querySelector('#react-mobile-menu');

        if (!mobileMenuButton || !mobileMenu) return;

        mobileMenuButton.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('is-open');

            mobileMenuButton.setAttribute('aria-expanded', isOpen);
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
    // Project sidebars (Mova - Itaú project)
    // ============================================
    const initMovaSidebar = () => {
        const shell = document.getElementById('movaShell');
        const toggle = document.getElementById('movaSidebarToggle');
        const sidebar = document.getElementById('movaSidebar');
        const overlay = document.getElementById('movaSidebarOverlay');

        if (!shell || !toggle || !sidebar || !overlay) return;

        const setSidebarOpen = (isOpen) => {
            shell.classList.toggle('sidebar-open', isOpen);
            toggle.setAttribute('aria-expanded', String(isOpen));
            toggle.setAttribute('aria-label', isOpen ? 'Close sidebar' : 'Open sidebar');
        };

        toggle.addEventListener('click', (event) => {
            event.stopPropagation();
            setSidebarOpen(!shell.classList.contains('sidebar-open'));
        });

        overlay.addEventListener('click', () => {
            setSidebarOpen(false);
        });

        sidebar.addEventListener('click', (event) => {
            if (event.target.closest('a')) {
                setSidebarOpen(false);
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                setSidebarOpen(false);
            }
        });
    };

    // ============================================
    // Project sidebars (Eventbrite project)
    // ============================================
    const initEventbriteSidebar = () => {
        const shell = document.getElementById('eventbriteShell');
        const toggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('eventbriteSidebarOverlay');

        if (!shell || !toggle || !sidebar || !overlay) return;

        const setSidebarOpen = (isOpen) => {
            shell.classList.toggle('sidebar-open', isOpen);
            toggle.setAttribute('aria-expanded', String(isOpen));
            toggle.setAttribute('aria-label', isOpen ? 'Close sidebar' : 'Open sidebar');
        };

        toggle.addEventListener('click', (event) => {
            event.stopPropagation();
            setSidebarOpen(!shell.classList.contains('sidebar-open'));
        });

        overlay.addEventListener('click', () => {
            setSidebarOpen(false);
        });

        sidebar.addEventListener('click', (event) => {
            if (event.target.closest('a')) {
                setSidebarOpen(false);
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                setSidebarOpen(false);
            }
        });
    };

    // ============================================
    // Project sidebars (Wise Young Explorer project)
    // ============================================
    const initYoungSidebar = () => {
        const sidebarToggle = document.getElementById('sidebarToggle');
        const youngShell = document.getElementById('youngShell');

        if (!sidebarToggle || !youngShell) return;

        const setSidebarState = (isHidden) => {
            youngShell.classList.toggle('sidebar-hidden', isHidden);

            sidebarToggle.setAttribute('aria-expanded', String(!isHidden));
            sidebarToggle.setAttribute(
                'title',
                isHidden ? 'Open sidebar' : 'Close sidebar'
            );

            localStorage.setItem('sidebarHidden', String(isHidden));
        };

        const savedState = localStorage.getItem('sidebarHidden') === 'true';
        setSidebarState(savedState);

        sidebarToggle.addEventListener('click', () => {
            const isHidden = youngShell.classList.contains('sidebar-hidden');
            setSidebarState(!isHidden);
        });
    };

    // ============================================
    // Initialize all features
    // ============================================
    initMobileMenu();
    initAboutCarousel();
    initMovaSidebar();
    initEventbriteSidebar();
    initYoungSidebar();
});

