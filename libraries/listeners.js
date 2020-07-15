function addListeners(canvas) {
  canvas.addEventListener('mouseout', () => { pause = true; }, false);
  canvas.addEventListener('mouseover', () => { pause = false; }, false);

  canvas.addEventListener('mousemove', (evt) => {
    const mousePos = getMousePos(canvas, evt);

    mx = mousePos.x;
    my = mousePos.y;

  }, false);
}


function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
