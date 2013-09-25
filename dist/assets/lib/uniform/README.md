Uniform
=======

Sexy form elements with jQuery. Now with HTML5 attributes!

Version 2.1.1

Works well with jQuery 1.6+, but we've received patches and heard that this works with jQuery 1.3.

Licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php)


Installation
------------

Installation of Uniform is quite simple. First, make sure you have jQuery installed. Then you’ll want to link to the jquery.uniform.js file and uniform.default.css in the head area of your page.  Here's what your `<head>` tag contents should probably contain:

    <!-- Make sure your CSS file is listed before jQuery -->
	<link rel="stylesheet" href="uniform.default.css" media="screen" />
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js"></script>
	<script src="jquery.uniform.js"></script>

This relies upon a copy of jquery.uniform.js, uniform.default.css and the various images all being available on your webserver.


Basic usage
-----------

Using Uniform is easy. Simply tell it what elements to style:

	// Style all <select> elements
	$("select").uniform();

To "uniform" all possible form elements, just do something like this.  Things that can't get styled appropriately will be skipped by Uniform.

	// Style everything
	$("select, input, a.button, button").uniform();

You can exclude elements too by using more jQuery selectors or methods:

	// Avoid styling some elements
	$("select").not(".skip_these").uniform();  // Method 1
	$('select[class!="skip_these"]').uniform();  // Method 2

A complete set of tags in the HEAD section of your site can therefore look like this:

    <!-- Make sure your CSS file is listed before jQuery -->
	<link rel="stylesheet" href="uniform.default.css" media="screen" />
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js"></script>
	<script src="jquery.uniform.js"></script>
	<script type='text/javascript'>
		// On load, style typical form elements
		$(function () {
			$("select, input, button").uniform();
		});
	</script>


Extra parameters
----------------

You can pass in extra parameters to control certain aspects of Uniform. To pass in parameters, use syntax like what is seen here.  This only changes the settings for the elements that are actually uniformed in this particular call.

    $("select").uniform({
      param1: value,
      param2: value,
      param3: value
    });

There is a separate listing of global defaults.  You access them by using the `defaults` property.  *Note: This property name changed in v2.0.*

    $.uniform.defaults.checkedClass = "uniformCheckedClass";
	$.uniform.defaults.fileBtnHtml = "Pick a file";

Uniform v1.x had a bug where setting values in the call to `.uniform()` also potentially reset the defaults and redrew other uniformed objects with new settings.  As of version 2.0.0 the global defaults are now completely separate from the settings passed to every `.uniform()` call.  Extra parameters defined when instantiating Uniform are not global and can't be recalled from `$.uniform.defaults` later.

### activeClass (string)

*Default:* "active"

Sets the class given to elements when they are active (pressed).

    $("select").uniform({activeClass: 'myActiveClass'});

### autoHide (boolean)

*Default:* true

If this option is set to true, Uniform will hide the new elements if the existing elements are currently hidden using `display: none`.

If you want to show a select or checkbox you'll need to show the new Uniform div instead of the child element.

### buttonClass (string)

*Default:* "button"

Sets the class given to a button that's been Uniformed

    $("input[type=button]").uniform({buttonClass: 'myBtnClass'});

### checkboxClass (string)

*Default:* "checker"

Sets the class given to the wrapper div for checkbox elements.

    $(":checkbox").uniform({checkboxClass: 'myCheckClass'});

### checkedClass (string)

*Default:* "checked"

Sets the class given to elements when they are checked (radios and checkboxes).

    $(":radio, :checkbox").uniform({checkedClass: 'myCheckedClass'});

### disabledClass (string)

*Default:* "disabled"

Sets the class given to elements when they are disabled.

    $("select").uniform({disabledClass: 'myDisabledClass'});

### eventNamespace (string)

*Default:* ".uniform"

Binds events using this namespace with jQuery.  Useful if you want to unbind them later.  Shouldn't probably need to be changed unless it conflicts with other code.

    $("select").uniform({eventNamespace: '.uniformEvents'});

### fileButtonClass (string)

*Default:* "action"

Sets the class given to div inside a file upload container that acts as the "Choose file" button.

    $(":file").uniform({fileButtonClass: 'myFileBtnClass'});

### fileButtonHtml (string)

*Default:* "Choose File"

Sets the text written on the action button inside a file upload input.

    $(":file").uniform({fileButtonHtml: 'Choose &hellip;'});

### fileClass (string)

*Default:* "uploader"

Sets the class given to the wrapper div for file upload elements.

    $(":file").uniform({fileClass: 'myFileClass'});

### fileDefaultHtml (string)

*Default:* "No file selected"

