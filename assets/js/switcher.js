$(function() {
    
    $('#switcher-link').on('click', function (){
        $('#style-switcher').toggleClass('open');
    });
    /* Color switcher */
    var link = $('#active-color'),
            localStorageColor;

    if (Modernizr.localstorage) {
        if (localStorage.color) {
            localStorageColor = localStorage.color;
        }
    } else {
        localStorageColor = "default";
    }
    link.attr('href', 'assets/css/' + localStorageColor + '.min.css');

    $('.color-switcher button').click(function() {

        var $this = $(this),
                colorModal = $('#colorModal');

        localStorageColor = $this.data('color');

        /* change css file*/
        link.attr('href', 'assets/css/' + localStorageColor + '.min.css');

        /* change button class */
        $('#switch-color')
                .removeAttr('class')
                .addClass('btn btn-mini btn-' + localStorageColor);

        /* all buttons enable */
        $this.siblings('button')
                .removeAttr('disabled');

        /* active button disable*/
        $this.attr('disabled', 'disabled');


        colorModal.modal('hide');

        /* write to localStorage variable */
        if (Modernizr.localstorage) {
            localStorage.color = localStorageColor;
        }

        return false;
    });

    /* body pattern switcher */
    $('.pattern-switcher a').click(function() {

        var patternName = $(this).attr('class');
        $('body').css('background', 'url(assets/img/pattern/' + patternName + '.png)');
        $('#colorModal').modal('hide');
        return false;
    });


    /* layout switcher*/

    $('#fixed-wide-cnt a')
            .removeClass('disabled')
            .click(function() {

        var $this = $(this),
                $body = $('body'),
                bodyClass = $this.data('body-class');

        $body.removeClass('fixed wide').addClass(bodyClass);

        $this
                .siblings('a')
                .removeClass('disabled');           /* all buttons enable */
        $this.addClass('disabled').end();       /* active button disable*/

        return false;
    });


    /* sidebar #left left to right or right to left*/
    $("#sidebar-change").click(function() {
        $("body").toggleClass("side-right");
        $("#sidebar-change i").toggleClass("icon-double-angle-left icon-double-angle-right");
    });


    /* sidebar #left hide or show */
    $("#hide-sidebar").click(function() {
        $("body").toggleClass("hide-sidebar");
        $("#hide-sidebar i").toggleClass("icon-desktop icon-tablet");
        $(window).trigger("resize");
    });

    /* sidebar #left 220px to 100px*/
    $("#mini-sidebar").click(function() {
        $("body").toggleClass("mini-sidebar");
        $("#mini-sidebar i").toggleClass("icon-zoom-in icon-zoom-out");

    });
});


$(window).resize(function() {
    var $body = $('body'), $windowW = $(window).width();

    if ($body.hasClass('mini-sidebar')) {
        if ($windowW < 767) {
            $body.removeClass('mini-sidebar');
        }
    }
    ;

    if ($windowW >= 479) {
        $('ul#menu').removeAttr('style').addClass('in');
    }
});