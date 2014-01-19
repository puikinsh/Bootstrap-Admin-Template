function formWysiwyg() {
    "use strict";

    /*----------- BEGIN wysihtml5 CODE -------------------------*/
    $('#wysihtml5').wysihtml5();
    /*----------- END wysihtml5 CODE -------------------------*/

    /*----------- BEGIN Markdown.Editor CODE -------------------------*/
    var converter = Markdown.getSanitizingConverter();
    var editor = new Markdown.Editor(converter);
    editor.run();
    /*----------- END Markdown.Editor CODE -------------------------*/

    /*----------- BEGIN cleditor CODE -------------------------*/
    editor = $("#cleditor").cleditor({width: "100%", height: "100%"})[0].focus();
    $(window).resize();

    $(window).resize(function() {
        var $win = $('#cleditorDiv');
        $("#cleditor").width($win.width() - 24).height($win.height() - 24).offset({
            left: 15,
            top: 15
        });
        editor.refresh();
    });
    /*----------- END cleditor CODE -------------------------*/
    
    /*----------- BEGIN epiceditor CODE -------------------------*/
    var opts={
      basePath: 'assets/lib/epiceditor',
    };
    var editor = new EpicEditor(opts).load();
    /*----------- END epiceditor CODE -------------------------*/
}