import { Program } from "../../program";
import { Shader } from "../../shader";
import { IEffect } from "../effect";
import vertexSource from "../../coreShaders/vertex.glsl?raw";
import fragmentSource from "./brightnessContrast.glsl?raw";
import { createEffectSection } from "../../ui/createToggleableElement";

export class BrightnessContrast implements IEffect {
  gl: WebGL2RenderingContext;
  isActive = false;
  program: Program | null = null;

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
    const location = this.gl.getUniformLocation(this.program.getProgram(), "contrast");
    this.gl.uniform1f(location, 2);
  }

  drawOptions(parent: HTMLDivElement) {
    createEffectSection(parent, "Brightness / Contrast", "brightness-contrast", "abcd");
  }
}
