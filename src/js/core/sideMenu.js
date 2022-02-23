import MetisMenu from "metismenujs";

Metis.SideMenu = () => {
  const sideMenu = document.getElementById("menu");
  if (sideMenu) {
    new MetisMenu(sideMenu);
  }
};
