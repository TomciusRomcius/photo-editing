import { Texture } from "./texture";

export class Framebuffer {
  framebuffer: WebGLFramebuffer | null = null;
  texture: Texture | null = null;
  gl: WebGL2RenderingContext;

  constructor(gl: WebGL2RenderingContext, canvas: HTMLCanvasElement) {
    this.framebuffer = gl.createFramebuffer();
    this.gl = gl;
    if (!this.framebuffer) {
      console.error("Failed to create a framebuffer");
      return;
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
    this.texture = new Texture(gl, canvas);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture.getTexture(), 0);

    // Unbind framebuffer
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  public bind() {
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.framebuffer);
  }

  public unbind() {
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
  }
}
