;(function($, Metis) {
  if (!$().sortable) {
    return;
  }
  var $sortable = $('.inner [class*=col-]');
  Metis.metisSortable = function() {
    $sortable.sortable({
      placeholder: "ui-state-highlight"
    }).disableSelection();
  };
  return Metis;
})(jQuery, Metis || {});
