window.fakeStorage = {
    _data: {
    },
    setItem: function (id, val) {
        return this._data[id] = String(val);
    },
    getItem: function (id) {
        return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
    },
    removeItem: function (id) {
        return delete this._data[id];
    },
    clear: function () {
        return this._data = {
        };
    }
};
function LocalStorageManager() {
    this.bgColor = 'bgColor';
    this.fgcolor = 'fgcolor';
    this.bgImage = 'bgImage';
    var supported = this.localStorageSupported();
    this.storage = supported ? window.localStorage : window.fakeStorage;
}
LocalStorageManager.prototype.localStorageSupported = function () {
    var testKey = 'test';
    var storage = window.localStorage;
    try {
        storage.setItem(testKey, '1');
        storage.removeItem(testKey);
        return true;
    } catch (error) {
        return false;
    }
};
LocalStorageManager.prototype.getBgColor = function () {
    return this.storage.getItem(this.bgColor) || '#333';
};
LocalStorageManager.prototype.setBgColor = function (color) {
    this.storage.setItem(this.bgColor, color);
};
LocalStorageManager.prototype.getFgColor = function () {
    return this.storage.getItem(this.fgColor) || '#fff';
};
LocalStorageManager.prototype.setFgColor = function (color) {
    this.storage.setItem(this.fgColor, color);
};
LocalStorageManager.prototype.getBgImage = function () {
    return this.storage.getItem(this.bgImage) || 'arches';
};
LocalStorageManager.prototype.setBgImage = function (image) {
    this.storage.setItem(this.bgImage, image);
};
LocalStorageManager.prototype.clearItems = function () {
    this.storage.removeItem(this.bgColor);
    this.storage.removeItem(this.fgColor);
    this.storage.removeItem(this.bgImage);
};
function InputTypeManager() {
    var ci = this.colorTypeSupported();
    this.ci = ci;
}
InputTypeManager.prototype.colorTypeSupported = function () {
    var ci = document.createElement('input');
    ci.setAttribute('type', 'color');
    return ci.type !== 'text';
};

StyleSwitcher = function () {

    this.inputManager = new InputTypeManager();
    this.storageManager = new LocalStorageManager();

    this.init();
};
StyleSwitcher.prototype.init = function () {  
    this.showChange();
    this.build();
};

StyleSwitcher.prototype.showChange = function () {
    this.bgColor = this.storageManager.getBgColor();
    this.fgColor = this.storageManager.getFgColor();
    this.bgImage = this.storageManager.getBgImage();
    this.postLess(this.bgColor, this.fgColor, this.bgImage);
};

