(function($) {

    "use strict";


    $(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });


    var fullHeight = function() {

        $('.js-fullheight').css('height', $(window).height());
        $(window).resize(function(){
            $('.js-fullheight').css('height', $(window).height());
        });

    };
    fullHeight();

    // loader
    var loader = function() {
        setTimeout(function() { 
            if($('#ftco-loader').length > 0) {
                $('#ftco-loader').removeClass('show');
            }
        }, 1);
    };
    loader();

  var carousel = function() {
        $('.carousel-testimony').owlCarousel({
            center: true,
            loop: true,
            items:1,
            margin: 30,
            stagePadding: 0,
            nav: false,
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
    carousel();

    $('nav .dropdown').hover(function(){
        var $this = $(this);
        //   timer;
        // clearTimeout(timer);
        $this.addClass('show');
        $this.find('> a').attr('aria-expanded', true);
        // $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
        $this.find('.dropdown-menu').addClass('show');
    }, function(){
        var $this = $(this);
            // timer;
        // timer = setTimeout(function(){
            $this.removeClass('show');
            $this.find('> a').attr('aria-expanded', false);
            // $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
            $this.find('.dropdown-menu').removeClass('show');
        // }, 100);
    });


    $('#dropdown04').on('show.bs.dropdown', function () {
      console.log('show');
    });

    // magnific popup
    $('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });


  var counter = function() {
        
        $('#section-counter').waypoint( function( direction ) {

            if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

                var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
                $('.number').each(function(){
                    var $this = $(this),
                        num = $this.data('number');
                        console.log(num);
                    $this.animateNumber(
                      {
                        number: num,
                        numberStep: comma_separator_number_step
                      }, 7000
                    );
                });
                
            }

        } , { offset: '95%' } );

    }
    counter();

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
                        },  k * 50, 'easeInOutExpo' );
                    });
                    
                }, 100);
                
            }

        } , { offset: '95%' } );
    };
    contentWayPoint();

    $('.appointment_date').datepicker({
      'format': 'm/d/yyyy',
      'autoclose': true
    });

    $('.appointment_time').timepicker();

})(jQuery);


// --- DOM CONTENT LOADED WRAPPER (COMBINED SCRIPTS) ---
// This block ensures all plain JavaScript selectors wait for the HTML to load.
document.addEventListener('DOMContentLoaded', function() {
    
    // --- HERO SLIDER SCRIPT START (MOVED INSIDE DOMContentLoaded) ---
    const slides = document.querySelectorAll('.hero-slide');
    const prevBtn = document.querySelector('.hero-arrow.prev');
    const nextBtn = document.querySelector('.hero-arrow.next');
    const dotsContainer = document.querySelector('.hero-dots');
    let current = 0, timer, interval = 5000;

    // Create dots
    if (dotsContainer) { // Check if the container exists before creating dots
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });
    }
    const dots = document.querySelectorAll('.hero-dot');

    function showSlide(idx) {
        slides.forEach((s, i) => s.classList.toggle('active', i === idx));
        dots.forEach((d, i) => d.classList.toggle('active', i === idx));
        current = idx;
    }
    function nextSlide() {
        showSlide((current + 1) % slides.length);
    }
    function prevSlide() {
        showSlide((current - 1 + slides.length) % slides.length);
    }
    function goToSlide(idx) {
        showSlide(idx);
        resetAutoplay();
    }
    
    // PROBLEM FIX: Check if elements exist before setting properties
    if (prevBtn) {
        prevBtn.onclick = () => { prevSlide(); resetAutoplay(); }; 
    }
    if (nextBtn) {
        nextBtn.onclick = () => { nextSlide(); resetAutoplay(); }; 
    }

    function autoplay() {
        timer = setInterval(nextSlide, interval);
    }
    function resetAutoplay() {
        clearInterval(timer);
        autoplay();
    }
    if (slides.length > 0) { // Only run if there are slides
        autoplay(); 
    }

    // Pause on hover (optional)
    const heroSlider = document.getElementById('heroSlider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', () => clearInterval(timer));
        heroSlider.addEventListener('mouseleave', resetAutoplay);
    }
    // --- HERO SLIDER SCRIPT END ---

    // --- TABBED GALLERY SCRIPT START (ORIGINAL CONTENT) ---
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Add click event listeners to tabs
    galleryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all tabs
            galleryTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Filter gallery items
            filterGalleryItems(category);
        });
    });
    
    // Function to filter gallery items based on category
    function filterGalleryItems(category) {
        galleryItems.forEach(item => {
            const itemCategories = item.getAttribute('data-categories');
            
            if (category === 'all' || (itemCategories && itemCategories.includes(category))) {
                // Show item
                item.classList.remove('hidden');
            } else {
                // Hide item
                item.classList.add('hidden');
            }
        });
    }
    
    // Initialize gallery (show all items by default)
    filterGalleryItems('all');
    // --- TABBED GALLERY SCRIPT END ---
});
// --- END DOM CONTENT LOADED WRAPPER ---