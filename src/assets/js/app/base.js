$(function () {
    "use strict";

    $('a[href=#]').on('click', function (e) {
        e.preventDefault();
    });


    $('a[data-toggle=tooltip]').tooltip();
    $('a[data-tooltip=tooltip]').tooltip();


    $('.minimize-box').on('click', function (e) {
        e.preventDefault();
        var $icon = $(this).children('i');
        if ($icon.hasClass('icon-chevron-down')) {
            $icon.removeClass('icon-chevron-down').addClass('icon-chevron-up');
        } else if ($icon.hasClass('icon-chevron-up')) {
            $icon.removeClass('icon-chevron-up').addClass('icon-chevron-down');
        }
    });
    $('.close-box').click(function () {
        $(this).closest('.box').hide('slow');
    });

    $('#changeSidebarPos').on('click', function (e) {
        $('body').toggleClass('hide-sidebar');
    });

    $('li.accordion-group > a').on('click', function (e) {
        $(this).children('span').children('i').toggleClass('icon-angle-down');
    });
    
    $('#menu-toggle').on('click', function(e){
        $('#left').toggleClass('opened');
        e.preventDefault();
    });
    
    $('#menu').metisMenu();
});
















