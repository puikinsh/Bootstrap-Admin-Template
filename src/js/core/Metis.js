class MetisBase {
  constructor() {
    this.buttonPressedEvent = "click";
  }
  getViewportHeight() {
    const docElement = document.documentElement;
    const client = docElement.clientHeight;
    const inner = window.innerHeight;

    return client < inner ? inner : client;
  }

  getViewportWidth() {
    const docElement = document.documentElement;
    const client = docElement.clientWidth;
    const inner = window.innerWidth;

    return client < inner ? inner : client;
  }
}
window.Metis = new MetisBase();
