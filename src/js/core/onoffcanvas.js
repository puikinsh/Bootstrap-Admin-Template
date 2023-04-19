const cssClasses = {
  ANIMATE: "oc-animate",
  CLOSING: "oc-closing",
  DISMISSIBLE: "oc-dismissible",
  MODAL: "oc-modal",
  OPEN: "oc-open",
  OPENING: "oc-opening",
  ROOT: "onoffcanvas",
};

class OnoffCanvas {
  constructor(root) {
    this.root = root;
    this.animationFrame = 0;
    this.animationTimer = 0;
    this.init();
  }
  static get strings() {
    return strings;
  }
  static get cssClasses() {
    return cssClasses;
  }
  init() {
    this.captureTransitionEnd = (evt) => {
      this.handleTransitionEnd(evt);
    };
    this.listen("transitionend", this.captureTransitionEnd);
  }
  destroy() {
    this.unlisten("transitionend", this.captureTransitionEnd);
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    if (this.animationTimer) {
      clearTimeout(this.animationTimer);
    }
  }
  isOpen() {
    return this.root.classList.contains(cssClasses.OPEN);
  }
  isOpening() {
    return (
      this.root.classList.contains(cssClasses.OPENING) ||
      this.root.classList.contains(cssClasses.ANIMATE)
    );
  }
  isClosing() {
    return this.root.classList.contains(cssClasses.CLOSING);
  }
  open() {
    if (this.isOpen() || this.isOpening() || this.isClosing()) {
      return;
    }
    this.root.classList.add(cssClasses.OPEN);
    this.root.classList.add(cssClasses.ANIMATE);
    this.runNextAnimationFrame(() => {
      this.root.classList.add(cssClasses.OPENING);
    });
  }
  close() {
    if (!this.isOpen() || this.isOpening() || this.isClosing()) {
      return;
    }
    this.root.classList.add(cssClasses.CLOSING);
  }
  toggle() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }
  listen(evtType, handler, options) {
    this.root.addEventListener(evtType, handler, options);
  }
  unlisten(evtType, handler, options) {
    this.root.removeEventListener(evtType, handler, options);
  }
  emit(evtType, evtData, shouldBubble = false) {
    let evt;
    if (typeof CustomEvent === "function") {
      evt = new CustomEvent(evtType, {
        bubbles: shouldBubble,
        detail: evtData,
      });
    } else {
      evt = document.createEvent("CustomEvent");
      evt.initCustomEvent(evtType, shouldBubble, false, evtData);
    }
    this.root.dispatchEvent(evt);
  }
  handleTransitionEnd(evt) {
    const { ROOT, OPEN, ANIMATE, OPENING, CLOSING } = cssClasses;
    const isRootElement =
      this.isElement(evt.target) && this.root.classList.contains(ROOT);
    if (!isRootElement) {
      return;
    }
    if (this.isClosing()) {
      this.root.classList.remove(OPEN);
    }
    this.root.classList.remove(ANIMATE);
    this.root.classList.remove(OPENING);
    this.root.classList.remove(CLOSING);
  }
  runNextAnimationFrame(callback) {
    cancelAnimationFrame(this.animationFrame);
    this.animationFrame = requestAnimationFrame(() => {
      this.animationFrame = 0;
      clearTimeout(this.animationTimer);
      this.animationTimer = setTimeout(callback, 0);
    });
  }
  isElement(element) {
    return Boolean(element.classList);
  }
}

const metisSideBarToggles = document.querySelectorAll(
  '[data-oc-toggle="onoffcanvas"][data-oc-target="#metis-sidebar-start"]'
);
const metisSidebarStart = document.getElementById("metis-sidebar-start");

if (metisSideBarToggles && metisSidebarStart) {
  const oc = new OnoffCanvas(metisSidebarStart);

  if (Metis.getViewportWidth() < 992) {
    oc.close();
  } else {
    oc.open();
  }

  [...metisSideBarToggles].forEach((mst) => {
    mst.addEventListener("click", () => {
      oc.toggle();
    });
  });
}
