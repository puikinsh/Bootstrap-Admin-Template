$(function() {

    $('a[rel=tooltip]').tooltip();

    // make code pretty
    window.prettyPrint && prettyPrint();

    $('.minimize-box').on('click', function(e){
        e.preventDefault();
        var $icon = $(this).children('i');
        if($icon.hasClass('icon-chevron-down')) {
            $icon.removeClass('icon-chevron-down').addClass('icon-chevron-up');
        } else if($icon.hasClass('icon-chevron-up')) {
            $icon.removeClass('icon-chevron-up').addClass('icon-chevron-down');
        }
    });
    $('.minimize-box').on('click', function(e){
        e.preventDefault();
        var $icon = $(this).children('i');
        if($icon.hasClass('icon-minus')) {
            $icon.removeClass('icon-minus').addClass('icon-plus');
        } else if($icon.hasClass('icon-plus')) {
            $icon.removeClass('icon-plus').addClass('icon-minus');
        }
    });

    $('.close-box').click(function() {
        $(this).closest('.box').hide('slow');
    });

    $('#changeSidebarPos').on('click', function(e) {
        $('body').toggleClass('hide-sidebar');
    });
});



/*--------------------------------------------------------
 BEGIN DASHBOARD SCRIPTS
 ---------------------------------------------------------*/
