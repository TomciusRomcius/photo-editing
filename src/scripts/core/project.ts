import { BrightnessContrast } from "./effects/brightnessContrast/brightnessContrast";
import { IEffect } from "./effects/effect";
import { HueSaturation } from "./effects/hueSaturation/hueSaturation";
import { ViewportImage } from "./image";
import { saveImage } from "./utils";

export class Project {
  image: ViewportImage;
  canvas: HTMLCanvasElement;
  gl: WebGL2RenderingContext;
  effects: Array<IEffect> = [];
  isSaving: boolean = false;

  constructor(canvas: HTMLCanvasElement, gl: WebGL2RenderingContext, srcImage: HTMLImageElement) {
    this.canvas = canvas;
    this.gl = gl;
    this.image = new ViewportImage(this.canvas, gl, srcImage, this.effects);
    this.toggleEffect();
    this.drawEffectUI();
    const saveEl = document.getElementById("save-image");
    if (!saveEl) {
      throw new Error("Save image button is not defined") ;
    }
    saveEl.addEventListener("click", () => this.isSaving = true);
  }

  toggleEffect() {
    this.effects.push(new BrightnessContrast(this.gl));
    this.effects.push(new HueSaturation(this.gl));
  }

  drawEffectUI() {
    const parent = document.getElementById("effects-list");
    if (!parent) {
      console.error("effects list is undefined")
      return;
    }
    this.effects.forEach((effect) => {
      effect.drawOptions(parent as HTMLDivElement);
    });
  }

  render() {
    if (!this.gl || !this.image) {
      console.error("WebGL context or currentImage is undefined");
      return;
    }
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.image?.render(this.gl);
    if (this.isSaving) {
      saveImage(this.canvas);
      this.isSaving = false;
    }
  }

  public cleanup() {
    this.image.cleanup();
  }
}
