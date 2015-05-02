define([
  'require',
  'domReady',
  'jquery',
  'bootstrap.wysihtml5.de-DE'
], function(require, domReady, $) {
  'use strict';

  domReady(function() {
    $('.textarea').wysihtml5({
      locale: 'de-DE'
    }); 
    $('#btn-settext').on('click', function(e) {
      $('.textarea').html('Some text dynamically set.');
      e.preventDefault();
    });
  });
});
