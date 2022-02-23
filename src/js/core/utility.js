Metis.buttonPressedEvent = "click";

Metis.getViewportHeight = () => {
  const docElement = document.documentElement;
  const client = docElement.clientHeight;
  const inner = window.innerHeight;

  return client < inner ? inner : client;
};

Metis.getViewportWidth = () => {
  const docElement = document.documentElement;
  const client = docElement.clientWidth;
  const inner = window.innerWidth;

  return client < inner ? inner : client;
};
