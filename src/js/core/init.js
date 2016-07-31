;(function($) {
   $(document).ready(function() {
    
    $('[data-toggle="tooltip"]').tooltip();
 
    $('#menu').metisMenu();
    Metis.navBar();
    Metis.metisAnimatePanel();
    Metis.toggleFullScreen();
    Metis.boxFullScreen();
    Metis.panelBodyCollapse();
    Metis.boxHiding();   
  });
})(jQuery);
