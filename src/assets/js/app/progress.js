function progRess() {

    window.prettyPrint && prettyPrint();

    $.each($('.progress .progress-bar'), function () {

        $(this).animate({
            width: $(this).attr('aria-valuenow') + '%'
        });

        $(this).popover({
            placement: 'bottom',
            title: 'Source',
            content: this.outerHTML
        });

    });
}