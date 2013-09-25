/**
* Bootstrap-Admin-Template by onokumus@gmail.com
* Version : 2.0.0 
* Author : Osman Nuri Okumuş 
* Copyright 2013
*/
/*
 Name    : style-switcher.js
 Author  : ono <http://onokumus.com />
 Version : 1.0
 */

// Load lesscss files
yepnope.addPrefix('less', function(resourceObj) {
    resourceObj.forceCSS = true;
    resourceObj.attrs = {
        'rel': 'stylesheet/less',
        'type': 'text/css'
    };
    return resourceObj;
});
var styleSwitcher = {
    init: function() {
        var $this = this;
        less = {env: "development"};

        // Style Switcher CSS
        yepnope([
            {load: 'assets/css/style-switcher.css'},
            {load: 'assets/lib/colorpicker/css/colorpicker.css'},
            {load: 'assets/lib/cssbeautify/cssbeautify.js'},
            {load: 'assets/lib/colorpicker/js/bootstrap-colorpicker.js',
                complete: function() {
                    yepnope([
                        {load: 'less!assets/less/theme.less'},
                        {load: 'assets/lib/less-1.4.2.min.js',
                            complete: function() {


                                $this.build();

                                if (Modernizr.localstorage) {
                                    if (localStorage.color) {
                                        $this.colorSelectorA.css('background-color', localStorage.color);
                                    }
                                    if (localStorage.pattern) {
                                        $this.patternImage = localStorage.pattern;
                                    }
                                }
                            }
                        }
                    ]);

                }
            }
        ]);

    },
    build: function() {
        var $this = this;
        var localStor = false;
        if (Modernizr.localstorage) {
            localStor = true;
        }

        if (Modernizr.localstorage) {
            if (localStorage.layout) {
                $('body').addClass(localStorage.layout);
            }
            if (localStorage.color) {
                $this.setColor(localStorage.color);
            }
            if (localStorage.pattern) {
                $('body').css({
                    'background': 'url(assets/img/pattern/' + localStorage.pattern + '.png) repeat'
                });
            }
        }

        var modalHTML = '<div id="getCSSModal" class="modal fade">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
            '<h4 class="modal-title">Theme CSS</h4>' +
            '<code>Copy textarea content and paste into theme.css</code>' +
            '</div> ' +
            '<div class="modal-body">' +
            '<div id="boxedBodyAlert" class="alert alert-info">' +
            'Please add the <strong>"fixed"</strong> class to the &lt;body&gt; element.' +
            '</div>' +
            '<div class="alert alert-info" id="sidebarPos">' +
            'Plase add the <strong>"side-right"</strong> class to the &lt;body&gt; element.' +
            '</div> ' +
            '<div id="sidebarWidth" class="alert alert-info">' +
            'Plase add the <strong>"mini-sidebar"</strong> class to the &lt;body&gt; element.' +
            '</div>' +
            '<div id="topNavStyle" class="alert alert-info">' +
            'Plase add the <strong>"padTop53"</strong> class to the &lt;body&gt; element.' +
            ' Remove <strong>"navbar-static-top"</strong> class and add the <strong>"navbar-fixed-top"</strong> class' +
            ' to the #top .navbar element.' +
            '</div>' +
            '<textarea class="form-control" name="cssbeautify" id="cssbeautify" readonly></textarea>' +
            '</div> ' +
            '<div class="modal-footer">' +
            '<button aria-hidden="true" data-dismiss="modal" class="btn btn-danger">Close</button>' +
            '</div> ' +
            '</div>' +
            '</div> ' +
            '</div>';


        $("body").append(modalHTML);

        var switchDiv = $('<div />').attr('id', 'style-switcher').addClass('style-switcher hidden-xs');

        var h5Ai = $('<i />').addClass('icon-cogs icon-2x');
        var h5A = $('<a />')
                .attr({
            'href': '#',
            'id': 'switcher-link'
        })
                .on('click', function(e) {
            e.preventDefault();
            switchDiv.toggleClass('open');
        })
                .append(h5Ai);

        var h5 = $('<h5 />').html('Style Switcher').append(h5A);


        var colorList = $('<ul />').addClass('options').attr('data-type', 'colors');
        var colors = [
            {"Hex": "#0088CC", "colorName": "Blue"},
            {"Hex": "#4EB25C", "colorName": "Green"},
            {"Hex": "#4A5B7D", "colorName": "Navy"},
            {"Hex": "#E05048", "colorName": "Red"},
            {"Hex": "#B8A279", "colorName": "Beige"},
            {"Hex": "#c71c77", "colorName": "Pink"},
            {"Hex": "#734BA9", "colorName": "Purple"},
            {"Hex": "#2BAAB1", "colorName": "Cyan"}
        ];
        $.each(colors, function(i) {
            var listElement = $('<li/>')
                    .append(
                    $('<a/>')
                    .css("background-color", colors[i].Hex)
                    .attr({
                "data-color-hex": colors[i].Hex,
                "data-color-name": colors[i].colorName,
                "href": "#",
                "title": colors[i].colorName
            }).tooltip({'placement': 'bottom'})
                    );
            colorList.append(listElement);
        });


        colorList.find('a').on('click', function(e) {
            e.preventDefault();
            $this.setColor($(this).data('colorHex'));

            if (localStor) {
                localStorage.color = $(this).data('colorHex');
            }
        });
        var colorSelector = $('<div/>')
                .addClass('color-picker').attr({
            'id': 'colorSelector',
            'data-color': colors[0].Hex,
            'data-color-format': 'hex'
        }).append(
                $('<a/>')
                .css('background-color', colors[0].Hex)
                .attr({
            'href': '#',
            'id': 'colorSelectorA'
        }),
        $("<span />").addClass("color-picker-icon")
                );

        colorSelector.colorpicker().on('changeColor', function(ev) {
            colorSelector.find("a").css("background-color", ev.color.toHex());
            $this.setColor(ev.color.toHex());
            if (localStor) {
                localStorage.color = $(this).data('colorHex');
            }
        });


        var colorPicker = $('<li/>').append(colorSelector);

        colorList.append(colorPicker);

        var styleSwitcherWrap = $('<div />')
                .addClass('style-switcher-wrap')
                .append(
                $('<h6 />').html('Colors'), colorList, $('<hr/>')
                );

        var boxLink = $('<a/>')
                .attr({
            'id': 'boxLink',
            'href': '#',
            'data-layout-type': 'fixed'
        })
                .html('Fixed')
                .on('click', function(e) {
            e.preventDefault();
            $(this).addClass('active').siblings('a').removeClass('active');
            $('body').removeClass('wide').addClass('fixed');
            if (localStor) {
                localStorage.layout = 'fixed';
            }
        });

        var wideLink = $('<a/>')
                .attr({
            'href': '#',
            'id': 'wideLink',
            'data-layout-type': 'wide'
        })
                .html('Wide')
                .on('click', function(e) {
            e.preventDefault();
            $(this).addClass('active').siblings('a').removeClass('active');
            $('body').removeClass('fixed').addClass('wide').removeAttr('style');
            if (localStor) {
                localStorage.layout = 'wide';
            }
        });
        if (localStor) {
            if (localStorage.layout === 'fixed') {
                boxLink.addClass('active');
            } else {
                wideLink.addClass('active');
            }
        }
        styleSwitcherWrap.append(
                $('<div/>').addClass('options-link boxedFixedBody').append(
                $('<h6/>').html('Layout Style'),
                boxLink,
                wideLink
                ));

        var topNavBarStatic = $('<a/>').html('Static').attr('href', '#').on('click', function(e) {
            e.preventDefault();
            $(this).addClass('active').siblings('a').removeClass('active');
            $('body').removeClass('padTop53');
            $('#top .navbar').removeClass('navbar-fixed-top').addClass('navbar-static-top');
        });
        var topNavBarFixed = $('<a/>').html('Fixed').attr('href', '#').on('click', function(e) {
            e.preventDefault();
            $(this).addClass('active').siblings('a').removeClass('active');
            $('body').addClass('padTop53');
            $('#top .navbar').removeClass('navbar-static-top').addClass('navbar-fixed-top');
        });
        styleSwitcherWrap.append(
                $('<div/>').addClass('options-link').append(
                $('<h6/>').html('Top Nav Bar Style'),
                topNavBarStatic,
                topNavBarFixed
                )
                );

        var patternList = $('<ul />').addClass('options').attr('data-type', 'pattern');

        var patternImages = [
            {'image': 'brillant', 'title': 'Brillant'},
            {'image': 'always_grey', 'title': 'Always Grey'},
            {'image': 'retina_wood', 'title': 'Retina Wood'},
            {'image': 'low_contrast_linen', 'title': 'Low Constrat Linen'},
            {'image': 'egg_shell', 'title': 'Egg Shel'},
            {'image': 'cartographer', 'title': 'Cartographer'},
            {'image': 'batthern', 'title': 'Batthern'},
            {'image': 'noisy_grid', 'title': 'Noisy Grid'},
            {'image': 'diamond_upholstery', 'title': 'Diamond Upholstery'},
            {'image': 'greyfloral', 'title': 'Gray Floral'},
            {'image': 'white_tiles', 'title': 'White Tiles'},
            {'image': 'gplaypattern', 'title': 'GPlay'},
            {'image': 'arches', 'title': 'Arches'},
            {'image': 'purty_wood', 'title': 'Purty Wood'},
            {'image': 'diagonal_striped_brick', 'title': 'Diagonal Striped Brick'},
            {'image': 'large_leather', 'title': 'Large Leather'},
            {'image': 'bo_play_pattern', 'title': 'BO Play'},
            {'image': 'irongrip', 'title': 'Iron Grip'},
            {'image': 'wood_1', 'title': 'Dark Wood'},
            {'image': 'pool_table', 'title': 'Pool Table'},
            {'image': 'crissXcross', 'title': 'crissXcross'},
            {'image': 'rip_jobs', 'title': 'R.I.P Steve Jobs'},
            {'image': 'random_grey_variations', 'title': 'Random Grey Variations'},
            {'image': 'carbon_fibre', 'title': 'Carbon Fibre'}
        ];

        $.each(patternImages, function(i) {
            var listElement = $('<li/>')
                    .append(
                    $('<a/>')
                    .css({
                'background': 'url(assets/img/pattern/' + patternImages[i].image + '.png) repeat'
            })
                    .attr({
                'href': '#',
                'title': patternImages[i].title,
                'data-pattern-image': patternImages[i].image
            }).tooltip({'placement': 'bottom'})
                    );
            patternList.append(listElement);
        });

        patternList.find('a').on('click', function(e) {
            e.preventDefault();
            $('body').css({
                'background-image': 'url(assets/img/pattern/' + $(this).data('patternImage') + '.png)',
                'background-repeat': ' repeat'
            });
            $this.patternImage = $(this).data('patternImage');
            if (localStor) {
                localStorage.pattern = $(this).data('patternImage');
            }
        });

        styleSwitcherWrap.append(
                $('<div/>').addClass('pattern').append(
                $('<h6/>').html('Background Pattern'),
                patternList
                )
                );


        var sideLeftLink = $('<a/>').html('Left').attr('href', '#').on('click', function(e) {
            e.preventDefault();
            $(this).addClass('active');
            sideRightLink.removeClass('active');
            $('body').removeClass('side-right');
            $('#sidebarPos').addClass('');
        });
        var sideRightLink = $('<a/>').html('Right').attr('href', '#').on('click', function(e) {
            e.preventDefault();
            $(this).addClass('active');
            sideLeftLink.removeClass('active');
            $('body').addClass('side-right');
        });
        styleSwitcherWrap.append(
                $('<hr/>'),
                $('<div/>').addClass('options-link sidebarOpt').append(
                $('<h6/>').html('Side Bar Position'),
                sideLeftLink,
                sideRightLink
                )
                );
        var sideMiniLink = $('<a/>').html('Mini').attr('href', '#').on('click', function(e) {
            e.preventDefault();
            $(this).addClass('active');
            sideMaxiLink.removeClass('active');
            $('body').addClass('mini-sidebar');
        });
        var sideMaxiLink = $('<a/>').html('Maxi').attr('href', '#').on('click', function(e) {
            e.preventDefault();
            $(this).addClass('active');
            sideMiniLink.removeClass('active');
            $('body').removeClass('mini-sidebar');
        });

        styleSwitcherWrap.append(
                $('<hr/>'),
                $('<div/>').addClass('options-link sidebarOpt visible-lg').append(
                $('<h6/>').html('Side Bar Width'),
                sideMiniLink,
                sideMaxiLink
                )
                );

        var resetLink = $('<a/>')
                .html('Reset')
                .attr('href', '#')
                .on('click', function(e) {
            e.preventDefault();
            $this.reset();
        });

        var cssLink = $('<a/>')
                .html('Get CSS')
                .attr('href', '#').on('click', function(e) {
            e.preventDefault();
            $this.getCss();
        });

        styleSwitcherWrap.append(
                $('<div/>').addClass('options-link').append(
                $('<hr/>'),
                resetLink,
                cssLink
                )
                );

        switchDiv.append(h5, styleSwitcherWrap);
        $('body').append(switchDiv);

        $this.colorSelectorA = $('#colorSelectorA');
    },
    setColor: function(color) {
        $('#colorSelector').data('color', color);
        $('#colorSelectorA').css('background-color', color);
        less.modifyVars({'@baseColor': color});
        if (Modernizr.localstorage) {
            localStorage.color = color;
        }
    },
    reset: function() {
        if (Modernizr.localstorage) {
            localStorage.removeItem('color');
            localStorage.removeItem('layout');
            localStorage.removeItem('pattern');
        }
        $('#wideLink').click();
        window.location.reload();
        return false;
    },
    getCss: function() {
        var $this = this;
        var raw = "", options;
        var isBoxed = $('body').hasClass('fixed');

        var cssBeautify = $('#cssbeautify');
        if (isBoxed) {
            raw = 'body { background-image: url("../img/pattern/' + $this.patternImage + '.png"); }';
            $('#boxedBodyAlert').removeClass('hide');
        } else {
            $('#boxedBodyAlert').addClass('hide');
        }
        cssBeautify.text("");
        raw = raw + $('style[id^="less:"]').text();
        options = {
            indent: "\t",
            autosemicolon: true
        };
        cssBeautify.text(cssbeautify(raw, options));
        $("#getCSSModal").modal("show");
    }
};

styleSwitcher.init();
