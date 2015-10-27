/*================================================================================
  Item Name: Materialize - Material Design Admin Template
  Version: 2.1
  Author: GeeksLabs
  Author URL: http://www.themeforest.net/user/geekslabs
================================================================================*/

jQuery(function() {

  "use strict";

  var window_width = jQuery(window).width();

  /*Preloader*/
  jQuery(window).load(function() {
    setTimeout(function() {
      jQuery('body').addClass('loaded');      
    }, 200);
  });  

  
  // Search class for focus
  jQuery('.header-search-input').focus(
  function(){
      jQuery(this).parent('div').addClass('header-search-wrapper-focus');
  }).blur(
  function(){
      jQuery(this).parent('div').removeClass('header-search-wrapper-focus');
  });  

  // Check first if any of the task is checked
  jQuery('#task-card input:checkbox').each(function() {
    checkbox_check(this);
  });

  // Task check box
  jQuery('#task-card input:checkbox').change(function() {
    checkbox_check(this);
  });

  // Check Uncheck function
  function checkbox_check(el){
      if (!jQuery(el).is(':checked')) {
          jQuery(el).next().css('text-decoration', 'none'); // or addClass            
      } else {
          jQuery(el).next().css('text-decoration', 'line-through'); //or addClass
      }    
  }

  /*----------------------
  * Plugin initialization
  ------------------------*/

  // Materialize Slider
 // jQuery('.slider').slider({
 //   full_width: true
  //});

  // Materialize Dropdown
  jQuery('.dropdown-button').dropdown({
    inDuration: 300,
    outDuration: 125,
    constrain_width: true, // Does not change width of dropdown to that of the activator
    hover: false, // Activate on click
    alignment: 'left', // Aligns dropdown to left or right edge (works with constrain_width)
    gutter: 0, // Spacing from edge
    belowOrigin: true // Displays dropdown below the button
  });

  // Materialize Tabs
  jQuery('.tab-demo').show().tabs();
  jQuery('.tab-demo-active').show().tabs();

  // Materialize Parallax
  jQuery('.parallax').parallax();
  jQuery('.modal-trigger').leanModal();

  // Materialize scrollSpy
  jQuery('.scrollspy').scrollSpy();

  // Materialize tooltip
  jQuery('.tooltipped').tooltip({
    delay: 50
  });

  // Materialize sideNav  

  //Main Left Sidebar Menu
  jQuery('.sidebar-collapse').sideNav({
    edge: 'left', // Choose the horizontal origin    
  });

  // FULL SCREEN MENU (Layout 02)
  jQuery('.menu-sidebar-collapse').sideNav({
        menuWidth: 280,
        edge: 'left', // Choose the horizontal origin     
        //defaultOpen:true // Set if default menu open is true
      });

  // HORIZONTAL MENU (Layout 03)
  jQuery('.dropdown-menu').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true // Displays dropdown below the button
    });

  
  //Main Left Sidebar Chat
  jQuery('.chat-collapse').sideNav({
    menuWidth: 380,
    edge: 'right',
  });
  jQuery('.chat-close-collapse').click(function() {
    jQuery('.chat-collapse').sideNav('hide');
  });
  jQuery('.chat-collapsible').collapsible({
    accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
  });

  // Pikadate datepicker
  jQuery('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year
	format: 'dd/mm/yyyy',
	clear: '',
  });

  // Perfect Scrollbar
  jQuery('select').not('.disabled').material_select();
    var leftnav = jQuery(".page-topbar").height();  
    var leftnavHeight = window.innerHeight - leftnav;
  jQuery('.leftside-navigation').height(leftnavHeight).perfectScrollbar({
    suppressScrollX: true
  });
    var righttnav = jQuery("#chat-out").height();
  jQuery('.rightside-navigation').height(righttnav).perfectScrollbar({
    suppressScrollX: true
  });  
  
  
  // Fullscreen
  function toggleFullScreen() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      }
      else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      }
      else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    }
    else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      }
      else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      }
      else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  jQuery('.toggle-fullscreen').click(function() {
    toggleFullScreen();
  });


  // Floating-Fixed table of contents (Materialize pushpin)
  if (jQuery('nav').length) {
    jQuery('.toc-wrapper').pushpin({
      top: jQuery('nav').height()
    });
  }
  else if (jQuery('#index-banner').length) {
    jQuery('.toc-wrapper').pushpin({
      top: jQuery('#index-banner').height()
    });
  }
  else {
    jQuery('.toc-wrapper').pushpin({
      top: 0
    });
  }

  // Toggle Flow Text
  var toggleFlowTextButton = jQuery('#flow-toggle')
  toggleFlowTextButton.click(function() {
    jQuery('#flow-text-demo').children('p').each(function() {
      jQuery(this).toggleClass('flow-text');
    })
  });
  
  
  //Toggle Containers on page
  var toggleContainersButton = jQuery('#container-toggle-button');
  toggleContainersButton.click(function() {
    jQuery('body .browser-window .container, .had-container').each(function() {
      jQuery(this).toggleClass('had-container');
      jQuery(this).toggleClass('container');
      if (jQuery(this).hasClass('container')) {
        toggleContainersButton.text("Turn off Containers");
      }
      else {
        toggleContainersButton.text("Turn on Containers");
      }
    });
  });

  // Detect touch screen and enable scrollbar if necessary
  /*function is_touch_device() {
    try {
      document.createEvent("TouchEvent");
      return true;
    }
    catch (e) {
      return false;
    }
  }
  if (is_touch_device()) {
    jQuery('#nav-mobile').css({
      overflow: 'auto'
    })
  }*/

  //LINE CHART WITH AREA IN SIDEBAR
   /* new Chartist.Line('#ct2-chart', {
        labels: [1, 2, 3, 4, 5, 6, 7, 8],
        series: [
            [5, 9, 7, 8, 5, 3, 5, 4]
        ]
    }, {
        low: 0,
        showArea: true
    });*/
    
  //Trending chart for small screen
  if(window_width <= 480){    
    $("#trending-line-chart").attr({
      height: '200'
    });
  }


}); // end of document ready