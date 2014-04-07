function metisButton() {
    $.each($('.inner a.btn'), function () {
        $(this).popover({
            placement: 'bottom',
            title: this.innerHTML,
            content: this.outerHTML,
            trigger: 'hover'
        });
    });
}
