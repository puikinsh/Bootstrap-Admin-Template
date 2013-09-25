(function () {
  var div = document.createElement("div");
  div.id = "catincan-ribbon";
  var img = document.createElement("img");
  img.src = "https://www.catincan.com/sites/all/themes/catincan2/ribbons/images/catincan-ribbon-l02.png";
  img.style.position = "absolute";
  img.style.top = 0;
  img.style.left = 0;
  img.style.width = "192px";
  img.style.height = "198px";
  img.useMap = "#triangle";
  div.appendChild (img);
  var map = document.createElement("map");
  map.name="triangle";
  var area = document.createElement("area");
  area.shape = "poly";
  area.coords = "0,0,192,0,0,198";
  area.href = "https://www.catincan.com/projects/close/jasny-bootstrap";
  map.appendChild(area);
  div.appendChild (map);
  document.getElementsByTagName ("body")[0].appendChild (div);
})()
