/* Start Countdown Settings */
Metis.Countdown = () => {
  var startDate = new Date("01/01/2022"),
    endDate = new Date("04/06/2023"),
    dif = endDate.getTime() - startDate.getTime(),
    difToSecond = dif / 1000;
  let defaultPercent = 0;
  let currentPercent;

  function updateBar(periods) {
    fillSecondBar(periods[6]);
    fillMinuteBar(periods[5]);
    fillHourBar(periods[4]);
    fillDayBar(periods[3]);

    fillTotalbar(
      periods[6] +
        periods[5] * 60 +
        periods[4] * 60 * 60 +
        periods[3] * 60 * 60 * 24
    );
  }

  function fillSecondBar(percent) {
    $("#second-number").html(percent);
    $("#second-bar").css("width", (percent * 100) / 60 + "%");
  }

  function fillMinuteBar(percent) {
    $("#minute-number").html(percent);
    $("#minute-bar").css("width", (percent * 100) / 60 + "%");
  }

  function fillHourBar(percent) {
    $("#hour-number").html(percent);
    $("#hour-bar").css("width", (percent * 100) / 24 + "%");
  }

  function fillDayBar(percent) {
    $("#day-number").html(percent);
    $("#day-bar").css("width", (percent * 100) / 365 + "%");
  }

  function fillTotalbar(percent) {
    defaultPercent = 100 - (100 * percent) / difToSecond;

    if (defaultPercent >= 10) {
      currentPercent = defaultPercent.toString().substring(0, 5);
    } else {
      currentPercent = defaultPercent.toString().substring(0, 4);
    }

    $("#total-bar")
      .css("width", defaultPercent + "%")
      .html(currentPercent + "%");
  }

  $("#counter").countdown({
    until: endDate,
    layout: "<div></div>",
    onTick: updateBar,
  });
};