function dashboard() {

    /*----------- BEGIN SPARKLINE CODE -------------------------*/
    /* required jquery.sparkline.min.js*/

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
    /*----------- END SPARKLINE CODE -------------------------*/


    /*----------- BEGIN FULLCALENDAR CODE -------------------------*/

    if (jQuery().fullCalendar) {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        var calendar = $('#calendar').fullCalendar({
            header: {
                left: 'prev,today,next,',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            selectable: true,
            selectHelper: true,
            select: function(start, end, allDay) {
                var title = prompt('Event Title:');
                if (title) {
                    calendar.fullCalendar('renderEvent',
                            {
                                title: title,
                                start: start,
                                end: end,
                                allDay: allDay
                            },
                    true // make the event "stick"
                            );
                }
                calendar.fullCalendar('unselect');
            },
            editable: true,
            events: [
                {
                    title: 'All Day Event',
                    start: new Date(y, m, 1),
                    className: 'label label-success'
                },
                {
                    title: 'Long Event',
                    start: new Date(y, m, d - 5),
                    end: new Date(y, m, d - 2),
                    className: 'label label-info'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: new Date(y, m, d - 3, 16, 0),
                    allDay: false,
                    className: 'label label-warning'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: new Date(y, m, d + 4, 16, 0),
                    allDay: false,
                    className: 'label label-inverse'
                },
                {
                    title: 'Meeting',
                    start: new Date(y, m, d, 10, 30),
                    allDay: false,
                    className: 'label label-important'
                },
                {
                    title: 'Lunch',
                    start: new Date(y, m, d, 12, 0),
                    end: new Date(y, m, d, 14, 0),
                    allDay: false
                },
                {
                    title: 'Birthday Party',
                    start: new Date(y, m, d + 1, 19, 0),
                    end: new Date(y, m, d + 1, 22, 30),
                    allDay: false
                },
                {
                    title: 'Click for Google',
                    start: new Date(y, m, 28),
                    end: new Date(y, m, 29),
                    url: 'http://google.com/'
                }
            ]
        });
    } else {
        console.log('could not load fullcalendar.min.js');
    }
    /*----------- END FULLCALENDAR CODE -------------------------*/



    /*----------- BEGIN CHART CODE -------------------------*/
    var sin = [], cos = [];
    for (var i = 0; i < 14; i += 0.5) {
        sin.push([i, Math.sin(i)]);
        cos.push([i, Math.cos(i)]);
    }

    var plot = $.plot($("#trigo"),
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
            if (previousPoint != item.dataIndex) {
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
    $(".sortableTable").tablesorter();
    /*----------- END TABLESORTER CODE -------------------------*/

}
/*--------------------------------------------------------
 END DASHBOARD SCRIPTS
 ---------------------------------------------------------*/


/*--------------------------------------------------------
 BEGIN PROGRESS.HTML SCRIPTS
 ---------------------------------------------------------*/

function progRess() {
    /* required bootstrap-progressbar.min.js*/
    
        $('.progress .bar.text-no').progressbar();
        $('.progress .bar.text-filled').progressbar({
            display_text: 1
        });
        $('.progress .bar.text-centered').progressbar({
            display_text: 2
        });
}
/*--------------------------------------------------------
 END PROGRESS.HTML SCRIPTS
 ---------------------------------------------------------*/

/*--------------------------------------------------------
 BEGIN CALENDAR.HTML SCRIPTS
 ---------------------------------------------------------*/
function metisCalendar() {
    if (!jQuery.fullCalendar) {
        return;
    }

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    var hdr = {};

    if ($(window).width() <= 767) {
        hdr = {
            left: 'title',
            center: '',
            right: 'prev,today,month,agendaWeek,agendaDay,next'
        }
    } else {
        hdr = {
            left: '',
            center: 'title',
            right: 'prev,today,month,agendaWeek,agendaDay,next'
        }
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
    }

    var addEvent = function(title, priority) {
        title = title.length == 0 ? "Untitled Event" : title;

        priority = priority.length == 0 ? "label" : priority;

        var html = $('<li class="external-event"><span class="' + priority + '">' + title + '</span></li>');

        jQuery('#external-events').append(html);
        initDrag(html);
    }

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
        buttonText: {
            prev: '<i class="icon-chevron-left"></i>',
            next: '<i class="icon-chevron-right"></i>'
        },
        editable: true,
        droppable: true, // this allows things to be dropped onto the calendar !!!
        drop: function(date, allDay) { // this function is called when something is dropped

            // retrieve the dropped element's stored Event Object
            var originalEventObject = $(this).data('eventObject');

            // we need to copy it, so that multiple events don't have a reference to the same object
            var copiedEventObject = $.extend({}, originalEventObject);

            // assign it the date that was reported
            copiedEventObject.start = date;
            copiedEventObject.allDay = allDay;

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
}

/*--------------------------------------------------------
 END CALENDAR.HTML SCRIPTS
 ---------------------------------------------------------*/

/*--------------------------------------------------------
 BEGIN FORM-GENERAL.HTML SCRIPTS
 ---------------------------------------------------------*/
function formGeneral() {

    $('.with-tooltip').tooltip({
        selector: ".input-tooltip"
    });

    /*----------- BEGIN autosize CODE -------------------------*/
    $('#autosize').autosize();
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

    $('#spin1').spinner();
    $("#spin2").spinner({
        step: 0.01,
        numberFormat: "n"
    });
    $("#spin3").spinner({
        culture: 'en-US',
        min: 5,
        max: 2500,
        step: 25,
        start: 1000,
        numberFormat: "C"
    });
    /*----------- END spinner CODE -------------------------*/

    /*----------- BEGIN uniform CODE -------------------------*/
    $('.uniform').uniform();
    /*----------- END uniform CODE -------------------------*/

    /*----------- BEGIN validVal CODE -------------------------*/
    $('#validVal').validVal();
    /*----------- END validVal CODE -------------------------*/

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


    var startDate = new Date(2012, 1, 20);
    var endDate = new Date(2012, 1, 25);
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
                    'Today': ['today', 'today'],
                    'Yesterday': ['yesterday', 'yesterday'],
                    'Last 7 Days': [Date.today().add({days: -6}), 'today'],
                    'Last 30 Days': [Date.today().add({days: -29}), 'today'],
                    'This Month': [Date.today().moveToFirstDayOfMonth(), Date.today().moveToLastDayOfMonth()],
                    'Last Month': [Date.today().moveToFirstDayOfMonth().add({months: -1}), Date.today().moveToFirstDayOfMonth().add({days: -1})]
                }
            },
    function(start, end) {
        $('#reportrange span').html(start.toString('MMMM d, yyyy') + ' - ' + end.toString('MMMM d, yyyy'));
    });
    /*----------- END daterangepicker CODE -------------------------*/

    /*----------- BEGIN timepicker CODE -------------------------*/
    $('.timepicker-default').timepicker();

    $('.timepicker-24').timepicker({
        minuteStep: 1,
        showSeconds: true,
        showMeridian: false
    });
    /*----------- END timepicker CODE -------------------------*/

    /*----------- BEGIN toggleButtons CODE -------------------------*/
    $('#normal-toggle-button').toggleButtons();

    $('#callback-toggle-button').toggleButtons({
        onChange: function($el, status, e) {
            console.log($el, status, e);
            $('#magic-text').text("Status is: " + status);
        }
    });
    $('#text-toggle-button').toggleButtons({
        width: 220,
        label: {
            enabled: "Metis",
            disabled: "Admin"
        }
    });
    $('#danger-toggle-button').toggleButtons({
        style: {
            // Accepted values ["primary", "danger", "info", "success", "warning"] or nothing
            enabled: "danger",
            disabled: "info"
        }
    });
    /*----------- END toggleButtons CODE -------------------------*/

    /*----------- BEGIN dualListBox CODE -------------------------*/
    $.configureBoxes();
    /*----------- END dualListBox CODE -------------------------*/
}
/*--------------------------------------------------------
 END FORM-GENERAL.HTML SCRIPTS
 ---------------------------------------------------------*/

/*--------------------------------------------------------
 BEGIN FORM-VALIDATION.HTML SCRIPTS
 ---------------------------------------------------------*/

function formValidation() {
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
        errorClass: 'help-inline',
        errorElement: 'span',
        highlight: function(element, errorClass, validClass) {
            $(element).parents('.control-group').removeClass('success').addClass('error');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).parents('.control-group').removeClass('error').addClass('success');
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
            $(element).parents('.control-group').removeClass('success').addClass('error');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).parents('.control-group').removeClass('error').addClass('success');
        }
    });
    /*----------- END validate CODE -------------------------*/
}

