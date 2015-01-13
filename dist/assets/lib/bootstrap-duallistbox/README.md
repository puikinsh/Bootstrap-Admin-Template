# Bootstrap Dual Listbox [![Build Status](https://secure.travis-ci.org/istvan-ujjmeszaros/bootstrap-duallistbox.png?branch=master)](https://travis-ci.org/istvan-ujjmeszaros/bootstrap-duallistbox)
Bootstrap Dual Listbox is a responsive dual listbox widget optimized for Twitter Bootstrap. Works on all modern browsers and on touch devices.

Check the [official website](http://www.virtuosoft.eu/code/bootstrap-duallistbox/) for a demo.

## Usage

1. Download the latest tag from the [releases page](https://github.com/istvan-ujjmeszaros/bootstrap-duallistbox/releases) or get it via **bower**:

```shell
$ bower install bootstrap-duallistbox
```

2. Include **jQuery** and **Bootstrap**:

```html
<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
<script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
```

3. Include plugin's code:

```html
<script src="dist/jquery.bootstrap-duallistbox.min.js"></script>
<link rel="stylesheet" type="text/css" href="../src/bootstrap-duallistbox.css">
```

4. Call the plugin:

```javascript
$("#element").bootstrapDualListbox({
    // see next for specifications
});
```

## Specifications

### Initialization parameters object

When calling `$("#element").bootstrapDualListbox()` you can pass a parameters object with zero or more of the following:

- `bootstrap2Compatible`, defaults to `false`, set this to `true` if you want graphic compatibility with Bootstrap 2.
- `filterTextClear`, defaults to `'show all'`, is the text for the "Show All" button.
- `filterPlaceHolder`, defaults to `'Filter'`, is the placeholder for the `input` element for filtering elements.
- `moveSelectedLabel`, defaults to `'Move selected'`, is the label for the "Move Selected" button.
- `moveAllLabel`, defaults to `'Move all'`, is the label for the "Move All" button.
- `removeSelectedLabel`, defaults to `'Remove selected'`, is the label for the "Remove Selected" button.
- `removeAllLabel`, defaults to `'Remove all'`, is the label for the "Remove All" button.
- `moveOnSelect`, defaults to `true`, determines whether to move `option`s upon selection. This option is forced to `true` on the Android browser.
- `preserveSelectionOnMove`, can be`'all'` (for selecting both moved elements and the already selected ones in the target list) or `'moved'` (for selecting moved elements only); defaults to `false`.
- `selectedListLabel`, defaults to `false`, can be a `string` specifying the name of the selected list.
- `nonSelectedListLabel`, defaults to `false`, can be a `string` specifying the name of the non selected list.
- `helperSelectNamePostfix`, defaults to `'_helper'`. The added `select`s will have the same name as the original one, concatenated with this `string` and `1` (for the non selected list, e.g. `element_helper1`) or `2` (for the selected list, e.g. `element_helper2`).
- `selectorMinimalHeight`, defaults to `100`, represents the minimal height of the generated dual listbox.
- `showFilterInputs`, defaults to `true`, whether to show filter inputs.
- `nonSelectedFilter`, defaults to the empty string `''`, initializes the dual listbox with a filter for the non selected elements. This is applied only if `showFilterInputs` is set to `true`.
- `selectedFilter`, defaults to the empty string `''`, initializes the dual listbox with a filter for the selected elements. This is applied only if `showFilterInputs` is set to `true`.
- `infoText`, defaults to `'Showing all {0}'`, determines which `string` format to use when all options are visible. Set this to `false` to hide this information. Remember to insert the `{0}` placeholder.
- `infoTextFiltered`, defaults to `'<span class="label label-warning">Filtered</span> {0} from {1}'`, determines which element format to use when some element is filtered. Remember to insert the `{0}` and `{1} `placeholders.
- `infoTextEmpty`, defaults to `'Empty list'`, determines the `string` to use when there are no options in the list.
- `filterOnValues`, defaults to `false`, set this to `true` to filter the `option`s according to their `value`s and not their HTML contents.

### Methods

You can modify the behavior and aspect of the dual listbox by calling its methods, all of which accept a `value` and a `refresh` option. The `value` determines the new parameter value, while `refresh` (optional, defaults to `false`) tells whether to update the plugin UI or not.

To call methods on the dual listbox instance, use the following syntax:

```javascript
$(selector).bootstrapDualListbox(methodName, parameter);
```

**Note**: when making multiple chained calls to the plugin, set `refresh` to `true` to the last call only, in order to make a unique UI change; alternatively, you can also call the `refresh` method as your last one.

Here are the available methods:

- `setBootstrap2Compatible(value, refresh)` to change the `bootstrap2Compatible` parameter.
- `setFilterTextClear(value, refresh)` to change the `filterTextClear` parameter.
- `setFilterPlaceHolder(value, refresh)` to change the `filterPlaceHolder` parameter.
- `setMoveSelectedLabel(value, refresh)` to change the `moveSelectedLabel` parameter.
- `setMoveAllLabel(value, refresh)` to change the `moveAllLabel` parameter.
- `setRemoveSelectedLabel(value, refresh)` to change the `removeSelectedLabel` parameter.
- `setRemoveAllLabel(value, refresh)` to change the `removeAllLabel` parameter.
- `setMoveOnSelect(value, refresh)` to change the `moveOnSelect` parameter.
- `setPreserveSelectionOnMove(value, refresh)` to change the `preserveSelectionOnMove` parameter.
- `setSelectedListLabel(value, refresh)` to change the `selectedListLabel` parameter.
- `setNonSelectedListLabel(value, refresh)` to change the `nonSelectedListLabel` parameter.
- `setHelperSelectNamePostfix(value, refresh)` to change the `helperSelectNamePostfix` parameter.
- `setSelectOrMinimalHeight(value, refresh)` to change the `selectorMinimalHeight` parameter.
- `setShowFilterInputs(value, refresh)` to change the `showFilterInputs` parameter.
- `setNonSelectedFilter(value, refresh)` to change the `nonSelectedFilter` parameter.
- `setSelectedFilter(value, refresh)` to change the `selectedFilter` parameter.
- `setInfoText(value, refresh)` to change the `infoText` parameter.
- `setInfoTextFiltered(value, refresh)` to change the `infoTextFiltered` parameter.
- `setInfoTextEmpty(value, refresh)` to change the `infoTextEmpty` parameter.
- `setFilterOnValues(value, refresh)` to change the `filterOnValues` parameter.

Furthermore, you can call:

- `refresh()` or `trigger` the `bootstrapDualListbox.refresh` event to update the plugin element UI.
- `destroy()` to restore the original `select` element and delete the plugin element.
- `getContainer()` to get the container element.

## Structure

The basic structure of the project is given in the following way:

```
├── demo/
│   └── index.html
├── dist/
│   ├── bootstrap-duallistbox.css
│   ├── bootstrap-duallistbox.min.css
│   ├── jquery.bootstrap-duallistbox.js
│   └── jquery.bootstrap-duallistbox.min.js
├── src/
│   ├── bootstrap-duallistbox.css
│   └── jquery.bootstrap-duallistbox.js
├── .editorconfig
├── .gitignore
├── .jshintrc
├── .travis.yml
├── bootstrap-duallistbox.jquery.json
├── bower.json
├── Gruntfile.js
└── package.json
```

#### [demo/](https://github.com/istvan-ujjmeszaros/bootstrap-duallistbox/tree/master/demo)

Contains a simple HTML file to demonstrate your plugin.

#### [dist/](https://github.com/istvan-ujjmeszaros/bootstrap-duallistbox/tree/master/dist)

This is where the generated files are stored once Grunt runs.

#### [src/](https://github.com/istvan-ujjmeszaros/bootstrap-duallistbox/tree/master/src)

Contains the source files, both `js` and `css`.

#### [.editorconfig](https://github.com/istvan-ujjmeszaros/bootstrap-duallistbox/tree/master/.editorconfig)

This file is for unifying the coding style for different editors and IDEs.

> Check [editorconfig.org](http://editorconfig.org) if you haven't heard about this project yet.

#### [.gitignore](https://github.com/istvan-ujjmeszaros/bootstrap-duallistbox/tree/master/.gitignore)

List of files that we don't want Git to track.

> Check this [Git Ignoring Files Guide](https://help.github.com/articles/ignoring-files) for more details.

#### [.jshintrc](https://github.com/istvan-ujjmeszaros/bootstrap-duallistbox/tree/master/.jshintrc)

List of rules used by JSHint to detect errors and potential problems in JavaScript.

> Check [jshint.com](http://jshint.com/about/) if you haven't heard about this project yet.

#### [.travis.yml](https://github.com/istvan-ujjmeszaros/bootstrap-duallistbox/tree/master/.travis.yml)

Definitions for continous integration using Travis.

> Check [travis-ci.org](http://about.travis-ci.org/) if you haven't heard about this project yet.

#### [bootstrap-duallistbox.jquery.json](https://github.com/istvan-ujjmeszaros/bootstrap-duallistbox/tree/master/bootstrap-duallistbox.jquery.json)

Package manifest file used to publish plugins in jQuery Plugin Registry.

> Check this [Package Manifest Guide](http://plugins.jquery.com/docs/package-manifest/) for more details.

#### [Gruntfile.js](https://github.com/istvan-ujjmeszaros/bootstrap-duallistbox/tree/master/Gruntfile.js)

Contains all automated tasks using Grunt.

> Check [gruntjs.com](http://gruntjs.com) if you haven't heard about this project yet.

#### [package.json](https://github.com/istvan-ujjmeszaros/bootstrap-duallistbox/tree/master/package.json)

Specify all dependencies loaded via Node.JS.

> Check [NPM](https://npmjs.org/doc/json.html) for more details.

## Building

To build and test the plugin, you need:

- [**NodeJS**](www.nodejs.org) with **npm**
- **bower** (install it with `npm install bower --g`)
- **grunt-cli** (install it with `npm install grunt-cli --g`)

Then, `cd` to the project directory and install the required dependencies:

```shell
$ npm install
$ bower install
```

To run jshint on the plugin code, call:

```shell
$ grunt jshint
```

To build the output js and css files, with the related minified ones, run:

```shell
$ grunt
```

## Issues and Contributions

You can report any issue you may encounter on the [GitHub Issue Tracker](https://github.com/istvan-ujjmeszaros/bootstrap-duallistbox/issues).

To contribute, please follow the [contribution guidelines](https://github.com/istvan-ujjmeszaros/bootstrap-duallistbox/blob/master/CONTRIBUTING.md).

## History

Check [Release](https://github.com/istvan-ujjmeszaros/bootstrap-duallistbox/releases) list.

## License

```
  Copyright 2013-2014 István Ujj-Mészáros

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
```