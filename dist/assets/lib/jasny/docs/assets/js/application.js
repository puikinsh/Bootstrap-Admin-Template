// NOTICE!! DO NOT USE ANY OF THIS JAVASCRIPT
// IT'S ALL JUST JUNK FOR OUR DOCS!
// ++++++++++++++++++++++++++++++++++++++++++

!function ($) {

  $(function(){

    var $window = $(window)

    // Disable certain links in docs
    $('section [href^=#]').click(function (e) {
      e.preventDefault()
    })

    // side bar
    setTimeout(function () {
      $('.bs-docs-sidebar > *').affix({
        offset: {
          top: function () { return $window.width() <= 980 ? 290 : 210 }
        , bottom: 270
        }
      })
    }, 100)

    // make code pretty
    window.prettyPrint && prettyPrint()

    // add-ons
    $('.add-on :checkbox').on('click', function () {
      var $this = $(this)
        , method = $this.attr('checked') ? 'addClass' : 'removeClass'
      $(this).parents('.add-on')[method]('active')
    })

    // add tipsies to grid for scaffolding
    if ($('#gridSystem').length) {
      $('#gridSystem').tooltip({
          selector: '.show-grid > [class*="span"]'
        , title: function () { return $(this).width() + 'px' }
      })
    }

    // tooltip demo
    $('.tooltip-demo').tooltip({
      selector: "a[data-toggle=tooltip]"
    })

    $('.tooltip-test').tooltip()
    $('.popover-test').popover()

    // popover demo
    $("a[data-toggle=popover]")
      .popover()
      .click(function(e) {
        e.preventDefault()
      })

    // button state demo
    $('#fat-btn')
      .click(function () {
        var btn = $(this)
        btn.button('loading')
        setTimeout(function () {
          btn.button('reset')
        }, 3000)
      })

    // carousel demo
    $('#myCarousel').carousel()

    // javascript build logic
    var inputsComponent = $("#components.download input")
      , inputsPlugin = $("#plugins.download input")
      , inputsVariables = $("#variables.download input")
    
    // Upload custom.json (requires FileReader support)
    if (typeof FileReader !== "undefined") {
      $('#customupload > input[type=file]').on('change', function(e) {
        var file = e.target.files !== undefined ? e.target.files[0] : (e.target.value ? { name: e.target.value.replace(/^.+\\/, '') } : null)
        var reader = new FileReader()
        
        reader.onload = function(e) {
          try {
            var params = JSON.parse(e.target.result)
          } catch(err) {
            window.alert("The loaded file doesn't contain valid JSON: " + new String(err).replace(/^SyntaxError: /i, ''))
          }
          
          inputsComponent.attr('checked', false)
          $.each(params.css, function(key, value) {
            $("#components.download input[value='" + value + "']").attr('checked', true)
          })
          
          inputsPlugin.attr('checked', false)
          $.each(params.js, function(key, value) {
            $("#plugins.download input[value='" + value + "']").attr('checked', true)
          })
          
          inputsVariables.val('')
          $.each(params.vars, function(key, value) {
            $("#variables.download label:contains('" + key + "')").next().val(value)
          })
        }
        
        reader.readAsText(file)
      })
      $('#customupload').show()
    } else {
      $('#no-customupload').show()
    }
    
    // toggle all plugin checkboxes
    $('#components.download .toggle-all').on('click', function (e) {
      e.preventDefault()
      inputsComponent.attr('checked', !inputsComponent.is(':checked'))
    })

    $('#plugins.download .toggle-all').on('click', function (e) {
      e.preventDefault()
      inputsPlugin.attr('checked', !inputsPlugin.is(':checked'))
    })

    $('#components.download .toggle-jasny').on('click', function (e) {
      e.preventDefault()
      inputsComponent.attr('checked', false)
      $('#components.download input.jasny').attr('checked', true)
    })

    $('#plugins.download .toggle-jasny').on('click', function (e) {
      e.preventDefault()
      inputsPlugin.attr('checked', false)
      $('#plugins.download input.jasny').attr('checked', true)
    })

    $('#variables.download .toggle-all').on('click', function (e) {
      e.preventDefault()
      inputsVariables.val('')
    })

    $('#plugins.download input[value="bootstrap-popover.js"]').on('click', function (e) {
      if ($(this).is(':checked')) $('#plugins.download input[value="bootstrap-tooltip.js"]').attr('checked', true)
    })

    $('#plugins.download input[value="bootstrap-tooltip.js"]').on('click', function (e) {
      if ($(this).is(':not(:checked)')) $('#plugins.download input[value="bootstrap-popover.js"]').attr('checked', false)
    })

    // request built javascript
    $('.download-btn .btn').on('click', function () {

      var css = $("#components.download input:checked")
            .map(function () { return this.value })
            .toArray()
        , js = $("#plugins.download input:checked")
            .map(function () { return this.value })
            .toArray()
        , vars = {}
        , img = ['glyphicons-halflings.png', 'glyphicons-halflings-white.png']
        , font = []
        , autoselect = {
            'layouts-semifluid.responsive-1200px-min.less': ['layouts-semifluid.less', 'responsive-1200px-min.less']
          , 'jasny-forms.responsive-767px-max.less': ['jasny-forms.less', 'responsive-767px-max.less']
          , 'jasny-forms.responsive-768px-979px.less': ['jasny-forms.less', 'responsive-768px-979px.less']
          , 'jasny-forms.responsive-1200px-min.less': ['jasny-forms.less', 'responsive-1200px-min.less']
          , 'page-alert.responsive-767px-max.less': ['page-alert.less', 'responsive-767px-max.less']
          , 'page-alert.responsive-1200px-min.less': ['page-alert.less', 'responsive-1200px-min.less']
          , 'tooltip.less': ['match:js', 'bootstrap-tooltip.js']
          , 'popovers.less': ['match:js', 'bootstrap-popover.js']
          , 'modals.less': ['match:js', 'bootstrap-modal.js']
          , 'dropdowns.less': ['match:js', 'bootstrap-dropdown.js']
          , 'accordion.less': ['match:js', 'bootstrap-collapse.js']
          , 'carousel.less': ['match:js', 'bootstrap-carousel.js']
          , 'rowlink.less': ['match:js', 'bootstrap-rowlink.js']
          , 'fileupload.less': ['match:js', 'bootstrap-fileupload.js']
        }
        
    if ($('#components.download input[value="iconic.less"]').is(':checked'))
      $.merge(font, ['iconic_fill.eot', 'iconic_fill.otf', 'iconic_fill.svg', 'iconic_fill.ttf', 'iconic_fill.woff', 'iconic_stroke.eot', 'iconic_stroke.otf', 'iconic_stroke.svg', 'iconic_stroke.ttf', 'iconic_stroke.woff'])

    $.map(autoselect, function(deps, file) {
      if ($.map(deps, function (value) { return $('.download input[value="'+value+'"]').is(':checked') ? 1 : null }).length == deps.length)
        css.push(file)
    })
    
    $("#variables.download input")
      .each(function () {
        $(this).val() && (vars[ $(this).prev().text() ] = $(this).val())
      })

      $.ajax({
        type: 'POST'
      , url: /\?dev|^http:\/\/localhost\//.test(window.location) ? 'http://localhost:3000' : 'http://bootstrap-server.jasny.net'
      , dataType: 'jsonpi'
      , params: {
          js: js
        , css: css
        , vars: vars
        , img: img
        , font: font
      }
      })
    })
  })

// Modified from the original jsonpi https://github.com/benvinegar/jquery-jsonpi
$.ajaxTransport('jsonpi', function(opts, originalOptions, jqXHR) {
  var url = opts.url;

  return {
    send: function(_, completeCallback) {
      var name = 'jQuery_iframe_' + jQuery.now()
        , iframe, form

      iframe = $('<iframe>')
        .attr('name', name)
        .appendTo('head')

      form = $('<form>')
        .attr('method', opts.type) // GET or POST
        .attr('action', url)
        .attr('target', name)

      $.each(opts.params, function(k, v) {

        $('<input>')
          .attr('type', 'hidden')
          .attr('name', k)
          .attr('value', typeof v == 'string' ? v : JSON.stringify(v))
          .appendTo(form)
      })

      form.appendTo('body').submit()
    }
  }
})

}(window.jQuery)
