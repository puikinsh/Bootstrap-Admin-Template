(function() {
  module.exports.register = function(Handlebars, options) {

    var path = require('path');

    var getExt = function(str) {
      var extname = path.extname(str);
      if (extname) {
        str = extname;
      }
      if (str[0] === ".") {
        str = str.substring(1);
      }
      return str;
    };
    Handlebars.registerHelper("cdn", function(context) {
      if (!Array.isArray(context)) {
        context = [context];
      }
      return new Handlebars.SafeString(context.map(function(item) {
        var ext = getExt(item);
        var js = '<script src="' + item + '"></script>';
        var css = '<link rel="stylesheet" href="' + item + '">';
        switch (ext) {
          case "js":
            return js;
          case "css":
            return css;
          default:
            return js;
        }
      }).join("\n"));
    });


  };
}).call(this);
