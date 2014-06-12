;(function($, window, document, undefined) {

    var pluginName = "metisMenu",
            Modernizr = typeof Modernizr !== "undefined" ? Modernizr : false,
            isTouchDevice = Modernizr ? Modernizr.touch : !!('ontouchstart' in window || 'onmsgesturechange' in window),
            buttonPressedEvent = (isTouchDevice) ? 'touchstart' : 'click',
            defaults = {
                toggle: true,
                hidingClass: 'sr-only',
                breakpoints: 768
            };

    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.buttonPressedEvent = buttonPressedEvent;
        this.init();
    }

    Plugin.prototype = {
        init: function() {

            var $this = $(this.element),
                    resizeTimer,
                    self = this;

            $(window).resize(function() {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(self.initCollapse($this), 250);
            });

            $this.on('affixed.bs.affix', function() {
                self.addCollapse($this);
                console.log('affixed.bs.affix');
            });

            $this.on('affixed-top.bs.affix', function() {
                self.removeCollapse($this);
                console.log('affixed-top.bs.affix');
            });

        },
        initCollapse: function(el) {
            var breakpoints = this.settings.breakpoints;
            if ($(window).width() < breakpoints) {
                this.addCollapse(el);
            } else {
                this.removeCollapse(el);
            }
        },
        addCollapse: function(el) {
            var $toggle = this.settings.toggle;
            $('body').removeClass('sidebar-left-mini');

            el.find('li.active').has('ul').children('ul').addClass('collapse in');
            el.find('li').not('.active').has('ul').children('ul').addClass('collapse');

            el.find('li').has('ul').children('a').on(this.buttonPressedEvent, function(e) {
                e.preventDefault();

                $(this).parent('li').toggleClass('opened').children('ul').collapse('toggle');

                if ($toggle) {
                    $(this).parent('li').siblings().removeClass('opened').children('ul.in').collapse('hide');
                }
            });
        },
        removeCollapse: function(el) {
            el.find('li').has('ul').children('ul').removeClass('collapse in').css('height', 'inherit');
            if (!el.hasClass('affix')) {
                el.find('li').has('ul').children('a').off('click');
            }
        }
    };

    $.fn[ pluginName ] = function(options) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);