import { Program } from "../program";
import { Shader } from "../shader";
import { IEffect } from "./effect";
import vertexSource from "../shaders/vertex.glsl?raw";
import fragmentSource from "../shaders/green.glsl?raw";

export class GreenEffect implements IEffect {
  isActive = false;
  gl: WebGL2RenderingContext;
  program: Program;

  constructor(gl: WebGL2RenderingContext) {
    this.gl = gl;
    this.program = new Program(
      gl,
      new Shader(gl, vertexSource, gl.VERTEX_SHADER),
      new Shader(gl, fragmentSource, gl.FRAGMENT_SHADER)
    );
    this.program.useProgram(gl);
  }

  drawOptions() {}
  apply() {
    this.program.useProgram(this.gl);
  }
}
