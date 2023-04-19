Metis.metisSortable = function () {
  if (!$().sortable) {
    return;
  }
  var $sortable = $(".inner [class*=col-]");
  $sortable
    .sortable({
      placeholder: "ui-state-highlight",
    })
    .disableSelection();
};
