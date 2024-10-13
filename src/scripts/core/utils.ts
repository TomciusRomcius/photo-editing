
export function saveImage(
  canvas: HTMLCanvasElement,
) {
  const dataURL = canvas.toDataURL("image/jpeg", 1.0);
  console.log(dataURL);
  let a = document.createElement("a");
  a.download = "modified-image.jpg";
  a.href = dataURL;
  document.body.appendChild(a);
  a.click();
}