/*--------------------------------------------------------
 END FORM-VALIDATION.HTML SCRIPTS
 ---------------------------------------------------------*/

/*--------------------------------------------------------
 BEGIN FORM-WYSIWYG.HTML SCRIPTS
 ---------------------------------------------------------*/
function formWysiwyg() {

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

}
/*--------------------------------------------------------
 END FORM-WYSIWYG.HTML SCRIPTS
 ---------------------------------------------------------*/

/*--------------------------------------------------------
 BEGIN FORM-WIZARD.HTML SCRIPTS
 ---------------------------------------------------------*/

function formWizard() {

    /*----------- BEGIN uniform CODE -------------------------*/
    $('#fileUpload').uniform();
    /*----------- END uniform CODE -------------------------*/

    /*----------- BEGIN plupload CODE -------------------------*/
    $("#uploader").pluploadQueue({
        runtimes: 'html5,html4',
        url: 'form-wysiwyg.html',
        max_file_size: '128kb',
        unique_names: true,
        filters: [
            {
                title: "Image files",
                extensions: "jpg,gif,png"
            }
        ]
    });
    /*----------- END plupload CODE -------------------------*/

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
            errorClass: 'help-inline',
            errorElement: 'span',
            highlight: function(element, errorClass, validClass) {
                $(element).parents('.control-group').removeClass('success').addClass('error');
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).parents('.control-group').removeClass('error').addClass('success');
            }
        }
    });
    /*----------- END formwizard CODE -------------------------*/

}

/*--------------------------------------------------------
 END FORM-WIZARD.HTML SCRIPTS
 ---------------------------------------------------------*/

/*--------------------------------------------------------
 BEGIN TABLES.HTML SCRIPTS
 ---------------------------------------------------------*/
function metisTable() {
  
      /*----------- BEGIN TABLESORTER CODE -------------------------*/
    /* required jquery.tablesorter.min.js*/
    $(".sortableTable").tablesorter();
    /*----------- END TABLESORTER CODE -------------------------*/

    /*----------- BEGIN datatable CODE -------------------------*/
    $('#dataTable').dataTable({
        "sDom": "<'pull-right'l>t<'row-fluid'<'span6'f><'span6'p>>",
        "sPaginationType": "bootstrap",
        "oLanguage": {
            "sLengthMenu": "Show _MENU_ entries"
        }
    });
    /*----------- END datatable CODE -------------------------*/

    /*----------- BEGIN action table CODE -------------------------*/
    $('#actionTable button.remove').on('click', function() {
      $(this).closest('tr').remove();
    });
    $('#actionTable button.edit').on('click', function() {
        $('#editModal').modal({
            show: true
        });
        var val1 = $(this).closest('tr').children('td').eq(1),
            val2 = $(this).closest('tr').children('td').eq(2),
            val3 = $(this).closest('tr').children('td').eq(3);
        $('#editModal #fName').val(val1.html());
        $('#editModal #lName').val(val2.html());
        $('#editModal #uName').val(val3.html());


        $('#editModal #sbmtBtn').on('click', function() {
            val1.html($('#editModal #fName').val());
            val2.html($('#editModal #lName').val());
            val3.html($('#editModal #uName').val());
        });

    });
    /*----------- END action table CODE -------------------------*/

}
/*--------------------------------------------------------
 END TABLES.HTML SCRIPTS
 ---------------------------------------------------------*/


