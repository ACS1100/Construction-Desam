document.addEventListener('DOMContentLoaded', function () {
    // 1. Loader removal
    const loader = document.getElementById('ftco-loader');
    if (loader) {
        // Give a short delay for the loader fade animation
        setTimeout(function () {
            loader.classList.remove('show');
        }, 300);
    }

    // 2. Navbar Scrolling Effect (ftco-navbar-light)
    const navbar = document.getElementById('ftco-navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 70) {
                navbar.classList.add('scrolled', 'sleep');
            } else {
                // Only remove the classes if they exist to prevent flickering
                if (navbar.classList.contains('scrolled')) {
                    navbar.classList.remove('sleep');
                    // Add a brief delay before removing 'scrolled' for a smoother transition back
                    setTimeout(function () {
                        navbar.classList.remove('scrolled');
                    }, 500);
                }
            }
        });
    }

    // 3. Simple Animation Helper (ftco-animate) using Intersection Observer
    const animateElements = document.querySelectorAll('.ftco-animate');
    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the animation classes
                entry.target.classList.add('fadeInUp', 'ftco-animated');
                // Stop observing this element once animated
                observer.unobserve(entry.target);
            }
        });
    };

    // Use IntersectionObserver if available (modern browsers)
    if (animateElements.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        animateElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback: immediately show elements for older browsers
        animateElements.forEach(el => {
            el.classList.add('ftco-animated');
        });
    }

    // 4. Tooltip Initialization (Bootstrap 5 native JS)
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    // Ensure Bootstrap's JS is loaded before attempting to initialize
    if (typeof bootstrap !== 'undefined') {
        [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    }

});