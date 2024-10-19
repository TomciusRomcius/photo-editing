export class Shader {
  private gl: WebGL2RenderingContext;
  private shader: WebGLShader;

  public constructor(gl: WebGL2RenderingContext, source: string, type: GLenum) {
    this.gl = gl;
    const shader = gl.createShader(type);
    if (!shader) {
      throw new Error("Failed to create shader");
    }
    this.shader = shader;

    gl.shaderSource(this.shader, source);
    gl.compileShader(this.shader);

    if (!gl.getShaderParameter(this.shader, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(this.shader);
      let stringType;
      switch (type) {
        case gl.VERTEX_SHADER:
          stringType = "VERTEX";
          break;
        case gl.FRAGMENT_SHADER:
          stringType = "VERTEX";
          break;
        default:
          console.error("Trying to create an unsupported shader type");
          return;
      }
      console.error(`Failed to compile ${stringType} shader ${info}`);
    }
  }

  public getShader() {
    return this.shader;
  }

  public delete() {
    this.gl.deleteShader(this.shader);
  }
}
