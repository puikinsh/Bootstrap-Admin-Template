#### **I'll be on sabbitical starting June 5, 2013 for approximately 2-3 months. So, sadly, I won't be able to fix any problems or add enhancements until I return; I will return :)**

#### 8/31/2013 update: *** sorry everyone, I'm going to be away a bit longer. At least another month and a half :( ***

---

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
* Also big thanks to [thezoggy](https://github.com/thezoggy) for helping with code, themes and providing valuable feedback.
* And, thanks to everyone else that has contributed, and continues to contribute to this forked project!

### Change Log

View the [complete listing here](https://github.com/Mottie/tablesorter/wiki/Change).

#### <a name="v2.10.8">Version 2.10.8</a> (6/3/2013)

* Updated the percent parser to only detect if the content is shorter than 15 characters. This prevents columns with a lot of content and one percent sign (%) from being set to be parsed as a percent numeric column. Fixes [issue #320](https://github.com/Mottie/tablesorter/issues/320).
* Updated filter widget &amp; filter_formatter:
  * Added a new `filter_defaultAttrib` which points to the default `'data-value'` attribute in the table header which will contain the filter's default (starting) value and *will override* any set values within the filter_formatter functions. Updated the [custom filter widget function demo age column](http://mottie.github.io/tablesorter/docs/example-widget-filter-custom.html) to show this in action.
  * The `$.tablesorter.setFilter()` method now properly updates the filter formatter elements when set.
  * The `uiDateCompare` and `uiDatepicker` functions now adds a time of 11:59:59 to the "to" date or when a "less than" comparison is made so as to include all times within that selected day.
  * The `defaultDate` option (not `date` option, sorry) of the `uiDateCompare` now properly sets the value upon initialization.
  * The `from` and `to` options of the `uiDatepicker` now properly sets those values properly upon initialization.
  * Fixes [issue #321](https://github.com/Mottie/tablesorter/issues/321).
* Fixed stickyHeaders widget:
  * When removing a sticky headers widget, it no longer unbinds scrolling when other sticky headers are still active.
  * Added `stickyHeaders_includeCaption` option (set as `true` by default). When this option is `false` and a caption exists, it will not be included in teh sticky header. Fixes [issue #322](https://github.com/Mottie/tablesorter/issues/322).

#### <a name="v2.10.7">Version 2.10.7</a> (5/31/2013)

* Now using correct `closest()` function equivalent. Thanks to [isuTony](https://github.com/isuTony); Fixes [issue #319](https://github.com/Mottie/tablesorter/issues/319).
* Anticipating my sabbitical, I've added a few "beta-testing" scripts into a new folder for feedback, code fixes and help:
    * [Custom pager control script](http://mottie.github.io/tablesorter/beta-testing/example-pager-custom-controls.html) - should be working properly.
    * [External filters using Select2 plugin](http://mottie.github.io/tablesorter/beta-testing/example-external-filters-using-select2.html) - should be working properly.
    * [Column reorder widget](http://mottie.github.io/tablesorter/beta-testing/example-widget-column-reorder.html) - not working 100% with sticky headers.
    * [Column sum widget](http://mottie.github.io/tablesorter/beta-testing/example-widget-sum-columns.html) - still needs LOTS of work!

#### <a name="v2.10.6">Version 2.10.6</a> (5/30/2013)

* Added `skipTest` options to the HTML5 filter formatter functions. Fixes [issue #307](https://github.com/Mottie/tablesorter/issues/307).

#### <a name="v2.10.5">Version 2.10.5</a> (5/30/2013)

* Filter formatter functions now works properly within sticky headers. Fixes issues [#290](https://github.com/Mottie/tablesorter/issues/290) &amp; [#317](https://github.com/Mottie/tablesorter/issues/317).

#### <a name="v2.10.4">Version 2.10.4</a> (5/28/2013)

* Added `stickyHeadersInit` event, which is triggered on the table after the sticky headers widget has completed initializing.
* Filtering child rows should now work properly; [fixes #306](https://github.com/Mottie/tablesorter/issues/306).

#### <a name="v2.10.3">Version 2.10.3</a> (5/27/2013)

* Updated pager `pageSize` method to properly store the set page size; [fixes #287](https://github.com/Mottie/tablesorter/issues/287).

#### <a name="v2.10.2">Version 2.10.2</a> (5/27/2013)

* The minified scripts are now updated =/.

#### <a name="v2.10.1">Version 2.10.1</a> (5/27/2013)

* Core fixes
  * Fixed `updateAll` function to properly refresh the widgets.
  * Added keyboard accessibility
      * Header cells can now be accessed using the tab key and sorted by pressing enter when they have "focus".
      * Thanks to [debugwand](https://github.com/debugwand) for sharing the code!

* Filter widget updates:
  * Added `filter_onlyAvail` option
      * Updated main &amp; filter demo page docs.
      * Updated [custom filter demo](http://mottie.github.io/tablesorter/docs/example-widget-filter-custom.html) (see the Discount column).
      * Fixes [issue #292](https://github.com/Mottie/tablesorter/issues/292).
      * Thanks to [The Sin-](https://github.com/TheSin-) for sharing the idea and code!
  * Added `compare` option to various filter formatter functions
      * This addition was made to the "uiSpinner", "uiSlider", "html5Range", "html5Number" and the new "uiDateCompare" functions
      * So, for example the html5Number function can be set up as follows:

          ```js
          filter_formatter : {
            0: function($cell, indx) {
              return $.tablesorter.filterFormatter.html5Number( $cell, indx, {
                value: 1,
                min: 1,
                max: 100,
                delay: true,
                addToggle: false,
                exactMatch: false,
                compare: '>='
              })
            }
          }
          ```

          now the number type input will allow filtering rows with values greater than or equal to the selected value.

      * Thanks to [The Sin-](https://github.com/TheSin-) for sharing the idea and code in [issue #304](https://github.com/Mottie/tablesorter/issues/304).
  * The jQuery UI Datepicker range filter formatter code has been updated:
      * Use the new `uiDateCompare` filter formatter for one input comparisons, or use this `uiDatepicker` update to do comparisons within the two inputs.
      * The two input now functions so that when the "to" input is empty, all dates greater than the "from" date are shown.
      * If the "from" input is empty, all dates less than the "to" input date are shown.
      * Added options `textFrom` (default is `from`) and `textTo` (default is `to`) to allow changing the text label language.
  * Modified the logical "or" search such that it tries to find an exact match for each "or". For example:
      * If `"1|2|3"` is entered into the filter, only column cells that exactly match `1`, `2`, or `3` will be visible.
      * If `"Mike|Br|John"` is entered, only cells with `Mike`, `Br` and `John` will be visible. If you want to include `Bruce`, then use a wild card: `"Mike|Br*|John"`.
      * To only match content using the logical "or" search, simply add the class name `filter-match` to the header cell, then `"1|2|3"` will show cells with `1`, `11`, `12`, etc.
      * Updated the [basic filter widget demo](http://mottie.github.io/tablesorter/docs/example-widget-filter.html) to include a "filter-match" column toggle.
  * Fixed javascript error from improper reference to the "dateFormat". Fixes [issue #306](https://github.com/Mottie/tablesorter/issues/306).
  * Fixed `$.tablesorter.getFilters()` and `$.tablesorter.setFilters()` functions to work properly when the `filter_columnFilters` option is `false` (do not build filter row).
  * Fixed filter widget numeric range error introduces in v2.10.0. Sorry =(.
  * Fixed filter search delay issue, again. =(
  * Fixed filter widget data comparisons, so now you can type in the filter something like `> 1/1/2010` (using the same date format as the column).
  * Filter search input placeholders can now be set using jQuery data:
      * Previously, only a data attribute could contain the filter placeholder text `data-placeholder="Enter something..."`
      * Another method using script can now be used: `$('.tablesorter th:eq(0)').data('placeholder', 'Enter something...');` (where `eq()` contains a zero-based index of the column).
  * Optimized filter queries to search already filtered rows if the previous search is contained within the current search. Fulfills part of [issue #313](https://github.com/Mottie/tablesorter/issues/313).
  * Added a caution note in the filter widget (basic) demo stating the issue with Chrome not rendering search input text properly when previously hidden.
      * For now, I set the `filter_hideFilters` option to `false` until the source of this problem is determined.
      * Check out [this demo](http://jsfiddle.net/Mottie/Mjbab/1/) to see the issue (in Chrome); but I think I'm the only one seeing it.
* Updated the `$.tablesorter.storage()` function
  * The update is to checking for localStorage browser support.
  * It should now work properly in iOS with private browsing protection.
  * Check out [this great summary](https://gist.github.com/paulirish/5558557) of [Modernizr](http://modernizr.com/) updates by Paul Irish.
* Documentation fixes
  * Removed `console.log` from the documentation script. Fixes [issue #309](https://github.com/Mottie/tablesorter/issues/309).
  * Updated all `<button>` elements in the documentation to include a type (`<button type="button">`) to prevent IE from triggering a form submit. Fixes [issue #285](https://github.com/Mottie/tablesorter/issues/285#issuecomment-17991235).

#### <a name="v2.10">Version 2.10</a> (5/8/2013)

* Core changes:
  * Fixed/updated content selection &amp; form interaction in both headers and sticky headers.
  * Added missing `sortBegin` event when the `sorton` method is used. YAY for unit testing!
  * Fixed digit and currency parsers not returning appropriately formatted text, when encountered. Another point for unit testing! :P

* Added a public function `$.tablesorter.addHeaderResizeEvent`
  * This function exists within the `jquery.tablesorter.widgets.js` file.
  * There is no built-in resize event for non-window elements, so when this function is active it triggers a `resize` event when the header cell changes size.
  * Enable the triggering of header cell resize events as follows:

     ```js
     var table = $('table')[0],
         disable = false,
         options = {
           timer : 250 // header cell size is checked every 250 milliseconds (1/4 of a second)
         };
     $.tablesorter.addHeaderResizeEvent( table, disable, options );
     ```

  * To disable resize event triggering:

     ```js
     var table = $('table')[0];
     $.tablesorter.addHeaderResizeEvent( table, true );
     ```

* Filter widget updates:
  * Triggered filter searches now properly update the filter column inputs. See [issue #146](https://github.com/Mottie/tablesorter/issues/146).
  * Added disabled filter styling to the Bootstrap theme. Thanks to [riker09](https://github.com/riker09) ([issue #283](https://github.com/Mottie/tablesorter/pull/283)).
  * Fixed `filter_liveSearch` option to properly work in non-webkit browsers. See [issue #285](https://github.com/Mottie/tablesorter/issues/285).
  * Modified `filter_liveSearch` to allow adding a numeric value to the option, this sets a character threshold which triggers the search when met. Fulfills [issue #286](https://github.com/Mottie/tablesorter/issues/286).
  * Fixed select dropdowns within the sticky header now work properly. Fixes [issue #288](https://github.com/Mottie/tablesorter/issues/288).
  * Added a method to allow properly parsed dates to be comparible using `<`, `<=`, `>`, `>=` and date ranges. Fulfills [issue #302](https://github.com/Mottie/tablesorter/issues/302).
  * Added `filter_filteredRow` option which contains the class name added to each visible filtered row. Used by the pager to properly count filtered rows.
  * Fixed a problem with `filter_searchDelay` which was broken in v2.9.0. Opps, sorry!
  * Minor tweaks to the filter formatter file to allow elements in multiple tables (removed some IDs). More fixing needed!

* Sticky Headers widget:
  * Fixed/updated content selection &amp; form interaction in both headers and sticky headers. Fixes [issue #57](https://github.com/Mottie/tablesorter/issues/57).
  * Fixed an issue with content resizing the table, but not the sticky header.
      * Added `stickyHeaders_addResizeEvent` option to enable this updating.
      * This option uses the new `$.tablesorter.addHeaderResizeEvent` function.
      * Fixes [issue #289](https://github.com/Mottie/tablesorter/issues/289).
  * Added `stickyHeaders_offset` option
      * This option sets the point where the sticky header locks while scrolling. Allowing space for sticky navigation bars, etc.
      * This option accepts:
          * pixel value: `stickyHeaders_offset: 20`
          * jQuery selector: `stickyHeaders_offset: '.navbar-fixed-top`
          * jQuery object: `stickyHeaders_offset: $('.navbar-fixed-top')`
      * Fullfills feature request [#294](https://github.com/Mottie/tablesorter/issues/294).

* Pager addon updates:
  * Controls are now cached internally.
      * `table.config.pager.$container` now stores the jQuery object targeted by the pager `container` option.
      * `table.config.pager.$goto` stores the jQuery object targeted by `cssGoto`.
      * `table.config.pager.$size` stores the jQuery object targeted by `cssPageSize`.
  * Page size selectors should now update properly when the `pageSet` or `pageSize` methods are used.
  * The pager should now properly target the *first sortable* tbody (it will skip any "info-only" tbodies).
  * Fixed `pagerComplete` callback firing more than once while sorting or filtering. Fixes [issue #291](https://github.com/Mottie/tablesorter/issues/291).
  * Fixed pager not updating when the filter widget reveals zero matches. Fixes [issue #297](https://github.com/Mottie/tablesorter/issues/297).
  * The pager ajax function now does better error handling.
  * Updated the pager ajax error displayed row; including updating all themes.
  * Added `ajaxObject` option:
      * You can now customize how the pager plugin interacts performs its ajax functioning.
      * Modify the `ajaxObject` to include any of the [ajax settings](http://api.jquery.com/jQuery.ajax/#jQuery-ajax-settings):

          ```js
          ajaxObject: {
            dataType: 'json'
          }
          ```

      * The only option that gets overwritten is the `url` option. It is set by the `ajaxUrl` and `customAjaxUrl` options.
      * Fulfills [issue #280](https://github.com/Mottie/tablesorter/pull/280).
  
  * Updated `ajaxProcessing` to now make returning rows optional, or it can now accept the rows as a jQuery object instead of an array. The addon triggers an "update" event internally, so no need to include that.
      * Return a jQuery object

          ```js
          ajaxProcessing: function(data, table){
            if (data && data.hasOwnProperty('rows')) {
              var r, row, c, d = data.rows,
              // total number of rows (required)
              total = data.total_rows,
              // array of header names (optional)
              headers = data.headers,
              // all rows: array of arrays; each internal array has the table cell data for that row
              rows = '',
              // len should match pager set size (c.size)
              len = d.length;
              // this will depend on how the json is set up - see City0.json
              // rows
              for ( r=0; r < len; r++ ) {
                rows += '<tr class="ajax-row">'; // new row array
                // cells
                for ( c in d[r] ) {
                  if (typeof(c) === "string") {
                    rows += '<td>' + d[r][c] + '</td>'; // add each table cell data to row array
                  }
                }
                rows += '</tr>'; // add new row array to rows array
              }
              // don't attach the $(rows) because it's difficult to tell old from new data
              // and no need to trigger an update method, it's done internally
              return [ total, $(rows), headers ];
            }
          }
          ```

      * Build the table yourself (just return the total number of rows):

          ```js
          ajaxProcessing: function(data, table){
            if (data && data.hasOwnProperty('rows')) {
              var r, row, c, d = data.rows,
              // total number of rows (required)
              total = data.total_rows,
              // all rows: array of arrays; each internal array has the table cell data for that row
              rows = '',
              // len should match pager set size (c.size)
              len = d.length;
              // this will depend on how the json is set up - see City0.json
              // rows
              for ( r=0; r < len; r++ ) {
                rows += '<tr class="ajax-row">'; // new row array
                // cells
                for ( c in d[r] ) {
                  if (typeof(c) === "string") {
                    rows += '<td>' + d[r][c] + '</td>'; // add each table cell data to row array
                  }
                }
                rows += '</tr>'; // add new row array to rows array
              }
              // find first sortable tbody, then add new rows
              table.config.$tbodies.eq(0).html(rows);
              return [ total ];
            }
          }
          ```

* Tablesorter unit testing updates; tests for the following have been added:
  * `sortStart`, `sortBegin` &amp; `sortEnd` events.
  * `updateComplete` event.
  * empty cells: `emptyTo`, empty to `top`, `bottom` &amp; `zero`.
  * strings in numeric columns: `stringTo`, string to `max`, `min`, `top`, `bottom` &amp; `none`.
  * `sort` method
  * table class, table header class &amp; tbody info only class.

#### <a name="v2.9.1">Version 2.9.1</a> (4/13/2013)

* Modified `stickHeaders`:
  * Only visible cells within the sticky header will be adjusted
  * Fixes [issue #278](https://github.com/Mottie/tablesorter/issues/278).
  * Thanks to [Exinaus](https://github.com/Exinaus) for sharing his code!
  * This change doesn't fix the lag on a table with a lot of visible columns; I don't have an exact number where it will start lagging, but the one in issue #278 had 68 columns.

#### <a name="v2.9.0">Version 2.9.0</a> (4/12/2013)

* **Core changes**
  * Added a column sort method.
      * With this method, you can target a header column and trigger a sort:

          ```javascript
          $('table').find('th:eq(2)').trigger('sort');
          ```

      * This method will maintain the sorting order; so, if the column is already sorted in ascending order, this method will act as if you manually clicked on the header.
      * Whatever next sort order is applied is dependent on other option settings such as `initialSortOrder`, `lockedOrder` (set within the `headers`), `sortReset` option, `sortRestart` and will be ignored if the column sort is disabled (`sorter: false`).
      * Triggering a `click` on the header cell will not work as expected.

* **Widgets, general**
  * All of the current widgets within `jquery.tablesorter.widgets.js` and in the `js/widgets` directory use the newest addWidget template, and are **no longer compatible** with tablesorter versions older than 2.8!

* **Added widget priorities**
  * Basically when a widget is added, it can be assigned a priority number and applied in that order from lowest to highest.
  * The priority can be any number and can be thought of as similar to applying a z-index to an element in that multiple widgets can have the same priority.
  * This is needed in case a widget is applied to the table, but is dependent on another widget. For example:
      * The `uitheme` widget is the first to be applied (priority of `10`) because other widgets that copy/clone the table will need the jQuery UI/Bootstrap class names already applied to the table.
      * The sticky headers widget (priority `60`) is applied after the filter widget (priority `50`), so that it knows to update the filters within the sticky header.
  * Priorities are *optional*, and any widget applied without a priority value will automatically be assigned a priority of `10`.
  * Updated the [writing custom widgets](http://mottie.github.io/tablesorter/docs/example-widgets.html) demo to show how to add a widget priority.
  * I was planning on adding this in version 3.0, but the need arose sooner with the additions of all of the new widgets.

* **Updated Filter widget**
  * Fixed a bug that only occurred when using the filter widget with the pager plugin getting ajax data
      * The pager no longers repeatedly tries to get the first page of table content
      * Fixes [issue #270](https://github.com/Mottie/tablesorter/issues/270).
  * Fixed filter widget to correctly target the filter row cells.
  * The current filter row cells (`td`'s) are now saved to `table.config.$filters`.
  * Added a `filter_liveSearch` option:
      * If `true` (default), a search is performed while the user is typing, after a short delay.
      * If `false`, the user will have to press enter on the keyboard to initiate the search
  * Added a filter get method to work with the filter inputs
      * Use `$.tablesorter.getFilters( $('table') );` to get an array of the current filters applied to the table
  * Added a filter set method to work with the filter inputs
      * Use `$.tablesorter.setFilters( $('table'), ['abc', '1'] );` to set the first two filters values to "abc" and "1" respectively; but this does not initiate a search.
      * Use `$.tablesorter.setFilters( $('table'), ['abc', '1'], true );` to set the filters values and initiate a search.
      * The difference between `$.tablesorter.setFilters( $('table'), ['abc', '1'] );` and `$('table').trigger('search', [ ['abc', '1'] ]);` is that the `setFilters` method will update the actual filter inputs with the search query, whereas the triggered search will not.
      * If the `$('table')` does not target a table with a filter widget applied, it will return `false`.

* **Updated Resizable widget**
  * Added `resizable_addLastColumn` option which allows you to make the last column resizable, essentially making a non-full width table resizable.
  * Updated [the resizable demo](http://mottie.github.io/tablesorter/docs/example-widget-resizable.html) to show this option.
  * The resizable demo also now highlights the non-resizable "Age" column to make it more obvious.

* **Updated Sticky headers widget**
  * Added a `stickyHeaders_cloneId` option
      * This option is only used if the table has an ID defined, then the value from this option will be added to the end of the ID of the cloned sticky table.
      * Default value is `-sticky`.
      * Fixes [issue #271](https://github.com/Mottie/tablesorter/issues/271).
  * Fixed an issue with scrolling lag:
      * If the page had a large number of hidden tables (inside tabs), there would be a noticable delay while scrolling up.
      * Only visible tables are now monitored.
      * Fixes [issue #278](https://github.com/Mottie/tablesorter/issues/278).
  * This widget will now include the table caption in the sticky header:
      * Additional css was added to every theme to apply a background color to the caption, otherwise it would be transparent and content could then be seen to scroll behind it.

          ```css
          caption { background: #fff; }
          ```

      * This fullfills the enhancement request in [issue #126](https://github.com/Mottie/tablesorter/issues/126).
  * This widget will now include the filter row in the sticky header:
      * The filter row is duplicated, so searches within either filter row will update the content of the other filter row.
      * This fullfills the enhancement request in [issue #249](https://github.com/Mottie/tablesorter/issues/249).
  * Removed the processing icon from the sticky header (reported via email).

* **Added a content editable widget**
  * Added a widget to enable content editing of the table (using the contenteditable attribute), by column.
  * It has four options, used as follows:

      ```javascript
      $('table.tablesorter').tablesorter({
        widgets: ['editable'],
        widgetOptions: {
          editable_columns       : [0,1,2],  // array that points to the columns to make editable (zero-based index)
          editable_enterToAccept : true,     // press enter to accept content, or click outside if false
          editable_autoResort    : false,    // auto resort after the content has changed.
          editable_noEdit        : 'no-edit' // class name of cell that is no editable
        }
      });
      ```

  * Make a table cell uneditable by added the class `no-edit`, set in the `editable_noEdit` option.
  * Added a [content editable widget demo](http://mottie.github.io/tablesorter/docs/example-widget-editable.html).

* **Added Repeat headers widget**
  * This widget has always been the example used in the [Writing custom widgets](http://mottie.github.io/tablesorter/docs/example-widgets.html) demo.
  * It has been updated and now follows the same format as the widget template for tablesorter version 2.9+
  * As written, it will no longer work with tablesorter versions older than 2.8.
  * Only one option for this widget is available:

      ```javascript
      $('table.tablesorter').tablesorter({
        widgets: ['zebra', 'scroller'],
        widgetOptions : {
          rowsToSkip : 4 // number of rows to show between the repeated headers
        }
      });
      ```

* **Added Scroller widget**
  * This widget is a modified version of the scroller widget made by Tim Connell ([original demo](http://tconnell.com/samples/scroller/))
  * It has four options, used as follows:

      ```javascript
      $('table.tablesorter').tablesorter({
        widgets: ['zebra', 'scroller'],
        widgetOptions : {
          scroller_height       : 300,  // height of scroll window
          scroller_barWidth     : 17,   // scroll bar width
          scroller_jumpToHeader : true, // header snap to browser top when scrolling the tbody
          scroller_idPrefix     : 's_'  // cloned thead id prefix (random number added to end)
        }
      });
      ```

  * Added a [scroller widget demo](http://mottie.github.io/tablesorter/docs/example-widget-scroller.html).

* **Updated Pager Plugin**
  * Added all pager plugin options within the [widget options table](http://mottie.github.io/tablesorter/docs/index.html#Widget-options) on the main documentation page.
  * Added a better example of how to use the `customAjaxUrl` function.
  * Updated the `{page}` tag used withing the `ajaxUrl` option:
      * Previously `{page}` was replaced with a zero-based index of the targetted page number, now this format can also be used `{page+1}`.
      * A tag of `{page+1}` will be replaced with the targetted page number plus one, making it a one-based index.
      * Actually any number can be added, or subtracted, from the page number using this format: `{page+2}`, `{page-1}`, `{page+10}`, etc.
  * The `List` portion of the `{sortList:col}` and `{filterList:fcol}` tag are now optional:
      * These tags are used within the `ajaxUrl` option.
      * So, `{sort:col}` and `{filter:fcol}` can now be used. It just seems clearer/cleaner to me.
  * The pager's `ajaxProcessing` function is now more flexible
      * When returning the processed ajax data, it was required to return it in this form: `[ total, rows, headers ]`.
      * With this update, you can now also return the data as `[ rows, total, headers ]`.
      * If your database is dynamic and doesn't have a total, then you can just give it a really big number &amp; disable the "last" page button. The only reason the plugin needs the `total` is to calculate the total pages and to know what number to set when the user clicks on the last page button.

* **General documentation cleanup &amp; updates**
  * Grouping widget corrections
  * Updated the [repeat headers widget](http://mottie.github.io/tablesorter/docs/example-widgets.html) to use the newest widget template.

#### <a name="v2.8.2">Version 2.8.2</a> (3/28/2013)

* Updated the "ignore-leads" parser:
  * Renamed the parser to "ignore-articles"
  * Added language support and a few languages
  * Added a method to add custom articles.
  * Please see the [updated demo](http://mottie.github.io/tablesorter/docs/example-parsers-ignore-articles.html) (also renamed)
  * Thanks for [thezoggy](https://github.com/thezoggy) for feedback.
* Fixed a bug in the grouping widget demo:
  * The "priority (letter)" column was incorrectly parsing the data which, for some reason, worked in some browsers.
  * Thanks again to [thezoggy](https://github.com/thezoggy) for reporting [this issue](https://github.com/Mottie/tablesorter/issues/267).
