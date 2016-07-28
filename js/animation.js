$(document).ready(function(){
  	//Menu open
	$('.navigation__menu').on('click', function(){
		$('.navigation__list').slideToggle();
	});
	var width = $(window).width();
	$(window).resize(function(){
	 	width = $(window).width();
	});
	$(window).scroll(function(){
		if (width<1000){
			$('.navigation__list:visible').slideUp();
		}
	});
	$(window).resize(function(){
		if (width<1000){
			$('.navigation__list:visible').slideUp();
		}
		else{
		$('.navigation__list:hidden').slideDown();
		$('.navigation__list').css({"display":"inline-block"});
		}
	});

//sliders
	var $nrSlide=0;
	$(".home__switcher__item").on('click', function(){ 
		$nrSlide = $(this).index(); changeSlide();
	});
function changeSlide(){	
	$(".home__slider__item").fadeOut(400);
	$('.home__slider__item[data-animated-pic='+$nrSlide+']').delay(500).fadeIn(1000);
	$(".home__switcher__item").css({"background-color": "#6e7476"});
	$(".home__switcher__item[data-nrSlide = "+$nrSlide+"]").css({"background-color": "#ffffff"});
	}
	
//Fixed navigation
	$(window).on('scroll resize', function(){
		var scroll = $(window).scrollTop() + 60;
		var height = $('.facts').offset().top;
		if (scroll>=height){
			$('.site-header').addClass('site-header--fixed');
		}
		else{
			$('.site-header').removeClass('site-header--fixed');
		}
	});
//Animation scroll and navigation scroll
	var slide=[];
	var scroll="";
	$(window).on('scroll resize', function(){
		$.each($('.home, .facts, .about, .team, .customers, .works, .news, .contact, .site-footer'), function(i,element){
			slide[i]=$(element).offset().top;
		});
	});
	var nrSection=0;
	$(".navigation__list__item").on('click', function(){
		$nrSection = $(this).index();
		if ($nrSection==0){
			scroll = slide[$nrSection];
		}
		else if ($nrSection==1){
			scroll = slide[$nrSection + 2];
		}
		else{
			scroll = slide[$nrSection + 3];
		}
		$("html, body").stop().animate( { scrollTop: scroll }, 1000);
	});
		//animation scroll
	var $animation_elements = $('section, footer');
	$(window).on('scroll resize', function(){
		var window_height = $(window).height();
  		var window_top_position = $(window).scrollTop();
  		var window_bottom_position = (window_top_position + window_height);
  		$.each($animation_elements, function(){
  			var $element = $(this);
    		var element_height = $element.outerHeight();
    		var element_top_position = $element.offset().top;
    		var element_bottom_position = (element_top_position + element_height);
    		 if ((element_bottom_position >= window_top_position) &&
       			(element_top_position <= window_bottom_position)) {
    		 	$(this).find('*').css({"animation-play-state":"running"});}
  		});
	});
	var $nrButton
	$('.works__projects__titles__item').on('click', function(){
		 $nrButton = $(this).index();
		 if ($nrButton==0){
		 	$('.works__projects__list__item').fadeIn(300);
		 	$(".works__projects__titles__item").removeClass("active");
		 	$(this).addClass("active");

		 }
		 else {
		 $('.works__projects__list__item').fadeOut(300);
		 $('.works__projects__list__item[data-animated-pic='+$nrButton+']').delay(300).fadeIn(300);
		 $(".works__projects__titles__item").removeClass("active");
		 $(this).addClass("active");
		 $('.works__load').fadeIn(300);
		}
	});
	$('.works__load').on('click', function(){
		$nrButton = $('.works__projects__titles__item').index($('.active'));
		if ($nrButton==0){
		$('.works__projects__list__item').filter(':nth-child(n+1)').fadeIn(300);
		$('.works__load').fadeOut(300);
		}
		else {
			$('.works__projects__list__item[data-button-animated-pic='+$nrButton+']').delay(300).fadeIn(300);
		}
	});
	$('.news__button').on('click', function(){
		$('.news__issues__list__item').filter(':nth-child(n+6)').fadeIn(300);
		$(this).fadeOut(300);
	});
	//map
		var latitude = 50.0647,
		longitude = 19.9450,
		map_zoom = 14;

	//google map custom marker icon - .png fallback for IE11
	var is_internetExplorer11= navigator.userAgent.toLowerCase().indexOf('trident') > -1;
	//define the basic color of your map, plus a value for saturation and brightness
	var	main_color = '#2d313f',
		saturation_value= -20,
		brightness_value= 5;

	//we define here the style of the map
	var style= [ 
		{
			//set saturation for the labels on the map
			elementType: "labels",
			stylers: [
				{saturation: saturation_value}
			]
		},  
	    {	//poi stands for point of interest - don't show these lables on the map 
			featureType: "poi",
			elementType: "labels",
			stylers: [
				{visibility: "off"}
			]
		},
		{
			//don't show highways lables on the map
	        featureType: 'road.highway',
	        elementType: 'labels',
	        stylers: [
	            {visibility: "off"}
	        ]
	    }, 
		{ 	
			//don't show local road lables on the map
			featureType: "road.local", 
			elementType: "labels.icon", 
			stylers: [
				{visibility: "off"} 
			] 
		},
		{ 
			//don't show arterial road lables on the map
			featureType: "road.arterial", 
			elementType: "labels.icon", 
			stylers: [
				{visibility: "off"}
			] 
		},
		{
			//don't show road lables on the map
			featureType: "road",
			elementType: "geometry.stroke",
			stylers: [
				{visibility: "off"}
			]
		}
	];
		
	//set google map options
	var map_options = {
      	center: new google.maps.LatLng(latitude, longitude),
      	zoom: map_zoom,
      	panControl: false,
      	zoomControl: false,
      	mapTypeControl: false,
      	streetViewControl: false,
      	mapTypeId: google.maps.MapTypeId.ROADMAP,
      	scrollwheel: false,
      	styles: style,
    }
    //inizialize the map
	var map = new google.maps.Map(document.getElementById('google-map'), map_options);
	//add a custom marker to the map				
	var marker = new google.maps.Marker({
	  	position: new google.maps.LatLng(latitude, longitude),
	    map: map,
	    visible: true,
	});
});
