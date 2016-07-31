;(function($, Metis) {
    var $button = $('.inner a.btn');
    Metis.metisButton = function() {
        $.each($button, function() {
            $(this).popover({
                placement: 'bottom',
                title: this.innerHTML,
                content: this.outerHTML,
                trigger: (Metis.isTouchDevice) ? 'touchstart' : 'hover'
            });
        });
    };
    return Metis;
})(jQuery, Metis || {});