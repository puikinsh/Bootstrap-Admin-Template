/**
 * bootstrap-admin-template - Free Admin Template Based On Twitter Bootstrap 3.x
 * @version 3.0.0-alpha
 * @license MIT
 * @link https://github.com/puikinsh/Bootstrap-Admin-Template
 */

(function () {
    'use strict';

    (function($, Metis) {
        var $button = $('.inner a.btn');
        Metis.metisButton = function() {
            $.each($button, function() {
                $(this).popover({
                    placement: 'bottom',
                    title: this.innerHTML,
                    content: this.outerHTML,
                    trigger: (Metis.isTouchDevice) ? 'touchstart' : 'hover'
                });
            });
        };
        return Metis;
    })(jQuery, Metis || {});

    (function($, Metis) {
      
      
        var d2 = [
              [0, 3],
              [1, 8],
              [2, 5],
              [3, 13],
              [4, 1]
            ],
            d3 = [
              [0, 12],
              [2, 2],
              [3, 9],
              [4, 4]
            ],
            parabola = [],
            parabola2 = [],
            circle = [],
            heartA = [],
            bernoulliA = [],
            human = $("#human"),
            eye = $("#eye"),
            bar = $("#bar");
            $("#heart");
            $("#bernoilli");
            
        function lemniscatex(i) {
          return Math.sqrt(2) * Math.cos(i) / (Math.pow(Math.sin(i), 2) + 1);
        }

        function lemniscatey(i) {
          return Math.sqrt(2) * Math.cos(i) * Math.sin(i) / (Math.pow(Math.sin(i), 2) + 1);
        }
        Metis.MetisChart = function() {
          // Plugin check
          if(!$().plot) {
            throw new Error('flot plugin require form MetisChart');
          }
          // Human charts
          $.plot(human,
            [
              {data: d2, label: 'MAN'},
              {data: d3, label: 'WOMAN'}
            ],
            {
              clickable: true,
              hoverable: true,
              series: {
                lines: {
                  show: true,
                  fill: true,
                  fillColor: {
                    colors: [
                      {opacity: 0.5},
                      {opacity: 0.15}
                    ]
                  }
                },
                points: {show: true}
              }
            }
          );
          
          // BAR charts
          $.plot(bar,
            [{
              data: d2,
              label: 'BAR'
            }],
            {
              clickable: true,
              hoverable: true,
              series: {
                bars: {show: true, barWidth: 0.6},
                points: {show: true}
              }
            });
          
          // EYE charts
          for (var i = -5; i <= 5; i += 0.5) {
            parabola.push([i, Math.pow(i, 2) - 25]);
            parabola2.push([i, -Math.pow(i, 2) + 25]);
          }

          for (var c = -2; c <= 2.1; c += 0.1) {
            circle.push([c, Math.sqrt(400 - c * c * 100)]);
            circle.push([c, -Math.sqrt(400 - c * c * 100)]);
          }
          
          $.plot(eye, [
            {data: parabola2, lines: {show: true, fill: true}},
            {data: parabola, lines: {show: true, fill: true}},
            {data: circle, lines: {show: true}}
          ]);
          
          // HEART charts
          for (i = -2; i <= 5; i += 0.01) {
            heartA.push([16 * Math.pow(Math.sin(i), 3), 13 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i)]);
          }
          $.plot($("#heart"), [
              {data: heartA, label: '<i class="fa fa-heart"></i>', color: '#9A004D'}
            ],
            {
              series: {
                  lines: {show: true, fill: true},
                  points: {show: false}
              },
              yaxis: {show: true},
              xaxis: {show: true}
            }
          );
          $('#heart .legendLabel').addClass('animated pulse');
          setInterval(function () {
              $('#heart .legendLabel .fa.fa-heart').toggleClass('fa-2x');
          }, 400);
          
          // BERNOILLI charts
          for (var k = 0; k <= 2 * Math.PI; k += 0.01) {
            bernoulliA.push([lemniscatex(k), lemniscatey(k)]);
          }
          $.plot($("#bernoilli"), [
            {data: bernoulliA, label: 'Lemniscate of Bernoulli', lines: {show: true, fill: true}}
          ]);
        };
      return Metis;
    })(jQuery, Metis || {});

    (function($){
      Metis.dashboard = function() {
        

        //----------- BEGIN SPARKLINE CODE -------------------------*/
        // required jquery.sparkline.min.js*/

        /** This code runs when everything has been loaded on the page */
        /* Inline sparklines take their values from the contents of the tag */
        $('.inlinesparkline').sparkline();

        /* Sparklines can also take their values from the first argument
         passed to the sparkline() function */
        var myvalues = [10, 8, 5, 7, 4, 4, 1];
        $('.dynamicsparkline').sparkline(myvalues);

        /* The second argument gives options such as chart type */
        $('.dynamicbar').sparkline(myvalues, {type: 'bar', barColor: 'green'});

        /* Use 'html' instead of an array of values to pass options
         to a sparkline with data in the tag */
        $('.inlinebar').sparkline('html', {type: 'bar', barColor: 'red'});


        $(".sparkline.bar_week").sparkline([5, 6, 7, 2, 0, -4, -2, 4], {
            type: 'bar',
            height: '40',
            barWidth: 5,
            barColor: '#4d6189',
            negBarColor: '#a20051'
        });

        $(".sparkline.line_day").sparkline([5, 6, 7, 9, 9, 5, 4, 6, 6, 4, 6, 7], {
            type: 'line',
            height: '40',
            drawNormalOnTop: false
        });

        $(".sparkline.pie_week").sparkline([1, 1, 2], {
            type: 'pie',
            width: '40',
            height: '40'
        });

        $('.sparkline.stacked_month').sparkline(['0:2', '2:4', '4:2', '4:1'], {
            type: 'bar',
            height: '40',
            barWidth: 10,
            barColor: '#4d6189',
            negBarColor: '#a20051'
        });
        //----------- END SPARKLINE CODE -------------------------*/


        //----------- BEGIN FULLCALENDAR CODE -------------------------*/

        const calendarEl = document.getElementById('calendar');
        const calendar = new FullCalendar.Calendar(calendarEl, {
          initialView: 'dayGridMonth',
          themeSystem: 'bootstrap5'
        });
        calendar.render();
        /*----------- END FULLCALENDAR CODE -------------------------*/



        /*----------- BEGIN CHART CODE -------------------------*/
        var sin = [], cos = [];
        for (var i = 0; i < 14; i += 0.5) {
            sin.push([i, Math.sin(i)]);
            cos.push([i, Math.cos(i)]);
        }

        $.plot($("#trigo"),
                [
                    {
                        data: sin,
                        label: "sin(x)",
                        points: {
                            fillColor: "#4572A7",
                            size: 5
                        },
                        color: '#4572A7'
                    },
                    {
                        data: cos,
                        label: "cos(x)",
                        points: {
                            fillColor: "#333",
                            size: 35
                        },
                        color: '#AA4643'
                    }
                ], {
            series: {
                lines: {
                    show: true
                },
                points: {
                    show: true
                }
            },
            grid: {
                hoverable: true,
                clickable: true
            },
            yaxis: {
                min: -1.2,
                max: 1.2
            }
        });

        function showTooltip(x, y, contents) {
            $('<div id="tooltip">' + contents + '</div>').css({
                position: 'absolute',
                display: 'none',
                top: y + 5,
                left: x + 5,
                border: '1px solid #fdd',
                padding: '2px',
                'background-color': '#000',
                color: '#fff'
            }).appendTo("body").fadeIn(200);
        }

        var previousPoint = null;
        $("#trigo").bind("plothover", function(event, pos, item) {
            $("#x").text(pos.x.toFixed(2));
            $("#y").text(pos.y.toFixed(2));

            if (item) {
                if (previousPoint !== item.dataIndex) {
                    previousPoint = item.dataIndex;

                    $("#tooltip").remove();
                    var x = item.datapoint[0].toFixed(2),
                            y = item.datapoint[1].toFixed(2);

                    showTooltip(item.pageX, item.pageY,
                            item.series.label + " of " + x + " = " + y);
                }
            }
            else {
                $("#tooltip").remove();
                previousPoint = null;
            }
        });
        /*----------- END CHART CODE -------------------------*/

        /*----------- BEGIN TABLESORTER CODE -------------------------*/
        /* required jquery.tablesorter.min.js*/
        $(".sortableTable").tablesorter({theme : "bootstrap",});
        /*----------- END TABLESORTER CODE -------------------------*/

    };
      return Metis;
    })(jQuery);

    (function($){

      Metis.formGeneral = function() {

        $('.with-tooltip').tooltip({
            selector: ".input-tooltip"
        });

        /*----------- BEGIN autosize CODE -------------------------*/
        if($('#autosize').length){
            $('#autosize').autosize();
        }
        /*----------- END autosize CODE -------------------------*/

        /*----------- BEGIN inputlimiter CODE -------------------------*/
        $('#limiter').inputlimiter({
            limit: 140,
            remText: 'You only have %n character%s remaining...',
            limitText: 'You\'re allowed to input %n character%s into this field.'
        });
        /*----------- END inputlimiter CODE -------------------------*/

        /*----------- BEGIN tagsInput CODE -------------------------*/
        $('#tags').tagsInput();
        /*----------- END tagsInput CODE -------------------------*/

        /*----------- BEGIN chosen CODE -------------------------*/

        $(".chzn-select").chosen();
        $(".chzn-select-deselect").chosen({
            allow_single_deselect: true
        });
        /*----------- END chosen CODE -------------------------*/

        /*----------- BEGIN spinner CODE -------------------------*/
    //     DEPRECATED
    //     $('#spin1').spinner();
    //     $("#spin2").spinner({
    //         step: 0.01,
    //         numberFormat: "n"
    //     });
    //     $("#spin3").spinner({
    //         culture: 'en-US',
    //         min: 5,
    //         max: 2500,
    //         step: 25,
    //         start: 1000,
    //         numberFormat: "C"
    //     });
        /*----------- END spinner CODE -------------------------*/

        /*----------- BEGIN uniform CODE -------------------------*/
        $('.uniform').uniform();
        /*----------- END uniform CODE -------------------------*/

        /*----------- BEGIN colorpicker CODE -------------------------*/
        $('#cp1').colorpicker({
            format: 'hex'
        });
        $('#cp2').colorpicker();
        $('#cp3').colorpicker();
        $('#cp4').colorpicker().on('changeColor', function(ev) {
            $('#colorPickerBlock').css('background-color', ev.color.toHex());
        });
        /*----------- END colorpicker CODE -------------------------*/

        /*----------- BEGIN datepicker CODE -------------------------*/
        $('#dp1').datepicker({
            format: 'mm-dd-yyyy'
        });
        $('#dp2').datepicker();
        $('#dp3').datepicker();
        $('#dp3').datepicker();
        $('#dpYears').datepicker();
        $('#dpMonths').datepicker();


        var startDate = new Date(2014, 1, 20);
        var endDate = new Date(2014, 1, 25);
        $('#dp4').datepicker()
                .on('changeDate', function(ev) {
            if (ev.date.valueOf() > endDate.valueOf()) {
                $('#alert').show().find('strong').text('The start date can not be greater then the end date');
            } else {
                $('#alert').hide();
                startDate = new Date(ev.date);
                $('#startDate').text($('#dp4').data('date'));
            }
            $('#dp4').datepicker('hide');
        });
        $('#dp5').datepicker()
                .on('changeDate', function(ev) {
            if (ev.date.valueOf() < startDate.valueOf()) {
                $('#alert').show().find('strong').text('The end date can not be less then the start date');
            } else {
                $('#alert').hide();
                endDate = new Date(ev.date);
                $('#endDate').text($('#dp5').data('date'));
            }
            $('#dp5').datepicker('hide');
        });
        /*----------- END datepicker CODE -------------------------*/

        /*----------- BEGIN daterangepicker CODE -------------------------*/
        $('#reservation').daterangepicker();

        $('#reportrange').daterangepicker(
                {
                    ranges: {
                        'Today': [moment(), moment()],
                        'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
                        'Last 7 Days': [moment().subtract('days', 6), moment()],
                        'Last 30 Days': [moment().subtract('days', 29), moment()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                        'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
                    }
                },
        function(start, end) {
            $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        }
        );
        /*----------- END daterangepicker CODE -------------------------*/

        /*----------- BEGIN timepicker CODE -------------------------*/
        //     DEPRECATED
        // $('.timepicker-default').timepicker();
        //
        // $('.timepicker-24').timepicker({
        //     minuteStep: 1,
        //     showSeconds: true,
        //     showMeridian: false
        // });
        $('#datetimepicker4').datetimepicker({
          pickDate: false
        });
        /*----------- END timepicker CODE -------------------------*/

        /*----------- BEGIN toggleButtons CODE -------------------------*/
        $.each($('.make-switch'), function () {
            $(this).bootstrapSwitch({
                onText: $(this).data('onText'),
                offText: $(this).data('offText'),
                onColor: $(this).data('onColor'),
                offColor: $(this).data('offColor'),
                size: $(this).data('size'),
                labelText: $(this).data('labelText')
            });
        });
        /*----------- END toggleButtons CODE -------------------------*/

        /*----------- BEGIN dualListBox CODE -------------------------*/
    //     DEPRECATED
    //     $.configureBoxes();
        /*----------- END dualListBox CODE -------------------------*/
    };

      return Metis;
    })(jQuery);

    (function($){
      
      Metis.formValidation = function() {
        /*----------- BEGIN validationEngine CODE -------------------------*/
        $('#popup-validation').validationEngine();
        /*----------- END validationEngine CODE -------------------------*/

        /*----------- BEGIN validate CODE -------------------------*/
        $('#inline-validate').validate({
            rules: {
                required: "required",
                email: {
                    required: true,
                    email: true
                },
                date: {
                    required: true,
                    date: true
                },
                url: {
                    required: true,
                    url: true
                },
                password: {
                    required: true,
                    minlength: 5
                },
                confirm_password: {
                    required: true,
                    minlength: 5,
                    equalTo: "#password"
                },
                agree: "required",
                minsize: {
                    required: true,
                    minlength: 3
                },
                maxsize: {
                    required: true,
                    maxlength: 6
                },
                minNum: {
                    required: true,
                    min: 3
                },
                maxNum: {
                    required: true,
                    max: 16
                }
            },
            errorClass: 'help-block col-lg-6',
            errorElement: 'span',
            highlight: function(element, errorClass, validClass) {
                $(element).parents('.form-group').removeClass('has-success').addClass('has-error');
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).parents('.form-group').removeClass('has-error').addClass('has-success');
            }
        });


        $('#block-validate').validate({
            rules: {
                required2: "required",
                email2: {
                    required: true,
                    email: true
                },
                date2: {
                    required: true,
                    date: true
                },
                url2: {
                    required: true,
                    url: true
                },
                password2: {
                    required: true,
                    minlength: 5
                },
                confirm_password2: {
                    required: true,
                    minlength: 5,
                    equalTo: "#password2"
                },
                agree2: "required",
                digits: {
                    required: true,
                    digits: true
                },
                range: {
                    required: true,
                    range: [5, 16]
                }
            },
            errorClass: 'help-block',
            errorElement: 'span',
            highlight: function(element, errorClass, validClass) {
                $(element).parents('.form-group').removeClass('has-success').addClass('has-error');
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).parents('.form-group').removeClass('has-error').addClass('has-success');
            }
        });
        /*----------- END validate CODE -------------------------*/
    };
      
      return Metis;
    })(jQuery);

    (function($, Metis) {
      
      Metis.formWizard = function() {

        /*----------- BEGIN uniform CODE -------------------------*/
        $('#fileUpload').uniform();
        /*----------- END uniform CODE -------------------------*/

        /*----------- BEGIN formwizard CODE -------------------------*/
        $("#wizardForm").formwizard({
            formPluginEnabled: true,
            validationEnabled: true,
            focusFirstInput: true,
            formOptions: {
                beforeSubmit: function(data) {
                    $.gritter.add({
                        // (string | mandatory) the heading of the notification
                        title: 'data sent to the server',
                        // (string | mandatory) the text inside the notification
                        text: $.param(data),
                        sticky: false
                    });

                    return false;
                },
                dataType: 'json',
                resetForm: true
            },
            validationOptions: {
                rules: {
                    server_host: "required",
                    server_name: "required",
                    server_user: "required",
                    server_password: "required",
                    table_prefix: "required",
                    table_collation: "required",
                    username: {
                        required: true,
                        minlength: 3
                    },
                    usermail: {
                        required: true,
                        email: true
                    },
                    pass: {
                        required: true,
                        minlength: 6
                    },
                    pass2: {
                        required: true,
                        minlength: 6,
                        equalTo: "#pass"
                    }
                },
                errorClass: 'help-block',
                errorElement: 'span',
                highlight: function(element, errorClass, validClass) {
                    $(element).parents('.form-group').removeClass('has-success').addClass('has-error');
                },
                unhighlight: function(element, errorClass, validClass) {
                    $(element).parents('.form-group').removeClass('has-error').addClass('has-success');
                }
            }
        });
        /*----------- END formwizard CODE -------------------------*/

    };
      
      return Metis;
    })(jQuery, Metis || {});

    (function($){
      Metis.formWysiwyg = function() {

        /*----------- BEGIN wysihtml5 CODE -------------------------*/
        $('#wysihtml5').wysihtml5();
        /*----------- END wysihtml5 CODE -------------------------*/

        /*----------- BEGIN Markdown.Editor CODE -------------------------*/
        var converter = Markdown.getSanitizingConverter();
        var editor = new Markdown.Editor(converter);
        editor.run();
        /*----------- END Markdown.Editor CODE -------------------------*/

    // DEPRECATED
    //     /*----------- BEGIN cleditor CODE -------------------------*/
    //     var cleditor = $("#cleditor").cleditor({width: "100%", height: "100%"})[0].focus();
    //     $(window).resize();
    //
    //     $(window).resize(function () {
    //         var $win = $('#cleditorDiv');
    //         cleditor.width($win.width() - 24).height($win.height() - 24).offset({
    //             left: 15,
    //             top: 15
    //         });
    //         editor.refresh();
    //     });
    //     /*----------- END cleditor CODE -------------------------*/

        /*----------- BEGIN epiceditor CODE -------------------------*/
        var opts = {
            basePath: '//cdnjs.cloudflare.com/ajax/libs/epiceditor/0.2.2'
        };
        new EpicEditor(opts).load();
        /*----------- END epiceditor CODE -------------------------*/
    };
    return Metis;
    })(jQuery);

    (function($){
      Metis.MetisCalendar = function() {
            var date = new Date();
        date.getDate();
        date.getMonth();
        date.getFullYear();

        var hdr = {};

        if ($(window).width() <= 767) {
            hdr = {left: 'title', center: 'month,agendaWeek,agendaDay', right: 'prev,today,next'};
        } else {
            hdr = {left: '', center: 'title', right: 'prev,today,month,agendaWeek,agendaDay,next'};
        }

        var initDrag = function(e) {
            // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
            // it doesn't need to have a start or end



            var eventObject = {
                title: $.trim(e.text()), // use the element's text as the event title

                className: $.trim(e.children('span').attr('class')) // use the element's children as the event class
            };
            // store the Event Object in the DOM element so we can get to it later
            e.data('eventObject', eventObject);

            // make the event draggable using jQuery UI
            e.draggable({
                zIndex: 999,
                revert: true, // will cause the event to go back to its
                revertDuration: 0  //  original position after the drag
            });
        };

        var addEvent = function(title, priority) {
            title = title.length === 0 ? "Untitled Event" : title;

            priority = priority.length === 0 ? "label label-default" : priority;

            var html = $('<li class="external-event"><span class="' + priority + '">' + title + '</span></li>');

            jQuery('#external-events').append(html);
            initDrag(html);
        };

        /* initialize the external events
         -----------------------------------------------------------------*/

        $('#external-events li.external-event').each(function() {
            initDrag($(this));
        });

        $('#add-event').click(function() {
            var title = $('#title').val();
            var priority = $('input:radio[name=priority]:checked').val();

            addEvent(title, priority);
        });
        /* initialize the calendar
         -----------------------------------------------------------------*/

        $('#calendar').fullCalendar({
            header: hdr,
            editable: true,
            droppable: true, // this allows things to be dropped onto the calendar !!!
            drop: function(date) { // this function is called when something is dropped

                // retrieve the dropped element's stored Event Object
                var originalEventObject = $(this).data('eventObject');

                // we need to copy it, so that multiple events don't have a reference to the same object
                var copiedEventObject = $.extend({}, originalEventObject);

                // assign it the date that was reported
                copiedEventObject.start = date;

                // render the event on the calendar
                // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);


                // is the "remove after drop" checkbox checked?
                if ($('#drop-remove').is(':checked')) {
                    // if so, remove the element from the "Draggable Events" list
                    $(this).remove();
                }

            },
            windowResize: function(event, ui) {
                $('#calendar').fullCalendar('render');
            }
        });
      };
      return Metis;
    })(jQuery);

    (function($){
      Metis.MetisFile = function() {

        /*----------- BEGIN elfinder CODE -------------------------*/
        $('#elfinder').elfinder({
            url: 'assets/elfinder-2.0-rc1/php/connector.php'  // connector URL (REQUIRED)
                    // lang: 'de',             // language (OPTIONAL)
        }).elfinder('instance');
        /*----------- END elfinder CODE -------------------------*/

    };
      return Metis;
    })(jQuery);

    (function($, Metis) {
      if (!$().sortable) {
        return;
      }
      var $sortable = $('.inner [class*=col-]');
      Metis.metisSortable = function() {
        $sortable.sortable({
          placeholder: "ui-state-highlight"
        }).disableSelection();
      };
      return Metis;
    })(jQuery, Metis || {});

    (function($){
      
      Metis.MetisTable = function() {

        /*----------- BEGIN TABLESORTER CODE -------------------------*/
        /* required jquery.tablesorter.min.js*/
        $(".sortableTable").tablesorter({theme : "bootstrap"});
        /*----------- END TABLESORTER CODE -------------------------*/

        /*----------- BEGIN datatable CODE -------------------------*/
        $('#dataTable').dataTable({});
        /*----------- END datatable CODE -------------------------*/
    };
      
      return Metis;
    })(jQuery);

    (function($, Metis) {
        var _updateClass = function(el, c) {
            el.removeClass("primary success danger warning info default").addClass(c);
        };
        Metis.MetisPricing = function() {
            var $dark = $("ul.dark li.active"),
                    $light = $("ul#light li.active");

            $("#dark-toggle label").on(Metis.buttonPressedEvent, function() {
                var $this = $(this);
                _updateClass($dark, $this.find("input").val());
            });

            $("#light-toggle label").on(Metis.buttonPressedEvent, function() {
                var $this = $(this);
                _updateClass($light, $this.find("input").val());
            });
        };
        return Metis;
    })(jQuery, Metis || {});

    Metis.MetisProgress = function() {
        return new Error("Metis.MetisProgress() function is deprecated.")
      };

    /* Start Countdown Settings */
    Metis.Countdown = () => {
      var startDate = new Date("01/01/2022"),
        endDate = new Date("04/06/2023"),
        dif = endDate.getTime() - startDate.getTime(),
        difToSecond = dif / 1000;
      let defaultPercent = 0;
      let currentPercent;

      function updateBar(periods) {
        fillSecondBar(periods[6]);
        fillMinuteBar(periods[5]);
        fillHourBar(periods[4]);
        fillDayBar(periods[3]);

        fillTotalbar(
          periods[6] +
            periods[5] * 60 +
            periods[4] * 60 * 60 +
            periods[3] * 60 * 60 * 24
        );
      }

      function fillSecondBar(percent) {
        $("#second-number").html(percent);
        $("#second-bar").css("width", (percent * 100) / 60 + "%");
      }

      function fillMinuteBar(percent) {
        $("#minute-number").html(percent);
        $("#minute-bar").css("width", (percent * 100) / 60 + "%");
      }

      function fillHourBar(percent) {
        $("#hour-number").html(percent);
        $("#hour-bar").css("width", (percent * 100) / 24 + "%");
      }

      function fillDayBar(percent) {
        $("#day-number").html(percent);
        $("#day-bar").css("width", (percent * 100) / 365 + "%");
      }

      function fillTotalbar(percent) {
        defaultPercent = 100 - (100 * percent) / difToSecond;

        if (defaultPercent >= 10) {
          currentPercent = defaultPercent.toString().substring(0, 5);
        } else {
          currentPercent = defaultPercent.toString().substring(0, 4);
        }

        $("#total-bar")
          .css("width", defaultPercent + "%")
          .html(currentPercent + "%");
      }

      $("#counter").countdown({
        until: endDate,
        layout: "<div></div>",
        onTick: updateBar,
      });
    };

})();
