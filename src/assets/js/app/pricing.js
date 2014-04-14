(function ($) {
    "use strict";
    var MetisPricing,
        Metis = window.Metis;
    MetisPricing = {
        init: function () {
            $("#dark-toggle label").on(Metis.buttonPressedEvent, function () {
                var $this = $(this);
                $("ul.dark li.active").removeClass("primary success danger warning info default").addClass($this.find("input").val());
            });

            $("#light-toggle label").on("click", function () {
                var $this = $(this);
                $("ul#light li.active").removeClass("primary success danger warning info default").addClass($this.find("input").val());
            });
        }
    };
    MetisPricing.init();
})(jQuery);