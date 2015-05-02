;(function($, Metis){
  Metis.MetisProgress = function() {
    var $bar = $('.progress .progress-bar');
    $.each($bar, function () {
      
      var $this = $(this);
      
      $this
      .animate({
        width: $(this).attr('aria-valuenow') + '%'
      })
      .popover({
        placement: 'bottom',
        title: 'Source',
        content: this.outerHTML
      });
    });
  };
  return Metis;
})(jQuery, Metis);