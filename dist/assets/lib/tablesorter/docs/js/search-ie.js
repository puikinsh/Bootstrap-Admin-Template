/* IE 8 and less */
$(function(){
	// open side menu
	var checked = false;
	$('.main-header').click(function(){
		checked = !checked;
		$('#main-nav').animate({ width: checked ? 250 : 0 }, 300);
		$('#main')
			.animate({ marginLeft: checked ? 250 : 0 }, 300)
			.css({ overflow: checked ? 'hidden' : '' })
			.find('.open-menu').toggle(!checked).end()
			.find('.close-menu').toggle(checked).end()
			.find('#banner h1').css({ paddingLeft : checked ? 0 : 30 });
	});

	// make sure the case insensitive button is checked (visually)
	$('#csfalse').addClass('switch-selection-right');

	// search option buttons
	$('.switch-label').click(function(){
		var tar = $(this).attr('for');
		$('#' + tar)
			.prop('checked', true)
			.change()
			.siblings('.switch-selection')
			.toggleClass( 'switch-selection-right', (tar === 'letter' || tar === 'csfalse') );
	});
});