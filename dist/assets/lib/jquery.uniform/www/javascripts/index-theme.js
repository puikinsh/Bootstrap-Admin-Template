/*global document, window*/

window.theme = 'aristo';

(function () {
	'use strict';
	var params = window.location.search,
		i,
		keyValue;

	if (params) {
		params = params.substr(1).split('&');

		for (i = 0; i < params.length; i += 1) {
			keyValue = params[i].split('=');
			if (keyValue[0] === 'theme') {
				if (' agent aristo default jeans '.indexOf(' ' + keyValue[1] + ' ') >= 0) {
					window.theme = keyValue[1];
				}
			}
		}
	}

	// Courtesy of Nathan Hartwell <njhartwell@gmail.com>
	/*jslint evil:true*/
	document.write('<link type="text/css" rel="stylesheet" href="stylesheets/uniform.' + window.theme + '.css" />');
	/*jslint evil:false*/
}());
