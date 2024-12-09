  $(document).ready(function(){
    toggle();
    slider();
  });
  function toggle(){
    $('.cart_button').on('mouseenter', function(){
      $('.overlay').addClass('active');
    }).on('mouseleave', function(){
      $('.overlay').removeClass('active');
    });
    $('.signinbar_toggler').click(function(e){
      e.preventDefault();
      $('.signinbar').addClass('active');
      $('.side_overlay').addClass('active');
    })
    $('.sidebar_toggler').click(function(e){
      e.preventDefault();
      $('.sidebar').addClass('active');
      $('.side_overlay').addClass('active');
    })
    $('.lg_toggle_filter_main').click(function(e){
      e.preventDefault();
      $('.filter_sidebar').addClass('active');
      $('.side_overlay').addClass('active');
    })
    $('.card_sidebar_toggler').click(function(e){
      e.preventDefault();
      $('.card_sidebar').addClass('active');
      $('.side_overlay').addClass('active');
    })
    $('.side_overlay, .sidebar_dismiss').on('click',function(){
      $('.signinbar').removeClass('active');
      $('.sidebar').removeClass('active');
      $('.card_sidebar').removeClass('active');
      $('.side_overlay').removeClass('active');
      $('.filter_sidebar').removeClass('active');
    })
    $('.lg_toggle_filter').click(function(e){
      e.preventDefault();
      $('.top_filter_box_sort').slideToggle()
    });
    $('.sidebar_link').on('click', function(e) {
      e.preventDefault(); // Prevent default anchor behavior
  
      const $parentItem = $(this).closest('.sidebar_item'); // Get the clicked item's parent
      const $subMenu = $parentItem.find('> .sidebar_items'); // Find the immediate child submenu
  
      // Slide toggle the submenu and toggle the active class
      if ($subMenu.length) {
        $subMenu.slideToggle(); // Toggle visibility of the submenu
        $parentItem.toggleClass('active'); // Toggle active state on the parent item
      }
    });

  }
    
function slider(){
  const $carousel = $('#slider1');
  const $items = $carousel.find('.carousel-item');
  const $indicators = $carousel.find('.carousel-indicators li');
  const totalItems = $items.length;
  let currentIndex = 0; // Start with the first slide
  let isDragging = false; // Track drag status
  let startX = 0; // Starting X position for drag/swipe
  let endX = 0; // Ending X position for drag/swipe
  let autoSlideInterval;

  // Function to go to a specific slide
  function goToSlide(index) {
      $items.removeClass('active');
      $indicators.removeClass('active');

      $items.eq(index).addClass('active');
      $indicators.eq(index).addClass('active');
  }

  // Move to the next slide
  function nextSlide() {
      currentIndex = (currentIndex + 1) % totalItems; // Loop back to the first slide
      goToSlide(currentIndex);
  }

  // Move to the previous slide
  function prevSlide() {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems; // Loop to the last slide
      goToSlide(currentIndex);
  }

  // Event: Next button click
  $('.carousel-control-next').on('click', function (e) {
      e.preventDefault();
      nextSlide();
  });

  // Event: Previous button click
  $('.carousel-control-prev').on('click', function (e) {
      e.preventDefault();
      prevSlide();
  });

  // Event: Indicator click
  $indicators.on('click', function () {
      const index = $(this).data('slide-to'); // Get the target index
      currentIndex = index;
      goToSlide(currentIndex);
  });

  // Touch/Mouse Drag Handling
  $carousel.on('mousedown touchstart', function (e) {
      isDragging = true;
      startX = e.type === 'mousedown' ? e.pageX : e.originalEvent.touches[0].pageX;
  });

  $carousel.on('mousemove touchmove', function (e) {
      if (!isDragging) return;

      endX = e.type === 'mousemove' ? e.pageX : e.originalEvent.touches[0].pageX;
  });

  $carousel.on('mouseup touchend', function () {
      if (!isDragging) return;
      isDragging = false;

      const deltaX = endX - startX;

      if (deltaX > 50) {
          // Swipe right
          prevSlide();
      } else if (deltaX < -50) {
          // Swipe left
          nextSlide();
      }
  });

  // Auto-slide functionality
  function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 5000); // Slide every 5 seconds
  }

  function stopAutoSlide() {
      clearInterval(autoSlideInterval);
  }

  startAutoSlide(); // Start auto-slide on page load

  // Pause auto-slide on hover
  $carousel.on('mouseenter', stopAutoSlide).on('mouseleave', startAutoSlide);

  // Handle resize for responsive needs (optional)
  $(window).on('resize', function () {
      // Placeholder for any responsive adjustments needed
  });
}