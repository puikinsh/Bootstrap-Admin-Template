/*!
 * custom pager controls - beta testing
  initialize custom pager script BEFORE initializing tablesorter/tablesorter pager
  custom pager looks like this:
  1 | 2 … 5 | 6 | 7 … 99 | 100
    _       _   _        _     adjacentSpacer
        _           _          distanceSpacer
  _____               ________ ends (2 default)
          _________            aroundCurrent (1 default)

 */
/*jshint browser:true, jquery:true, unused:false, loopfunc:true */
/*global jQuery: false */

;(function($){
"use strict";

$.tablesorter = $.tablesorter || {};

$.tablesorter.customPagerControls = function(settings) {
	var defaults = {
		table          : 'table',
		pager          : '.pager',
		pageSize       : '.left a',
		currentPage    : '.right a',
		ends           : 2,                        // number of pages to show of either end
		aroundCurrent  : 1,                        // number of pages surrounding the current page
		link           : '<a href="#">{page}</a>', // page element; use {page} to include the page number
		currentClass   : 'current',                // current page class name
		adjacentSpacer : ' | ',                    // spacer for page numbers next to each other
		distanceSpacer : ' &#133; ',               // spacer for page numbers away from each other (ellipsis)
		addKeyboard    : true                      // add left/right keyboard arrows to change current page
	},
	options = $.extend({}, defaults, settings),
	$table = $(options.table);

	$table
		.on('pagerInitialized pagerComplete', function (e, c) {
			var indx, pages = $('<div/>'), pageArray = [],
			cur = c.page + 1,
			start = cur > 1 ? (c.totalPages - cur < options.aroundCurrent ? -(options.aroundCurrent + 1) + (c.totalPages - cur) : -options.aroundCurrent) : 0,
			end = cur < options.aroundCurrent + 1 ? options.aroundCurrent + 3 - cur : options.aroundCurrent + 1;
			for (indx = start; indx < end; indx++) {
				if (cur + indx >= 1 && cur + indx < c.totalPages) { pageArray.push( cur + indx ); }
			}
			// include first and last pages (ends) in the pagination
			for (indx = 0; indx < options.ends; indx++){
				if ($.inArray(indx + 1, pageArray) === -1) { pageArray.push(indx + 1); }
				if ($.inArray(c.totalPages - indx, pageArray) === -1) { pageArray.push(c.totalPages - indx); }
			}
			// sort the list
			pageArray = pageArray.sort(function(a, b){ return a - b; });
			// make links and spacers
			$.each(pageArray, function(indx, value){
				pages
					.append( $(options.link.replace(/\{page\}/g, value)).toggleClass(options.currentClass, value === cur).attr('data-page', value) )
					.append( '<span>' + (indx < pageArray.length - 1 && ( pageArray[ indx + 1 ] - 1 !== value ) ? options.distanceSpacer :
						( indx >= pageArray.length - 1 ? '' : options.adjacentSpacer )) + '</span>' );
			});
			$('.pagecount').html(pages.html());
		});

	// set up pager controls
	$(options.pager).find(options.pageSize).on('click', function () {
		$(this)
		.addClass(options.currentClass)
		.siblings()
		.removeClass(options.currentClass);
		$table.trigger('pageSize', $(this).html());
		return false;
	}).end()
	.on('click', options.currentPage, function(){
		$(this)
		.addClass(options.currentClass)
		.siblings()
		.removeClass(options.currentClass);
		$table.trigger('pageSet', $(this).attr('data-page'));
		return false;
	});

	// make right/left arrow keys work
	if (options.addKeyboard) {
		$(document).on('keydown', function(events){
			// ignore arrows inside form elements
			if (/input|select|textarea/i.test(events.target.tagName)) { return; }
			if (events.which === 37) {
				// left
				$(options.pager).find(options.currentPage).filter('.' + options.currentClass).prevAll(':not(span):first').click();
			} else if (events.which === 39) {
				// right
				$(options.pager).find(options.currentPage).filter('.' + options.currentClass).nextAll(':not(span):first').click();
			}
		});
	}
};
})(jQuery);