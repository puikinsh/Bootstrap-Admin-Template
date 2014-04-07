Uniform Theme Kit
=================

Welcome!  I'm happy you are here.  You're interested in making your own theme that works with Uniform and you've come to the right place.


Sprite Image Layout
-------------------

A big chunk of theming is just getting the sprite image set up for use with Uniform.  It depends on having the images laid out in a specific way and that you follow a few rules:

1. You can change the size of the images, but you must make all of the images of a particular class match in height.  For example, that means all of your `<select>` elements are designed to have the same height.  If you need multiple heights, I suggest you set up multiple themes.

2. Order in the sprite image matters greatly.  Please don't change it.

And now, on to the sprite image itself.

![Identification Image](identification.png)

The green are the "regular" elements, yellow indicate "active", light blue is "hover", dark blue is "active", and maroon is "disabled".  The order of the images, from top to bottom, is the select list buttons, select button cap, checkboxes, radios, file upload filename area, file upload action button, buttons, button caps.

Here's the entire list as text, just in case the colors are not your thing.  The CSS selectors are listed for the elements.

* Select dropdowns
    * div.selector span
    * div.selector.active span
    * div.selector.hover span
    * div.selector.hover.active span
    * div.selector.disabled span
* Select dropdown button caps
    * div.selector
    * div.selector.active
    * div.selector.hover
    * div.selector.hover.active
    * div.selector.disabled
* Checkboxes - these are all on one line
    * div.checker
    * div.checker.active
    * div.checker.hover
    * div.checker.hover.active
    * div.checker.checked
    * div.checker.checked.active
    * div.checker.checked.hover
    * div.checker.checked.hover.active
    * div.checker.disabled
    * div.checker.checked.disabled
* Radio buttons - these are all on one line
    * div.radio
    * div.radio.active
    * div.radio.hover
    * div.radio.hover.active
    * div.radio.checked
    * div.radio.checked.active
    * div.radio.checked.hover
    * div.radio.checked.hover.active
    * div.radio.disabled
    * div.radio.checked.disabled
* File upload filename - only 3 images
    * div.uploader span.filename
    * div.uploader.hover span.filename
    * div.uploader.disabled span.filename
* File upload "browse" button
    * div.uploader span.action
    * div.uploader.active span.action
    * div.uploader.hover span.action
    * div.uploader.hover.active span.action
    * div.uploader.disabled span.action
* Button elements and styled links - only 4 images
    * div.button span
    * div.button.active span
    * div.button.hover span
    * div.button.disabled span
* Button element caps
    * div.button
    * div.button.active
    * div.button.hover
    * div.button.disabled


The Background Images
---------------------

These two are not included in the sprite because they need to repeat.  They need your special artwork as well to make a good theme, but they are a lot easier since they are just plain images.


Creating A Custom Theme
-----------------------

You can create your own theme by following these steps:

1. Using the theme kit as a sort of a template, create a new sprite image.  The various backgrounds and images need to be in the same order.  Yours can use different dimensions if that's useful.  There's more information on the sprite in this file.

2. Create the two input backgrounds, one for when the element has focus and another for when it does not have focus.

3. If you intend to use retina sized images, now is a good time to create those too.

4. Copy an existing theme's `css/uniform.*.scss` file.

5. Change the SCSS file to fit your theme.

	* The _base theme file should specify all layout specific things, such as position, width, height, background offsets and the like.  It should not need to get modified.

    * Variables are described in another section in this file.

	* Your custom SCSS file is where you should set colors, fonts and other stylistic aspects.

	* You may need to change the path of the `@import "../../_base/css/uniform._base.scss"` to match your pathing structure.

	* If including retina display images, you need to `@include retina()` at the end of your scss file, like the Jeans theme.

