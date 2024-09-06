/**
 * onoffcanvas - A jQuery offcanvas plugin
 * @version v1.1.2
 * @link https://github.com/onokumus/onoffcanvas#readme
 * @license MIT
 */
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('jquery'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.jquery);
    global.onoffcanvas = mod.exports;
  }
})(this, function (_jquery) {
  'use strict';

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  (function ($) {
    var OnoffCanvas = function OnoffCanvas(element, options) {
      this.$element = $(element);
      this.options = $.extend({}, OnoffCanvas.DEFAULTS, options);
      this.$trigger = $('[data-toggle="onoffcanvas"][href="#' + element.id + '"],[data-toggle="onoffcanvas"][data-target="#' + element.id + '"]');

      this.addAriaCollapsedClass(this.$element, this.$trigger);
    };

    OnoffCanvas.DEFAULTS = {
      toggle: true
    };

    OnoffCanvas.prototype.show = function () {
      var openClass = 'is-open';

      if (this.$element.hasClass(openClass)) {
        return;
      }

      this.$element.addClass(openClass).attr('aria-expanded', true);

      this.$trigger.attr('aria-expanded', true);
    };

    OnoffCanvas.prototype.hide = function () {
      var openClass = 'is-open';

      if (!this.$element.hasClass(openClass)) {
        return;
      }

      this.$element.removeClass(openClass).attr('aria-expanded', false);

      this.$trigger.attr('aria-expanded', false);
    };

    OnoffCanvas.prototype.toggle = function () {
      var openClass = 'is-open';
      this[this.$element.hasClass(openClass) ? 'hide' : 'show']();
    };

    function getTargetFromTrigger($trigger) {
      var href = void 0;
      var target = $trigger.attr('data-target') || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '');

      return $(target);
    }

    OnoffCanvas.prototype.getParent = function () {
      return $(this.options.parent).find('[data-toggle="onoffcanvas"][data-parent="' + this.options.parent + '"]').each($.proxy(function (i, element) {
        var $element = $(element);
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element);
      }, this)).end();
    };

    OnoffCanvas.prototype.addAriaCollapsedClass = function ($element, $trigger) {
      var openClass = 'is-open';
      var isOpen = $element.hasClass(openClass);

      $trigger.attr('aria-expanded', !isOpen);
      $element.toggleClass(openClass, !isOpen).attr('aria-expanded', !isOpen);
    };

    function Plugin(option) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data('onoffcanvas');
        var options = $.extend({}, OnoffCanvas.DEFAULTS, $this.data(), (typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object' && option);

        if (!data && options.toggle && /show|hide/.test(option)) {
          options.toggle = false;
        }
        if (!data) {
          $this.data('onoffcanvas', data = new OnoffCanvas(this, options));
        }
        if (typeof option === 'string') {
          data[option]();
        }
      });
    }

    var old = $.fn.onoffcanvas;

    $.fn.onoffcanvas = Plugin;
    $.fn.onoffcanvas.Constructor = OnoffCanvas;

    // CANVAS NO CONFLICT
    // ====================

    $.fn.onoffcanvas.noConflict = function () {
      $.fn.onoffcanvas = old;
      return this;
    };

    $(document).on('click.onoffcanvas.data-api', '[data-toggle="onoffcanvas"]', function (e) {
      var $this = $(this);

      if (!$this.attr('data-target')) {
        e.preventDefault();
      }

      var $target = getTargetFromTrigger($this);
      var data = $target.data('onoffcanvas');
      var option = data ? 'toggle' : $this.data();

      Plugin.call($target, option);
    });
  })(jQuery);
});