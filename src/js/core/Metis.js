;(function(window) {
    var
      // Are we expecting a touch or a click?
      buttonPressedEvent = 'touchstart click',
      Metis = function() {
          this.init();
      };

    // Initialization method
    Metis.prototype.init = function() {
        this.buttonPressedEvent = buttonPressedEvent;
    };

    Metis.prototype.getViewportHeight = function() {

        var docElement = document.documentElement,
                client = docElement.clientHeight,
                inner = window.innerHeight;

        if (client < inner)
            return inner;
        else
            return client;
    };

    Metis.prototype.getViewportWidth = function() {

        var docElement = document.documentElement,
                client = docElement.clientWidth,
                inner = window.innerWidth;

        if (client < inner)
            return inner;
        else
            return client;
    };

    // Creates a Metis object.
    window.Metis = new Metis();
})(window);
