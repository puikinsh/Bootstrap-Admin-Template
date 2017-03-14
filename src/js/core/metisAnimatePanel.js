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
