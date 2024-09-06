/**
 * bootstrap-admin-template - Free Admin Template Based On Twitter Bootstrap 3.x
 * @version 2.4.2
 * @license MIT
 * @link https://github.com/puikinsh/Bootstrap-Admin-Template
 */
;(function(window) {
    var
      // Are we expecting a touch or a click?
      buttonPressedEvent = 'touchstart click',
      Metis = function() {
          this.init();
      };

    // Initialization method
    Metis.prototype.init = function() {
        this.buttonPressedEvent = buttonPressedEvent;
    };

    Metis.prototype.getViewportHeight = function() {

        var docElement = document.documentElement,
                client = docElement.clientHeight,
                inner = window.innerHeight;

        if (client < inner)
            return inner;
        else
            return client;
    };

    Metis.prototype.getViewportWidth = function() {

        var docElement = document.documentElement,
                client = docElement.clientWidth,
                inner = window.innerWidth;

        if (client < inner)
            return inner;
        else
            return client;
    };

    // Creates a Metis object.
    window.Metis = new Metis();
})(window);

;(function($) {
    "use strict";

    var $navBar = $('nav.navbar'),
            $body = $('body'),
            $menu = $('#menu'),
            $left = $('#left');

    function addPaddingTop(el, val) {
        el.css('padding-top', val);
    }
    function removePaddingTop(el) {
        el.css('padding-top', 'inherit');
    }
    function getHeight(el) {
        return el.outerHeight();
    }

    function init() {
        var isFixedNav = $navBar.hasClass('navbar-fixed-top');
        var bodyPadTop = isFixedNav ? $navBar.outerHeight(true) : 0;

        $body.css('padding-top', bodyPadTop);

        if ($body.hasClass('menu-affix')) {
            $left.css({
                top: bodyPadTop
            });
            console.log($navBar.outerHeight(true));
        }
    }

    Metis.navBar = function() {
        var resizeTimer;
        init();
        $(window).resize(function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(init(), 250);
        });
    };
    return Metis;
})(jQuery);

;(function($, Metis) {
  "use strict";
  // Define toggleFullScreen
  Metis.toggleFullScreen = function() {
    if ((window.screenfull !== undefined) && screenfull.enabled) {
      $('#toggleFullScreen').on(Metis.buttonPressedEvent, function(e) {
        screenfull.toggle(window.document[0]);
        $('body').toggleClass('fullScreen');
        e.preventDefault();
      });
    } else {
      $('#toggleFullScreen').addClass('hidden');
    }
  };
  // Define boxFullScreen
  Metis.boxFullScreen = function() {
    if ((window.screenfull !== undefined) && screenfull.enabled) {
      $('.full-box').on(Metis.buttonPressedEvent, function(e) {
        var $toggledPanel = $(this).parents('.box')[0];
        screenfull.toggle($toggledPanel);
        $(this).parents('.box').toggleClass('full-screen-box');
        $(this).parents('.box').children('.body').toggleClass('full-screen-box');
        $(this).children('i').toggleClass('fa-compress');
        e.preventDefault();
      });
    } else {
      $('.full-box').addClass('hidden');
    }
  };
  Metis.panelBodyCollapse = function() {
    var $collapseButton = $('.collapse-box'),
      $collapsedPanelBody = $collapseButton.closest('.box').children('.body');

    $collapsedPanelBody.collapse('show');

    $collapseButton.on(Metis.buttonPressedEvent, function(e) {
      var $collapsePanelBody = $(this).closest('.box').children('.body'),
        $toggleButtonImage = $(this).children('i');
      $collapsePanelBody.on('show.bs.collapse', function() {
        $toggleButtonImage.removeClass('fa-minus fa-plus').addClass('fa-spinner fa-spin');
      });
      $collapsePanelBody.on('shown.bs.collapse', function() {
        $toggleButtonImage.removeClass('fa-spinner fa-spin').addClass('fa-minus');
      });

      $collapsePanelBody.on('hide.bs.collapse', function() {
        $toggleButtonImage.removeClass('fa-minus fa-plus').addClass('fa-spinner fa-spin');
      });

      $collapsePanelBody.on('hidden.bs.collapse', function() {
        $toggleButtonImage.removeClass('fa-spinner fa-spin').addClass('fa-plus');
      });

      $collapsePanelBody.collapse('toggle');

      e.preventDefault();
    });
  };
  Metis.boxHiding = function() {
    $('.close-box').on(Metis.buttonPressedEvent, function() {
      $(this).closest('.box').hide('slow');
    });
  };
  return Metis;
})(jQuery, Metis || {});

;(function($, Metis) {
    var $body = $('body'),
        $leftToggle = $('.toggle-left'),
        $count = 0;

    Metis.metisAnimatePanel = function() {

        if ($('#left').length) {
            $leftToggle.on(Metis.buttonPressedEvent, function(e) {

                if ($(window).width() < 768) {
                    $body.toggleClass('sidebar-left-opened');
                } else {
                    switch (true) {
                        case $body.hasClass("sidebar-left-hidden"):
                            $body.removeClass("sidebar-left-hidden sidebar-left-mini");
                            break;
                        case $body.hasClass("sidebar-left-mini"):
                            $body.removeClass("sidebar-left-mini").addClass("sidebar-left-hidden");
                            break;
                        default:
                            $body.addClass("sidebar-left-mini");
                    }

                    e.preventDefault();
                }
            });
        } else {
            $leftToggle.addClass('hidden');
        }

    };
    return Metis;
})(jQuery, Metis || {});

;(function($) {
   $(document).ready(function() {
    
    $('[data-toggle="tooltip"]').tooltip();
 
    $('#menu').metisMenu();
    Metis.navBar();
    Metis.metisAnimatePanel();
    Metis.toggleFullScreen();
    Metis.boxFullScreen();
    Metis.panelBodyCollapse();
    Metis.boxHiding();   
  });
})(jQuery);
