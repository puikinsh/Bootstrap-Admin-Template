/**
 * bootstrap-admin-template - Free Admin Template Based On Twitter Bootstrap 3.x
 * @version 3.0.0-alpha
 * @license MIT
 * @link https://github.com/puikinsh/Bootstrap-Admin-Template
 */

(function () {
  'use strict';

  class MetisBase {
    constructor() {
      this.buttonPressedEvent = "click";
    }
    getViewportHeight() {
      const docElement = document.documentElement;
      const client = docElement.clientHeight;
      const inner = window.innerHeight;

      return client < inner ? inner : client;
    }

    getViewportWidth() {
      const docElement = document.documentElement;
      const client = docElement.clientWidth;
      const inner = window.innerWidth;

      return client < inner ? inner : client;
    }
  }
  window.Metis = new MetisBase();

  Metis.navBar = () => {
    return new Error("Metis.navBar() is removed.");
  };

  /* eslint-disable promise/prefer-await-to-then */

  const methodMap = [
  	[
  		'requestFullscreen',
  		'exitFullscreen',
  		'fullscreenElement',
  		'fullscreenEnabled',
  		'fullscreenchange',
  		'fullscreenerror',
  	],
  	// New WebKit
  	[
  		'webkitRequestFullscreen',
  		'webkitExitFullscreen',
  		'webkitFullscreenElement',
  		'webkitFullscreenEnabled',
  		'webkitfullscreenchange',
  		'webkitfullscreenerror',

  	],
  	// Old WebKit
  	[
  		'webkitRequestFullScreen',
  		'webkitCancelFullScreen',
  		'webkitCurrentFullScreenElement',
  		'webkitCancelFullScreen',
  		'webkitfullscreenchange',
  		'webkitfullscreenerror',

  	],
  	[
  		'mozRequestFullScreen',
  		'mozCancelFullScreen',
  		'mozFullScreenElement',
  		'mozFullScreenEnabled',
  		'mozfullscreenchange',
  		'mozfullscreenerror',
  	],
  	[
  		'msRequestFullscreen',
  		'msExitFullscreen',
  		'msFullscreenElement',
  		'msFullscreenEnabled',
  		'MSFullscreenChange',
  		'MSFullscreenError',
  	],
  ];

  const nativeAPI = (() => {
  	const unprefixedMethods = methodMap[0];
  	const returnValue = {};

  	for (const methodList of methodMap) {
  		const exitFullscreenMethod = methodList?.[1];
  		if (exitFullscreenMethod in document) {
  			for (const [index, method] of methodList.entries()) {
  				returnValue[unprefixedMethods[index]] = method;
  			}

  			return returnValue;
  		}
  	}

  	return false;
  })();

  const eventNameMap = {
  	change: nativeAPI.fullscreenchange,
  	error: nativeAPI.fullscreenerror,
  };

  // eslint-disable-next-line import/no-mutable-exports
  let screenfull = {
  	// eslint-disable-next-line default-param-last
  	request(element = document.documentElement, options) {
  		return new Promise((resolve, reject) => {
  			const onFullScreenEntered = () => {
  				screenfull.off('change', onFullScreenEntered);
  				resolve();
  			};

  			screenfull.on('change', onFullScreenEntered);

  			const returnPromise = element[nativeAPI.requestFullscreen](options);

  			if (returnPromise instanceof Promise) {
  				returnPromise.then(onFullScreenEntered).catch(reject);
  			}
  		});
  	},
  	exit() {
  		return new Promise((resolve, reject) => {
  			if (!screenfull.isFullscreen) {
  				resolve();
  				return;
  			}

  			const onFullScreenExit = () => {
  				screenfull.off('change', onFullScreenExit);
  				resolve();
  			};

  			screenfull.on('change', onFullScreenExit);

  			const returnPromise = document[nativeAPI.exitFullscreen]();

  			if (returnPromise instanceof Promise) {
  				returnPromise.then(onFullScreenExit).catch(reject);
  			}
  		});
  	},
  	toggle(element, options) {
  		return screenfull.isFullscreen ? screenfull.exit() : screenfull.request(element, options);
  	},
  	onchange(callback) {
  		screenfull.on('change', callback);
  	},
  	onerror(callback) {
  		screenfull.on('error', callback);
  	},
  	on(event, callback) {
  		const eventName = eventNameMap[event];
  		if (eventName) {
  			document.addEventListener(eventName, callback, false);
  		}
  	},
  	off(event, callback) {
  		const eventName = eventNameMap[event];
  		if (eventName) {
  			document.removeEventListener(eventName, callback, false);
  		}
  	},
  	raw: nativeAPI,
  };

  Object.defineProperties(screenfull, {
  	isFullscreen: {
  		get: () => Boolean(document[nativeAPI.fullscreenElement]),
  	},
  	element: {
  		enumerable: true,
  		get: () => document[nativeAPI.fullscreenElement] ?? undefined,
  	},
  	isEnabled: {
  		enumerable: true,
  		// Coerce to boolean in case of old WebKit.
  		get: () => Boolean(document[nativeAPI.fullscreenEnabled]),
  	},
  });

  if (!nativeAPI) {
  	screenfull = {isEnabled: false};
  }

  var screenfull$1 = screenfull;

  // Define toggleFullScreen
  Metis.toggleFullScreen = () => {
    if (!screenfull$1.isEnabled) {
      return false;
    }
    const toggleFullScreen = document.getElementById("toggleFullScreen");
    toggleFullScreen?.addEventListener(Metis.buttonPressedEvent, () => {
      screenfull$1.toggle(document.documentElement);
    });
  };

  // Define boxFullScreen
  Metis.boxFullScreen = () => {
    if (!screenfull$1.isEnabled) {
      return false;
    }
    const triggers = document.querySelectorAll(".full-box");
    [...triggers].map((trigger) => {
      const i = trigger.querySelector("i.bi-fullscreen");
      trigger.addEventListener("click", (e) => {
        screenfull$1.toggle(trigger.closest(".box"));
        i?.classList.toggle("bi-fullscreen");
        i?.classList.toggle("bi-fullscreen-exit");
      });
    });
  };
  (function ($, Metis) {
    Metis.panelBodyCollapse = function () {
      var $collapseButton = $(".collapse-box"),
        $collapsedPanelBody = $collapseButton.closest(".box").children(".body");

      $collapsedPanelBody.collapse("show");

      $collapseButton.on(Metis.buttonPressedEvent, function (e) {
        var $collapsePanelBody = $(this).closest(".box").children(".body"),
          $toggleButtonImage = $(this).children("i");
        $collapsePanelBody.on("show.bs.collapse", function () {
          $toggleButtonImage
            .removeClass("fa-minus fa-plus")
            .addClass("fa-spinner fa-spin");
        });
        $collapsePanelBody.on("shown.bs.collapse", function () {
          $toggleButtonImage
            .removeClass("fa-spinner fa-spin")
            .addClass("fa-minus");
        });

        $collapsePanelBody.on("hide.bs.collapse", function () {
          $toggleButtonImage
            .removeClass("fa-minus fa-plus")
            .addClass("fa-spinner fa-spin");
        });

        $collapsePanelBody.on("hidden.bs.collapse", function () {
          $toggleButtonImage
            .removeClass("fa-spinner fa-spin")
            .addClass("fa-plus");
        });

        $collapsePanelBody.collapse("toggle");

        e.preventDefault();
      });
    };
    Metis.boxHiding = function () {
      $(".close-box").on(Metis.buttonPressedEvent, function () {
        $(this).closest(".box").hide("slow");
      });
    };
    return Metis;
  })(jQuery, Metis || {});

  (function($, Metis) {
      var $body = $('body'),
          $leftToggle = $('.toggle-left');

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

  (function($) {
     $(document).ready(function() {
      
      $('[data-toggle="tooltip"]').tooltip();
   
      $('#menu').metisMenu();
      Metis.navBar();
      Metis.metisAnimatePanel();
      Metis.toggleFullScreen();
      Metis.boxFullScreen();
      Metis.panelBodyCollapse();
      Metis.boxHiding();   
    });
  })(jQuery);

})();
