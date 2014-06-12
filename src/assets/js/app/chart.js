;(function($, Metis) {
  "use strict";
  
  
    var d2 = [
          [0, 3],
          [1, 8],
          [2, 5],
          [3, 13],
          [4, 1]
        ],
        d3 = [
          [0, 12],
          [2, 2],
          [3, 9],
          [4, 4]
        ],
        parabola = [],
        parabola2 = [],
        circle = [],
        heartA = [],
        bernoulliA = [],
        human = $("#human"),
        eye = $("#eye"),
        bar = $("#bar"),
        heart = $("#heart"),
        bernoilli = $("#bernoilli");
        
    function lemniscatex(i) {
      return Math.sqrt(2) * Math.cos(i) / (Math.pow(Math.sin(i), 2) + 1);
    }

    function lemniscatey(i) {
      return Math.sqrt(2) * Math.cos(i) * Math.sin(i) / (Math.pow(Math.sin(i), 2) + 1);
    }
    Metis.MetisChart = function() {
      // Plugin check
      if(!$().plot) {
        throw new Error('flot plugin require form MetisChart');
      }
      // Human charts
      $.plot(human,
        [
          {data: d2, label: 'MAN'},
          {data: d3, label: 'WOMAN'}
        ],
        {
          clickable: true,
          hoverable: true,
          series: {
            lines: {
              show: true,
              fill: true,
              fillColor: {
                colors: [
                  {opacity: 0.5},
                  {opacity: 0.15}
                ]
              }
            },
            points: {show: true}
          }
        }
      );
      
      // BAR charts
      $.plot(bar,
        [{
          data: d2,
          label: 'BAR'
        }],
        {
          clickable: true,
          hoverable: true,
          series: {
            bars: {show: true, barWidth: 0.6},
            points: {show: true}
          }
        });
      
      // EYE charts
      for (var i = -5; i <= 5; i += 0.5) {
        parabola.push([i, Math.pow(i, 2) - 25]);
        parabola2.push([i, -Math.pow(i, 2) + 25]);
      }

      for (var c = -2; c <= 2.1; c += 0.1) {
        circle.push([c, Math.sqrt(400 - c * c * 100)]);
        circle.push([c, -Math.sqrt(400 - c * c * 100)]);
      }
      
      $.plot(eye, [
        {data: parabola2, lines: {show: true, fill: true}},
        {data: parabola, lines: {show: true, fill: true}},
        {data: circle, lines: {show: true}}
      ]);
      
      // HEART charts
      for (i = -2; i <= 5; i += 0.01) {
        heartA.push([16 * Math.pow(Math.sin(i), 3), 13 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i)]);
      }
      $.plot($("#heart"), [
          {data: heartA, label: '<i class="fa fa-heart"></i>', color: '#9A004D'}
        ],
        {
          series: {
              lines: {show: true, fill: true},
              points: {show: false}
          },
          yaxis: {show: true},
          xaxis: {show: true}
        }
      );
      $('#heart .legendLabel').addClass('animated pulse');
      setInterval(function () {
          $('#heart .legendLabel .fa.fa-heart').toggleClass('fa-2x');
      }, 400);
      
      // BERNOILLI charts
      for (var k = 0; k <= 2 * Math.PI; k += 0.01) {
        bernoulliA.push([lemniscatex(k), lemniscatey(k)]);
      }
      $.plot($("#bernoilli"), [
        {data: bernoulliA, label: 'Lemniscate of Bernoulli', lines: {show: true, fill: true}}
      ]);
    }
  return Metis;
})(jQuery, Metis || {});