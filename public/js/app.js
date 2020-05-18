/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	!(function($) {
	    "use strict";
	  
	    $("#termosModal .modal-body").load("termos-e-condicoes.html"); 
	    $("#mauticFormContent").load("mautic-form.html");

	    // Header fixed and Back to top button
	    $(window).scroll(function() {
	      if ($(this).scrollTop() > 100) {
	        $('.back-to-top').fadeIn('slow');
	        $('#header').addClass('header-fixed');
	      } else {
	        $('.back-to-top').fadeOut('slow');
	        $('#header').removeClass('header-fixed');
	      }
	    });
	    $('.back-to-top').click(function() {
	      $('html, body').animate({
	        scrollTop: 0
	      }, 1500, 'easeInOutExpo');
	      return false;
	    });
	  
	    // Initiate the wowjs
	    new WOW().init();
	  
	    // Initiate superfish on nav menu
	    /*$('.nav-menu').superfish({
	      animation: {
	        opacity: 'show'
	      },
	      speed: 400
	    });*/
	  
	    // Mobile Navigation
	    if ($('#nav-menu-container').length) {
	      var $mobile_nav = $('#nav-menu-container').clone().prop({
	        id: 'mobile-nav'
	      });
	      $mobile_nav.find('> ul').attr({
	        'class': '',
	        'id': ''
	      });
	      $('body').append($mobile_nav);
	      $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
	      $('body').append('<div id="mobile-body-overly"></div>');
	      $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');
	  
	      $(document).on('click', '.menu-has-children i', function(e) {
	        $(this).next().toggleClass('menu-item-active');
	        $(this).nextAll('ul').eq(0).slideToggle();
	        $(this).toggleClass("fa-chevron-up fa-chevron-down");
	      });
	  
	      $(document).on('click', '#mobile-nav-toggle', function(e) {
	        $('body').toggleClass('mobile-nav-active');
	        $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
	        $('#mobile-body-overly').toggle();
	      });
	  
	      $(document).click(function(e) {
	        var container = $("#mobile-nav, #mobile-nav-toggle");
	        if (!container.is(e.target) && container.has(e.target).length === 0) {
	          if ($('body').hasClass('mobile-nav-active')) {
	            $('body').removeClass('mobile-nav-active');
	            $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
	            $('#mobile-body-overly').fadeOut();
	          }
	        }
	      });
	    } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
	      $("#mobile-nav, #mobile-nav-toggle").hide();
	    }
	  
	    // Smoth scroll on page hash links
	    $('a[href*="#"]:not([href="#"]):not(.carousel-control)').on('click', function() {
	      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
	  
	        var target = $(this.hash);
	        if (target.length) {
	          var top_space = 0;
	  
	          if ($('#header').length) {
	            top_space = $('#header').outerHeight();
	  
	            if (!$('#header').hasClass('header-fixed')) {
	              top_space = top_space - 20;
	            }
	          }
	  
	          $('html, body').animate({
	            scrollTop: target.offset().top - top_space
	          }, 1500, 'easeInOutExpo');
	  
	          if ($(this).parents('.nav-menu').length) {
	            $('.nav-menu .menu-active').removeClass('menu-active');
	            $(this).closest('li').addClass('menu-active');
	          }
	  
	          if ($('body').hasClass('mobile-nav-active')) {
	            $('body').removeClass('mobile-nav-active');
	            $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
	            $('#mobile-body-overly').fadeOut();
	          }
	          return false;
	        }
	      }
	    });
	  
	    // Porfolio filter
	    $("#portfolio-flters li").click(function() {
	      $("#portfolio-flters li").removeClass('filter-active');
	      $(this).addClass('filter-active');
	  
	      var selectedFilter = $(this).data("filter");
	      $("#portfolio-wrapper").fadeTo(100, 0);
	  
	      $(".portfolio-item").fadeOut().css('transform', 'scale(0)');
	  
	      setTimeout(function() {
	        $(selectedFilter).fadeIn(100).css('transform', 'scale(1)');
	        $("#portfolio-wrapper").fadeTo(300, 1);
	      }, 300);
	    });

	    $('a.carousel-control.left').click(function(e) {
	      e.preventDefault();
	      $('#myCarousel').carousel('prev');
	    });
	    
	    $('a.carousel-control.right').click(function(e) {
	      e.preventDefault();
	      $('#myCarousel').carousel('next');
	    });
	  
	    // Initiate venobox (lightbox feature used in portofilo)
	    /*$(document).ready(function() {
	      $('.venobox').venobox();
	    });
	  
	    // jQuery counterUp
	    $('[data-toggle="counter-up"]').counterUp({
	      delay: 10,
	      time: 1000
	    });*/
	  
	  })(jQuery);

	  particlesJS("particles-js", {
	    particles: {
	      number: { value: 80, density: { enable: true, value_area: 800 } },
	      color: { value: "#ffffff" },
	      shape: {
	        type: "circle",
	        stroke: { width: 0, color: "#000000" },
	        polygon: { nb_sides: 5 },
	        image: { src: "img/github.svg", width: 100, height: 100 }
	      },
	      opacity: {
	        value: 0.5,
	        random: false,
	        anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
	      },
	      size: {
	        value: 3,
	        random: true,
	        anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
	      },
	      line_linked: {
	        enable: true,
	        distance: 150,
	        color: "#ffffff",
	        opacity: 0.4,
	        width: 1
	      },
	      move: {
	        enable: true,
	        speed: 6,
	        direction: "none",
	        random: false,
	        straight: false,
	        out_mode: "out",
	        bounce: false,
	        attract: { enable: false, rotateX: 600, rotateY: 1200 }
	      }
	    },
	    interactivity: {
	      detect_on: "canvas",
	      events: {
	        onhover: { enable: true, mode: "repulse" },
	        onclick: { enable: true, mode: "push" },
	        resize: true
	      },
	      modes: {
	        grab: { distance: 400, line_linked: { opacity: 1 } },
	        bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
	        repulse: { distance: 200, duration: 0.4 },
	        push: { particles_nb: 4 },
	        remove: { particles_nb: 2 }
	      }
	    },
	    retina_detect: true
	  });
	  

/***/ })
/******/ ]);