6. Rebuild the CSS file using sass.  A command like this should help get you started.

	* `sass --scss -s --style=compressed uniform.my_new_theme.scss > uniform.my_new_theme.min.css`

	* You may need to download and install [Sass](http://sass-lang.com/).

7. Enjoy!


SCSS Variables And Mixins
-------------------------

Thanks to the power that Sass provides, we can generate CSS rules with variables.  Sass also provides the CSS minification that this project uses.

Variables
=========

### Class Names

Uniform allows setting your own custom classes in the JavaScript, and these variables let you mirror that behavior in the generated CSS files.  Usually one will not need to modify these unless you are doing localization or if you want to have more unique class names in your theme.

* $class-action: ".action";  /* File upload "Browse" button */
* $class-active: ".active";
* $class-button: ".button";
* $class-checkbox: ".checker";
* $class-checked: ".checked";
* $class-disabled: ".disabled";
* $class-input: ".uniform-input";
* $class-filename: ".filename";  /* File upload filename */
* $class-focus: ".focus";
* $class-hover: ".hover";
* $class-multiselect: ".uniform-multiselect";
* $class-radio: ".radio";
* $class-select: ".selector";
* $class-upload: ".upload";
* $class-textarea: ".uniform";
* $class-wrapper: "";  /* Useful for namespacing */

The `$class-wrapper` variable is extra handy for defining a namespacing for using multiple themes at once.  See the documentation in the `www/` folder or online for examples.

### Images

* $sprite: "../images/sprite.png";
* $sprite-retina: "../images/sprite-retina.png";
* $input-background: "../images/bg-input.png";
* $input-background-retina: "../images/bg-input-retina.png";
* $input-background-focus: "../images/bg-input-focus.png";
* $input-background-focus-retina: "../images/bg-input-focus-retina.png";
* $sprite-size: 493px;
* $input-background-size: 1px;

These define the paths to the images.  They are wrapped in `url(...)` in the generated CSS file.  The format of the images is described elsewhere in this file.

The retina display image is of a higher quality than the regular one.  Typically it is of double density, but you're not restricted to that.  Scaling happens automatically by the browser and it's based on the `$sprite-size` and `$input-background-size` variables.

The sizes are necessary for scaling down the retina display to the original image's size.

### Basic Heights and Widths

* $button-height: 30px;
* $checkbox-height: 19px;
* $checkbox-width: 19px;
* $radio-height: 18px;
* $radio-width: 18px;
* $select-height: 26px;
* $upload-action-width: 85px;
* $upload-filename-width: 82px;
* $upload-height: 28px;
* $upload-width: 190px;

These determine the width and height of some of the elements.  They all are basically what they imply.  Their dimensions are used to calculate the offsets in the sprite images in order to locate where something is.  When you have messed up backgrounds, you should probably double-check these values and ensure that it all lines up.

### Caps

* $button-margin-left: 13px;
* $select-margin-left: 10px;

These are the widths of the caps for buttons and select lists.

* $select-margin-right: 25px;

This is the width of the drop-down arrow image for select lists.

* $upload-filename-padding: 0 10px;

The filename is given this much padding for positioning the span's text appropriately inside the div.

### Trickier Settings

* $button-span-height: $button-height;

The span height for buttons can change in order to accommodate changing margins.

* $button-padding: 0;
* $input-padding: 3px;

The specified amount of padding will be applied to the button's span or an input/textarea/multiselect element in order to position content.

* $select-fixed-width: 190px;

When select lists are not set for automatic sizing, this variable dictates how wide the select should appear.

* $select-select-height: 22px;
* $select-select-top: 2px;

Select elements are forcibly resized to be the given height and absolutely positioned to have the given top setting in order to make the whole styled image clickable.

* $upload-filename-margin-top: 2px;
* $upload-filename-margin-bottom: 2px;

These two will vertically align the filename in the upload input.

* $upload-filename-margin-left: 2px;

Change this setting so filenames start near the edge of your image, but not too close.  You don't want overlap, now do you?


Mixins
======

Mixins let you define a reusable chunk of CSS and then include it in multiple places.  When you need to update it, you only need to update it once and rebuild your SCSS files.  Fantastic!

To use it, you just add a `@include` line in your css, like this:

    a {
        color: blue;
        @include: ellipsis();
    }

### hideYetClickable()

Sets the element to be invisible, yet it takes up space and can still be interacted with.

### inline-block()

Usually a `display: inline-block` is enough, but older versions of IE have issues.  This should basically work all the way back to IE6.

### ellipsis()

Alters the CSS so when there is content that overflows it will be shown as "..." instead of expanding the element.

### border-radius($radius)

Sets up the cross-browser border radius elements.  It's not official and somewhat older browsers may need their custom CSS rules until those users upgrade or the computers die.

Pass in a radius, like this:

    @include: border-radius(3px);

### box-shadow($def)

Sets the multiple box-shadow CSS3 rules.  Pass in your box-shadow definition.

    @include: box-shadow(0px 0px 4px rgba(0, 0, 0, 0.3));
    
### retina()

Adds the chunk of CSS to the theme file that enables a retina display image.  Right now it always uses a double-density image even if the display only has a device pixel ratio of 1.3, but that only matters if you're really concerned about bandwidth.

### use-backgrounds($sprite, $sprite-size, $input, $input-focus, $input-size)

Writes a somewhat large chunk of CSS that sets backgrounds.  This is intended to be used by retina(), but exposed in case you have a need for it.

Changes in v2.0
---------------

The order of the images at the bottom of the file were updated.  This is the revised order:

* file input normal
* file input hover (was disabled)
* file input disabled (was hover)

* file button normal (was disabled)
* file button active (was normal)
* file button hover
* file button hoveractive (was active)
* file button disabled (was hoveractive)

* button normal (was button cap normal or omitted)
* button active (was button cap hover or omitted)
* button hover (was button cap active or omitted)
* button disabled (was button cap disabled or omitted)

* button cap normal (was button normal or omitted)
* button cap active (was button hover or omitted)
* button cap hover (was button active or omitted)
* button cap disabled (was button disabled or omitted)
