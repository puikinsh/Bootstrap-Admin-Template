/* jQuery Highlight plugin
 * Based on highlight v3 by Johann Burkard
 * http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html
 * Copyright (c) 2009 Bartek Szopka
 * Licensed under MIT license.
 * Modified to require a minimum number of characters before searching
 */
;jQuery.extend({highlight:function(a,c,b,d,f){if(3===a.nodeType){if(c=a.data.match(c))return b=document.createElement(b||"span"),b.className=d||"highlight",a=a.splitText(c.index),a.splitText(c[0].length),d=a.cloneNode(!0),b.appendChild(d),a.parentNode.replaceChild(b,a),1}else if(1===a.nodeType&&a.childNodes&&!/(script|style)/i.test(a.tagName)&&1>$(a).closest(f).length&&(a.tagName!==b.toUpperCase()||a.className!==d))for(var e=0;e<a.childNodes.length;e++)e+=jQuery.highlight(a.childNodes[e],c,b,d,f); return 0}});jQuery.fn.unhighlight=function(a){var c={className:"highlight",element:"span"};jQuery.extend(c,a);return this.find(c.element+"."+c.className).each(function(){var a=this.parentNode;a.replaceChild(this.firstChild,this);a.normalize()}).end()}; jQuery.fn.highlight=function(a,c){var b={className:"highlight",element:"span",caseSensitive:!1,wordsOnly:!1,ignore:"",min:3,error:">= 3",message:function(a){console&&console.log&&console.log(a)}},b=jQuery.extend(b,c);a.constructor===String&&(a=0<a.indexOf(",")?a.replace(/\s+/g," ").split(/\s*,\s*/g):[a]);a=jQuery.grep(a,function(a){return""!==a});if(a.join("").length<b.min)return b.message&&b.message(b.error||""),!1;a=jQuery.map(a,function(a){return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")}); if(0===a.length)return this;var d=b.caseSensitive?"":"i",f="("+a.join("|")+")";b.wordsOnly&&(f="\\b"+f+"\\b");var e=RegExp(f,d);return this.each(function(){jQuery.highlight(this,e,b.element,b.className,b.ignore)})};

/* tipsy, facebook style tooltips for jquery
 * version 1.0.0a
 * (c) 2008-2010 jason frame [jason@onehackoranother.com]
 * released under the MIT license
 * Modified to use themes: https://github.com/Mottie/tipsy
 */
(function(b){function l(a,c){this.$element=b(a);this.options=c;this.enabled=!0;this.fixTitle()}l.prototype={show:function(){var a=this.getTitle();if(a&&this.enabled){var c=this.tip(),d=this.options.theme[0]||"black",f=this.options.theme[1]||"white",g;c.find(".tipsy-inner").css({background:d,color:f})[this.options.html?"html":"text"](a);c[0].className="tipsy";c.remove().css({top:0,left:0,visibility:"hidden",display:"block"}).prependTo(document.body);var a=b.extend({},this.$element.offset(),{width:this.$element[0].offsetWidth, height:this.$element[0].offsetHeight}),f=c[0].offsetWidth,h=c[0].offsetHeight,e="function"==typeof this.options.gravity?this.options.gravity.call(this.$element[0]):this.options.gravity,k;switch(e.charAt(0)){case "n":k={top:a.top+a.height+this.options.offset,left:a.left+a.width/2-f/2};g={"border-bottom-color":d};break;case "s":k={top:a.top-h-this.options.offset,left:a.left+a.width/2-f/2};g={"border-top-color":d};break;case "e":k={top:a.top+a.height/2-h/2,left:a.left-f-this.options.offset};g={"border-left-color":d}; break;case "w":k={top:a.top+a.height/2-h/2,left:a.left+a.width+this.options.offset},g={"border-right-color":d}}2==e.length&&("w"==e.charAt(1)?k.left=a.left+a.width/2-15:k.left=a.left+a.width/2-f+15);c.css(k).addClass("tipsy-"+e);c.find(".tipsy-arrow").css(g)[0].className="tipsy-arrow tipsy-arrow-"+e.charAt(0);this.options.className&&c.addClass("function"==typeof this.options.className?this.options.className.call(this.$element[0]):this.options.className);this.options.fade?c.stop().css({opacity:0,display:"block", visibility:"visible"}).animate({opacity:this.options.opacity}):c.css({visibility:"visible",opacity:this.options.opacity})}},hide:function(){this.options.fade?this.tip().stop().fadeOut(function(){b(this).remove()}):this.tip().remove()},fixTitle:function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("original-title"))&&a.attr("original-title",a.attr("title")||"").removeAttr("title")},getTitle:function(){var a,b=this.$element,d=this.options;this.fixTitle();d=this.options;"string"== typeof d.title?a=b.attr("title"==d.title?"original-title":d.title):"function"==typeof d.title&&(a=d.title.call(b[0]));return(a=(""+a).replace(/(^\s*|\s*$)/,""))||d.fallback},tip:function(){this.$tip||(this.$tip=b('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>'));return this.$tip},validate:function(){this.$element[0].parentNode||(this.hide(),this.options=this.$element=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},toggleEnabled:function(){this.enabled= !this.enabled}};b.fn.tipsy=function(a){function c(e){var c=b.data(e,"tipsy");c||(c=new l(e,b.fn.tipsy.elementOptions(e,a)),b.data(e,"tipsy",c));return c}function d(){var b=c(this);b.hoverState="in";0==a.delayIn?b.show():(b.fixTitle(),setTimeout(function(){"in"==b.hoverState&&b.show()},a.delayIn))}function f(){var b=c(this);b.hoverState="out";0==a.delayOut?b.hide():setTimeout(function(){"out"==b.hoverState&&b.hide()},a.delayOut)}if(!0===a)return this.data("tipsy");if("string"==typeof a){var g=this.data("tipsy"); if(g)g[a]();return this}a=b.extend({},b.fn.tipsy.defaults,a);a.live||this.each(function(){c(this)});if("manual"!=a.trigger){var g=a.live?"live":"bind",h="hover"==a.trigger?"mouseleave":"blur";this[g]("hover"==a.trigger?"mouseenter":"focus",d)[g](h,f)}return this};b.fn.tipsy.defaults={className:null,delayIn:0,delayOut:0,fade:!1,fallback:"",gravity:"n",html:!1,live:!1,offset:0,opacity:0.8,title:"title",theme:["black","white"],trigger:"hover"};b.fn.tipsy.elementOptions=function(a,c){return b.metadata? b.extend({},c,b(a).metadata()):c};b.fn.tipsy.autoNS=function(){return b(this).offset().top>b(document).scrollTop()+b(window).height()/2?"s":"n"};b.fn.tipsy.autoWE=function(){return b(this).offset().left>b(document).scrollLeft()+b(window).width()/2?"e":"w"};b.fn.tipsy.autoBounds=function(a,c){return function(){var d=c[0],f=1<c.length?c[1]:!1,g=b(document).scrollTop()+a,h=b(document).scrollLeft()+a,e=b(this);e.offset().top<g&&(d="n");e.offset().left<h&&(f="w");b(window).width()+b(document).scrollLeft()- e.offset().left<a&&(f="e");b(window).height()+b(document).scrollTop()-e.offset().top<a&&(d="s");return d+(f?f:"")}}})(jQuery);

/*!
query-string
Parse and stringify URL query strings
https://github.com/sindresorhus/query-string
by Sindre Sorhus
MIT License
*/
(function(){var b={parse:function(a){return"string"!==typeof a?{}:(a=a.trim().replace(/^\?/,""))?a.trim().split("&").reduce(function(a,b){var c=b.replace(/\+/g," ").split("=");a[c[0]]=void 0===c[1]?null:decodeURIComponent(c[1]);return a},{}):{}},stringify:function(a){return a?Object.keys(a).map(function(b){return encodeURIComponent(b)+"="+encodeURIComponent(a[b])}).join("&"):""}};"undefined"!==typeof module&&module.exports?module.exports=b:window.queryString=b})();

/* page search */
/*jshint browser:true, jquery:true */
/*global queryString:false */
jQuery(function($){
	// $("body p").highlight(["jQuery", "highlight", "plugin"]);
	var resultsLength, searching,
		search = window.location.search,
		$results = [],
		index = 0,
		$window = $(window),
		$main = $('#main'),
		$search = $('.search').val(''), // Firefox retains the input value
		$status = $('.status'),
		$word = $('#word'),
		$case = $('#cstrue'), // case sensitive
		updateStatus = function(){
			var value = $search.val();
			$status.empty().removeClass('busy');
			if (resultsLength) {
				$results.removeClass('selected').eq(index).addClass('selected');
			}
			if (value !== '') {
				$status
					.html( (resultsLength === 0 ? 0 : index + 1) + '/' + resultsLength )
					.toggleClass('label label-danger', resultsLength === 0);
				message(
					resultsLength > 0 ? '' :
					value.length > 2 ? 'No results' : 'Please enter three or more letters'
				);
			} else {
				message('');
			}
		},
		message = function(text){
			$status
				.attr('original-title', text)
				.tipsy( text === '' ? 'hide' : 'show' );
			// make sure the result count doesn't cover the search text
			$search.css('padding-right', $status.width() + 5);
		},
		jumpTo = function(){
			if (resultsLength) {
				var resultPosition, parentPosition,
					$current = $results.eq(index),
					$collapsible = $current.closest('.collapsible, tr[id]');
				if ($collapsible.length && $collapsible.is(':hidden')) {
					$collapsible.slideToggle();
				}
				if ($current.length) {
					resultPosition = $current.position().top;
					parentPosition = $collapsible.length ? $current.closest('tr[id]').position().top : resultPosition;
					if (parentPosition + $(window).height() < resultPosition) {
						parentPosition = resultPosition;
					}
					$window.scrollTop( parentPosition - 28 );
				}
			}
			updateStatus();
		},
		applySearch = function(){
			searching = queryString.parse(search);
			if (searching.q) {
				$('#main-nav-check').prop('checked', true);
				$search
					.val( searching.q )
					// make searching.index a zero-based index
					.trigger('change', [ isNaN(searching.index) ? 0 : parseInt(searching.index, 10) - 1 ]);
			}
		};

	// make sure defaults are set
	$('#word, #csfalse').click();

	$search
	// needed for IE
	.on('keyup', function(e){
		if (e.which === 13) {
			$(this).trigger('change');
		}
	})
	.add('#word, #letter, #cstrue, #csfalse').on('change', function(event, newIndex){
		index = newIndex || 0;
		$status.addClass('busy');
		setTimeout(function(){
			$main
				.unhighlight()
				.highlight( $search.val(), {
					ignore:'thead',
					wordsOnly: $word.is(':checked'),
					caseSensitive: $case.is(':checked')
				});
			$results = $('.highlight');
			resultsLength = $results.length;
			if (index > resultsLength) {
				index = resultsLength - 1;
			}
			jumpTo();
		}, 1);
	});
	$('.search-prev, .search-next').click(function(){
		if (resultsLength) {
			index = index + ($(this).hasClass('search-prev') ? -1 : 1);
			if (index < 0) { index = resultsLength - 1; }
			if (index > resultsLength - 1) { index = 0; }
			jumpTo();
		}
	});
	$('.search-clear').click(function(){
		$search.val('').change();
		updateStatus();
	});
	$main.on('click', '.highlight', function(){
		index = $results.index(this);
		updateStatus();
	});

	$('.tooltip-bottom').tipsy({ gravity: 'n' });
	$('.tooltip-top').tipsy({ gravity: 's' });
	$('.tooltip-edge-left').tipsy({ gravity: 'nw' });
	$('.tooltip-edge-right').tipsy({ gravity: 'ne' });
	$('.tooltip-right').tipsy({ gravity: 'w' });
	$('.status').tipsy({
		gravity: 's',
		opacity: 1,
		theme: [ '#d9534f', 'white' ]
	});

	// search on load
	// ?q=array&index=10
	if (search) {
		applySearch();
	}

});