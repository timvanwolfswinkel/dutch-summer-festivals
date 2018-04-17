export default {
  inserted(el) {
    el.startX = 0;
    el.diffX = 0;
    el.dragging = false;
  },
  bind(el) {
    // TODO: Fix stuttering with lodash throttle: https://medium.com/vuejs-tips/lodash-throttle-b9baf3213f70
    // TODO: Consider moving this to a component
    // TODO: Remove event listeners on unbind
    // TODO: Only add mousemove event on mousedown (performance improvement)
    // TODO: Add movement right or left when dragging

    // mouse down event
    const onMouseDown = e => {
      const event = e || window.event; // check for IE

      el.startX = event.clientX + el.scrollLeft;
      el.diffX = 0;
      el.dragging = true;
    };

    // mouse move event
    const onMouseMove = e => {
      if (el.dragging === true) {
        const event = e || window.event;

        el.diffX = el.startX - (event.clientX + el.scrollLeft);
        el.scrollLeft += el.diffX;
      }
    };

    // mouse up event
    const onMouseUp = () => {
      el.dragging = false;
      let start = 1;

      const animate = () => {
        const step = Math.sin(start);
        if (step <= 0) {
          window.cancelAnimationFrame(animate);
        } else {
          el.scrollLeft += el.diffX * step;
          start -= 0.02;
          window.requestAnimationFrame(animate);
        }
      };

      animate();
    };

    // add event listeners to element
    if (el.addEventListener) {
      el.addEventListener("mousedown", onMouseDown);
      el.addEventListener("mousemove", onMouseMove);
      el.addEventListener("mouseup", onMouseUp);
    } else if (el.attachEvent) {
      el.attachEvent("onmousedown", onMouseDown);
      el.attachEvent("mousemove", onMouseMove);
      el.attachEvent("mouseup", onMouseUp);
    } else {
      el.mousedown = onMouseDown;
      el.mousemove = onMouseMove;
      el.mouseup = onMouseUp;
    }
  }
};
