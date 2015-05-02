define([
  'require',
  'domReady',
  'jquery',
  'bootstrap.wysihtml5.en-US'
], function(require, domReady, $) {
  'use strict';

  domReady(function() {
    var myCustomTemplates = {
      linkalt : function(context) {
        return "<li>" +
          "<div class='bootstrap-wysihtml5-insert-link-modal modal fade'>" +
           "<div class='modal-dialog'" +
           "<div class='modal-content'>" +
           "<div class='modal-body'>" +
           "<p>TEXT " + JSON.stringify(context) + "</p>" +
           "<input type='hidden' class='bootstrap-wysihtml5-insert-link-url'>" +
           "<input type='hidden' class='bootstrap-wysihtml5-insert-link-target'>" +
           "</div>" +
           "</div>" +
           "</div>" +
           "</div>" +
           "<a class='btn btn-default' data-wysihtml5-command='createLink'>LINK</a>" +
           "</li>";
      },
      custom1: function(context) {
        return "<li>" +
          "<a class='btn btn-default' data-wysihtml5-command='insertHTML' data-wysihtml5-command-value='&hellip;'>hellip</a>" +
          "</li>";
      }
    };


    $('.textarea').wysihtml5({
      toolbar: {
        custom1: true,
        size: 'sm'
      },
      customTemplates: myCustomTemplates
    }); 
  });
});
