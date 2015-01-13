;(function($){
  "use strict";

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
