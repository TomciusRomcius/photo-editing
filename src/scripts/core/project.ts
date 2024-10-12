import { BrightnessContrast } from "./effects/brightnessContrast/brightnessContrast";
import { IEffect } from "./effects/effect";
import { ViewportImage } from "./image";

export class Project {
  image: ViewportImage;
  gl: WebGL2RenderingContext;
  canvas: HTMLCanvasElement;
  effects: Array<IEffect> = [];

  constructor(canvas: HTMLCanvasElement, gl: WebGL2RenderingContext, srcImage: HTMLImageElement) {
    this.image = new ViewportImage(canvas, gl, srcImage, this.effects);
    this.gl = gl;
    this.canvas = canvas;
    this.toggleEffect();
    this.drawEffectUI();
    setInterval(() => this.render(), 50);
  }

  toggleEffect() {
    this.effects.push(new BrightnessContrast(this.gl));
  }

  drawEffectUI() {
    const parent = document.getElementById("effects-list");
    if (!parent) {
      console.error("effects list is undefined")
      return;
    }
    this.effects.forEach((effect) => {
      effect.drawOptions(parent);
    });
  }

  render() {
    if (!this.gl || !this.image) {
      console.error("WebGL context or currentImage is undefined");
      return;
    }
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.image?.render(this.gl);
    this.gl.clearColor(0, 0, 0, 0);
  }
}
