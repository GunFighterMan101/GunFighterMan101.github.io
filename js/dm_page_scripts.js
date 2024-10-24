//document.addEventListener('DOMContentLoaded', function() {
document.onreadystatechange = function () {
	//"loading" document is still loading
	//"interactive" document has finished loading. We can access DOM elements
	//"complete" document page has finished completely and fully loaded
	if (document.readyState === 'interactive') {
		
	}
}

//function to equalize heights of content when needed
function equalContentHeight() {
	if( $(window).width() >= 800 ) {
		$(document).each(function(event) {
			//$(document).on('load', function() {
				if( $('.match-height').length ) {
					$('.section.match-height').each(function() {
						var $contentHeight = 0;
						var $columns = $('.col', this);
						var $maxHeight = Math.max.apply(Math, $columns.map(function() {
							//return $(this).outerHeight(true);
							return $(this).height();
						}).get());
						$columns.height($maxHeight);
						$columns.css({
							height: $maxHeight + 'px'
						});
						//window.console&&console.log('Equalize content height was called and ran');
					});
				}
			//});
		});
	}
}

var ua = navigator.userAgent;
var isMobile = {
	Android: function() {
		return ua.match(/Android/i);
	},
	BlackBerry: function() {
		return ua.match(/BlackBerry/i);
	},
	iOS: function() {
		return ua.match(/iPhone|iPad|iPod/i);
	},
	Opera: function() {
		return ua.match(/Opera Mini/i);
	},
	Windows: function() {
		return ua.match(/IEMobile/i);
	},
	any: function() {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
}
		
var iframe = $('#frame-badge');
function iframeReady() {
//$(window).on('load', function () {
	if( isMobile.any() ) {
	//if( /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		//$(window).bind('load',function(){
		setTimeout( function() {
			if($(window).width() <= 960) {
				var iframe = document.getElementById('frame-badge');
				var styleAdd = document.createElement('style');
				styleAdd.textContent =
					'@media only screen and (max-width : 960px), only screen and (max-device-width : 960px){' +
					'.card-front img {' +
					'max-height: 283px;' +
					'}' +
					'}' 
				;
				iframe.contentDocument.head.appendChild(styleAdd);
				console.log('resied iframe orientation change from iPadOrentation function');
			}
		}, 500);
		//});
	} else {
		if($(window).width() <= 960) {
			var iframe = document.getElementById('frame-badge');
			var styleAdd = document.createElement('style');
			styleAdd.textContent =
				'@media only screen and (max-width : 960px), only screen and (max-device-width : 960px){' +
				'.card-front img {' +
				'max-height: 283px;' +
				'}' +
				'}' 
			;
			iframe.contentDocument.head.appendChild(styleAdd);
			console.log('resized iFrame in general run/rules');
		}
	}
	//$(window).trigger('resize');
	console.log('Ran Frame loaded scripts');
}

/* document.addEventListener("DOMContentLoaded", (event) => {
	if (document.readyState === "loading") {
		document.querySelector('body').style.visibility = 'hidden';
		document.querySelector('#kit-loader').style.visibility = 'visible';
		document.querySelector('#kit-loader').style.display = 'block';
	} else {
		document.querySelector('#kit-loader').style.visibility = 'hidden';
		document.querySelector('#kit-loader').style.display = 'none';
		document.querySelector('body').style.visibility = 'visible';
	}
});
*/

(function($){
	$(function(){
		//*****
		//page loading scripts for loading animation
		//*****
		// Polling for the sake of my internet tests
		var interval = setInterval(function() {
			if(document.readyState === 'complete') {
				$('#kit-loader').fadeOut();
				clearInterval(interval);
				console.log('Page Loaded');
				//done();
				iframeReady();
			} else {
				$('#kit-loader').fadeIn();
				console.log('Page Not Loaded Yet.');
			}
		}, 100);
		//*****
		//show width height function for responsive design
		//*****
		function showViewPortSize(display) {
			if(display) {
				//var $viewportHeight = window.innerHeight;
				//var $viewportWidth = window.innerWidth;
				var $viewportHeight = window.outerHeight;
				var $viewportWidth = window.outerWidth;
				$('body').prepend('<div id="viewport-size" style="position:fixed; bottom:10px; left:10px; display:none; z-index:9999; padding:10px; text-align:center; font-size: 1.0em; background:rgba(35, 35, 35, 0.75); color:#fff;">W: '+ $viewportWidth +' <br /> H: '+ $viewportHeight +'</div>');
				$(window).on('resize', function() {
					var $viewportHeight = window.outerHeight;
					var $viewportWidth = window.outerWidth;
					$('#viewport-size').html('W: ' + $viewportWidth + ' <br /> H: ' + $viewportHeight );
				});
				console.log('W: ' + $viewportWidth + ' H: ' + $viewportHeight );
			}
		}
		showViewPortSize(true);
		//*****
		//responsive sticky navigation
		//*****
		// Menu-toggle button
		$('.menu-icon').on('click', function() {
			$('.menu').toggleClass('shown-menu');
			$('nav ul').toggleClass('menu-showing');
			$('#nav').toggleClass('open-menu');
			$('#nav.fixed-nav .menu-logo').toggleClass('active-menu');
		});
		// Scrolling Effect

		$(window).on('scroll', function() {
			var yScrollTarget = 10;
			var scrollPosition = $(this).scrollTop();
			//if($(window).scrollTop()) {
			if(scrollPosition >= yScrollTarget) {
				$('nav').addClass('fixed-nav');
			} else {
				$('nav').removeClass('fixed-nav');
			}
			
			//*****
			//page scroll to end of div
			//*****
			if($(window).scrollTop() >= $('#main-content').offset().top + $('#main-content').outerHeight() - window.innerHeight) {
				$('.banner-message').css({
					'position': 'relative',
					'bottom': '-15px'
				});
			} else {
				$('.banner-message').css({
					'position': 'fixed',
					'bottom': '25px'
				});
			}
		});
		//*****
		//add active class to menu clicks
		//*****
		// Get the container element
		var lnkContainer = document.getElementById('nav');
		// Get all links with class="nav-link" inside the container
		var lnk = lnkContainer.getElementsByClassName('nav-link');
		// Loop through the links and add the active class to the current/clicked button
		for (var i = 0; i < lnk.length; i++) {
			lnk[i].addEventListener('click', function() {
				var current = document.getElementsByClassName('active');
				current[0].className = current[0].className.replace(' active', "");
				this.className += ' active';
			});
		}
		//*****
		//click anywhere but nav and close the menu
		//*****
		//nav link click anywhere else close menu
		if($('.menu-icon').is(':visible')){
		//if($('#nav ul').hasClass('menu-showing')){
			$('#nav').on('click', function(event) {
				//event.preventDefault();  // Might cause problems depending on implementation
				event.stopPropagation();

				$(document).one('click', function (event) {
					if(!$(event.target).is('nav')) {
						// code to hide menus
						$('nav .menu ul').removeClass('menu-showing');
						$("#nav .menu").removeClass('shown-menu');
						$('#nav').removeClass('open-menu');
						$('#nav.fixed-nav .menu-logo').removeClass('active-menu');
						//console.log('closing menu');
					}
				});
				
				$(window).on('resize', function() {
					if($('.menu-icon').is(':visible')){
						$('#nav').on('click', function(event) {
							event.stopPropagation();
							$(document).one('click', function (event) {
								if(!$(event.target).is('nav')) {
									// code to hide menus
									$('nav .menu ul').removeClass('menu-showing');
									$("#nav .menu").removeClass('shown-menu');
									$('#nav').removeClass('open-menu');
									$('#nav.fixed-nav .menu-logo').removeClass('active-menu');
									//console.log('closing menu');
								}
							});
						});
					}
				});
				
				$(window).on('scroll', function() {
					//if($('.menu-icon').hasClass('open-showing')){
					if($('.menu-icon').is(':visible')){
						$('#nav.fixed-nav .menu ul').removeClass('menu-showing');
						$("#nav .menu").removeClass('shown-menu');
						$('#nav').removeClass('open-menu');
						$('#nav.fixed-nav .menu-logo').removeClass('active-menu');
						//console.log('scrolling closing menu');
					}
				});
			});
		}
		//*****
		//magic particles hover script
		//*****
		var magicButtonSelector = document.querySelector('.magic-button');
		var magicButtonParticles = document.querySelector('.magical-particles');

		$(magicButtonSelector).on('mouseenter', function(){
			$(magicButtonParticles).addClass('over');
		});
		$(magicButtonSelector).on('mouseleave', function(){
			$(magicButtonParticles).removeClass('over');
		});
		//*****
		//progress bar with back to top
		//*****
		//Scroll back to top
		var progressPath = document.querySelector('.progress-wrap path');
		var pathLength = progressPath.getTotalLength();
		progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
		progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
		progressPath.style.strokeDashoffset = pathLength;
		progressPath.getBoundingClientRect();
		progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';		
		var updateProgress = function () {
			var scroll = $(window).scrollTop();
			var height = $(document).height() - $(window).height();
			var progress = pathLength - (scroll * pathLength / height);
			progressPath.style.strokeDashoffset = progress;
		}
		updateProgress();
		$(window).scroll(updateProgress);	
		var offset = 50;
		var duration = 550;
		jQuery(window).on('scroll', function() {
			if (jQuery(this).scrollTop() > offset) {
				jQuery('.progress-wrap').addClass('active-progress');
			} else {
				jQuery('.progress-wrap').removeClass('active-progress');
			}
		});				
		jQuery('.progress-wrap').on('click', function(event) {
			event.preventDefault();
			jQuery('html, body').animate({scrollTop: 0}, duration);
			return false;
		});
		//*****
		//welcome rainbow text for whiney
		//*****
		$('.anim-text-flow').html(function(i, html) {
			//var chars = $.trim(html).split(" ") //split by word spaces
			var chars = $.trim(html).split(""); //splt by all.
			//var chars = $.trim(html).match(/[A-Z][a-z]+|[0-9]+/g); //match and split by caps
			//var chars = $(this).html();
			//var chars = stringCamelCase.split(/(?=[A-Z])/).join(" ");
			
		return '<span class="bounce-item"><span class="flow-text">' + chars.join(" " + '</span></span><span class="bounce-item"><span class="flow-text">').replace(/([A-Z])/g, ' $1').trim() + '</span></span>';
		});
		//*****
		//jello animation for menu
		//*****
		if(!( /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )) {
			if($(window).width() >= 960) {
				$("#contact-social li .jello-link, #nav .menu ul li a").hover(function(){
					$(this).find('i').addClass('animate-jello');  //Add the active class to the area is hovered
				 }, function () {
					  $(this).find('i').removeClass('animate-jello i');
				 });
				 
				 $("#nav .menu ul li a").hover(function(){
					$(this).addClass('animate-jello');  //Add the active class to the area is hovered
				 }, function () {
					  $(this).removeClass('animate-jello i');
				 });
			}
		}
		//*****
		//light mode/dark mode toggle
		//*****
		var checkboxModeToggle = document.getElementById('checkbox-mode-toggle');
		checkboxModeToggle.addEventListener('change', () => {
			document.body.classList.toggle('light');
			$('.toggle-mode .la-moon').toggleClass('non-active');
			$('.toggle-mode .la-sun').toggleClass('non-active');
			$('.checkbox-label .ball').toggleClass('non-active');
		});
		
		$(window).on('load', function() {
			$('.toggle-mode .la-moon').removeClass('non-active');
			$('.toggle-mode .la-sun').removeClass('non-active');
			$('.toggle-mode .la-sun').addClass('non-active');
			$('.checkbox-label .ball').removeClass('non-active');
		});
		//*****
		//parallax function
		//*****
		/* function parallax(){
			var scrolled = $(window).scrollTop();
			//$('.bg').css('top',-(scrolled*0.1)+'px');
			//$('header .parallax').css( 'top', 50+(scrolled*0.1)+'%' );
			$('header .parallax').css( 'top', (scrolled*0.1)+'%' );
			$('header .parallax').css( 'opacity', 1-(scrolled*0.01)/10 );
			$('header .parallax').css( 'opacity', 1-(scrolled*0.01)/10 );
		}
		
		$(window).on('scroll', function(){
			parallax();
		}); */
		
		//*****
		//page marquee animation needed
		//*****
		var root = document.documentElement;
		var marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue('--marquee-elements-displayed');
		var marqueeContent = document.querySelector('ul.marquee-content');
		
		root.style.setProperty('--marquee-elements', marqueeContent.children.length);
		
		for(let i=0; i < marqueeElementsDisplayed; i++) {
			marqueeContent.appendChild( marqueeContent.children[i].cloneNode(true) );
		}
		
		//*****
		//equal height content script
		//*****
		equalContentHeight();
	});
})(jQuery);