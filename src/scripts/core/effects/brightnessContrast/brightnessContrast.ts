import { Program } from "../../program";
import { Shader } from "../../shader";
import { IEffect } from "../effect";
import vertexSource from "../../coreShaders/vertex.glsl?raw";
import fragmentSource from "./brightnessContrast.glsl?raw";
import { createEffectSection } from "../../ui/createToggleableElement";
import { Slider } from "../../ui/slider";

type BrightnessContrastPropertiesType = {
  brightness: number;
  contrast: number;
};

export class BrightnessContrast implements IEffect {
  gl: WebGL2RenderingContext;
  isActive = false;
  program: Program | null = null;
  properties: BrightnessContrastPropertiesType = {
    brightness: 1,
    contrast: 1,
  };

  constructor(gl: WebGL2RenderingContext) {
    this.gl = gl;
    this.program = new Program(
      gl,
      new Shader(gl, vertexSource, gl.VERTEX_SHADER),
      new Shader(gl, fragmentSource, gl.FRAGMENT_SHADER)
    );
    this.program.useProgram(gl);
  }

  apply() {
    this.program?.useProgram(this.gl);
    const location = this.gl.getUniformLocation(
      this.program.getProgram(),
      "contrast"
    );
    this.gl.uniform1f(location, this.properties.contrast);
  }

  drawOptions(parent: HTMLDivElement) {
    createEffectSection(
      parent,
      "Brightness / Contrast",
      "brightness-contrast",
      "abcd"
    );
    const slider = new Slider(parent, {
      name: "name",
      min: 0,
      max: 2,
      onChange: (value) => this.properties.contrast = value,
    });
  }
}
