/*
 * Pagedown Bootstrap
 * Author: Kevin O'Connor
 * Version: 1.0
 *
 * Copyright (c) 2013 Kevin O'Connor
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 
 */

(function( $ ){

	$.fn.pagedownBootstrap = function( options ) {  

		// Default settings
		var settings = $.extend( {
			'sanatize'				: true,
			'help'						: null,
			'hooks'						: Array()
		}, options);

		return this.each(function() {   

			//Setup converter   
			var converter = null;
			if(settings.sanatize)
			{
				converter = Markdown.getSanitizingConverter();
			} else {
				converter = new Markdown.Converter()
			}

			//Register hooks
			for(var i in settings.hooks)
			{
				var hook = settings.hooks[i];
				if(typeof hook !== 'object' || typeof hook.event === 'underfined' 
						|| typeof hook.callback !== 'function')
				{
					//A bad hook object was given
					continue;
				}

				converter.hooks.chain(hook.event, hook.callback);

			}

			//Try to find a valid id for this element
			var id = "wmd-input";
			var idAppend = 0;
			while($("#"+id+"-"+idAppend.toString()).length > 0)
			{
				idAppend++;
			}

			//Assign the choosen id to the element
			$(this).attr('id', id+"-"+idAppend.toString());

			//Wrap the element with the needed html
			$(this).wrap('<div class="wmd-panel" />');
			$(this).before('<div id="wmd-button-bar-'+idAppend+'" class="wmd-button-bar" />');
			$(this).after('<div id="wmd-preview-'+idAppend+'" class="wmd-preview" />');
			$(this).addClass('wmd-input');

			//Setup help function
			help = null;
			if($.isFunction(settings.help))
			{
				help = { handler: settings.help };
			}

			//Setup editor
			var editor = new Markdown.Editor(converter, "-"+idAppend.toString(), help);
      editor.run();

		});

	};
})( jQuery );
