function initMain() {
    "use strict";

    // 1. Loader Removal
    const loader = document.getElementById('ftco-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.remove('show');
        }, 1);
    }

    // 2. Full Height Section
    const setFullHeight = () => {
        const elements = document.querySelectorAll('.js-fullheight');
        elements.forEach(el => {
            el.style.height = window.innerHeight + 'px';
        });
    };
    setFullHeight();
    window.addEventListener('resize', setFullHeight);

    // 3. Navbar Dropdown Hover
    const dropdowns = document.querySelectorAll('nav .dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', () => {
            dropdown.classList.add('show');
            const link = dropdown.querySelector('> a');
            if (link) link.setAttribute('aria-expanded', 'true');
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu) menu.classList.add('show');
        });
        dropdown.addEventListener('mouseleave', () => {
            dropdown.classList.remove('show');
            const link = dropdown.querySelector('> a');
            if (link) link.setAttribute('aria-expanded', 'false');
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu) menu.classList.remove('show');
        });
    });

    // 3.5 Sticky Navbar
    const navbar = document.querySelector('.ftco_navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            const st = window.scrollY;
            if (st > 150) {
                if (!navbar.classList.contains('scrolled')) navbar.classList.add('scrolled');
            } else {
                if (navbar.classList.contains('scrolled')) navbar.classList.remove('scrolled', 'sleep');
            }
            if (st > 350) {
                if (!navbar.classList.contains('awake')) navbar.classList.add('awake');
            } else {
                if (navbar.classList.contains('awake')) {
                    navbar.classList.remove('awake');
                    navbar.classList.add('sleep');
                }
            }
        });
    }

    // 4. Counter Animation with IntersectionObserver
    const counterSection = document.getElementById('section-counter');
    if (counterSection) {
        const animateNumbers = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counterSection.classList.contains('ftco-animated')) {
                    counterSection.classList.add('ftco-animated');
                    const numbers = document.querySelectorAll('.number');
                    
                    numbers.forEach(num => {
                        const target = parseInt(num.getAttribute('data-number'), 10);
                        let current = 0;
                        const increment = target / 100; // Animation steps
                        const updateCounter = () => {
                            current += increment;
                            if (current < target) {
                                num.innerText = Math.ceil(current).toLocaleString();
                                requestAnimationFrame(updateCounter);
                            } else {
                                num.innerText = target.toLocaleString();
                            }
                        };
                        updateCounter();
                    });
                    observer.unobserve(entry.target);
                }
            });
        };
        
        const observer = new IntersectionObserver(animateNumbers, {
            root: null, threshold: 0.5
        });
        observer.observe(counterSection);
    }

    // 5. Scroll Animations (.ftco-animate) with IntersectionObserver
    const ftcoElements = document.querySelectorAll('.ftco-animate');
    if (ftcoElements.length > 0) {
        const animateContent = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !entry.target.classList.contains('ftco-animated')) {
                    entry.target.classList.add('item-animate');
                    setTimeout(() => {
                        const effect = entry.target.getAttribute('data-animate-effect');
                        if (effect === 'fadeIn') {
                            entry.target.classList.add('fadeIn', 'ftco-animated');
                        } else if (effect === 'fadeInLeft') {
                            entry.target.classList.add('fadeInLeft', 'ftco-animated');
                        } else if (effect === 'fadeInRight') {
                            entry.target.classList.add('fadeInRight', 'ftco-animated');
                        } else {
                            entry.target.classList.add('fadeInUp', 'ftco-animated');
                        }
                        entry.target.classList.remove('item-animate');
                    }, 100); // Slight delay for stagger
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(animateContent, {
            root: null,
            threshold: 0.1
        });

        ftcoElements.forEach(el => observer.observe(el));
    }

    // 6. Vanilla Lightbox (Replacing Magnific Popup)
    // Create Lightbox Modal
    const lightbox = document.createElement('div');
    lightbox.id = 'vanilla-lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-backdrop"></div>
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <img src="" alt="Lightbox Image">
        </div>
    `;
    document.body.appendChild(lightbox);

    // Lightbox Styles
    const style = document.createElement('style');
    style.textContent = `
        #vanilla-lightbox { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9999; justify-content: center; align-items: center; }
        #vanilla-lightbox.active { display: flex; }
        .lightbox-backdrop { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); cursor: pointer; }
        .lightbox-content { position: relative; max-width: 90%; max-height: 90%; z-index: 10000; }
        .lightbox-content img { max-width: 100%; max-height: 90vh; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.5); }
        .lightbox-close { position: absolute; top: -40px; right: 0; background: none; border: none; color: #fff; font-size: 30px; cursor: pointer; }

        /* Vanilla Carousel Styles */
        .vanilla-carousel { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; gap: 20px; scroll-behavior: smooth; padding-bottom: 10px; }
        .vanilla-carousel::-webkit-scrollbar { height: 8px; }
        .vanilla-carousel::-webkit-scrollbar-thumb { background: #d97706; border-radius: 4px; }
        .vanilla-carousel .item { flex: 0 0 30%; scroll-snap-align: start; min-width: 250px; }
        @media (max-width: 992px) { .vanilla-carousel .item { flex: 0 0 45%; } }
        @media (max-width: 768px) { .vanilla-carousel .item { flex: 0 0 90%; } }
    `;
    document.head.appendChild(style);

    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const backdrop = lightbox.querySelector('.lightbox-backdrop');

    const closeLightbox = () => lightbox.classList.remove('active');

    document.addEventListener('click', (e) => {
        const link = e.target.closest('.img-zoom, .image-popup');
        if (link) {
            e.preventDefault();
            lightboxImg.src = link.getAttribute('href');
            lightbox.classList.add('active');
        }
    });

    closeBtn.addEventListener('click', closeLightbox);
    backdrop.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMain);
} else {
    initMain();
}