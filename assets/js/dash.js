/*--------------------------------------------------------
BEGIN DASHBOARD SCRIPTS
---------------------------------------------------------*/
function dashboard () {
	
	/*----------- BEGIN SPARKLINE CODE -------------------------*/
	/* required jquery.sparkline.min.js*/
	if (jQuery().sparkline) {

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

	} else{
		console.log('could not load jquery.sparkline.min.js');
	};
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


}
/*--------------------------------------------------------
END DASHBOARD SCRIPTS
---------------------------------------------------------*/