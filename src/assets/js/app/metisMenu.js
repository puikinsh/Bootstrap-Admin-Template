;(function ($, window, document, undefined) {

    var pluginName = "metisMenu",
        defaults = {
            toggle: true,
            hidingClass: 'u-isHiddenVisually'
        };

    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {

            var $this = $(this.element),
                $toggle = this.settings.toggle,
                $hidingClass = this.settings.hidingClass,
                resizeTimer;
            
            function resizedw(){
                $('body').removeClass('mini-sidebar');
                
                $this.find('li.active').has('ul').children('ul').addClass('collapse in');
            $this.find('li').not('.active').has('ul').children('ul').addClass('collapse');
            
            $this.find('li').has('ul').children('a').on('click', function (e) {
                e.preventDefault();

                $(this).parent('li').toggleClass('opened').children('ul').collapse('toggle');

                if ($toggle) {
                    $(this).parent('li').siblings().removeClass('opened').children('ul.in').collapse('hide');
                }
            });
            }
            function removeHidden() {
                $this.find('li').has('ul').children('ul').removeClass('collapse in').css('height','inherit');
                if(!$this.hasClass('affix')) {
                    $this.find('li').has('ul').children('a').off('click');
                }
            }
            
            function allFunc() {
                if($(window).width() < 992) {
                    resizedw();
                } else {
                    removeHidden();
                }
            }
            
            allFunc();
            
            $this.on('affix.bs.affix', function(){
                //resizedw();
                console.log('affix.bs.affix');
            });
            
            $this.on('affix-top.bs.affix',function(){
                //removeHidden();
                console.log('affix-top.bs.affix');
            });
            
            $this.on('affixed.bs.affix', function(){
                resizedw();
                console.log('affixed.bs.affix');
            });
            
            $this.on('affixed-top.bs.affix',function(){
                removeHidden();
                console.log('affixed-top.bs.affix');
            });
            
            $(window).resize(function() {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(allFunc, 250);
            });

        }
    };

    $.fn[ pluginName ] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);