export namespace Core {
  export class ArrayBuffer {
    gl: WebGL2RenderingContext;
    buffer: WebGLBuffer;
  
    constructor(gl: WebGL2RenderingContext, data: Float32Array) {
      this.gl = gl;
      const buffer = gl.createBuffer();

      if (!buffer) {
        throw new Error("Failed to create an array buffer");
      }
      this.buffer = buffer;
      
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

      gl.enableVertexAttribArray(0);
      gl.enableVertexAttribArray(1);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 4*4, 0);
      gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 4*4, 2*4);
    }
  
    bind() {
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
    }

    delete() {
      this.gl.deleteBuffer(this.buffer);
    }
  }
}

