// --- 1. JQUERY IIFE (Immediate Invoked Function Expression) ---
// This is the standard, safe way to run all jQuery-dependent code ($).
// It ensures jQuery is loaded and available before running plugins.
(function($) {

    "use strict";
    
    // --- JQUERY PLUGINS & FUNCTIONS ---
    
    // Stellar Parallax (Often run immediately as it's window-based)
    $(window).stellar({
        responsive: true,
        parallaxBackgrounds: true,
        parallaxElements: true,
        horizontalScrolling: false,
        hideDistantElements: false,
        scrollProperty: 'scroll'
    });

    // Full Height Section (Uses jQuery)
    var fullHeight = function() {
        $('.js-fullheight').css('height', $(window).height());
        $(window).resize(function(){
            $('.js-fullheight').css('height', $(window).height());
        });
    };
    
    // Loader Removal (jQuery version)
    var loader = function() {
        setTimeout(function() {
            if($('#ftco-loader').length > 0) {
                $('#ftco-loader').removeClass('show');
            }
        }, 1);
    };
    
    // ⭐️ CAROUSEL INITIALIZATION (OWL CAROUSEL)
    var carousel = function() {
        $('.carousel-testimony').owlCarousel({
            center: true,
            loop: true,
            items:1,
            margin: 30,
            stagePadding: 0,
            nav: false,
            dots: true, // Ensured dots are enabled
            navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
            responsive:{
                0:{
                    items: 1
                },
                600:{
                    items: 2
                },
                1000:{
                    items: 3
                }
            }
        });
    };

    // Dropdown Hover Effect (Bootstrap/jQuery)
    $('nav .dropdown').hover(function(){
        var $this = $(this);
        $this.addClass('show');
        $this.find('> a').attr('aria-expanded', true);
        $this.find('.dropdown-menu').addClass('show');
    }, function(){
        var $this = $(this);
        $this.removeClass('show');
        $this.find('> a').attr('aria-expanded', false);
        $this.find('.dropdown-menu').removeClass('show');
    });

    // ⭐️ MAGNIFIC POPUP (Image Zoom for static content)
    $('.image-popup').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        closeBtnInside: false,
        fixedContentPos: true,
        mainClass: 'mfp-no-margins mfp-with-zoom',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0,1]
        },
        image: {
            verticalFit: true
        },
        zoom: {
            enabled: true,
            duration: 300
        }
    });

    // MAGNIFIC POPUP (Video/Iframe)
    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });


    // Counter Animation (Waypoints and AnimateNumber)
    var counter = function() {
        $('#section-counter').waypoint( function( direction ) {
            if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
                var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',');
                $('.number').each(function(){
                    var $this = $(this),
                        num = $this.data('number');
                        $this.animateNumber(
                        {
                            number: num,
                            numberStep: comma_separator_number_step
                        }, 7000
                    );
                });
            }
        } , { offset: '95%' } );
    };

    // Content Animation (Waypoints)
    var contentWayPoint = function() {
        var i = 0;
        $('.ftco-animate').waypoint( function( direction ) {
            if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
                i++;
                $(this.element).addClass('item-animate');
                setTimeout(function(){
                    $('body .ftco-animate.item-animate').each(function(k){
                        var el = $(this);
                        setTimeout( function () {
                            var effect = el.data('animate-effect');
                            if ( effect === 'fadeIn') {
                                el.addClass('fadeIn ftco-animated');
                            } else if ( effect === 'fadeInLeft') {
                                el.addClass('fadeInLeft ftco-animated');
                            } else if ( effect === 'fadeInRight') {
                                el.addClass('fadeInRight ftco-animated');
                            } else {
                                el.addClass('fadeInUp ftco-animated');
                            }
                            el.removeClass('item-animate');
                        }, k * 50, 'easeInOutExpo' );
                    });
                }, 100);
            }
        } , { offset: '95%' } );
    };

    // Datepicker and Timepicker (jQuery plugins)
    $('.appointment_date').datepicker({
        'format': 'm/d/yyyy',
        'autoclose': true
    });

    $('.appointment_time').timepicker();
    
    
    // --- JQUERY INITIALIZATION (Run these functions after DOM is ready) ---
    $(document).ready(function() {
        fullHeight();
        loader();
        carousel();
        counter();
        contentWayPoint();

        // --- FIX: ADD EMI MODAL BIND (MOVED FROM apartment.js) ---
        $('#emiModal').on('show.bs.modal', function () {
            // displayEmiDetails is defined in apartment.js, which must be loaded first
            if (!document.getElementById('loanAmountInput').value) document.getElementById('loanAmountInput').value = 1500000;
            // Check if the function is available before calling it
            if (typeof displayEmiDetails === 'function') {
                displayEmiDetails();
            }
        });
        
        // --- FIX: ADD SCHEDULE VISIT PRE-FILL BIND (MOVED FROM apartment.js) ---
        // Helper function for date/time pre-fill
        function getCurrentDateTime() {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const currentDate = `${year}-${month}-${day}`;
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const currentTime = `${hours}:${minutes}`;
            return { currentDate, currentTime };
        }
        
        // Bind modal show event to pre-fill inputs
        $('#scheduleVisitModal').on('show.bs.modal', function () {
            const { currentDate, currentTime } = getCurrentDateTime();

            // Pre-fill the date and time inputs with current values
            $('#visitDate').val(currentDate);
            $('#visitTime').val(currentTime);
        });
    });

})(jQuery); // End of JQuery IIFE


