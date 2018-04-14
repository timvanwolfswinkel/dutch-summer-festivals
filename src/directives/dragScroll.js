export default {
  inserted(el) {
    el.startX = 0;
    el.diffX = 0;
    el.dragging = false;
  },
  bind(el) {
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
      console.log("add event listeners");
      el.addEventListener("mousedown", onMouseDown);
      el.addEventListener("mousemove", onMouseMove);
      el.addEventListener("mouseup", onMouseUp);
    } else if (el.attachEvent) {
      console.log("attach events");
      el.attachEvent("onmousedown", onMouseDown);
      el.attachEvent("mousemove", onMouseMove);
      el.attachEvent("mouseup", onMouseUp);
    } else {
      console.log("set mouse events");
      el.mousedown = onMouseDown;
      el.mousemove = onMouseMove;
      el.mouseup = onMouseUp;
    }
  },
  unbind() {
    // TODO: remove event listeners
  }
};
