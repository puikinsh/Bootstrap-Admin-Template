/*global cssbeautify:true, document:true, window:true, CodeMirror: true */

var editor, viewer, formatId;

function format() {
    'use strict';
    if (formatId) {
        window.clearTimeout(formatId);
    }
    formatId = window.setTimeout(function () {
        var options, raw, beautified;

        options = {
            indent: '    '
        };

        if (document.getElementById('tab').checked) {
            options.indent = '\t';
        } else if (document.getElementById('twospaces').checked) {
            options.indent = '  ';
        }

        if (document.getElementById('openbrace-separate-line').checked) {
            options.openbrace = 'separate-line';
        }

        if (document.getElementById('autosemicolon').checked) {
            options.autosemicolon = true;
        }

        if (typeof editor === undefined) {
            raw = document.getElementById('raw').value;
        } else {
            raw = editor.getValue();
        }

        beautified = cssbeautify(raw, options);

        if (typeof viewer === undefined) {
            document.getElementById('beautified').value = beautified;
        } else {
            viewer.setValue(beautified);
        }

        formatId = undefined;
    }, 42);
}

window.onload = function () {
    'use strict';

    editor = CodeMirror.fromTextArea(document.getElementById("raw"), {
        lineNumbers: true,
        matchBrackets: false,
        lineWrapping: true,
        tabSize: 8,
        onChange: format
    });

    viewer = CodeMirror.fromTextArea(document.getElementById("beautified"), {
        lineNumbers: true,
        matchBrackets: false,
        lineWrapping: true,
        readOnly: true,
        tabSize: 8
    });

    format();
};

