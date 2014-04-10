$(function () {
    var $body = $('body'),
        $leftToggle = $('.toggle-left'),
        $rightToggle = $('.toggle-right'),
        $isLeftPanelMini = $body.hasClass('sidebar-left-mini'),
        $isLeftPanelHide = $body.hasClass('sidebar-left-hidden'),
        $count = 0;

    $leftToggle.on('click', function (e) {

        if ($(window).width() < 768) {
            $body.toggleClass('sidebar-left-opened');
        } else {
            if ($body.hasClass('sidebar-right-opened') && $count % 3 === 2) {
                $body.removeClass('sidebar-right-opened');
            }
            if ($body.hasClass('sidebar-right-opened') && $body.hasClass('mini-sidebar')) $count = 1;

            $body.toggleClass('sidebar-left-mini', $count % 3 === 0);
            $body.toggleClass('sidebar-left-hidden', $count % 3 === 1);
            $count++;

            $isLeftPanelMini = $body.hasClass('sidebar-left-mini');
            $isLeftPanelHide = $body.hasClass('sidebar-left-hidden');

            e.preventDefault();
        }
    });

    $rightToggle.on('click', function (e) {
        $body.toggleClass('sidebar-right-opened');

        if (!$isLeftPanelMini && !$isLeftPanelHide) {
            $body.toggleClass('sidebar-left-mini');
        }
        e.preventDefault();
    });
});