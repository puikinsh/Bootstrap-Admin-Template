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