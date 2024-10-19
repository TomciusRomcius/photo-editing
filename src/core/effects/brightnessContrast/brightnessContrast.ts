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

  public apply() {
    this.program?.useProgram();
    const contrastLoc = this.gl.getUniformLocation(
      this.program.getProgram(),
      "contrast"
    );
    const brightnessLoc = this.gl.getUniformLocation(
      this.program.getProgram(),
      "brightness"
    );
    this.gl.uniform1f(contrastLoc, this.properties.contrast);
    this.gl.uniform1f(brightnessLoc, this.properties.brightness);
  }

  public drawOptions(parent: HTMLDivElement) {
    createEffectSection(
      parent,
      "Brightness / Contrast",
      "brightness-contrast",
      "abcd"
    );
    new Slider(parent, {
      name: "Brightness",
      min: 0,
      max: 2,
      onChange: (value) => (this.properties.brightness = value),
    });
      
    new Slider(parent, {
      name: "Contrast",
      min: 0,
      max: 2,
      onChange: (value) => (this.properties.contrast = value),
    });
  }

  public cleanup() {
    this.program?.deleteInclShaders();
    // Cheaty but temporary(hopefully) way
    document.getElementById("effects-list")!.innerHTML = "";
  }
}
