
export function saveImage(
  canvas: HTMLCanvasElement,
) {
  const dataURL = canvas.toDataURL("image/jpeg", 1.0);
  let a = document.createElement("a");
  a.download = "modified-image.jpg";
  a.href = dataURL;
  document.body.appendChild(a);
  a.click();
}