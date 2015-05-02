;(function($, Metis) {
    "use strict";
    var _updateClass = function(el, c) {
        el.removeClass("primary success danger warning info default").addClass(c);
    };
    Metis.MetisPricing = function() {
        var $dark = $("ul.dark li.active"),
                $light = $("ul#light li.active");

        $("#dark-toggle label").on(Metis.buttonPressedEvent, function() {
            var $this = $(this);
            _updateClass($dark, $this.find("input").val());
        });

        $("#light-toggle label").on(Metis.buttonPressedEvent, function() {
            var $this = $(this);
            _updateClass($light, $this.find("input").val());
        });
    };
    return Metis;
})(jQuery, Metis || {});