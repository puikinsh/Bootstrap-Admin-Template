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
* And, of course thanks to everyone else that has contributed, and continues to contribute to this forked project!

### Change Log

View the [complete listing here](https://github.com/Mottie/tablesorter/wiki/Change).

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
x* Added `kbd` styling for better visualization of keyboard keys.

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

#### <a name="v2.13.3">Version 2.13.3</a> (11/9/2013)

* Pager (plugin/widget)
  * Fixed initial filter settings when using pager ajax. Fixes [issue #388](https://github.com/Mottie/tablesorter/issues/388).
  * Fixed ajax pager not recognizing column sorting. Fixes [issue #408](https://github.com/Mottie/tablesorter/issues/408).
  * The core plugin now remove rows from table when using pager ajax. Fixes [issue #411](https://github.com/Mottie/tablesorter/issues/411).

* Filter widget
  * Renamed all variables &amp; restructured the entire widget.
  * Added better integration with the pager plugin/widget to minimize ajax server calls by getting default filter settings. Fixes [issue #388](https://github.com/Mottie/tablesorter/issues/388).
  * Fixed filter formatter HTML5 spinner to properly find exact matches.
  * Added a new fuzzy search parameter
    * Fuzzy searches match sequential characters, similar to how Sublime Text searches work
    * Start the search with a tilde `~` followed by any sequential characters to match.
    * Examples: `~bee` will match both "Bruce Lee" and "Brenda Lee", `~bcd` will find "Brandon Clark" and `~piano` will find "Philip Aaron Wong"
  * Added `filter_anyMatch`
    * Set this option to `true` when using an external search filter.
    * Setting this option should work properly with or without the column filters. The only issue you would have is if you triggered a search on the table using an array with undefined or null array values.
    * Some limitations are applied when using any match. Search operators, range queries and not-matches are not allowed.
    * See [the demo](http://mottie.github.io/tablesorter/docs/example-widget-filter-any-match.html) for examples &amp; more details.
    * Thanks to [@prainho](https://github.com/prainho) for the suggestion, code and feedback in [issue #405](https://github.com/Mottie/tablesorter/issues/405)!
  * Modified the `bindSearch` function to allow using it on external filters:
    * Use as follows: `$.tablesorter.filter.bindSearch( $('table'), $('.search') );`
    * Binding the search input using this method allows the search to use `filter_liveSearch`, delayed searching and pressing escape to clear the search.
    * See the [filter any match demo](http://mottie.github.io/tablesorter/docs/example-widget-filter-any-match.html) for example usage.

* UITheme widget
  * Added caption styling
  * Updated css for jQuery UI theme and Bootstrap theme.

* Theme, demo &amp; doc updates
  * Added jQuery UI theme switcher to [jQuery UI theme demo](http://mottie.github.io/tablesorter/docs/example-widget-ui-theme.html) &amp; [jQuery UI filter formatter demo](http://mottie.github.io/tablesorter/docs/example-widget-filter-formatter-1.html).
  * Added ignore articles parser to [saveSort widget demo](http://mottie.github.io/tablesorter/docs/example-widget-savesort.html).
  * Updated history of changes made to `cssAsc`, `cssDesc` &amp; `cssHeader` on the main documentation page. See [issue #407](https://github.com/Mottie/tablesorter/issues/407).

#### <a name="v2.13.2">Version 2.13.2</a> (11/2/2013)

* Updated pager &amp; filter widget to work when the pager `countChildRows` option is `true`:
  * Filter widget now properly added a "filtered" class to child rows
  * Pager plugin & widget now properly calculate a correct total number of rows
  * See [issue #396](https://github.com/Mottie/tablesorter/issues/396).
* Updated editable widget to target table cell children if they exist
  * This fixes the issue in IE where making a table element contenteditable is not allowed.
  * See [issue #404](https://github.com/Mottie/tablesorter/issues/404) for further details.

#### <a name="v2.13.1">Version 2.13.1</a> (10/31/2013)

* Fixed filter widget issues
  * filter indexing will now be correct, even if a "tablesorter-filter" input/select doesn't exist in the filter row
  * Already parsed filters (filter-formatter) will not attempt to reparse the value; problem was caused by parsed dates.

#### <a name="v2.13">Version 2.13</a> (10/30/2013)

* Added a "Development" branch to the repository.
  * I have started development on version 3 of tablesorter and this branch will have a basic structure to allow modularization of tablesorter.
  * So far, only the tablesorter core has been restructured and reorganized.
  * Added basic Zepto support to the core and some basic widgets, this is a work-in-progress. See [issue #398](https://github.com/Mottie/tablesorter/issues/398).

* Ensure resized headers have stored data, or provide a fallback. Fixes [issue #394](https://github.com/Mottie/tablesorter/issues/394).
* Added pager `countChildRows` option (plugin &amp; widget)
  * When `true`, the pager treats child rows as if it were a parent row and strictly enforces showing only the set number of pager rows.
  * This can cause problems as a child row may not appear associated with its parent, may be split across pages or possibly distort the table layout if the parent or child row contain row or cell spans.
  * When `false` the pager always includes the child row with its parent, ignoring the set pager size.
  * See [issue #396](https://github.com/Mottie/tablesorter/issues/396).
* Removed triggered change event to fix [issue #400](https://github.com/Mottie/tablesorter/issues/400).
* Merged in filter formatter fix for jQuery UI dateFormat conflict; [pull #403](https://github.com/Mottie/tablesorter/pull/403). Thanks @Craga89!

* Grouping widget update
  * Added `group_separator` option which is used when a `group-separator-#` class name is applied
  * Updated [grouping widget demo](http://mottie.github.io/tablesorter/docs/example-widget-grouping.html).
* Added a file-type parser
  * Optimally used with the grouping widget to sort similar file types (e.g. video extensions: .mp4, .avi, .mov, etc)
  * [File type sorting demo](http://mottie.github.io/tablesorter/docs/example-parsers-file-type.html) added.
* Updated LESS theme to work properly with LESS 4.1+
* Other changes
  * Improved `formatFloat()` replace method.
  * Sorting a zero hex value (`0x00`) is now possible.
