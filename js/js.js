/*global $*/
$(function () {
    "use strict";
    //start header
    var $link = $('#nav a'), // Cache Navigation Links
        $window = $(window), // Cache window
        $response = $("#response_brought"),
        main_height = $(".main-height").outerHeight();
/* Smooth Scrolling */
    $('a[href*="#"]')
        .not('[href="#"]')
        .not('[href="#0"]')
        .on('click', function (event) {
            if (
                location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')
                    &&
                    location.hostname === this.hostname
            ) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function () {
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) {
                            return false;
                        } else {
                            $target.attr('tabindex', '-1');
                            $target.focus();
                        }
                    });
                }
            }
        });
    // change background navbar
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll > 100) {
            $(".navbar-inverse").css("background-color", "#000");
        } else {
            $(".navbar-inverse").css("background-color", "transparent");
        }
    });
    // navbar toggle
    $('.navbar-toggle').on("click", function () {
        $(".navbar-inverse").css("background-color", "#000");
    });
    // nav for mobile
    $link.on("click", function () {
        if ($(".navbar-toggle").css("display") !== "none") {
            $(".navbar-toggle").trigger("click");
        }
    });

    // Progress bar
    $window.on('scroll', function () {
        $(".skills-progress span").each(function () {
            var bottom_of_object =
                $(this).offset().top + $(this).outerHeight();
            var bottom_of_window =
                $(window).scrollTop() + $(window).height();
            var myVal = $(this).attr('data-value');
            if (bottom_of_window > bottom_of_object) {
                $(this).css({
                    width : myVal
                });
            }
        });
    });
   // Counter
	 $('.number').counterUp({
		delay: 10,
		time: 3000
	});
    // select work
    $('.mywork').click(function(){
      $('.mywork').removeClass('activeWork') ;
        $(this).addClass('activeWork');
    });
    // end select work
    //start magnificpopup
     $('.parent-container').magnificPopup({
      delegate: 'a',
      type: 'image'
    });
    //end magnificpopup
    // end section work

	//OWLCAROUSEL TESTIMONIAL CAROUSEL
	var owl = $("#testimonial-carousel");

	  owl.owlCarousel({
		  navigation : false, // Show next and prev buttons
		  slideSpeed : 300,
		  paginationSpeed : 400,
		  singleItem:true,
		  transitionStyle : "fade",
      autoPlay: true,
      loop: true
	  });
    // start parallax
    $('.parallax-window').parallax({imageSrc: '/path/to/image.jpg'});


    // start scroll

    var scrolltop=$('.scroll-top');

    $(window).scroll(function(){
    if($(this).scrollTop()>=700){
    scrolltop.show();
    }
    else{
    scrolltop.hide();
    }
    });
    scrolltop.click(function(){
    $('html,body').animate({ scrollTop : 0 }, 600);
    });
    //start aos animated
    AOS.init();
    var Shuffle = window.Shuffle;
    var element = document.querySelector('.my-shuffle-container');
    var shuffleInstance = new Shuffle(element, {
    itemSelector: '.picture-item',
    });
    // shuffleInstance.filter('web');
    $("#all").on("click", function(){
        shuffleInstance.filter();
    });
    $("#btn-design1").on("click", function(){
        shuffleInstance.filter('web');
    });
    $("#btn-design2").on("click", function(){
        shuffleInstance.filter('Deveopment');
    });
    $("#btn-design3").on("click", function(){
        shuffleInstance.filter('Mobile');
    });

    //PRELOADER
    $('#preload').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    
    /* Contact Form */
function submit_form() {
	"use strict";
//Variable declaration and assignment
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        
		fullname = $("#fullname").val(),
		email = $("#email").val(),
        phone = $("#phone").val();
		message = $("#message").val(),
		dataString = {'fullname': fullname, 'email': email,'phone' : phone , 'message': message, 'submitted': '1'};

	if (fullname === "") { //Validation against empty field for fullname
		$response.html('<br clear="all"><div class="form_info" align="left">Please enter your fullname in the required field to proceed. Thanks.</div>');
		$("#fullname").focus();
	} else if (email === "") { //Validation against empty field for email address
		$response.html('<br clear="all"><div class="form_info" align="left">Please enter your email address in the required email field to proceed. Thanks.</div>');
		$("#email").focus();
    } else if (phone === "") { //Validation against empty field for phone address
		$response.html('<br clear="all"><div class="form_info" align="left">Please enter your phone in the required field to proceed. Thanks.</div>');
		$("#phone").focus();
	} else if (reg.test(email) === false) { //Validation for working email address
		$("#response_brought").html('<br clear="all"><div class="form_info" align="left">Sorry, your email address is invalid. Please enter a valid email address to proceed. Thanks.</div>');
		$("#email").focus();
	} else if (message === "") { //Validation against empty field for email message
		$response.html('<br clear="all"><div class="form_info" align="left">Please enter your message in the required message field to proceed. Thanks.</div>');
		$("#message").focus();
	} else {
		//Show loading image
		$response.html('<br clear="all"><div align="left" style=" padding-top:6px; margin-left:100px; margin-top:15px;"><font style="font-size:12px; color:black;">Please wait</font> <img src="pic/loading.gif" alt="Loading...." align="absmiddle" title="Loading...."/></div>');

		$.post('contact_form.php', dataString,  function (response) {
		  //Check to see if the message is sent or not
			var response_brought = response.indexOf('Congrats');
			if (response_brought !== -1) {
				//Clear all form fields on success
				$(".contact-form").slideUp(500);


				//Display success message if the message is sent
				$response.html(response);


				//Remove the success message also after a while of displaying the message to the user
				setTimeout(function () {
					$response.html('');
				}, 10000);
			} else {
				//Display error message is the message is not sent
				$(".contact-form").slideUp(500);
				$response.html(response);
			}
		});
	}
}
/* End Contact Form */
});
