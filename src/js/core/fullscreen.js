import screenfull from "screenfull";

// Define toggleFullScreen
Metis.toggleFullScreen = () => {
  if (!screenfull.isEnabled) {
    return false;
  }
  const toggleFullScreen = document.getElementById("toggleFullScreen");
  toggleFullScreen?.addEventListener(Metis.buttonPressedEvent, () => {
    screenfull.toggle(document.documentElement);
  });
};

// Define boxFullScreen
Metis.boxFullScreen = () => {
  if (!screenfull.isEnabled) {
    return false;
  }
  const triggers = document.querySelectorAll(".full-box");
  [...triggers].map((trigger) => {
    const i = trigger.querySelector("i.bi-fullscreen");
    trigger.addEventListener("click", (e) => {
      screenfull.toggle(trigger.closest(".box"));
      i?.classList.toggle("bi-fullscreen");
      i?.classList.toggle("bi-fullscreen-exit");
    });
  });
};
(function ($, Metis) {
  "use strict";
  Metis.panelBodyCollapse = function () {
    var $collapseButton = $(".collapse-box"),
      $collapsedPanelBody = $collapseButton.closest(".box").children(".body");

    $collapsedPanelBody.collapse("show");

    $collapseButton.on(Metis.buttonPressedEvent, function (e) {
      var $collapsePanelBody = $(this).closest(".box").children(".body"),
        $toggleButtonImage = $(this).children("i");
      $collapsePanelBody.on("show.bs.collapse", function () {
        $toggleButtonImage
          .removeClass("fa-minus fa-plus")
          .addClass("fa-spinner fa-spin");
      });
      $collapsePanelBody.on("shown.bs.collapse", function () {
        $toggleButtonImage
          .removeClass("fa-spinner fa-spin")
          .addClass("fa-minus");
      });

      $collapsePanelBody.on("hide.bs.collapse", function () {
        $toggleButtonImage
          .removeClass("fa-minus fa-plus")
          .addClass("fa-spinner fa-spin");
      });

      $collapsePanelBody.on("hidden.bs.collapse", function () {
        $toggleButtonImage
          .removeClass("fa-spinner fa-spin")
          .addClass("fa-plus");
      });

      $collapsePanelBody.collapse("toggle");

      e.preventDefault();
    });
  };
  Metis.boxHiding = function () {
    $(".close-box").on(Metis.buttonPressedEvent, function () {
      $(this).closest(".box").hide("slow");
    });
  };
  return Metis;
})(jQuery, Metis || {});