Sets the text written in the filename div of a file upload input when there is no file selected.

    $(":file").uniform({fileDefaultHtml: 'Select a file please'});

### filenameClass (string)

*Default:* "filename"

Sets the class given to div inside a file upload container that spits out the filename.

    $(":file").uniform({filenameClass: 'myFilenameClass'});

### focusClass (string)

*Default:* "focus"

Sets the class given to elements when they are focused.

    $("select").uniform({focusClass: 'myFocusClass'});

### hoverClass (string)

*Default:* "hover"

Sets the class given to elements when they are currently hovered.

    $("select").uniform({hoverClass: 'myHoverClass'});

### idPrefix (string)

*Default:* "uniform"

If useID is set to true, this string is prefixed to element ID’s and attached to the container div of each Uniformed element. If you have a checkbox with the ID of "remember-me" the container div would have the ID "uniform-remember-me".

    $("select").uniform({idPrefix: 'container'});

### inputAddTypeAsClass (boolean)

*Default:* true

When true, `<input>` elements will get a class applied that is equal to their "type" attribute.

    $("input").uniform({inputAddTypeAsClass: true});

### inputClass (string)

*Default:* "uniform-input"

Applies this class to all input elements when they get uniformed.

    $("input").uniform({inputClass: "inputElement"});

### radioClass (string)

*Default:* "radio"

Sets the class given to the wrapper div for radio elements.

    $(":radio").uniform({radioClass: 'myRadioClass'});

### resetDefaultHtml (string)

*Default:* "Reset"

