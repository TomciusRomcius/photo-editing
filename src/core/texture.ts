export class Texture {
  private texture: WebGLTexture | null;
  private gl: WebGL2RenderingContext;

  public constructor(
    canvas: HTMLCanvasElement,
    gl: WebGL2RenderingContext,
    imgSrc?: HTMLImageElement
  ) {
    this.gl = gl;
    this.texture = gl.createTexture();
    if (!this.texture) {
      console.error("Failed to create texture");
      return;
    }

    if (imgSrc) {
      this.setParameters();
      
      // Unflip the image
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

      // Reset canvas size to image size
      gl.canvas.width = imgSrc.width;
      gl.canvas.height = imgSrc.height;

      // Put the image data in the texture buffer
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        imgSrc.width,
        imgSrc.height,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        imgSrc
      );
    } else {
      this.setParameters();
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        canvas.width,
        canvas.height,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        null
      );
    }
  }

  private setParameters() {
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_S,
      this.gl.REPEAT
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_T,
      this.gl.REPEAT
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MIN_FILTER,
      this.gl.NEAREST
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MAG_FILTER,
      this.gl.NEAREST
    );
  }

  public bind() {
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
  }

  public getTexture() {
    return this.texture;
  }

  public delete() {
    this.gl.deleteTexture(this.texture);
  }
}
