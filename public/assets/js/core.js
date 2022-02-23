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
    const triggers = document.querySelectorAll(".card-fs-toggle");
    [...triggers].map((trigger) => {
      const i = trigger.querySelector("i.bi-fullscreen");
      trigger.addEventListener("click", (e) => {
        screenfull$1.toggle(trigger.closest(".card"));
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

  /*!
  * metismenujs - v1.3.1
  * MetisMenu: Collapsible menu plugin with Vanilla-JS
  * https://github.com/onokumus/metismenujs#readme
  *
  * Made by Osman Nuri Okumus <onokumus@gmail.com> (https://github.com/onokumus)
  * Under MIT License
  */
  const Default = {
      parentTrigger: 'li',
      subMenu: 'ul',
      toggle: true,
      triggerElement: 'a',
  };
  const ClassName = {
      ACTIVE: 'mm-active',
      COLLAPSE: 'mm-collapse',
      COLLAPSED: 'mm-collapsed',
      COLLAPSING: 'mm-collapsing',
      METIS: 'metismenu',
      SHOW: 'mm-show',
  };

  /* eslint-disable max-len */
  class MetisMenu {
      /**
       * Creates an instance of MetisMenu.
       *
       * @constructor
       * @param {Element | string} element
       * @param {IMMOptions} [options]
       * @memberof MetisMenu
       */
      constructor(element, options) {
          this.element = MetisMenu.isElement(element) ? element : document.querySelector(element);
          this.config = Object.assign(Object.assign({}, Default), options);
          this.disposed = false;
          this.triggerArr = [];
          this.init();
      }
      static attach(el, opt) {
          return new MetisMenu(el, opt);
      }
      init() {
          const { METIS, ACTIVE, COLLAPSE } = ClassName;
          this.element.classList.add(METIS);
          [].slice.call(this.element.querySelectorAll(this.config.subMenu)).forEach((ul) => {
              ul.classList.add(COLLAPSE);
              const li = ul.closest(this.config.parentTrigger);
              if (li === null || li === void 0 ? void 0 : li.classList.contains(ACTIVE)) {
                  this.show(ul);
              }
              else {
                  this.hide(ul);
              }
              const a = li === null || li === void 0 ? void 0 : li.querySelector(this.config.triggerElement);
              if ((a === null || a === void 0 ? void 0 : a.getAttribute('aria-disabled')) === 'true') {
                  return;
              }
              a === null || a === void 0 ? void 0 : a.setAttribute('aria-expanded', 'false');
              a === null || a === void 0 ? void 0 : a.addEventListener('click', this.clickEvent.bind(this));
              this.triggerArr.push(a);
          });
      }
      clickEvent(evt) {
          if (!this.disposed) {
              const target = evt === null || evt === void 0 ? void 0 : evt.currentTarget;
              if (target && target.tagName === 'A') {
                  evt.preventDefault();
              }
              const li = target.closest(this.config.parentTrigger);
              const ul = li === null || li === void 0 ? void 0 : li.querySelector(this.config.subMenu);
              this.toggle(ul);
          }
      }
      update() {
          this.disposed = false;
          this.init();
      }
      dispose() {
          this.triggerArr.forEach((arr) => {
              arr.removeEventListener('click', this.clickEvent.bind(this));
          });
          this.disposed = true;
      }
      on(evtType, handler, options) {
          this.element.addEventListener(evtType, handler, options);
          return this;
      }
      off(evtType, handler, options) {
          this.element.removeEventListener(evtType, handler, options);
          return this;
      }
      emit(evtType, evtData, shouldBubble = false) {
          const evt = new CustomEvent(evtType, {
              bubbles: shouldBubble,
              detail: evtData,
          });
          this.element.dispatchEvent(evt);
      }
      toggle(ul) {
          const li = ul.closest(this.config.parentTrigger);
          if (li === null || li === void 0 ? void 0 : li.classList.contains(ClassName.ACTIVE)) {
              this.hide(ul);
          }
          else {
              this.show(ul);
          }
      }
      show(el) {
          var _a;
          const ul = el;
          const { ACTIVE, COLLAPSE, COLLAPSED, COLLAPSING, SHOW, } = ClassName;
          if (this.isTransitioning || ul.classList.contains(COLLAPSING)) {
              return;
          }
          const complete = () => {
              ul.classList.remove(COLLAPSING);
              ul.style.height = '';
              ul.removeEventListener('transitionend', complete);
              this.setTransitioning(false);
              this.emit('shown.metisMenu', {
                  shownElement: ul,
              });
          };
          const li = ul.closest(this.config.parentTrigger);
          li === null || li === void 0 ? void 0 : li.classList.add(ACTIVE);
          const a = li === null || li === void 0 ? void 0 : li.querySelector(this.config.triggerElement);
          a === null || a === void 0 ? void 0 : a.setAttribute('aria-expanded', 'true');
          a === null || a === void 0 ? void 0 : a.classList.remove(COLLAPSED);
          ul.style.height = '0px';
          ul.classList.remove(COLLAPSE);
          ul.classList.remove(SHOW);
          ul.classList.add(COLLAPSING);
          const eleParentSiblins = [].slice
              .call((_a = li === null || li === void 0 ? void 0 : li.parentNode) === null || _a === void 0 ? void 0 : _a.children)
              .filter((c) => c !== li);
          if (this.config.toggle && eleParentSiblins.length > 0) {
              eleParentSiblins.forEach((sibli) => {
                  const sibUl = sibli.querySelector(this.config.subMenu);
                  if (sibUl) {
                      this.hide(sibUl);
                  }
              });
          }
          this.setTransitioning(true);
          ul.classList.add(COLLAPSE);
          ul.classList.add(SHOW);
          ul.style.height = `${ul.scrollHeight}px`;
          this.emit('show.metisMenu', {
              showElement: ul,
          });
          ul.addEventListener('transitionend', complete);
      }
      hide(el) {
          const { ACTIVE, COLLAPSE, COLLAPSED, COLLAPSING, SHOW, } = ClassName;
          const ul = el;
          if (this.isTransitioning || !ul.classList.contains(SHOW)) {
              return;
          }
          this.emit('hide.metisMenu', {
              hideElement: ul,
          });
          const li = ul.closest(this.config.parentTrigger);
          li === null || li === void 0 ? void 0 : li.classList.remove(ACTIVE);
          const complete = () => {
              ul.classList.remove(COLLAPSING);
              ul.classList.add(COLLAPSE);
              ul.style.height = '';
              ul.removeEventListener('transitionend', complete);
              this.setTransitioning(false);
              this.emit('hidden.metisMenu', {
                  hiddenElement: ul,
              });
          };
          ul.style.height = `${ul.getBoundingClientRect().height}px`;
          ul.style.height = `${ul.offsetHeight}px`;
          ul.classList.add(COLLAPSING);
          ul.classList.remove(COLLAPSE);
          ul.classList.remove(SHOW);
          this.setTransitioning(true);
          ul.addEventListener('transitionend', complete);
          ul.style.height = '0px';
          const a = li === null || li === void 0 ? void 0 : li.querySelector(this.config.triggerElement);
          a === null || a === void 0 ? void 0 : a.setAttribute('aria-expanded', 'false');
          a === null || a === void 0 ? void 0 : a.classList.add(COLLAPSED);
      }
      setTransitioning(isTransitioning) {
          this.isTransitioning = isTransitioning;
      }
      static isElement(element) {
          return Boolean(element.classList);
      }
  }

  Metis.SideMenu = () => {
    const sideMenu = document.getElementById("menu");
    if (sideMenu) {
      new MetisMenu(sideMenu);
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    Metis.SideMenu();
    Metis.navBar();
    Metis.metisAnimatePanel();
    Metis.toggleFullScreen();
    Metis.boxFullScreen();
    Metis.panelBodyCollapse();
    Metis.boxHiding();
  });

})();
