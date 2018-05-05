export default {
  bind(el) {
    const text = el.innerHTML;
    const words = text.trim().split(" ");
    const div = document.createElement("div");

    // create spans for every word
    words.forEach(val => {
      const span = document.createElement("div");
      span.innerHTML = val;
      div.appendChild(span);
    });

    // replace element with new div (including spans for every word)
    el.innerHTML = el.innerHTML.replace(el.innerHTML, div.innerHTML);

    const spans = el.childNodes;
    const newParentElement = document.createElement("div");

    setTimeout(() => {
      let offsetTop = spans[0].getBoundingClientRect().top;
      let parentDiv = document.createElement("div");
      parentDiv.style.position = "relative";
      parentDiv.style.display = "inline-block";
      parentDiv.style.marginBottom = "5px";
      parentDiv.style.paddingTop = "10px";
      parentDiv.style.paddingLeft = "10px";
      parentDiv.style.paddingRight = "10px";

      // check top for each word, combine words with same top into one span
      [].forEach.call(spans, span => {
        const letters = span.innerHTML.split("");
        // console.log(letters);

        // create spans for each letter
        span.innerHTML = ""; /* eslint no-param-reassign: "error" */
        [].forEach.call(letters, letter => {
          const letterSpan = document.createElement("span");
          letterSpan.innerHTML = letter;
          letterSpan.style.display = "inline-block";
          letterSpan.style.opacity = "0";
          letterSpan.style.transform = "translateY(20px)";
          span.appendChild(letterSpan);
        });

        if (span.getBoundingClientRect().top === offsetTop) {
          parentDiv.innerHTML += ` ${span.innerHTML}`;
        } else {
          // background element (needed for hover animation)
          const background = document.createElement("span");
          background.className = "festival-item__bg";
          background.style.position = "absolute";
          background.style.top = "0";
          background.style.left = "0";
          background.style.width = "100%";
          background.style.height = "100%";
          background.style.transform = "scaleY(0)";
          background.style.transformOrigin = "100% 0%";
          background.style.backgroundColor = "#F35333";
          background.style.zIndex = "0";

          const extraDiv = document.createElement("div");
          extraDiv.className = "festival-item__word";
          extraDiv.style.position = "relative";
          extraDiv.style.zIndex = "1";
          extraDiv.innerHTML = parentDiv.innerHTML;
          parentDiv.innerHTML = "";

          parentDiv.appendChild(extraDiv);
          parentDiv.appendChild(background);
          newParentElement.appendChild(parentDiv);

          parentDiv = document.createElement("div");
          parentDiv.style.position = "relative";
          parentDiv.style.display = "inline-block";
          parentDiv.style.marginBottom = "5px";
          parentDiv.style.paddingTop = "10px";
          parentDiv.style.paddingLeft = "10px";
          parentDiv.style.paddingRight = "10px";
          parentDiv.innerHTML = "";

          offsetTop = span.getBoundingClientRect().top;
          parentDiv.innerHTML = ` ${span.innerHTML}`;
        }
      });

      const background = document.createElement("span");
      background.className = "festival-item__bg";
      background.style.position = "absolute";
      background.style.top = "0";
      background.style.left = "0";
      background.style.width = "100%";
      background.style.height = "100%";
      background.style.transform = "scaleY(0)";
      background.style.transformOrigin = "100% 0%";
      background.style.backgroundColor = "#F35333";
      background.style.zIndex = "0";

      const extraDiv = document.createElement("div");
      extraDiv.className = "festival-item__word";
      extraDiv.style.position = "relative";
      extraDiv.style.zIndex = "1";
      extraDiv.innerHTML = parentDiv.innerHTML;
      parentDiv.innerHTML = "";

      parentDiv.appendChild(extraDiv);
      parentDiv.appendChild(background);
      newParentElement.appendChild(parentDiv);

      el.innerHTML = el.innerHTML.replace(
        el.innerHTML,
        newParentElement.innerHTML
      );
    }, 50);
  }
};
