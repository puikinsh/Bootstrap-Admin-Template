/**
 * Italian translation for bootstrap-wysihtml5
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define('bootstrap.wysihtml5.it-IT', ['jquery', 'bootstrap.wysihtml5'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($){
    $.fn.wysihtml5.locale["it-IT"] = {
        font_styles: {
              normal: "Testo normale",
              h1: "Titolo 1",
              h2: "Titolo 2"
        },
        emphasis: {
              bold: "Grassetto",
              italic: "Corsivo",
              underline: "Sottolineato"
        },
        lists: {
              unordered: "Lista non ordinata",
              ordered: "Lista ordinata",
              outdent: "Elimina rientro",
              indent: "Aggiungi rientro"
        },
        link: {
              insert: "Inserisci link",
              cancel: "Annulla"
        },
        image: {
              insert: "Inserisci immagine",
              cancel: "Annulla"
        },
        html: {
            edit: "Modifica HTML"
        },
        colours: {
          black: "Nero",
          silver: "Argento",
          gray: "Grigio",
          maroon: "Marrone",
          red: "Rosso",
          purple: "Viola",
          green: "Verde",
          olive: "Oliva",
          navy: "Blu Marino",
          blue: "Blu",
          orange: "Arancio"
        }
    };
}));