StyleSwitcher.prototype.build = function () {
   
    var $this = this;
    $this.storageManager = new LocalStorageManager();

    var winlocpath = window.location.pathname.toString();
    var imgPath = "";

    if ($('body').css('direction') === "rtl") {
        $('body').addClass('rtl');
    }

    if (winlocpath.indexOf("/rtl/") > -1) {
        imgPath += "../";
    }

    $('body').css({
        'background-image': 'url(' + imgPath + 'assets/img/pattern/' + $this.storageManager.getBgImage() + '.png)',
        'background-repeat': ' repeat'
    });
    var modalHTML = '<div id="getCSSModal" class="modal fade">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
        '<h4 class="modal-title">Theme CSS</h4>' +
        '<code>Copy textarea content and paste into theme.css</code>' +
        '</div> ' +
        '<div class="modal-body">' +
        '<textarea class="form-control" name="cssbeautify" id="cssbeautify" readonly></textarea>' +
        '</div> ' +
        '<div class="modal-footer">' +
        '<button aria-hidden="true" data-dismiss="modal" class="btn btn-danger">Close</button>' +
        '</div> ' +
        '</div>' +
        '</div> ' +
        '</div>';
    $('body').append(modalHTML);
    var switchDiv = $('<div />').attr('id', 'style-switcher').addClass('style-switcher hidden-xs');
    var h5Ai = $('<i />').addClass('fa fa-cogs fa-2x');
    var h5A = $('<a />').attr({
        'href': '#',
        'id': 'switcher-link'
    }).on(Metis.buttonPressedEvent, function (e) {
        e.preventDefault();
        switchDiv.toggleClass('open');
        $(this).find('i').toggleClass('fa-spin');
    }).append(h5Ai);
    var h5 = $('<h5 />').html('Style Switcher').append(h5A);
    var colorList = $('<ul />').addClass('options').attr('data-type', 'colors');
    var colors = [
        {
            'Hex': '#0088CC',
            'colorName': 'Blue'
        },
        {
            'Hex': '#4EB25C',
            'colorName': 'Green'
        },
        {
            'Hex': '#4A5B7D',
            'colorName': 'Navy'
        },
        {
            'Hex': '#E05048',
            'colorName': 'Red'
        },
        {
            'Hex': '#B8A279',
            'colorName': 'Beige'
        },
        {
            'Hex': '#c71c77',
            'colorName': 'Pink'
        },
        {
            'Hex': '#734BA9',
            'colorName': 'Purple'
        },
        {
            'Hex': '#2BAAB1',
            'colorName': 'Cyan'
        }
    ];
    $.each(colors, function (i) {
        var listElement = $('<li/>').append($('<a/>').css('background-color', colors[i].Hex).attr({
                'data-color-hex': colors[i].Hex,
                'data-color-name': colors[i].colorName,
                'href': '#',
                'title': colors[i].colorName
            }).tooltip({
                'placement': 'bottom'
            })
        );
        colorList.append(listElement);
    });

    var colorSelector;
    var itm = new InputTypeManager();
    if (itm.ci) {
        colorSelector = $('<input/>').addClass('color-picker-icon').attr({
            'id': 'colorSelector',
            'type': 'color'
        }).val($this.storageManager.getBgColor());
        colorSelector.on('change', function (ev) {
            $this.storageManager.setBgColor($(this).val());
            $this.showChange();
        });

    } else {
        var colorSelStyle = $('<link/>')
            .attr({
                'rel': 'stylesheet',
                'href': imgPath + 'assets/lib/colorpicker/css/colorpicker.css'
            }),
            colorSelHackStyle = $('<link/>').attr({
                'rel': 'stylesheet',
                'href': imgPath + 'assets/css/colorpicker_hack.css'
            });
        colorSelector = $('<div/>').addClass('color-picker').attr({
            'id': 'colorSelector',
            'data-color': $this.storageManager.getBgColor(),
            'data-color-format': 'hex'
        });
        var url = imgPath + 'assets/lib/colorpicker/js/bootstrap-colorpicker.js';
        $.getScript(url, function () {
            $('head').append(colorSelStyle, colorSelHackStyle);


            colorSelector.append(
                $('<a/>')
                    .css({
                        'background-color': $this.storageManager.getBgColor()
                    })
                    .attr({
                        'href': '#',
                        'id': 'colorSelectorA'
                    })
            );
            colorSelector.colorpicker().on('changeColor', function (ev) {
                colorSelector.find('a').css('background-color', ev.color.toHex());
                $this.storageManager.setBgColor(ev.color.toHex());
                $this.showChange();
            });
        });
    }


    var colorPicker = $('<li/>').append(colorSelector);

    colorList.find('a').on(Metis.buttonPressedEvent, function (e) {
        e.preventDefault();
        $this.storageManager.setBgColor($(this).data('colorHex'));
        $this.showChange();

        colorSelector.attr('data-color', $(this).data('colorHex'));
        colorSelector.val($(this).data('colorHex'));
        colorSelector.find('a').css('background-color', $(this).data('colorHex'));
    });


    colorList.append(colorPicker);

    var styleSwitcherWrap = $('<div />')
        .addClass('style-switcher-wrap')
        .append($('<h6 />').html('Background Colors'), colorList, $('<hr/>'));

    var fgwbtn = $('<input/>').attr({
        'type': 'radio',
        'name': 'fgcolor'
    }).val('#ffffff').on('change', function (e) {
        $this.storageManager.setFgColor('#ffffff');
        $this.showChange();
    });
    var fontWhite = $('<label/>').addClass('btn btn-xs btn-primary').html('White').append(fgwbtn);
    var fgbbtn = $('<input/>').attr({
        'type': 'radio',
        'name': 'fgcolor'
    }).val('#333333').on('change', function (e) {
        $this.storageManager.setFgColor('#333333');
        $this.showChange();
    });
    var fontBlack = $('<label/>').addClass('btn btn-xs btn-danger').html('Black').append(fgbbtn);
    var fgBtnGroup = $('<div/>').addClass('btn-group').attr('data-toggle', 'buttons').append(fontWhite, fontBlack);
    styleSwitcherWrap.append($('<div/>').addClass('options-link').append($('<h6/>').html('Font Colors'), fgBtnGroup));
    var patternList = $('<ul />').addClass('options').attr('data-type', 'pattern');
    var patternImages = [
        {
            'image': 'brillant',
            'title': 'Brillant'
        },
        {
            'image': 'always_grey',
            'title': 'Always Grey'
        },
        {
            'image': 'retina_wood',
            'title': 'Retina Wood'
        },
        {
            'image': 'low_contrast_linen',
            'title': 'Low Constrat Linen'
        },
        {
            'image': 'egg_shell',
            'title': 'Egg Shel'
        },
        {
            'image': 'cartographer',
            'title': 'Cartographer'
        },
        {
            'image': 'batthern',
            'title': 'Batthern'
        },
        {
            'image': 'noisy_grid',
            'title': 'Noisy Grid'
        },
        {
            'image': 'diamond_upholstery',
            'title': 'Diamond Upholstery'
        },
        {
            'image': 'greyfloral',
            'title': 'Gray Floral'
        },
        {
            'image': 'white_tiles',
            'title': 'White Tiles'
        },
        {
            'image': 'gplaypattern',
            'title': 'GPlay'
        },
        {
            'image': 'arches',
            'title': 'Arches'
        },
        {
            'image': 'purty_wood',
            'title': 'Purty Wood'
        },
        {
            'image': 'diagonal_striped_brick',
            'title': 'Diagonal Striped Brick'
        },
        {
            'image': 'large_leather',
            'title': 'Large Leather'
        },
        {
            'image': 'bo_play_pattern',
            'title': 'BO Play'
        },
        {
            'image': 'irongrip',
            'title': 'Iron Grip'
        },
        {
            'image': 'wood_1',
            'title': 'Dark Wood'
        },
        {
            'image': 'pool_table',
            'title': 'Pool Table'
        },
        {
            'image': 'crissXcross',
            'title': 'crissXcross'
        },
        {
            'image': 'rip_jobs',
            'title': 'R.I.P Steve Jobs'
        },
        {
            'image': 'random_grey_variations',
            'title': 'Random Grey Variations'
        },
        {
            'image': 'carbon_fibre',
            'title': 'Carbon Fibre'
        }
    ];
    $.each(patternImages, function (i) {
        var listElement = $('<li/>').append($('<a/>').css({
                'background': 'url(' + imgPath + 'assets/img/pattern/' + patternImages[i].image + '.png) repeat'
            }).attr({
                'href': '#',
                'title': patternImages[i].title,
                'data-pattern-image': patternImages[i].image
            }).tooltip({
                'placement': 'bottom'
            })
        );
        patternList.append(listElement);
    });
    patternList.find('a').on(Metis.buttonPressedEvent, function (e) {
        e.preventDefault();
        $('body').css({
            'background-image': 'url(' + imgPath + 'assets/img/pattern/' + $(this).data('patternImage') + '.png)',
            'background-repeat': ' repeat'
        });
        $this.patternImage = $(this).data('patternImage');

        $this.storageManager.setBgImage($this.patternImage);
        $this.showChange();
    });
    styleSwitcherWrap.append($('<div/>').addClass('pattern').append($('<h6/>').html('Background Pattern'), patternList
        )
    );
    var resetLink = $('<a/>').html('Reset').attr('href', '#').on(Metis.buttonPressedEvent, function (e) {
        $this.reset();
        e.preventDefault();
    });
    var cssLink = $('<a/>').html('Get CSS').attr('href', '#').on(Metis.buttonPressedEvent, function (e) {
        e.preventDefault();
        $this.getCss();
    });
    styleSwitcherWrap.append($('<div/>').addClass('options-link').append($('<hr/>'), resetLink, cssLink
        )
    );
    switchDiv.append(h5, styleSwitcherWrap);
    $('body').append(switchDiv);
};
StyleSwitcher.prototype.postLess = function (bgColor, fgColor, bgImage) {


    this.bgc = bgColor;
    this.fgc = fgColor;
    this.bgi = bgImage;

    less.modifyVars({
        '@bgColor': this.bgc,
        '@fgColor': this.fgc,
        '@bgImage': this.bgi
    });
};
StyleSwitcher.prototype.getCss = function () {
    var $this = this;
    var raw = '',
        options;
    var isFixed = $('body').hasClass('fixed');
    var cssBeautify = $('#cssbeautify');
    if (isFixed) {
        raw = 'body { background-image: url("../img/pattern/' + $this.patternImage + '.png"); }';
        $('#boxedBodyAlert').removeClass('hide');
    } else {
        $('#boxedBodyAlert').addClass('hide');
    }
    cssBeautify.text('');
    raw = raw + $('style[id^="less:"]').text();
    cssBeautify.text(raw);
    $('#getCSSModal').modal('show');
};

StyleSwitcher.prototype.reset = function () {
    this.storageManager.clearItems();
    this.showChange();
};
window.StyleSwitcher = new StyleSwitcher();