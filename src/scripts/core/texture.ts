export class Texture {
  private texture: WebGLTexture | null;
  private gl: WebGL2RenderingContext;

  public constructor(gl: WebGL2RenderingContext, canvas: HTMLCanvasElement, imgSrc?: string) {
    this.gl = gl;
    this.texture = gl.createTexture();
    if (!this.texture) {
      console.error('Failed to create texture');
      return;
    }

    if (imgSrc) {
      const image = new Image();
      image.src = 'http://localhost:5173/brick.jpg';
  
      image.onload = () => {
        this.setParameters();
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      }
    }
    
    else {
      this.setParameters();
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvas.width, canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    }
  }

  private setParameters() {
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
  }

  public bind(gl: WebGL2RenderingContext) {
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
  }

  public getTexture() {
    return this.texture;
  }
}
