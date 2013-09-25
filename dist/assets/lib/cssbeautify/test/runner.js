/*
 Copyright (C) 2012 Sencha Inc.

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

/*jslint browser:true node:true */
/*global cssbeautify:true, tests:true */

var cssbeautify;

if (typeof require === 'function') {
    cssbeautify = require('../cssbeautify');
}

function runTest(name, input, expected, options, reporter) {
    'use strict';
    var actual;

    if (typeof input !== 'string') {
        input = input.join('\n');
    }
    if (typeof expected !== 'string') {
        expected = expected.join('\n');
    }

    actual = cssbeautify(input, options);

    if (actual === expected) {
        reporter.reportSuccess(name, input, actual, expected);
    } else {
        reporter.reportFailure(name, input, actual, expected);
    }
}

function runTests(reporter) {
    'use strict';
    var i, entry, options, input, expected;

    for (i in tests) {
        if (tests.hasOwnProperty(i)) {
            entry = tests[i];
            options = entry.options || {};
            input = entry.input;
            expected = entry.expected;
            runTest(i, input, expected, options, reporter);
        }
    }
}

function executeBrowser() {
    'use strict';

    runTests({
        reportSuccess: function (name, input, actual) {
            var e;

            e = document.createElement('h2');
            e.textContent = name;
            document.getElementById('result').appendChild(e);

            e = document.createElement('pre');
            e.textContent = input;
            e.setAttribute('class', 'source');
            document.getElementById('result').appendChild(e);

            e = document.createElement('p');
            e.textContent = 'Formatted to';
            document.getElementById('result').appendChild(e);
            e = document.createElement('pre');
            e.textContent = actual;
            //e.setAttribute('class', 'ref');
            document.getElementById('result').appendChild(e);
        },

        reportFailure: function (name, input, actual, expected) {
            var e;

            e = document.createElement('h2');
            e.setAttribute('class', 'fail');
            e.textContent = 'FAIL: ' + name;
            document.getElementById('result').appendChild(e);

            e = document.createElement('pre');
            e.textContent = input;
            e.setAttribute('class', 'source');
            document.getElementById('result').appendChild(e);

            e = document.createElement('p');
            e.textContent = 'Expected:';
            document.getElementById('result').appendChild(e);
            e = document.createElement('pre');
            e.textContent = expected;
            e.setAttribute('class', 'ref');
            document.getElementById('result').appendChild(e);

            e = document.createElement('p');
            e.textContent = 'Actual:';
            document.getElementById('result').appendChild(e);
            e = document.createElement('pre');
            e.textContent = actual;
            e.setAttribute('class', 'result');
            document.getElementById('result').appendChild(e);
        }
    });
}

function executeCommandLine() {
    'use strict';

    var vm = require('vm'),
        fs = require('fs');

    vm.runInThisContext(fs.readFileSync(__dirname + '/test.js', 'utf-8'));

    runTests({
        reportSuccess: function (name, input, actual) {
            console.log('Testing', name, 'OK');
        },

        reportFailure: function (name, input, actual, expected) {
            console.log('Testing', name, 'FAILED');
            console.log();
            console.log('Style:');
            console.log(input);
            console.log();
            console.log('Expected:');
            console.log(expected);
            console.log();
            console.log('Actual:');
            console.log(actual);
            console.log();
            console.log();
        }
    });
}

if (typeof module !== 'undefined' && module.exports) {
    executeCommandLine();
    console.log();
}
