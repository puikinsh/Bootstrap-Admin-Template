// Define toggleFullScreen
var toggleFullScreen = {
    init: function() {
        if ((window.screenfull !== undefined) && screenfull.enabled) {
            $('#toggleFullScreen').on('click', function(e) {
                screenfull.toggle(window.document[0]);
                $('body').toggleClass('fullScreen');
                e.preventDefault();
            });
        } else {
            $('#toggleFullScreen').addClass('hidden');
        }
    }
};
// toggleFullScreen init
toggleFullScreen.init();

var boxFullScreen = {
    init: function() {
        if ((window.screenfull !== undefined) && screenfull.enabled) {
            var $toggleButton = $('.full-box'),
                $toggledPanel = $toggleButton.parents('.box')[0],
                $toggledPanelBody = $toggleButton.parents('.box').children('.body'),
                $toggleButtonImage = $toggleButton.children('i');

            $toggleButton.on('click', function(e) {
                screenfull.toggle($toggledPanel);
                $toggledPanelBody.toggleClass('full-screen-box');
                $toggleButtonImage.toggleClass('fa-compress');
                e.preventDefault();
            });
        } else {
            $('.full-box').addClass('hidden');
        }
    }
};
// boxFullScreen init
boxFullScreen.init();

var panelBodyCollapse = {
    init: function() {
        var $collapseButton = $('.collapse-box'),
            $collapsedPanelBody = $collapseButton.closest('.box').children('.body');

        $collapsedPanelBody.collapse('show');
        
        $collapseButton.on('click', function (e) {
          var $collapsePanelBody = $(this).closest('.box').children('.body'),
              $toggleButtonImage = $(this).children('i');
            $collapsePanelBody.on('show.bs.collapse', function () {
              $toggleButtonImage.removeClass('fa-minus fa-plus').addClass('fa-spinner fa-spin');
            });
            $collapsePanelBody.on('shown.bs.collapse', function () {
              $toggleButtonImage.removeClass('fa-spinner fa-spin').addClass('fa-minus');
            });
            
            $collapsePanelBody.on('hide.bs.collapse', function () {
              $toggleButtonImage.removeClass('fa-minus fa-plus').addClass('fa-spinner fa-spin');
            });
            
            $collapsePanelBody.on('hidden.bs.collapse', function () {
              $toggleButtonImage.removeClass('fa-spinner fa-spin').addClass('fa-plus');
            });

            $collapsePanelBody.collapse('toggle');
          
          e.preventDefault();
        });
    }
};
// panelBodyCollapse init
panelBodyCollapse.init();


var boxHiding = {
  init: function () {
    $('.close-box').click(function () {
        $(this).closest('.box').hide('slow');
    });
  }
};
boxHiding.init();