import { Shader } from './shader';

export class Program {
  private program: WebGLProgram;
  gl: WebGL2RenderingContext;
  vertexShader: Shader;
  fragmentShader: Shader;

  constructor(gl: WebGL2RenderingContext, vertexShader: Shader, fragmentShader: Shader) {
    this.gl = gl;
    this.vertexShader = vertexShader;
    this.fragmentShader = fragmentShader;

    const program = gl.createProgram();
    if (!program) {
      throw new Error("er");
    }
    this.program = program;
    
    gl.attachShader(this.program, vertexShader.getShader());
    gl.attachShader(this.program, fragmentShader.getShader());
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(this.program);
      console.error(`Failed to link program ${info}`);
    }
  }

  public useProgram() {
    this.gl.useProgram(this.program);
  }

  public getProgram() {
    return this.program;
  }

  public deleteOnlyProgram() {
    this.gl.deleteProgram(this.program);
  }

  
  public deleteInclShaders() {
    this.gl.deleteProgram(this.program);
    this.vertexShader.delete();
    this.fragmentShader.delete();
  }
}
