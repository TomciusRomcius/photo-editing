import { Shader } from './shader';

export class Program {
  private program: WebGLProgram | null;

  constructor(gl: WebGL2RenderingContext, vertexShader: Shader, fragmentShader: Shader) {
    this.program = gl.createProgram();
    if (!this.program) {
      console.error('Failed to create program');
      return;
    }
    gl.attachShader(this.program, vertexShader.getShader());
    gl.attachShader(this.program, fragmentShader.getShader());
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(this.program);
      console.error(`Failed to link program ${info}`);
    }
  }

  public useProgram(gl: WebGL2RenderingContext) {
    gl.useProgram(this.program);
  }

  public getProgram() {
    return this.program;
  }
}
