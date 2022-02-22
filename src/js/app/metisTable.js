;(function($){
  "use strict";
  
  Metis.MetisTable = function() {

    /*----------- BEGIN TABLESORTER CODE -------------------------*/
    /* required jquery.tablesorter.min.js*/
    $(".sortableTable").tablesorter({theme : "bootstrap"});
    /*----------- END TABLESORTER CODE -------------------------*/

    /*----------- BEGIN datatable CODE -------------------------*/
    $('#dataTable').dataTable({});
    /*----------- END datatable CODE -------------------------*/
};
  
  return Metis;
})(jQuery);
