tablesorter is a jQuery plugin for turning a standard HTML table with THEAD and TBODY tags into a sortable table without page refreshes.
tablesorter can successfully parse and sort many types of data including linked data in a cell.

### [Documentation](http://mottie.github.io/tablesorter/docs/)

* See the [full documentation](http://mottie.github.io/tablesorter/docs/).
* All of the [original document pages](http://tablesorter.com/docs/) have been included.
* Information from my blog post on [undocumented options](http://wowmotty.blogspot.com/2011/06/jquery-tablesorter-missing-docs.html) and lots of new demos have also been included.
* Change log moved from included text file into the [wiki documentation](https://github.com/Mottie/tablesorter/wiki/Change).

### Demos

* [Basic alpha-numeric sort Demo](http://mottie.github.com/tablesorter/).
* Links to demo pages can be found within the main [documentation](http://mottie.github.io/tablesorter/docs/).
* More demos & playgrounds - updated in the [wiki pages](https://github.com/Mottie/tablesorter/wiki).

### Features

* Multi-column alphanumeric sorting.
* Multi-tbody sorting - see the [options](http://mottie.github.io/tablesorter/docs/index.html#options) table on the main document page.
* Parsers for sorting text, alphanumeric text, URIs, integers, currency, floats, IP addresses, dates (ISO, long and short formats) &amp; time. [Add your own easily](http://mottie.github.io/tablesorter/docs/example-parsers.html).
* Support for ROWSPAN and COLSPAN on TH elements.
* Support secondary "hidden" sorting (e.g., maintain alphabetical sort when sorting on other criteria).
* Extensibility via [widget system](http://mottie.github.io/tablesorter/docs/example-widgets.html).
* Cross-browser: IE 6.0+, FF 2+, Safari 2.0+, Opera 9.0+.
* Small code size.
* Works with jQuery 1.2.6+ (jQuery 1.4.1+ needed with some widgets).
* Works with jQuery 1.9+ ($.browser.msie was removed; needed in the original version).

### Licensing

* Copyright (c) 2007 Christian Bach.
* Original examples and docs at: [http://tablesorter.com](http://tablesorter.com).
* Dual licensed under the [MIT](http://www.opensource.org/licenses/mit-license.php) and [GPL](http://www.gnu.org/licenses/gpl.html) licenses.

### Special Thanks

* Big shout-out to [Nick Craver](https://github.com/NickCraver) for getting rid of the `eval()` function that was previously needed for multi-column sorting.
* Big thanks to [thezoggy](https://github.com/thezoggy) for helping with code, themes and providing valuable feedback.
* Big thanks to [ThsSin-](https://github.com/TheSin-) for taking over for a while and also providing valuable feedback.
* Also extra thanks to [christhomas](https://github.com/christhomas) and [Lynesth](https://github.com/Lynesth) for help with code.
* And, of course thanks to everyone else that has contributed, and continues to contribute to this forked project!

### Change Log

View the [complete listing here](https://github.com/Mottie/tablesorter/wiki/Change).

#### <a name="v2.14.5">Version 2.14.5</a> (12/16/2013)

* Pager
  * Fix pager update when ajax returns no rows. Fixes [issue #456](https://github.com/Mottie/tablesorter/issues/456).
  * Add pager `processAjaxOnInit` option. Fixes [issue #424](https://github.com/Mottie/tablesorter/issues/424).
  * Fix &amp; document inconsistentcies in pager triggered event parameters.
  * Disable pager arrows &amp; show zero in display when `totalPages` is zero. Fixes [issue #460](https://github.com/Mottie/tablesorter/issues/460).
  * Filter row is now included in sticky header while using the pager. Fixes [issue #449](https://github.com/Mottie/tablesorter/issues/449).
  * Lots of thanks to [Lynesth](https://github.com/Lynesth) for sharing code fixes :)
* Fix `stickyHeaders_attachTo` no positioning correctly. See [issue #295](https://github.com/Mottie/tablesorter/issues/295).

#### <a name="v2.14.4">Version 2.14.4</a> (12/14/2013)

* Add Bootstrap 2 theme. Thanks to [themilkman](https://github.com/themilkman).
* The `addRows` method now works with an empty table. Fixes [issue #450](https://github.com/Mottie/tablesorter/issues/450).
* Sticky headers widget
  * Add `stickyHeaders_attachTo` option. Fixes issues [#295](https://github.com/Mottie/tablesorter/issues/295) &amp; [#314](https://github.com/Mottie/tablesorter/issues/314).
  * Add `cssStickyHeaders_attachTo` option. Fixes [issue #453](https://github.com/Mottie/tablesorter/issues/453).
  * Added padding to wrapper in demo so Chrome doesn't add a horizontal scroll bar
* Filter widget
  * Fix forced search to work again (i.e. `$('table').trigger('search', false);`)
  * Fix child row filtering - see [this Stackoverflow question](http://stackoverflow.com/q/20342203/145346)
* Pager
  * The pager will update properly when ajax returns no rows. Fixes [issue #456](https://github.com/Mottie/tablesorter/issues/456)
  * Filter searches will now reset pager to the first page. Fixes [issue #456](https://github.com/Mottie/tablesorter/issues/456)
  * The pager will now properly count filtered rows when including/excluding child rows. Fixes [this Stackoverflow question](http://stackoverflow.com/q/20342203/145346).
  * The table cache will once again update after an ajax call. Fixes issues [#436](https://github.com/Mottie/tablesorter/issues/436) &amp; [#437](https://github.com/Mottie/tablesorter/issues/437).

#### <a name="v2.14.3">Version 2.14.3</a> (12/2/2013)

* Core
  * Refreshing widgets now only applies to previously installed widgets. Fixes [issue #442](https://github.com/Mottie/tablesorter/issues/442).
* Pager
  * Ajax arrays now accept html instead of cell contents, e.g. `<td class="red">- 10</td>`. Thanks [@christhomas](https://github.com/christhomas); fixes [issue #434](https://github.com/Mottie/tablesorter/pull/434).
  * Add ajax counter to only allow the most recent request to process. Thanks [@christhomas](https://github.com/christhomas); fixes [issue #443](https://github.com/Mottie/tablesorter/pull/443).
  * When filtering rows, the output will now show zeros for row &amp; page counts instead of empty strings.
  * No more `fixedHeight` pager errors. Thanks [@hempel](https://github.com/hempel); fixes [issue #448](https://github.com/Mottie/tablesorter/issues/448).
* Filter widget
  * Exact filter matches now properly override other queries. Fixes [issue #441](https://github.com/Mottie/tablesorter/issues/441).
  * Reverse range `20 - 10` work properly, again. See [issue #441](https://github.com/Mottie/tablesorter/issues/441).
  * Updated docs to show the filter precendence. See [footnote (2) under Notes](http://mottie.github.io/tablesorter/docs/example-widget-filter.html).
* Sticky Headers widget
  * Now uses the filter widget `bindSearch` function allowing live search, delayed searching and escape to cancel on sticky header filters.
  * Thanks to [@haraldkrischner](https://github.com/haraldkrischner) for his help!
  * Fixes issues [#439](https://github.com/Mottie/tablesorter/issues/439) &amp; [#440](https://github.com/Mottie/tablesorter/pull/440).
* CSS Sticky Headers widget (beta)
  * Now works properly in IE9+.
  * Thanks [@gakreol](https://github.com/gakreol)
  * Fixes [issue #447](https://github.com/Mottie/tablesorter/issues/447).
* Added Semantic version sorting demo
  * See the [demo here](http://mottie.github.io/tablesorter/docs/example-option-textsorter-semver.html).
  * This demo does not use a custom parser nor widget, it requires a modified [`semver.js` for node](https://github.com/isaacs/node-semver) file to sort the column using the `textSorter` option.
  * The modified `semver-mod.js` file is contained within the new "extras" folder (tablesorter/js/extras) along with the original unmodified `semver.js` file.
  * Extra code is also included to highlight invalid semantic versions within the table.
  * Fixes [issue #395](https://github.com/Mottie/tablesorter/issues/395).
* Sorry I didn't get around to finding solutions for some of the other issues that I promised to have done this patch :(

#### <a name="v2.14.2">Version 2.14.2</a> (11/25/2013)

* Removed Bootstrap filter cell background color. Fixes [issue #425](https://github.com/Mottie/tablesorter/issues/425).
* Added css sticky header widget (beta)
  * This widget uses [css3 transforms](http://caniuse.com/#search=transform) to make the table header sticky. It's a bit jumpy in Chrome, but works well in other tested browsers.
  * This widget doesn't appear to work in IE10, but it should... it will not work in IE8 and older.
  * See [issue #429](https://github.com/Mottie/tablesorter/issues/429) for more information.
* Stop repeat filter widget searches. Fixes [issue #431](https://github.com/Mottie/tablesorter/issues/431).
* Prevent filter error. Fixes [issue #432](https://github.com/Mottie/tablesorter/issues/432).
* Merged in and reverted [issue #433](https://github.com/Mottie/tablesorter/issues/433).
* Editable widget
  * Updated docs with missing `editable_editComplete` callback event name option.
  * Modified the `editable_columns` option to allow setting a column range string, e.g. `"2-4"` instead of creating an array (`[2,3,4]`).
  * Fixes [issue #435](https://github.com/Mottie/tablesorter/issues/435).
* Grouping widget
  * Invalid group class now fails silently.
  * Fixes [issue #438](https://github.com/Mottie/tablesorter/issues/438).

#### <a name="v2.14.1">Version 2.14.1</a> (11/22/2013)

* Filter widget
  * External inputs bound using the filter `bindSearch` function now clear on the "filterReset" event.
  * Replace `Array.indexOf()` due to IE8.
* Pager (plugin &amp; widget)
  * Replace `Array.indexOf()` due to IE8. Fixes [issue #388](https://github.com/Mottie/tablesorter/issues/388).
* Themes
  * Non-sortables headers now show the default cursor
  * Fix Dropbox theme to work properly within the sticky header demo
  * Fix Ice theme to include a top border in the sticky header demo
  * Tweaked sticky header widget to better align columns in Firefox &amp; adjust caption to hide border edges.
  * See the [sticky header demo](http://mottie.github.io/tablesorter/docs/example-widget-sticky-header.html) to see these changes.
  * Fixes [#407](https://github.com/Mottie/tablesorter/issues/407).
* Documentation
  * Update FAQ page to include information on the zebra widget not always working.
  * Update demos to use Bootstrap 3.0.2.
  * Add search instructions to the wiki documentation pages.
  * Add link to FAQ &amp; search instructions on the main documenation page.
* Add associated core version number to pager addon &amp; widget, main widget file and filter formatter file.

#### <a name="v2.14.0">Version 2.14.0</a> (11/19/2013)

**Core**
* Changed sorting algorithms:
  * Due to problems with sorting multiple columns improperly sorting algorithms again include code to sort empty cells.
  * Internal sorting again has separate ascending and descending functions; but the previous `$.tablesorter.sortNatural` (ascending only), `$.tablesorter.sortNumeric` (ascending only) and `$.tablesorter.sortText` (ascending only) functions are still available.
  * Custom text &amp; numeric sort functions, added via `textSorter` and `numberSorter` options now require you to return the sort in the correct direction.
  * Custom sort functions no longer have empty cells automatically handled for you.
  * Fixes [issue #419](https://github.com/Mottie/tablesorter/issues/419).
* Added `sortStable` option which when `true` will sort exactly equal items by placing them in their original unsorted order (or, perform a [stable sort](http://en.wikipedia.org/wiki/Stable_sort#Stability)).
* Removed double icon class names.
* Added `tabIndex` option
  * When `true`, a tabindex is added to the headers for keyboard accessibility; this was previously always applied
  * When `false`, table headers will not be included when tabbing through the page
  * Fulfills [issue #415](https://github.com/Mottie/tablesorter/issues/415).

**Filter widget**
* Setting a filter to build a select no longer causes an error. Fixes [issue #421](https://github.com/Mottie/tablesorter/issues/421).
* Added `filter_saveFilters` option
  * When `true`, this option saves the current filters using the storage utility (local storage with cookie fallback).
  * This option is set to `false` by default.
  * See [issue #388](https://github.com/Mottie/tablesorter/issues/388).
* Allow multiple external filter inputs
  * The `$.tablesorter.filter.bindSearch( $table, $external )` function now allows binding searches using the built-in functioning.
  * The bind search function will unbind any previously bound `keyup` and `search` event listeners on the `$external` elements.
  * External inputs must not have a `tablesorter-filter` class to distinguish them from internal filters.
  * If not using the `filter_anyMatch` option, external filters can be set to target specific columns by including a `data-column` attribute.
  * See the new [filter external inputs demo](http://mottie.github.io/tablesorter/docs/example-widget-filter-external-inputs.html).
* Filter reset button clicks will again trigger a `filterReset` event. Fixes [issue #423](https://github.com/Mottie/tablesorter/issues/423).

**Grouping widget**
* Merged in fix for grouping widget + filter widget + child row widget.
  * Updated demo with multi-child column styling.
  * Thanks [Xamamule](https://github.com/Xamamule) in [pull #414](https://github.com/Mottie/tablesorter/pull/414)!
  * This also fixes [issue #422](https://github.com/Mottie/tablesorter/issues/422).
* Renamed variables &amp; cleanup
* Added `group_dateString` function to format the date string for `group-date` header class name.

**Zebra widget**
* Now skips removable rows added by other widgets, more specifically, it skips rows with a `remove-me` class name (set by the `selectorRemove` option).

**Docs updates**
* Added a side menu with search to the main document page.
  * The main documentation page now uses Bootstrap for some styles.
  * Search includes a count with clear search, previous result and next result buttons.
  * Search options included to find letters or whole words only, and choose if the search is case sensitive, or not.
  * The advantage of this search over the browser's built-in search (Ctrl-F) is that this search will find text within the hidden content
  * Indexing of the search results may not always be in order, i.e. "10/10" may not always be the lowest result on the page due to nested elements.
  * Sorry, IE7 and older users, the search works but but is really slow. And the side menu styling leaves much to be desired (using Bootstrap).
* jQuery UI theme selector updates. See [issue #407](https://github.com/Mottie/tablesorter/issues/407).
* Updated typos &amp; css in various demos
* Added Utility options section for options used by parsers, storage utility and pager ajax data.
* Added removed options section.
  * This applies to pager options available in the original version of tablesorter which are no longer supported.
  * Fixes [issue #416](https://github.com/Mottie/tablesorter/issues/416).
* Added `kbd` styling for better visualization of keyboard keys.

**Other**
* Renamed variables within the [pager custom control demo](http://mottie.github.io/tablesorter/beta-testing/example-pager-custom-controls.html) (still in beta)
* Renamed variables within default widgets file
  * Utilities: storage, addHeaderResizeEvent,, resizableReset
  * Widgets: columns, resizable, stickyHeaders, uitheme, saveSort
* Updated parser-date-two-digit-year.js to allow changing the date range
  * Set a different date range by adding a value to `table.config.dateRange`.
  * Instructions added to main documents under utility options
* Storage utility (`$.tablesorter.storage`) now accepts a jQuery object as well as a DOM object of the table
  * `$.tablesorter.storage( $('#mytable'), 'myvariable', 'YAY' );`, or
  * `$.tablesorter.storage( $('#mytable')[0], 'myvariable', 'YAY' );`
