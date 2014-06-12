;(function($){
  "use strict";
  Metis.MetisFile = function() {

    /*----------- BEGIN elfinder CODE -------------------------*/
    var elf = $('#elfinder').elfinder({
        url: 'assets/elfinder-2.0-rc1/php/connector.php'  // connector URL (REQUIRED)
                // lang: 'de',             // language (OPTIONAL)
    }).elfinder('instance');
    /*----------- END elfinder CODE -------------------------*/

};
  return Metis;
})(jQuery);