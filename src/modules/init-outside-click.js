export default function initOutsideClick(element, events, callback) {
  const html = document.documentElement;
  const outside = "data-outside";

  if (!element.hasAttribute(outside)) {
    events.forEach(userEvent => {
      setTimeout(() => { return html.addEventListener(userEvent, handleOutsideClick) });
      element.setAttribute(outside, "");

      function handleOutsideClick(event) {
        if (!element.contains(event.target)) {
          element.removeAttribute(outside);
          events.forEach(userEvent => {
            html.removeEventListener(userEvent, handleOutsideClick);
          });
          callback();
        }
      }
    });
  }
}
