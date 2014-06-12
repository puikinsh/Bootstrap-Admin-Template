;(function($) {
    "use strict";

    var $navBar = $('nav.navbar'),
            $body = $('body'),
            $menu = $('#menu');

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
            $menu.affix({
                offset: {
                    top: $menu.offset().top
                }
            }).css({
                height: function(){
                    if($(window).width()<768){
                        return $(window).height();
                    } else {
                        return $(window).height();
                    }
                },
                top: bodyPadTop - 1,
                bottom: 0
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