// --- 2. PURE JAVASCRIPT WRAPPER ---
// This ensures your custom vanilla JS code runs safely once the DOM is ready.
document.addEventListener('DOMContentLoaded', function() {

    // --- PURE JS CODE (From your original main.js) ---

    // 1. Navbar Scrolling Effect (ftco-navbar-light)
    const navbar = document.getElementById('ftco-navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 70) {
                navbar.classList.add('scrolled', 'sleep');
            } else {
                if (navbar.classList.contains('scrolled')) {
                    navbar.classList.remove('sleep');
                    setTimeout(function () {
                        navbar.classList.remove('scrolled');
                    }, 500);
                }
            }
        });
    }

    // 2. Simple Animation Helper (ftco-animate) using Intersection Observer
    const animateElements = document.querySelectorAll('.ftco-animate');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fadeInUp', 'ftco-animated');
                observer.unobserve(entry.target);
            }
        });
    };

    if (animateElements.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        animateElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        animateElements.forEach(el => {
            el.classList.add('ftco-animated');
        });
    }
    
    // 3. Magnific Popup Bridge for dynamic content (Used by projects.js)
    // We expose this function globally, but it still relies on jQuery for its core work.
    window.initMagnificPopup = function() {
        // Check if jQuery is loaded before trying to use it
        if (typeof $.fn !== 'undefined' && typeof $.fn.magnificPopup !== 'undefined') {
             $('.image-popup').magnificPopup({
                type: 'image',
                // ... (magnific popup options)
                closeOnContentClick: true,
                closeBtnInside: false,
                fixedContentPos: true,
                mainClass: 'mfp-no-indents mfp-with-zoom',
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0, 1]
                },
                image: {
                    verticalFit: true
                },
                zoom: {
                    enabled: true,
                    duration: 300
                }
            });
        }
    };

    // Initial call for static content on other pages (e.g., gallery.html)
    // The main jQuery block already handles this, but this is a safe fallback/reinforcement.
    if (typeof window.initMagnificPopup === 'function' && typeof $ !== 'undefined') {
        window.initMagnificPopup();
    }
    
    // 4. Tooltip Initialization (Bootstrap 5 native JS)
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    // We assume 'bootstrap' object exists if Bootstrap 5 JS is loaded
    if (typeof bootstrap !== 'undefined') {
        [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    }
});