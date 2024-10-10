import { Effect, EffectType } from "./effect";
import { IEffect } from "./effects/effect";
import { GreenEffect } from "./effects/green";
import { RedEffect } from "./effects/redEffect";
import { ViewportImage } from "./image";

export class Project {
  image: ViewportImage;
  gl: WebGL2RenderingContext;
  canvas: HTMLCanvasElement;
  effects: Array<IEffect> = [];

  constructor(canvas: HTMLCanvasElement, gl: WebGL2RenderingContext) {
    this.image = new ViewportImage(canvas, gl, this.effects);
    this.gl = gl;
    this.canvas = canvas;
    this.toggleEffect();
    setInterval(() => this.render(), 50);
  }

  toggleEffect() {
    this.effects.push(new RedEffect(this.gl));
    this.effects.push(new GreenEffect(this.gl));
    this.image.render(this.gl);
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