This text is what's shown on form reset buttons.  It is very similar to submitDefaultHtml.

    $("input[type='reset']).uniform({resetDefaultHtml: "Clear"});

### resetSelector (boolean/string)

*Default:* false

This parameter allows you to use a jQuery-style selector to point to a "reset" button in your form if you have one. Use false if you have no "reset" button, or a selector string that points to the reset button if you have one.

    $("select").uniform({resetSelector: 'input[type="reset"]'});

### selectAutoWidth (boolean)

*Default:* true

If this option is set to true, Uniform will try to fit the select width to the actual content.  When false, it forces the selects to all be the width that was specified in the theme.

When using auto widths, the size of the element is detected, then wrapped by Uniform and expanded to fit the wrapping.

If you want to specify a size of a select element and then have Uniform wrap it appropriately, there will be some difficulty.  The size of the element needs to get detected and then will be changed by Uniform.  For this to happen, it is suggested you do one of these solutions when you have issues.

 * Set a custom inline width for the element (`<select style="width:XXpx">`)
 * Use two css rules; `select { width: XXpx }` and `.selector select { width: 100% }`

If the select is empty and later populated via JavaScript, you can do one the following:

 * Set a custom inline width for the element (`<select style="width:XXpx">`)
 * Uniform the element after it was loaded with options
 * Use `$('select').uniform.restore().uniform()` to reapply Uniform to the selects that change

### selectClass (string)

*Default:* "selector"

Sets the class given to the wrapper div for select elements, but not multiselects.

    $("select").uniform({selectClass: 'mySelectClass'});

### selectMultiClass (string)

*Default:* "uniform-multiselect"

Sets the class given to the wrapper div for select elements that are multiselects.

    $("select").uniform({selectMultiClass: 'myMultiSelectClass'});

### submitDefaultHtml (string)

*Default:* "Submit"

This text is what's shown on form submit buttons.  It is very similar to resetDefaultHtml.

    $("input[type='submit']).uniform({resetDefaultHtml: "Submit Form"});

### textareaClass (string)

*Default:* "uniform"

The class that is applied to textarea elements.

    $("textarea").uniform({textareaClass: "myTextareaClass"});

### useID (boolean)

*Default:* true

If true, sets an ID on the container div of each form element. The ID is a prefixed version of the same ID of the form element.

    $("select").uniform({useID: false});

### wrapperClass (string)

*Default:* null

When uniforming, the top level element that wraps the input is given this class.  When elements would not normally be given a wrapper element, this option will create a wrapper element anyway.  This can really help with running multiple themes on a single page.

    $('input.blue').uniform({wrapperClass: "blueTheme"});
	$('input').uniform({wrapperClass: "defaultTheme"});


Additional Functions And Properties
-----------------------------------

In addition to the parameters, there are a couple of other ways you can interact with Uniform.

### $.uniform.update([elem/selector string]);

If you need to change values on the form dynamically you must tell Uniform to update that element’s style. Fortunately, it’s very simple. Just call this function, and Uniform will do the rest.

    $.uniform.update("#myUpdatedCheckbox");

If you don't mind updating all Uniformed elements or just don’t specifically know which element to update, you can just leave out the parameter (see below) and Uniform will update all Uniformed elements on the page:

    $.uniform.update();

### $.uniform.restore([elem/selector string]);

If you want to "un-uniform" something, simply call this function. It will remove the inline styles, extra dom elements, and event handlers, effectively restoring the element to it's previous state.

    $.uniform.restore("select");

### $.uniform.elements[]

You can get an array of all the elements that have been Uniformed at any time using this public variable.  I don't advise changing the contents!

    var uniforms = $.uniform.elements;


Customizing CSS
---------------

To edit the CSS of Uniform it is highly recommended to not edit the theme files, but to override them using CSS. Make sure your CSS file comes after the Uniform theme css file in the HEAD section.

It's common to want to resize the selects or other elements. The best way is to set the width property on the div element, span element and the form element itself. Resizing "select" lists is a bit tougher as you need to change the line height. I suggest looking at the _base theme's SCSS file to see where the various width and height variables are used.

If you'd like to create your own theme, take a peek at theme-kit/README.md.  It's on [github](https://github.com/pixelmatrix/uniform) and included in the [theme kit](http://uniformjs.org/downloads/theme-kit.zip).


Tips & Tricks
-------------

Uniform is supposed to be pretty simple, but there are a few things that can be tricky. Here are some tips that may make your experience simpler:

* Remember to change the CSS classes in the theme if you change the parameters for elements’ classes. This can be tedious work, but if you don’t do it, it’s not going to look correct. Find and Replace is your friend.

* Uniform cannot automatically sniff out dynamic value changes. If you make changes to elements in JavaScript or using a reset button of some kind, remember to call $.uniform.update(); to sync the changes with Uniform.  See [Issue #270](https://github.com/pixelmatrix/uniform/issues/270) for the little bit of code you will need.

* Likewise, when you add elements to the DOM, perhaps via AJAX, and they need to get styled, you will need to use $('#newElement').uniform() on it so the styling is applied.

* Uniform is disabled in IE6. It’s not possible to fix due to the way IE6 handles form elements. If you care about IE6 users, give it a quick look to make sure your "naked" form elements look alright in there.

* There is a bug in Safari 5.1 that will cause the web rendering process to crash when you use custom fonts.  For more information, see [Issue #183](https://github.com/pixelmatrix/uniform/issues/183).

* With IE 7-9, sometimes the "change" event doesn't get fired or doesn't get triggered at the right time.  When we detect a change, Uniform may submit its own "change" event on the element.  See [Issue #152](https://github.com/pixelmatrix/uniform/issues/152) and [Issue #238](https://github.com/pixelmatrix/uniform/issues/238).

* With IE9, you may have problems with some fonts on your site.  See [Issue #226](https://github.com/pixelmatrix/uniform/issues/226) if you mysteriously see a blank page or blank form elements.  The fonts in Uniform have been arranged to work around this, but custom themes may not work properly.

* If you have ideas, or bugs, please post them in [GitHub](https://github.com/pixelmatrix/uniform). We rely on our users' for improvement ideas and bug reports. Without your participation, Uniform will stay static.

* If you are having problems with automatically sized select elements in Firefox, double check and ensure your CSS files are listed before jQuery, Uniform and your code that uniforms the form elements.  Also check the selectAutoWidth property's documentation.


Upgrading To 2.0 And Later
--------------------------

Your sprite map will now support many new things and will need to be updated.  If you use custom backgrounds that are not in the sprite map, those will need updating as well.

The uniform.options object was renamed to uniform.defaults since they are the default options.  Other properties were renamed to be consistent or have less ambiguous names, such as `fileBtnClass` becoming `fileButtonClass`.

Previously, calls to update() would render all elements with the most recent set of options.  This has been fixed, but may change how your page looks.  Test to make sure things still render as expected.

$.uniform.noSelect is no longer exposed and has been updated to version 1.0.3.

$.uniform.restore() does not need to be global; you now can use $('#myId').uniform.restore() instead to just restore some elements.  Same thing for updates.

The sprite changed a bit.  The caps for select lists were moved to the left-hand side.  Button theming was added and the file upload images were reordered to match the select list order.  See the theme-kit/README.md file for further reading on this topic.


Reporting Bugs
--------------

It sure would be handy if you could create a test page to help illustrate bugs.  When you use the <a href="https://github.com/pixelmatrix/uniform/issues">GitHub Issue Tracker</a>, you could clone this [bug template gist](https://gist.github.com/4328659) or use [this jsfiddle](http://jsfiddle.net/fidian/JNCFP/) to help illustrate your point.

Even if you don't do that, all sorts of feedback is welcome, but narrowing down your problem or providing an example would immediately help narrow down the problem quickly.
