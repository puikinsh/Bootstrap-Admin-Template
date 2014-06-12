;(function($, Metis) {
    if (!$().sortable) {
        return;
    }
    var $sortable = $('.inner .row');
    Metis.metisSortable = function() {
        $sortable.sortable();
    };
    return Metis;
})(jQuery, Metis || {});