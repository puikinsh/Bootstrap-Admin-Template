/*global $, ich*/
$(function () {
	'use strict';
	var i, themes;

	// First, take care of the easy styling
	$('.simple').uniform();

	themes = [
		{
			theme: 'agent',
			name: 'Agent',
			isDefault: false
		},
		{
			theme: 'aristo',
			name: 'Aristo',
			isDefault: false
		},
		{
			theme: 'default',
			name: 'Default',
			isDefault: true
		},
		{
			theme: 'jeans',
			name: 'Jeans',
			isDefault: false
		}
	];
	$('.examples').empty().append(ich.exampleTemplate(themes, true));

	// Apply the non-default themes.
	// Just doing it this way as an example.
	for (i = 0; i < themes.length; i += 1) {
		if (!themes[i].isDefault) {
			$('.example-' + themes[i].theme).find('input, select').uniform({
				wrapperClass: "uniform-" + themes[i].theme
			});
		}
	}

	// Now apply the default to everything.
	// Elements already uniformed won't be uniformed again.
	// This could just as eaily be done without a default.
	$('input, select').uniform();
});
