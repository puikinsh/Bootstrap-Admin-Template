;(function($){
  "use strict";
  Metis.MetisCalendar = function() {
        var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

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