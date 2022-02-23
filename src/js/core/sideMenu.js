import MetisMenu from "metismenujs";

Metis.sideMenu = () => {
  const sideMenu = document.getElementById("menu");
  if (sideMenu) {
    new MetisMenu(sideMenu);
  }
};
