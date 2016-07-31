;(function($){
  "use strict";
  
  Metis.MetisTable = function() {

    /*----------- BEGIN TABLESORTER CODE -------------------------*/
    /* required jquery.tablesorter.min.js*/
    $(".sortableTable").tablesorter();
    /*----------- END TABLESORTER CODE -------------------------*/

    /*----------- BEGIN datatable CODE -------------------------*/
    $('#dataTable').dataTable({
//         "sDom": "<'pull-right'l>t<'row'<'col-lg-6'f><'col-lg-6'p>>",
//         "sPaginationType": "bootstrap",
//         "oLanguage": {
//             "sLengthMenu": "Show _MENU_ entries"
//         }
    });
    /*----------- END datatable CODE -------------------------*/

    /*----------- BEGIN action table CODE -------------------------*/
    // DEPRECATED
//     $('#actionTable button.remove').on('click', function() {
//         $(this).closest('tr').remove();
//     });
//     $('#actionTable button.edit').on('click', function() {
//         $('#editModal').modal({
//             show: true
//         });
//         var val1 = $(this).closest('tr').children('td').eq(1),
//                 val2 = $(this).closest('tr').children('td').eq(2),
//                 val3 = $(this).closest('tr').children('td').eq(3);
//         $('#editModal #fName').val(val1.html());
//         $('#editModal #lName').val(val2.html());
//         $('#editModal #uName').val(val3.html());
// 
// 
//         $('#editModal #sbmtBtn').on('click', function() {
//             val1.html($('#editModal #fName').val());
//             val2.html($('#editModal #lName').val());
//             val3.html($('#editModal #uName').val());
//         });
// 
//     });
    /*----------- END action table CODE -------------------------*/

};
  
  return Metis;
})(jQuery);
