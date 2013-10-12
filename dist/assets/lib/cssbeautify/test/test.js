/*
 Copyright (C) 2013 Sencha Inc.
 Copyright (C) 2012 Sencha Inc.
 Copyright (C) 2011 Sencha Inc.

 Author: Ariya Hidayat.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

var tests = {

    'Simple style': {
        input: [
            'menu { color: blue; }',
            '',
            'box { border-radius: 4px; background-color: red }',
            '',
            'a { color: green }',
            'b { color: red }'
        ],
        expected: [
            'menu {',
            '    color: blue;',
            '}',
            '',
            'box {',
            '    border-radius: 4px;',
            '    background-color: red',
            '}',
            '',
            'a {',
            '    color: green',
            '}',
            '',
            'b {',
            '    color: red',
            '}'
        ]
    },

    'Block comment': {
        input: [
            '/* line comment */',
            'navigation { color: blue }',
            '',
            'menu {',
            '    /* line comment inside */',
            '    border: 2px',
            '}',
            '',
            '/* block',
            ' comment */',
            'sidebar { color: red }',
            '',
            'invisible {',
            '    /* block',
            '     * comment',
            '     * inside */',
            '    color: #eee',
            '}'
        ],
        expected: [
            '/* line comment */',
            'navigation {',
            '    color: blue',
            '}',
            '',
            'menu {',
            '    /* line comment inside */',
            '    border: 2px',
            '}',
            '',
            '/* block',
            ' comment */',
            'sidebar {',
            '    color: red',
            '}',
            '',
            'invisible {',
            '    /* block',
            '     * comment',
            '     * inside */',
            '    color: #eee',
            '}'
        ]
    },

    'Indentation': {
        input: [
            '     navigation {',
            '    color: blue',
            '  }'
        ],
        expected: [
            'navigation {',
            '    color: blue',
            '}'
        ]
    },

    'Blank lines and spaces': {
        input: [
            '/* only one blank line between */',
            'menu { color: red }',
            '',
            '',
            '',
            '',
            'navi { color: black }',
            '',
            '/* automatically insert a blank line */',
            'button { border: 1px } sidebar { color: #ffe }',
            '',
            '/* always whitespace before { */',
            'hidden{opacity:0%}',
            '',
            '/* no blank lines inside ruleset */',
            'imprint {',
            '  color: blue;',
            '',
            '',
            '    opacity: 0.5;',
            '',
            '   font-size: small',
            '}',
            '',
            '/* before colon: no space, after colon: one space only */',
            'footer {',
            '      font-family:     Arial;',
            '',
            '  float   :right;',
            '  }'
        ],
        expected: [
            '/* only one blank line between */',
            'menu {',
            '    color: red',
            '}',
            '',
            'navi {',
            '    color: black',
            '}',
            '',
            '/* automatically insert a blank line */',
            'button {',
            '    border: 1px',
            '}',
            '',
            'sidebar {',
            '    color: #ffe',
            '}',
            '',
            '/* always whitespace before { */',
            'hidden {',
            '    opacity: 0%',
            '}',
            '',
            '/* no blank lines inside ruleset */',
            'imprint {',
            '    color: blue;',
            '    opacity: 0.5;',
            '    font-size: small',
            '}',
            '',
            '/* before colon: no space, after colon: one space only */',
            'footer {',
            '    font-family: Arial;',
            '    float: right;',
            '}'
        ]
    },

    'Quoted string': {
        input: [
            'nav:after{content:\'}\'}',
            'nav:before{content:"}"}'
        ],
        expected: [
            'nav:after {',
            '    content: \'}\'',
            '}',
            '',
            'nav:before {',
            '    content: "}"',
            '}',
        ]
    },

    'Selectors': {
        input: [
            '* { border: 0px solid blue; }',
            'div[class="{}"] { color: red; }',
            'a[id=\\"foo"] { padding: 0; }',
            '[id=\\"foo"] { margin: 0; }',
            '#menu, #nav, #footer { color: royalblue; }'
        ],
        expected: [
            '* {',
            '    border: 0px solid blue;',
            '}',
            '',
            'div[class="{}"] {',
            '    color: red;',
            '}',
            '',
            'a[id=\\"foo"] {',
            '    padding: 0;',
            '}',
            '',
            '[id=\\"foo"] {',
            '    margin: 0;',
            '}',
            '',
            '#menu, #nav, #footer {',
            '    color: royalblue;',
            '}'
        ]
    },

    'Empty rule': {
        input: [
            'menu{}'
        ],
        options: {
            autosemicolon: true
        },
        expected: [
            'menu {',
            '}'
        ]
    },

    '@font-face directive': {
        input: [
            '@font-face{ color:     black; background-color:blue}'
        ],
        options: {
            autosemicolon: true
        },
        expected: [
            '@font-face {',
            '    color: black;',
            '    background-color: blue;',
            '}'
        ]
    },

    '@import directive': {
        input: [
            'menu{background-color:red} @import url(\'foobar.css\') screen;',
            'nav{margin:0}'
        ],
        expected: [
            'menu {',
            '    background-color: red',
            '}',
            '',
            '@import url(\'foobar.css\') screen;',
            '',
            'nav {',
            '    margin: 0',
            '}'
        ]
    },

    '@media directive': {
        input: [
            '@import "subs.css";',
            '@import "print-main.css" print;',
            '@media print {',
            '  body { font-size: 10pt }',
            '  nav { color: blue; }',
            '}',
            'h1 {color: red; }'
        ],
        expected: [
            '@import "subs.css";',
            '',
            '@import "print-main.css" print;',
            '',
            '@media print {',
            '    body {',
            '        font-size: 10pt',
            '    }',
            '',
            '    nav {',
            '        color: blue;',
            '    }',
            '}',
            '',
            'h1 {',
            '    color: red;',
            '}'
        ]
    },

    '@media directive (auto-semicolon)': {
        input: [
            '@media screen {',
            '  menu { color: navy }',
            '}'
        ],
        options: {
            autosemicolon: true
        },
        expected: [
            '@media screen {',
            '    menu {',
            '        color: navy;',
            '    }',
            '}'
        ]
    },

    'URL': {
        input: [
            'menu { background-image: url(data:image/png;base64,AAAAAAA); }'
        ],
        expected: [
            'menu {',
            '    background-image: url(data:image/png;base64,AAAAAAA);',
            '}'
        ]
    },

    'Animation keyframe': {
        input: [
            '@-webkit-keyframes anim {',
            '0% { -webkit-transform: translate3d(0px, 0px, 0px); }',
            '100% { -webkit-transform: translate3d(150px, 0px, 0px) }}'
        ],
        expected: [
            '@-webkit-keyframes anim {',
            '    0% {',
            '        -webkit-transform: translate3d(0px, 0px, 0px);',
            '    }',
            '',
            '    100% {',
            '        -webkit-transform: translate3d(150px, 0px, 0px)',
            '    }',
            '}'
        ]
    }

};