/*--------------------------------------------------------
 BEGIN FILE.HTML SCRIPTS
 ---------------------------------------------------------*/
function metisFile() {

    /*----------- BEGIN elfinder CODE -------------------------*/
    var elf = $('#elfinder').elfinder({
        url: 'assets/php/connector.php'  // connector URL (REQUIRED)
                // lang: 'de',             // language (OPTIONAL)
    }).elfinder('instance');
    /*----------- END elfinder CODE -------------------------*/

}
/*--------------------------------------------------------
 END FILE.HTML SCRIPTS
 ---------------------------------------------------------*/


/*--------------------------------------------------------
 BEGIN MAPS.HTML SCRIPTS
 ---------------------------------------------------------*/
function metisMaps() {

    var map1, map2, map3, map4, map5, map6;

    map1 = new GMaps({
        el: '#gmaps-basic',
        lat: -12.043333,
        lng: -77.028333,
        zoomControl: true,
        zoomControlOpt: {
            style: 'SMALL',
            position: 'TOP_LEFT'
        },
        panControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        overviewMapControl: false
    });

    map2 = new GMaps({
        el: '#gmaps-marker',
        lat: -12.043333,
        lng: -77.028333
    });
    map2.addMarker({
        lat: -12.043333,
        lng: -77.03,
        title: 'Lima',
        details: {
            database_id: 42,
            author: 'HPNeo'
        },
        click: function(e) {
            if (console.log)
                console.log(e);
            alert('You clicked in this marker');
        },
        mouseover: function(e) {
            if (console.log)
                console.log(e);
        }
    });
    map2.addMarker({
        lat: -12.042,
        lng: -77.028333,
        title: 'Marker with InfoWindow',
        infoWindow: {
            content: '<p>HTML Content</p>'
        }
    });

    map3 = new GMaps({
        el: '#gmaps-geolocation',
        lat: -12.043333,
        lng: -77.028333
    });

    GMaps.geolocate({
        success: function(position) {
            map3.setCenter(position.coords.latitude, position.coords.longitude);
        },
        error: function(error) {
            alert('Geolocation failed: ' + error.message);
        },
        not_supported: function() {
            alert("Your browser does not support geolocation");
        },
        always: function() {
            //alert("Done!");
        }
    });

    map4 = new GMaps({
        el: '#gmaps-polylines',
        lat: -12.043333,
        lng: -77.028333,
        click: function(e) {
            console.log(e);
        }
    });

    path = [[-12.044012922866312, -77.02470665341184], [-12.05449279282314, -77.03024273281858], [-12.055122327623378, -77.03039293652341], [-12.075917129727586, -77.02764635449216], [-12.07635776902266, -77.02792530422971], [-12.076819390363665, -77.02893381481931], [-12.088527520066453, -77.0241058385925], [-12.090814532191756, -77.02271108990476]];

    map4.drawPolyline({
        path: path,
        strokeColor: '#131540',
        strokeOpacity: 0.6,
        strokeWeight: 6
    });

    map5 = new GMaps({
        el: '#gmaps-route',
        lat: -12.043333,
        lng: -77.028333
    });
    map5.drawRoute({
        origin: [-12.044012922866312, -77.02470665341184],
        destination: [-12.090814532191756, -77.02271108990476],
        travelMode: 'driving',
        strokeColor: '#131540',
        strokeOpacity: 0.6,
        strokeWeight: 6
    });

    map6 = new GMaps({
        el: '#gmaps-geocoding',
        lat: -12.043333,
        lng: -77.028333
    });
    $('#geocoding_form').submit(function(e) {
        e.preventDefault();
        GMaps.geocode({
            address: $('#address').val().trim(),
            callback: function(results, status) {
                if (status === 'OK') {
                    var latlng = results[0].geometry.location;
                    map6.setCenter(latlng.lat(), latlng.lng());
                    map6.addMarker({
                        lat: latlng.lat(),
                        lng: latlng.lng()
                    });
                }
            }
        });
    });

}
/*--------------------------------------------------------
 END MAPS.HTML SCRIPTS
 ---------------------------------------------------------*/