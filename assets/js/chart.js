$(function () {

    var d2 = [
        [0, 3],
        [1, 8],
        [2, 5],
        [3, 13],
        [4, 1]
    ];

    // a null signifies separate line segments
    var d3 = [
        [0, 12],
        [2, 2],
        [3, 9],
        [4, 4]
    ];

    $.plot($("#trigo"), [
        {data:d2, label:'ADAM'},
        {data:d3, label:'KARI'}
    ], {
        clickable:true,
        hoverable:true,
        series:{
            lines:{ show:true, fill:true, fillColor:{ colors:[
                { opacity:0.5 },
                { opacity:0.15 }
            ] } },
            points:{ show:true }
        }
    });

    $.plot($("#trigo2"), [
        {data:d2, label:'BAR'}
    ], {
        clickable:true,
        hoverable:true,
        series:{
            bars:{ show:true, barWidth:0.6 },
            points:{ show:true }
        }
    });

    var parabola = [],
        parabola2 = [];
    for (var i = -5; i <= 5; i += 0.5) {
        parabola.push([i, Math.pow(i, 2) - 25]);
        parabola2.push([i, -Math.pow(i, 2) + 25]);
    }

    var circle = [];

    for (var c = -2; c <= 2.1; c += 0.1) {
circle.push([c, Math.sqrt(400-c*c*100)]);
        circle.push([c, -Math.sqrt(400-c*c*100)]);
    }
var daire = [3];
    $.plot($("#eye"), [
        {data:parabola2, lines: {show:true,fill:true}},
        {data:parabola, lines: {show:true,fill:true}},
        {data:circle, lines:{show:true}}
    ]);

    var heart = [];
    for (var i = -2; i <= 5; i += 0.01) {
        heart.push([16 * Math.pow(Math.sin(i), 3), 13 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i)]);
    }
    $.plot($("#heart"), [
        {data:heart, label:'<i class="icon-heart icon-2x"></i>', color:'#9A004D'}
    ], {
        series:{
            lines:{ show:true,fill:true},
            points:{ show:false }

        },
        yaxis:{
            show:true
        },
        xaxis:{
            show:true
        }
    });
    $('#heart .legendLabel').addClass('animated pulse');


    var bernoulli = [];
    function lemniscatex(i){
        return Math.sqrt(2)*Math.cos(i)/(Math.pow(Math.sin(i),2)+1);
    }
    function lemniscatey(i){
        return Math.sqrt(2)*Math.cos(i)*Math.sin(i)/(Math.pow(Math.sin(i),2)+1);
    }
    for (var i = 0; i <= 2*Math.PI; i += 0.01) {
        bernoulli.push([lemniscatex(i), lemniscatey(i)]);
    }
    $.plot($("#bernoilli"), [
        {data:bernoulli,label:'Lemniscate of Bernoulli', lines: {show:true,fill:true}}
    ]);
});