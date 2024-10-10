export class Texture {
  texture: WebGLTexture | null;

  public constructor(gl: WebGL2RenderingContext, imgSrc: string) {
    this.texture = gl.createTexture();
    if (!this.texture) {
      console.error("Failed to create texture");
      return;
    }

    const image = new Image();
    image.src = "http://localhost:5173/brick.jpg";

    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, this.texture);
  
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    }
  }

  public bind(gl: WebGL2RenderingContext) {
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
  }
}
